import { createClient } from '@supabase/supabase-js';
import { Teacher, Student, Discipline } from '../types'; // Importar tipos

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

// --- Novas funções para buscar dados do Supabase ---

export async function fetchTeachers(): Promise<Teacher[]> {
    const { data, error } = await supabase
        .from('teachers')
        .select('*'); // Seleciona todas as colunas

    if (error) {
        console.error('Erro ao buscar professores:', error.message);
        throw error;
    }

    console.log(`👨‍🏫 Professores encontrados no banco: ${data?.length || 0}`);

    return data as Teacher[];
}

// Retorna todas as entradas de disciplina, filtragem será feita no frontend
export async function fetchDisciplines(): Promise<Discipline[]> {
    const { data, error } = await supabase
        .from('disciplines')
        .select('*');

    if (error) {
        console.error('Erro ao buscar disciplinas:', error.message);
        return [];
    }

    if (!data) return [];

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
}

export async function fetchStudents(): Promise<Student[]> {
    const { data, error } = await supabase
        .from('students')
        .select('*'); // Seleciona todas as colunas

    if (error) {
        console.error('Erro ao buscar alunos:', error.message);
        return [];
    }
    return data as Student[];
}
