import React, { useState } from 'react';
import { createPortal } from 'react-dom';

interface Option {
    value: string;
    label: string;
    avatar?: string;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, placeholder = 'Selecione' }) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find(opt => opt.value === value);

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        }
    }, [isOpen]);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <>
            <div className="relative w-full">
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className={`flex w-full items-center justify-between rounded-2xl bg-white dark:bg-slate-900 border-2 transition-all h-20 px-6 shadow-xl active:scale-[0.98]
            ${isOpen ? 'border-primary ring-4 ring-primary/10' : 'border-slate-100 dark:border-slate-800'}
          `}
                >
                    <div className="flex items-center gap-4 overflow-hidden w-full">
                        {selectedOption ? (
                            <div className="flex items-center gap-3 w-full">
                                <div className="size-10 rounded-xl bg-primary text-white flex items-center justify-center font-black shadow-lg">
                                    {selectedOption.label.charAt(0)}
                                </div>
                                <span className="text-slate-900 dark:text-white font-black text-lg truncate uppercase tracking-tight">
                                    {selectedOption.label}
                                </span>
                            </div>
                        ) : (
                            <span className="text-slate-400 dark:text-white/30 text-lg font-black uppercase tracking-widest ml-1">
                                {placeholder}
                            </span>
                        )}
                    </div>

                    <div className="size-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 flex-shrink-0">
                        <span className="material-symbols-outlined text-2xl font-black">unfold_more</span>
                    </div>
                </button>
            </div>

            {/* Modal Portal */}
            {isOpen && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-end justify-center animate-fadeIn">
                    <div
                        className="absolute inset-0 bg-background-dark/80 backdrop-blur-md transition-opacity"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-t-4xl shadow-strong max-h-[85vh] flex flex-col animate-slide-up border-t-4 border-primary/20 overflow-hidden">

                        <div className="flex justify-center pt-4 pb-2">
                            <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full" />
                        </div>

                        <div className="px-8 pb-6 pt-4 flex items-center justify-end">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="size-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-primary transition-all active:scale-90"
                            >
                                <span className="material-symbols-outlined font-black">close</span>
                            </button>
                        </div>

                        <div className="overflow-y-auto overscroll-contain px-6 py-2 space-y-2 pb-12 flex-1 custom-scrollbar">
                            {options.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center opacity-30">
                                    <span className="material-symbols-outlined text-6xl mb-4">person_off</span>
                                    <p className="font-black uppercase text-xs tracking-widest text-primary">Nenhum professor encontrado</p>
                                    <p className="text-[10px] mt-2">Verifique a conexão com o banco de dados</p>
                                </div>
                            ) : (
                                options.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => handleSelect(option.value)}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border-2
                            ${value === option.value
                                                ? 'bg-primary/5 dark:bg-primary/20 border-primary/20 shadow-inner'
                                                : 'bg-slate-50 dark:bg-white/5 border-transparent hover:border-primary/10'
                                            }
                        `}
                                    >
                                        <div className="flex items-center gap-4 truncate">
                                            <div className={`size-10 rounded-xl flex items-center justify-center font-black shadow-md
                                                ${value === option.value ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}
                                            `}>
                                                {option.label.charAt(0)}
                                            </div>
                                            <span className={`text-base font-black uppercase tracking-tight truncate ${value === option.value ? 'text-primary' : 'text-slate-800 dark:text-white'}`}>
                                                {option.label}
                                            </span>
                                        </div>

                                        {value === option.value && (
                                            <span className="material-symbols-outlined text-primary font-black">check_circle</span>
                                        )}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    <style>{`
                        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
                        .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                    `}</style>
                </div>,
                document.body
            )}
        </>
    );
};

export default CustomSelect;
