import React, { useState, useCallback, useEffect } from 'react';
import { AppScreen, Teacher, Discipline, Student, ClassData } from './types';
// Importação de constantes removida, dados virão do Supabase
// import { TEACHER_DISCIPLINES, getStudentsForClass } from './constants'; 
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import DisciplinesModal from './components/Disciplines';
import ClassesModal from './components/ClassesModal';
import Attendance from './components/Attendance';
import Success from './components/Success';
import Header from './components/Header';
import { fetchTeachers, fetchDisciplines, fetchStudents, fetchClasses } from './lib/supabase'; // Importar funções do Supabase

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.LOGIN);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  // Estados para dados carregados do Supabase
  const [allTeachers, setAllTeachers] = useState<Teacher[]>([]);
  const [allDisciplines, setAllDisciplines] = useState<Discipline[]>([]);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [allClassesSupabase, setAllClassesSupabase] = useState<ClassData[]>([]); // Novo estado para todas as classes do Supabase
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Selection States
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const handleGoHome = useCallback(() => {
    setCurrentScreen(AppScreen.DASHBOARD);
  }, []);

  const handleLogout = useCallback(() => {
    setSelectedTeacher(null);
    setSelectedDiscipline(null);
    setSelectedClass(null);
    setCurrentScreen(AppScreen.LOGIN);
  }, []);

  // Modals
  const [showDisciplinesModal, setShowDisciplinesModal] = useState(false);
  const [showClassesModal, setShowClassesModal] = useState(false);

  // Efeito para o evento de logout
  useEffect(() => {
    const handleLogoutEvent = () => handleLogout();
    window.addEventListener('logout', handleLogoutEvent);
    return () => window.removeEventListener('logout', handleLogoutEvent);
  }, [handleLogout]);

  // Efeito para carregar dados iniciais do Supabase
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [teachersData, disciplinesData, studentsData, classesData] = await Promise.all([
          fetchTeachers(),
          fetchDisciplines(),
          fetchStudents(),
          fetchClasses(), // Chamar a nova função fetchClasses
        ]);
        setAllTeachers(teachersData);
        setAllDisciplines(disciplinesData);
        setAllStudents(studentsData);
        setAllClassesSupabase(classesData); // Salvar as classes no novo estado
        console.log('📚 Turmas Supabase carregadas no estado:', classesData); // Adicionado para depuração
      } catch (err: any) {
        console.error("Erro ao carregar dados iniciais:", err);
        console.error("Erro ao carregar dados iniciais:", err);
        setError(`Erro técnico: ${err.message || JSON.stringify(err)}`);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const handleLogin = useCallback((teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setCurrentScreen(AppScreen.DASHBOARD);
    // Reset selections on new login
    setSelectedDiscipline(null);
    setSelectedClass(null);
  }, []);

  // Handlers for Disciplines
  const handleViewDisciplines = useCallback(() => {
    setShowDisciplinesModal(true);
  }, []);

  const handleCloseDisciplines = useCallback(() => {
    setShowDisciplinesModal(false);
  }, []);

  const handleSelectDiscipline = useCallback((discipline: Discipline) => {
    setSelectedDiscipline(discipline);
    setSelectedClass(null); // Reset class when discipline changes
    setShowDisciplinesModal(false);
  }, []);

  // Handlers for Classes
  const handleViewClasses = useCallback(() => {
    setShowClassesModal(true);
  }, []);

  const handleCloseClasses = useCallback(() => {
    setShowClassesModal(false);
  }, []);

  const handleSelectClass = useCallback((cls: string) => {
    setSelectedClass(cls);
    setShowClassesModal(false);
  }, []);


  const handleStartAttendance = useCallback(() => {
    // Only start if everything selected
    if (selectedTeacher && selectedDiscipline && selectedClass) {
      setCurrentScreen(AppScreen.ATTENDANCE);
    } else {
      alert("Por favor, selecione uma disciplina e uma turma primeiro.");
    }
  }, [selectedTeacher, selectedDiscipline, selectedClass]);

  const handleAttendanceFinish = useCallback(() => {
    setCurrentScreen(AppScreen.SUCCESS);
  }, []);


  const getTeacherDisciplines = useCallback(() => {
    if (!selectedTeacher) return [];

    const teacherId = selectedTeacher.id.toLowerCase().trim();
    return allDisciplines.filter(d => {
      const dTeacherId = (d.teacherId || '').toLowerCase().trim();
      return dTeacherId === teacherId;
    });
  }, [selectedTeacher, allDisciplines]);

  // Helper to get classes based on selection from fetched data
  const getTeacherClasses = useCallback(() => {
    // Retorna todas as turmas carregadas do Supabase, sem filtragem
    const classesToReturn = allClassesSupabase.map(cls => cls.name).sort();
    console.log('🏫 Classes sendo retornadas por getTeacherClasses:', classesToReturn); // Adicionado para depuração
    return classesToReturn;
  }, [allClassesSupabase]);

  // Função para filtrar alunos pela turma
  const getStudentsForSelectedClass = useCallback(() => {
    if (!selectedClass) return [];

    console.log('🔍 DEBUG: Filtrando alunos para a turma:', selectedClass);
    console.log('🔍 DEBUG: Total de alunos disponíveis:', allStudents.length);
    console.log('🔍 DEBUG: Primeiros 3 alunos:', allStudents.slice(0, 3));

    const targetClass = selectedClass.toLowerCase().trim();
    const filtered = allStudents.filter(student => {
      const studentClass = (student.class || '').toLowerCase().trim();
      const matches = studentClass === targetClass;
      if (matches) {
        console.log('✅ Aluno encontrado:', student.name, '- Turma:', student.class);
      }
      return matches;
    }).sort((a, b) => a.name.localeCompare(b.name));

    console.log('🔍 DEBUG: Alunos filtrados:', filtered.length);
    return filtered;
  }, [selectedClass, allStudents]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-background-dark bg-premium h-screen">
        <div className="relative">
          <div className="size-20 border-4 border-white/10 border-t-accent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-white/20 animate-pulse">cloud_download</span>
          </div>
        </div>
        <p className="mt-8 text-white/50 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">
          Sincronizando com a Nuvem
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-red-100 text-red-800 p-4">
        <p className="text-lg font-bold">Erro!</p>
        <p>{error}</p>
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={() => window.location.reload()}>
          Tentar Novamente
        </button>
      </div>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.LOGIN:
        return <Login onLogin={handleLogin} allTeachers={allTeachers} />; // Passar allTeachers
      case AppScreen.DASHBOARD:
        return (
          <Dashboard
            teacher={selectedTeacher!}
            selectedDiscipline={selectedDiscipline}
            selectedClass={selectedClass}
            onStartAttendance={handleStartAttendance}
            onViewDisciplines={handleViewDisciplines}
            onViewClasses={handleViewClasses}
            isModalOpen={showDisciplinesModal || showClassesModal}
          />
        );
      case AppScreen.ATTENDANCE:
        return (
          <Attendance
            students={getStudentsForSelectedClass()} // Usar alunos filtrados do Supabase
            teacherName={selectedTeacher?.name}
            disciplineName={selectedDiscipline?.name}
            className={selectedClass || ''}
            onFinish={handleAttendanceFinish}
            onCancel={handleGoHome}
          />
        );
      case AppScreen.SUCCESS:
        return (
          <Success
            onFinish={handleLogout}
            disciplineName={selectedDiscipline?.name}
            classNameSelected={selectedClass}
          />
        );
      default:
        return <Login onLogin={handleLogin} allTeachers={allTeachers} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {currentScreen !== AppScreen.LOGIN && currentScreen !== AppScreen.SUCCESS && (
        <Header
          teacher={selectedTeacher}
          screen={currentScreen}
          onBack={currentScreen === AppScreen.ATTENDANCE ? handleGoHome : undefined}
        />
      )}

      <main className={`flex-1 flex flex-col ${currentScreen === AppScreen.LOGIN ? '' : 'pb-6'}`}>
        {renderScreen()}
      </main>

      {/* Navigation removed */}

      {/* Modal de Disciplinas */}
      {selectedTeacher && (
        <DisciplinesModal
          teacher={selectedTeacher}
          disciplines={getTeacherDisciplines()} // Usar disciplinas filtradas
          isOpen={showDisciplinesModal}
          onClose={handleCloseDisciplines}
          onSelect={handleSelectDiscipline}
        />
      )}

      {/* Modal de Turmas */}
      {selectedTeacher && (
        <ClassesModal
          classes={getTeacherClasses()} // Usar todas as turmas do Supabase
          isOpen={showClassesModal}
          onClose={handleCloseClasses}
          onSelect={handleSelectClass}
        />
      )}
    </div>
  );
};

export default App;
