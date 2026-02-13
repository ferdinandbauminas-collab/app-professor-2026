import { createClient } from '@supabase/supabase-js';
import { Teacher, Student, Discipline, ClassData } from '../types'; // Importar tipos e ClassData

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Faltam variáveis de ambiente do Supabase!');
    console.error('VITE_SUPABASE_URL:', supabaseUrl);
    console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Definida' : 'Não definida');
} else {
    console.log('✅ Supabase configurado com sucesso');
    console.log('URL:', supabaseUrl);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface AttendanceRecord {
    teacher_name: string;
    discipline: string;
    class_name: string;
    student_name: string;
    status: 'present' | 'absent';
    date: string;
    synced?: boolean;
    id?: string;
}

const STORAGE_KEY = 'pending_attendance';

export const getPendingAttendance = (): AttendanceRecord[][] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const savePendingAttendance = (records: AttendanceRecord[]) => {
    const pending = getPendingAttendance();
    pending.push(records);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pending));
};

export const clearPendingAttendance = () => {
    localStorage.removeItem(STORAGE_KEY);
};

export const removePendingBatch = (index: number) => {
    const pending = getPendingAttendance();
    pending.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pending));
};

export const saveAttendance = async (records: AttendanceRecord[]) => {
    try {
        const { data, error } = await supabase
            .from('attendance')
            .insert(records);

        if (error) {
            console.error('Erro ao salvar no Supabase:', error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Detalhes do erro no saveAttendance:', error);
        throw error;
    }
};

export const syncAllPending = async () => {
    const pending = getPendingAttendance();
    if (pending.length === 0) return { success: true, count: 0, errors: [] };

    let successCount = 0;
    const errors = [];

    // Tentar sincronizar cada lote (batch) de chamada
    for (let i = pending.length - 1; i >= 0; i--) {
        try {
            await saveAttendance(pending[i]);
            removePendingBatch(i);
            successCount++;
        } catch (err: any) {
            errors.push(err.message);
        }
    }

    return {
        success: errors.length === 0,
        count: successCount,
        errors
    };
};

import { STATIC_TEACHERS, STATIC_DISCIPLINES, STATIC_STUDENTS } from './constants'; // Importar constantes de fallback

// --- Novas funções para buscar dados do Supabase ---

export async function fetchTeachers(): Promise<Teacher[]> {
    try {
        const { data, error } = await supabase
            .from('teachers')
            .select('*'); // Seleciona todas as colunas

        if (error) {
            console.error('Erro ao buscar professores:', error.message);
            throw error;
        }

        console.log(`👨‍🏫 Professores encontrados no banco: ${data?.length || 0}`);

        return data as Teacher[];
    } catch (error) {
        console.warn('⚠️ Falha ao buscar professores (Offline/Bloqueio). Usando lista estática.', error);
        return STATIC_TEACHERS; // Fallback para lista estática
    }
}

// Retorna todas as entradas de disciplina, filtragem será feita no frontend
export async function fetchDisciplines(): Promise<Discipline[]> {
    try {
        const { data, error } = await supabase
            .from('disciplines')
            .select('*');

        if (error) {
            console.error('Erro ao buscar disciplinas:', error.message);
            throw error; // Forçar fallback para STATIC_DISCIPLINES
        }

        if (!data) throw new Error("Sem dados");

        console.log(`📚 Disciplinas carregadas: ${data.length}`);

        return data.map(d => {
            // Garantir que classes seja um array
            let classesArray: string[] = [];
            if (Array.isArray(d.classes)) {
                classesArray = d.classes;
            } else if (typeof d.classes === 'string') {
                try {
                    // Tentar converter de formato PostgreSQL array string se necessário
                    const cleaned = d.classes.replace('{', '').replace('}', '').replace(/"/g, '');
                    classesArray = cleaned.split(',').map(s => s.trim());
                } catch (e) {
                    console.error('Erro ao processar as classes como string:', d.classes);
                    classesArray = [];
                }
            }

            return {
                id: d.discipline_id || d.id,
                name: d.discipline_name || d.name,
                classes: classesArray,
                teacherId: d.teacher_id,
                totalHours: 0
            };
        }) as Discipline[];
    } catch (error) {
        console.warn('⚠️ Falha ao buscar disciplinas (Offline/Bloqueio). Usando lista estática.', error);
        return STATIC_DISCIPLINES; // Fallback para lista estática
    }
}

export async function fetchStudents(): Promise<Student[]> {
    try {
        const { data, error } = await supabase
            .from('students')
            .select('*'); // Seleciona todas as colunas

        if (error) {
            console.error('Erro ao buscar alunos:', error.message);
            throw error;
        }
        return data as Student[];
    } catch (error) {
        console.warn('⚠️ Falha ao buscar alunos (Offline/Bloqueio). Usando lista estática.', error);
        return STATIC_STUDENTS; // Fallback para lista estática
    }
}

export async function fetchClasses(): Promise<ClassData[]> {
    // Lista de segurança (Fallback)
    const staticClassesList = [
        'MÓDULO IA INFO',
        'MÓDULO IIIA INFO',
        'MÓDULO IIIB INFO',
        'MÓDULO VA INFO',
        'MÓDULO VB INFO',
        'MÓDULO VC INFO',
        'MÓDULO VD INFO',
        'MÓDULO IA MARK',
        'MÓDULO IA ALTE'
    ];

    try {
        console.log('📡 Buscando turmas no Supabase (Tabela "Turmas")...');
        const { data, error } = await supabase
            .from('Turmas')
            .select('*')
            .order('name');

        if (error) {
            console.error('⚠️ Erro ao buscar turmas no banco:', error.message);
            throw error; // Forçar fallback
        }

        if (!data || data.length === 0) {
            console.warn('⚠️ Tabela "Turmas" está vazia ou inacessível. Usando lista fixa.');
            throw new Error('Tabela vazia'); // Forçar fallback
        }

        console.log(`✅ Sucesso! ${data.length} turmas carregadas do banco.`);

        return data.map((item: any) => ({
            id: item.id, // Manter o ID original do banco (UUID)
            name: item.name,
            totalStudents: 0,
            students: []
        }));

    } catch (err) {
        console.log('🔄 Ativando modo de segurança: Usando lista estática de turmas.');
        return staticClassesList.map(className => ({
            id: className, // No fallback, ID é o nome
            name: className,
            totalStudents: 0,
            students: []
        }));
    }
}
