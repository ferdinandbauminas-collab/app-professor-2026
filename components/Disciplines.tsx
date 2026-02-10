import React from 'react';
import { Teacher, Discipline } from '../types';

interface DisciplinesModalProps {
    teacher: Teacher;
    disciplines: Discipline[];
    isOpen: boolean;
    onClose: () => void;
    onSelect: (discipline: Discipline) => void;
}

const DisciplinesModal: React.FC<DisciplinesModalProps> = ({ teacher, disciplines, isOpen, onClose, onSelect }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div
                className="absolute inset-0 bg-background-dark/80 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-t-4xl shadow-strong max-h-[85vh] flex flex-col animate-slide-up border-t-4 border-primary/20 overflow-hidden">
                <div className="flex justify-center pt-4 pb-2">
                    <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full" />
                </div>

                <div className="px-8 pb-6 pt-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black text-primary tracking-tighter font-display uppercase">Escolha a Matéria</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                O que vamos lecionar hoje?
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="size-10 bg-slate-50 dark:bg-slate-800 flex items-center justify-center rounded-2xl text-slate-400 hover:text-primary transition-all"
                        >
                            <span className="material-symbols-outlined font-black">close</span>
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-2 space-y-3 pb-12 custom-scrollbar">
                    {disciplines.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center opacity-30">
                            <span className="material-symbols-outlined text-6xl mb-4">book_5</span>
                            <p className="font-black uppercase text-xs tracking-widest">Nenhuma disciplina encontrada</p>
                        </div>
                    ) : (
                        disciplines.map((discipline, idx) => (
                            <button
                                key={discipline.id}
                                onClick={() => onSelect(discipline)}
                                className="w-full bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border-2 border-transparent hover:border-primary/30 hover:bg-primary/5 flex items-center gap-4 transition-all active:scale-[0.98] group"
                            >
                                <div className="size-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg group-hover:-rotate-3 transition-transform">
                                    <span className="material-symbols-outlined text-2xl font-black">menu_book</span>
                                </div>
                                <div className="text-left flex-1 truncate">
                                    <h3 className="text-base font-black text-slate-800 dark:text-white uppercase tracking-tight truncate">
                                        {discipline.name}
                                    </h3>
                                    <p className="text-[9px] font-black text-primary/60 uppercase tracking-widest mt-0.5">
                                        {discipline.classes.length} Turmas vinculadas
                                    </p>
                                </div>
                                <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors font-black">chevron_right</span>
                            </button>
                        ))
                    )}
                </div>
            </div>

            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </div>
    );
};

export default DisciplinesModal;
