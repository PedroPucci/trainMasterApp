import { api } from "./api";
import { PATHS } from "./paths";
import type { Course, LoginPayload, ProfilePayload } from "./types";



export const routes = {
  profile: {
    add: (payload: ProfilePayload) =>
      api.post(`${PATHS.profile}/adicionarPerfil`, payload),
    update: (id: number, payload: ProfilePayload) =>
      api.put(`${PATHS.profile}/${id}`, payload),
    getById: (id: number) => api.get(`${PATHS.profile}/${id}`),
  },

  auth: {
    login: (payload: LoginPayload) => api.post(`${PATHS.login}/login`, payload),
    forgotPassword: (payload: { email: string; newPassword: string }) =>
      api.post(`${PATHS.login}/ForgotPassword`, payload),
  },

  courses: {
    getAll: () => api.get<Course[]>(PATHS.courses),
    getBySearch: (search: string) => {
      const qs = new URLSearchParams({ name: search }).toString();
      return api.get<Course[]>(`${PATHS.coursesSearch}?${qs}`);
    },
    getEnrolled: () => api.get<Course[]>(PATHS.courseEnrolled),
  },
};

export type Routes = typeof routes;
