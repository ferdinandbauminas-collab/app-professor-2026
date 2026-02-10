import React, { useState } from 'react';
import { Teacher } from '../types';
import CustomSelect from './CustomSelect';

interface LoginProps {
  onLogin: (teacher: Teacher) => void;
  allTeachers: Teacher[];
}

const Login: React.FC<LoginProps> = ({ onLogin, allTeachers }) => {
  const [selectedId, setSelectedId] = useState('');

  const handleEnter = () => {
    const teacher = allTeachers.find(t => t.id === selectedId);
    if (teacher) {
      onLogin(teacher);
    }
  };

  const teacherOptions = allTeachers.map(t => ({
    value: t.id,
    label: t.name,
    avatar: t.avatar
  }));

  return (
    <div className="flex-1 flex flex-col bg-background-dark relative overflow-hidden bg-premium h-screen">
      {/* Luzes decorativas */}
      <div className="absolute top-[-20%] left-[-10%] size-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] size-[500px] bg-secondary/20 rounded-full blur-[120px]"></div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 animate-fade-in">
        <div className="w-full max-w-lg text-center mb-10">
          <h1 className="text-white tracking-tighter text-3xl md:text-5xl font-black leading-none drop-shadow-2xl font-display uppercase">
            CETI<br />
            <span className="text-accent">AURISTELA SOARES</span>
          </h1>
          <div className="h-1.5 w-32 bg-accent mx-auto mt-6 rounded-full shadow-lg"></div>
        </div>

        <div className="w-full max-w-sm glass-morphism rounded-4xl p-8 space-y-8">
          <div className="space-y-4">
            <label className="text-white/70 text-xs font-black uppercase tracking-[0.2em] ml-1">
              Selecione
            </label>
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl ring-4 ring-white/5">
              <CustomSelect
                options={teacherOptions}
                value={selectedId}
                onChange={setSelectedId}
                placeholder="Selecione..."
              />
            </div>
          </div>

          <button
            onClick={handleEnter}
            disabled={!selectedId}
            className={`group relative w-full h-18 rounded-2xl bg-accent text-background-dark font-black text-lg transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-3
              ${!selectedId ? 'opacity-20 grayscale cursor-not-allowed' : 'hover:scale-[1.02] hover:bg-amber-400'}
            `}
          >
            <span className="uppercase tracking-tight">Entrar no Sistema</span>
            <span className="material-symbols-outlined font-black group-hover:translate-x-1 transition-transform">login</span>
          </button>
        </div>

        <p className="mt-12 text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">
          Gestão de Frequência 2025 <span className="opacity-50">(v2.2)</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
