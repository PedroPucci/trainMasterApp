import { toApiError } from "../errors";
import { routes } from "../route";
import { Course } from "../types";
import { COURSES_MOCK, mockFilterBySearch, mockGetEnrolledCourses } from "./courses.mock";

// Por padrão, usei os MOCKS (true). 
// Se quiser testar com a API real, defina EXPO_PUBLIC_USE_MOCKS=false no .env ou altere este valor temporariamente.
const USE_MOCKS = (process.env.EXPO_PUBLIC_USE_MOCKS ?? "false").toLowerCase() === "true";
const sleep = (ms = 350) => new Promise(r => setTimeout(r, ms));

export const coursesService = {
  async getAll(): Promise<Course[]> {
    if (USE_MOCKS) {
      await sleep();
      return COURSES_MOCK;
    }
    try {
      const res = await routes.courses.getAll();
      return res.data;
    } catch (e) {
      throw toApiError(e);
    }
  },

  async getBySearch(search: string): Promise<Course[]> {
    if (USE_MOCKS) {
      await sleep();
      return mockFilterBySearch(search);
    }
    try {
      const res = await routes.courses.getBySearch(search);
      return res.data;
    } catch (e) {
      throw toApiError(e);
    }
  },

    async getEnrolled() {
    if (USE_MOCKS) {
      return mockGetEnrolledCourses();
    }
    try {
      // Quando houver endpoint real, basta trocar aqui
      const { data } = await routes.courses.getEnrolled()
      return data;
    } catch (e) {
      throw toApiError(e);
    }
  },
};
