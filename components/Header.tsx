
import React from 'react';
import { Teacher, AppScreen } from '../types';

interface HeaderProps {
  teacher: Teacher | null;
  screen: AppScreen;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ teacher, screen, onBack }) => {
  return (
    <header className="sticky top-0 z-50 glass-morphism backdrop-blur-2xl border-b border-white/10 shadow-lg ring-1 ring-black/5">
      <div className="max-w-md mx-auto px-6 h-22 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          {onBack ? (
            <button onClick={onBack} className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl transition-all active:scale-90">
              <span className="material-symbols-outlined font-black">arrow_back_ios_new</span>
            </button>
          ) : (
            <div className="size-12 shrink-0 overflow-hidden rounded-2xl border-2 border-primary/20 shadow-md ring-4 ring-primary/5">
              <img
                alt="Avatar"
                className="w-full h-full object-cover"
                src={teacher?.avatar || `https://ui-avatars.com/api/?name=${teacher?.name}&background=random`}
              />
            </div>
          )}

          <div className="flex flex-col min-w-0">
            {(() => {
              const firstName = teacher?.name.split(' ')[0] || '';
              const femaleNames = ['MARIA', 'FRANCINELDA', 'CARMEN', 'CARMEM', 'LINDELVANIA', 'CLEANNY', 'WILSILENE', 'HELANNE', 'FRANCISCA'];
              const isFemale = femaleNames.some(name => firstName.toUpperCase().startsWith(name) || firstName.toUpperCase().endsWith('A'));
              const prefix = isFemale ? 'Professora' : 'Professor';

              return (
                <h1 className="text-primary text-sm font-black uppercase tracking-[0.15em] leading-none font-display">
                  Olá {prefix} {firstName}
                </h1>
              );
            })()}
            <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold mt-1.5 uppercase tracking-wider">
              {screen === AppScreen.ATTENDANCE ? '📍 Chamada em Tempo Real' : 'CETI AURISTELA SOARES'} <span className="opacity-50 text-[8px]">(v2.4)</span>
            </p>
          </div>
        </div>

        {!onBack && screen === AppScreen.DASHBOARD && (
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('logout'))}
            className="size-10 flex items-center justify-center text-slate-400 hover:text-danger hover:bg-danger/10 rounded-xl transition-all active:scale-95"
          >
            <span className="material-symbols-outlined font-black">logout</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
