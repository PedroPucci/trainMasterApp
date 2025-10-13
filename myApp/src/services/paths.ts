// Centraliza rotas do backend
export const PATHS = {
  profile: "/profile",
  login: "/auth/login",
  courses: "/courses",
  coursesSearch: "/courses/GetByName",
  courseEnrolled:"/courses/GetByUserId",
} as const;