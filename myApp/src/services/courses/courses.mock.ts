import type { Course } from "../types";

// Mock básico; você pode evoluir para JSON separado.
export const COURSES_MOCK: Course[] = [
    // Java
  {
    id: "1",
    title: "Fundamentos de Java",
    author: "Ana Souza",
    dateISO: "2025-10-01",
    description: "Aprenda os conceitos básicos da linguagem Java e sua aplicação em projetos reais.",
    thumbnailUrl: "https://placehold.co/280x160?text=Java",
    duration: "15:30",
  },
  {
    id: "2",
    title: "Java Avançado",
    author: "Carlos Pereira",
    dateISO: "2025-09-15",
    description: "Aprofunde-se em tópicos avançados de Java, incluindo Streams, Lambdas e Spring Boot.",
    thumbnailUrl: "https://placehold.co/280x160?text=Java+Avançado",
    duration: "22:10",
  },

  // Gerência de projeto
  {
    id: "3",
    title: "Introdução à Gerência de Projetos",
    author: "Mariana Costa",
    dateISO: "2025-08-12",
    description: "Conceitos fundamentais de gestão de projetos, metodologias tradicionais e ágeis.",
    thumbnailUrl: "https://placehold.co/280x160?text=PM",
    duration: "18:45",
  },
  {
    id: "4",
    title: "Scrum na Prática",
    author: "João Silva",
    dateISO: "2025-07-20",
    description: "Aplicação prática de Scrum em equipes reais. Papéis, cerimônias e artefatos.",
    thumbnailUrl: "https://placehold.co/280x160?text=Scrum",
    duration: "12:05",
  },

  // C#
  {
    id: "5",
    title: "Fundamentos de C#",
    author: "Rodrigo Branas",
    dateISO: "2025-06-10",
    description: "Aprenda a linguagem C# do zero e desenvolva seus primeiros programas .NET.",
    thumbnailUrl: "https://placehold.co/280x160?text=Csharp",
    duration: "19:00",
  },
  {
    id: "6",
    title: "C# Avançado com .NET",
    author: "Patrícia Lima",
    dateISO: "2025-05-28",
    description: "Explore tópicos avançados de C#, LINQ, async/await e boas práticas em aplicações .NET.",
    thumbnailUrl: "https://placehold.co/280x160?text=Csharp+Avançado",
    duration: "21:15",
  },

  // UI/UX
  {
    id: "7",
    title: "Fundamentos de UI/UX Design",
    author: "Laura Nascimento",
    dateISO: "2025-04-02",
    description: "Entenda princípios de design de interface e experiência do usuário.",
    thumbnailUrl: "https://placehold.co/280x160?text=UI%2FUX",
    duration: "16:40",
  },
  {
    id: "8",
    title: "UI Avançado com Figma",
    author: "Pedro Martins",
    dateISO: "2025-03-10",
    description: "Aprenda técnicas avançadas de prototipação e design no Figma.",
    thumbnailUrl: "https://placehold.co/280x160?text=Figma+UI",
    duration: "20:10",
  },
];

export function mockFilterBySearch(q?: string) {
  if (!q?.trim()) return COURSES_MOCK;
  const s = q.toLowerCase();
  return COURSES_MOCK.filter(
    (c) =>
      c.title.toLowerCase().includes(s) ||
      c.author.toLowerCase().includes(s) ||
      c.description.toLowerCase().includes(s)
  );
}
