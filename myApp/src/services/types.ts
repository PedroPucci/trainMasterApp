// Tipos genéricos de API e modelos compartilhados

export type ApiPagination = {
  page?: number;
  pageSize?: number;
  total?: number;
};

export type ApiErrorShape = {
  message: string;
  status?: number;
  code?: string;
  details?: any;
};

// ===== Domínio Courses =====
export type Course = {
  id: string;
  title: string;
  author: string;
  dateISO: string;
  description: string;
  thumbnailUrl?: string;
  duration?: string; // ex: "20:20"
  progressPercentage?:number|null;
};

export type ProfilePayload = {
  FullName: string;
  Email: string;
  DateOfBirth: string;
  Cpf: string;
  Marital: number;
  Gender: number;
  UserId: number;
};

export type LoginPayload = { cpf: string; password: string };


export type Lesson = {
  id: string;
  title: string;
  completed?: boolean; // ✔️
  progressPercentage?: number; // 0–100 (p/ aulas em andamento)
};

export type ModuleBlock = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type CourseDetail = {
  id: string;
  title: string;
  exam: ModuleBlock;      // “Prova”
  exercises: ModuleBlock[]; // “Exercícios”
  completedModules: number;
  totalModules: number;
};
