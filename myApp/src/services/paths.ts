// Centraliza rotas do backend
export const PATHS = {
  profile: "/profile",
  login: "/login",
  courses: "/courses",
  coursesSearch: "/courses/search", // GET ?name=
  courseEnrolled:"/courses/enrolled",
} as const;