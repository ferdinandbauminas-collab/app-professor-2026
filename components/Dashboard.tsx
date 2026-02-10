
import React, { useState, useEffect } from 'react';
import { Teacher } from '../types';
import { getPendingAttendance, syncAllPending } from '../lib/supabase';

interface DashboardProps {
  teacher: Teacher;
  selectedDiscipline: { name: string } | null;
  selectedClass: string | null;
  onStartAttendance: () => void;
  onViewDisciplines: () => void;
  onViewClasses: () => void;
  isModalOpen?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({
  teacher,
  selectedDiscipline,
  selectedClass,
  onStartAttendance,
  onViewDisciplines,
  onViewClasses,
  isModalOpen = false
}) => {
  const [pendingCount, setPendingCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const checkPending = () => {
      const pending = getPendingAttendance();
      setPendingCount(pending.length);
    };
    checkPending();
    const interval = setInterval(checkPending, 30000);
    window.addEventListener('focus', checkPending);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', checkPending);
    };
  }, []);

  const handleSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    try {
      const result = await syncAllPending();
      if (result.count > 0) {
        alert(`${result.count} chamada(s) sincronizada(s) com sucesso!`);
      } else if (result.errors.length > 0) {
        alert(`Erro ao sincronizar: ${result.errors[0]}`);
      }
      setPendingCount(getPendingAttendance().length);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-start max-w-md mx-auto w-full px-6 space-y-6 py-8 pb-40 animate-fade-in">

      {/* Status de Sincronização */}
      {pendingCount > 0 && (
        <div className="w-full">
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="w-full bg-gradient-to-r from-accent to-amber-600 rounded-3xl p-5 flex items-center justify-between group active:scale-95 transition-all shadow-deep animate-pulse"
          >
            <div className="flex items-center gap-4">
              <div className="size-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white">
                <span className={`material-symbols-outlined text-3xl font-bold ${isSyncing ? 'animate-spin' : ''}`}>sync</span>
              </div>
              <div className="text-left text-white">
                <p className="font-black text-xs uppercase tracking-wider">Aguardando Envio</p>
                <p className="text-white/80 text-xs font-bold">{pendingCount} CHAMADA(S) PENDENTES</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-white font-bold group-hover:translate-x-1 transition-transform">chevron_right</span>
          </button>
        </div>
      )}

      {/* Seleção de Disciplina */}
      <div className="w-full space-y-3">
        <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Configurações da Aula</p>
        <button
          onClick={onViewDisciplines}
          className={`group relative w-full overflow-hidden rounded-3xl p-5 transition-all active:scale-[0.97] border-2 hover:scale-[1.01]
            ${selectedDiscipline
              ? 'bg-primary border-primary text-white shadow-primary/20 shadow-xl hover:shadow-primary/30'
              : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm hover:shadow-md'
            }
          `}
        >
          <div className="flex items-center gap-4 text-left">
            <div className={`size-14 rounded-2xl flex items-center justify-center transition-all duration-500
              ${selectedDiscipline
                ? 'bg-white font-bold text-primary rotate-3 transition-transform group-hover:rotate-6'
                : 'bg-primary/10 text-primary group-hover:bg-primary/20'
              }
            `}>
              <span className="material-symbols-outlined text-3xl font-bold">menu_book</span>
            </div>
            <div>
              <p className={`text-[9px] font-black uppercase tracking-[0.2em] ${selectedDiscipline ? 'text-white/60' : 'text-primary'}`}>Disciplina</p>
              <h3 className="text-lg font-black tracking-tight leading-none mt-1">
                {selectedDiscipline ? selectedDiscipline.name : 'Qual a matéria?'}
              </h3>
            </div>
          </div>
        </button>

        <button
          onClick={selectedDiscipline ? onViewClasses : undefined}
          disabled={!selectedDiscipline}
          className={`group relative w-full overflow-hidden rounded-3xl p-5 transition-all border-2 hover:scale-[1.01]
            ${!selectedDiscipline ? 'opacity-50' : 'active:scale-[0.97] hover:shadow-lg'}
            ${selectedClass && selectedDiscipline
              ? 'bg-secondary border-secondary text-white shadow-secondary/20 shadow-xl hover:shadow-secondary/30'
              : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white shadow-sm'
            }
          `}
        >
          <div className="flex items-center gap-4 text-left">
            <div className={`size-14 rounded-2xl flex items-center justify-center transition-all duration-500
              ${selectedClass
                ? 'bg-white font-bold text-secondary -rotate-3 transition-transform group-hover:-rotate-6'
                : 'bg-secondary/10 text-secondary group-hover:bg-secondary/20'
              }
            `}>
              <span className="material-symbols-outlined text-3xl font-bold">groups</span>
            </div>
            <div>
              <p className={`text-[9px] font-black uppercase tracking-[0.2em] ${selectedClass ? 'text-white/60' : 'text-secondary'}`}>Turma</p>
              <h3 className="text-lg font-black tracking-tight leading-none mt-1">
                {selectedClass ? selectedClass : 'Para qual sala?'}
              </h3>
            </div>
          </div>
        </button>
      </div>

      {/* Botão flutuante para iniciar */}
      {selectedDiscipline && selectedClass && !isModalOpen && (
        <div className="fixed bottom-10 left-0 w-full px-8 flex justify-center z-40">
          <button
            onClick={onStartAttendance}
            className="bg-accent text-background-dark px-10 py-5 rounded-3xl font-black text-xl shadow-strong flex items-center gap-4 hover:scale-105 active:scale-95 transition-all w-full justify-center max-w-sm border-b-4 border-amber-600"
          >
            <span className="uppercase tracking-tighter">Iniciar Chamada</span>
            <span className="material-symbols-outlined font-black text-2xl animate-bounce-subtle">arrow_forward</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

