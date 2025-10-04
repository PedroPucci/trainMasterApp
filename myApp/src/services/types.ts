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
  id: string;                 // → "Id" (PK)
  name: string;               // → "Name"
  description: string;        // → "Description"
  startDate: string;          // → "StartDate" (ISO string)
  endDate: string;            // → "EndDate" (ISO string)
  isActive: boolean;         // → "IsActive"
  userId: number;            // → "UserId" (sempre 1 no mock)
  createDate: string;        // → "CreateDate" (ISO string)
  modificationDate: string;  // → "ModificationDate" (ISO string)
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