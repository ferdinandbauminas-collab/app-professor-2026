
import React from 'react';
import { AppScreen } from '../types';

interface NavigationProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentScreen, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-lg border-t border-gray-300 dark:border-gray-800 px-8 pb-8 pt-3 z-50">
      <div className="max-w-md mx-auto flex justify-center items-center">
        <button 
          onClick={() => onNavigate(AppScreen.DASHBOARD)}
          className={`flex flex-col items-center gap-1 transition-all ${currentScreen === AppScreen.DASHBOARD ? 'text-primary' : 'text-gray-400'}`}
        >
          <span className={`material-symbols-outlined text-3xl ${currentScreen === AppScreen.DASHBOARD ? 'fill-1' : ''}`}>home</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Início</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
