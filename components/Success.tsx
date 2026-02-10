
import React from 'react';

interface SuccessProps {
  onFinish: () => void;
  disciplineName?: string | null;
  classNameSelected?: string | null;
}

const Success: React.FC<SuccessProps> = ({ onFinish, disciplineName, classNameSelected }) => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background-dark bg-premium h-screen font-display animate-fade-in relative">
      {/* Luzes decorativas */}
      <div className="absolute top-[-20%] left-[-10%] size-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] size-[500px] bg-secondary/20 rounded-full blur-[120px]"></div>

      <header className="relative z-10 flex items-center p-6 justify-end">
        <button onClick={onFinish} className="size-12 rounded-2xl glass-morphism flex items-center justify-center text-white active:scale-90 transition-all">
          <span className="material-symbols-outlined font-black">close</span>
        </button>
      </header>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-10">
        <div className="relative mb-12">
          <div className="size-32 bg-success rounded-4xl shadow-[0_0_50px_rgba(16,185,129,0.4)] flex items-center justify-center animate-bounce">
            <span className="material-symbols-outlined text-white text-6xl font-black italic">check</span>
          </div>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-white tracking-tighter text-4xl font-black leading-tight drop-shadow-xl">
            TUDO CERTO!
          </h1>
          <p className="text-white/60 text-lg font-medium leading-relaxed max-w-[240px] mx-auto uppercase tracking-widest text-xs">
            A frequência foi registrada e salva com sucesso.
          </p>
        </div>

        {(disciplineName || classNameSelected) && (
          <div className="mt-12 w-full max-w-sm glass-morphism rounded-3xl p-6 space-y-4 border-t-2 border-white/20">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em]">Disciplina</span>
              <span className="text-white text-sm font-black uppercase">{disciplineName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em]">Turma</span>
              <span className="text-white text-sm font-black uppercase">{classNameSelected}</span>
            </div>
          </div>
        )}
      </main>

      <div className="relative z-10 pb-12 text-center">
        <button
          onClick={onFinish}
          className="px-8 py-4 bg-white text-primary rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all"
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
};

export default Success;
