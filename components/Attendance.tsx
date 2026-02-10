import { saveAttendance, AttendanceRecord } from '../lib/supabase';
import React, { useState } from 'react';
import { Student } from '../types';

interface AttendanceProps {
  students: Student[];
  teacherName?: string;  // Nova prop para identificar quem chamou
  disciplineName?: string; // Nova prop
  className?: string; // Nova prop
  onFinish: () => void;
  onCancel: () => void;
}

const Attendance: React.FC<AttendanceProps> = ({
  students,
  teacherName = 'Professor',
  disciplineName = 'Disciplina',
  className = 'Turma',
  onFinish,
  onCancel
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false); // Novo estado para resumo
  const total = students.length;
  const currentStudent = students[currentIndex] || { name: 'Fim', photoUrl: '' };

  const displayTotal = total;
  const displayCurrent = currentIndex + 1;
  const progressPercent = total > 0 ? (displayCurrent / displayTotal) * 100 : 0;

  const handleFinish = async () => {
    setIsSaving(true);
    const records: AttendanceRecord[] = students.map(student => ({
      teacher_name: teacherName,
      discipline: disciplineName,
      class_name: className,
      student_name: student.name,
      status: student.status || 'present',
      date: (() => {
        // Forçar data anterior (Brasil -3h + margem de segurança)
        const now = new Date();
        const offsetBrazil = 4 * 60 * 60 * 1000; // 4 horas em milissegundos
        const brazilDate = new Date(now.getTime() - offsetBrazil);
        return brazilDate.toISOString().split('T')[0];
      })()
    }));

    try {
      const { savePendingAttendance, saveAttendance, getPendingAttendance, removePendingBatch } = await import('../lib/supabase');
      savePendingAttendance(records);
      await saveAttendance(records);
      const pending = getPendingAttendance();
      removePendingBatch(pending.length - 1);
      onFinish();
    } catch (error: any) {
      console.error('Erro de sincronização automática:', error);
      alert(`AVISO: A chamada foi salva no seu celular, mas não pôde ser enviada para a nuvem agora. \n\nMotivo: ${error.message || 'Sem conexão'}.`);
      onFinish();
    } finally {
      setIsSaving(false);
    }
  };

  const handleAction = (status: 'present' | 'absent') => {
    students[currentIndex].status = status;
    if (currentIndex < total - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsReviewing(true); // Mostrar resumo ao invés de salvar direto
    }
  };

  if (isSaving) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300 font-black uppercase tracking-widest text-xs">Sincronizando...</p>
      </div>
    );
  }

  // TELA DE RESUMO (REVISÃO)
  if (isReviewing) {
    const absences = students.filter(s => s.status === 'absent');
    const presenceCount = students.length - absences.length;

    const toggleStatus = (studentName: string) => {
      const student = students.find(s => s.name === studentName);
      if (student) {
        student.status = student.status === 'absent' ? 'present' : 'absent';
        setCurrentIndex(0); // Forçar re-render
        setCurrentIndex(students.length - 1);
      }
    };

    return (
      <div className="flex-1 flex flex-col p-6 animate-fade-in max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">Resumo da Aula</h2>
          <p className="text-slate-500 uppercase text-[10px] font-black tracking-[0.2em] mt-2">Toque em um aluno para mudar o status</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="glass-morphism rounded-3xl p-5 text-center">
            <p className="text-success text-3xl font-black">{presenceCount}</p>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Presentes</p>
          </div>
          <div className="glass-morphism rounded-3xl p-5 text-center">
            <p className="text-danger text-3xl font-black">{absences.length}</p>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest">Faltas</p>
          </div>
        </div>

        <div className="flex-1 glass-morphism rounded-3xl p-6 overflow-hidden flex flex-col border-2 border-primary/10">
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">warning</span> Alunos Ausentes
          </p>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {absences.length > 0 ? (
              absences.map((s, i) => (
                <button
                  key={i}
                  onClick={() => toggleStatus(s.name)}
                  className="w-full flex items-center gap-3 p-3 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/10 active:scale-[0.98] transition-all hover:bg-white/10"
                >
                  <span className="size-8 rounded-full bg-danger text-white flex items-center justify-center text-[10px] font-black">{i + 1}</span>
                  <span className="text-[11px] font-black text-white uppercase truncate">{s.name}</span>
                  <span className="material-symbols-outlined text-success opacity-0 hover:opacity-100 ml-auto text-sm font-black">undo</span>
                </button>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 opacity-50">
                <span className="material-symbols-outlined text-5xl mb-2">check_circle</span>
                <p className="text-xs font-black uppercase tracking-widest">Nenhuma falta hoje</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <button
            onClick={() => { setIsReviewing(false); setCurrentIndex(0); }}
            className="h-16 rounded-3xl border-2 border-slate-200 dark:border-slate-800 text-slate-500 font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
          >
            Recomeçar
          </button>
          <button
            onClick={handleFinish}
            className="h-16 rounded-3xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Enviar Agora</span>
            <span className="material-symbols-outlined font-black">send</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col max-w-md mx-auto w-full animate-fade-in">
      <div className="flex flex-col gap-2 p-4 pt-6">
        <div className="flex gap-6 justify-between items-end">
          <div className="flex flex-col">
            <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] leading-none mb-1">Chamada em progresso</p>
            <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{className} <span className="text-xs opacity-50">(v2.1)</span></h2>
          </div>
          <p className="text-primary text-[10px] font-black leading-none bg-primary/10 px-2.5 py-1.5 rounded-full border border-primary/10">
            {displayCurrent} / {displayTotal}
          </p>
        </div>
        <div className="rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden h-2.5 ring-4 ring-primary/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out shadow-[0_0_15px_rgba(79,70,229,0.5)]"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="px-6 flex-1 flex flex-col items-center justify-center min-h-0">
        <div className="relative group">
          <div className="size-56 rounded-[3rem] border-8 border-white dark:border-slate-800 shadow-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center relative ring-1 ring-slate-200 dark:ring-slate-700">
            {currentStudent.photoUrl ? (
              <div
                className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url("${currentStudent.photoUrl}")` }}
              ></div>
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-300 dark:text-slate-700 opacity-50">
                <span className="material-symbols-outlined text-8xl">person</span>
              </div>
            )}
          </div>
          <div className="absolute -bottom-3 right-8 bg-accent text-background-dark size-12 rounded-xl shadow-strong flex items-center justify-center ring-4 ring-white dark:ring-slate-800">
            <span className="material-symbols-outlined text-xl font-black italic">school</span>
          </div>
        </div>
      </div>

      <div className="px-6 mb-8">
        <div className="flex flex-col gap-3 max-w-xs mx-auto bg-slate-900/40 backdrop-blur-xl p-4 rounded-[2.5rem] border border-white/10 shadow-2xl">
          {/* Nome do Aluno (Topo - 2 Linhas Fixas) */}
          <div className="w-full flex items-center justify-center min-h-[3.5rem] text-center px-2">
            <h1 className="text-white text-lg font-black leading-tight tracking-tight uppercase font-display drop-shadow-sm line-clamp-2">
              {currentStudent.name}
            </h1>
          </div>

          {/* Botões de Ação (Abaixo) */}
          <div className="flex items-center justify-between gap-3 w-full">
            {/* Botão Faltou */}
            <button
              onClick={() => handleAction('absent')}
              className="flex-1 h-14 flex flex-col items-center justify-center rounded-2xl bg-danger text-white shadow-lg active:scale-95 transition-all border-t-2 border-white/20"
            >
              <span className="material-symbols-outlined text-2xl font-black">close</span>
              <span className="text-[9px] font-black uppercase tracking-widest leading-none">Falta</span>
            </button>

            {/* Botão Presente */}
            <button
              onClick={() => handleAction('present')}
              className="flex-1 h-14 flex flex-col items-center justify-center rounded-2xl bg-success text-white shadow-lg active:scale-95 transition-all border-t-2 border-white/20"
            >
              <span className="material-symbols-outlined text-2xl font-black">check</span>
              <span className="text-[9px] font-black uppercase tracking-widest leading-none">Presença</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
