
export enum AppScreen {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  ATTENDANCE = 'ATTENDANCE',
  SUCCESS = 'SUCCESS'
}

export interface Discipline {
  id: string;
  name: string;
  classes: string[];
  totalHours: number;
  teacherId?: string; // Adicionado para filtragem
}

export interface Teacher {
  id: string;
  name: string;
  avatar: string;
}

export interface Student {
  id: string;
  name: string;
  photoUrl: string;
  class?: string; // Turma do aluno
  status?: 'present' | 'absent';
}

export interface ClassData {
  id: string;
  name: string;
  totalStudents: number;
  students: Student[];
}
