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