import React from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppHeader from "../components/header/AppHeader";
import type { CourseDetail, ModuleBlock, Lesson } from "../services";

// MOCK rápido (pode vir do seu service depois)
const MOCK: CourseDetail = {
  id: "1",
  title: "Fundamentos da Web",
  exam: {
    id: "exam-m1",
    title: "Módulo 1 – Introdução",
    lessons: [
      { id: "ex-1", title: "Prova 1", completed: true },
      { id: "ex-2", title: "Prova 2" },
    ],
  },
  exercises: [
    {
      id: "m1",
      title: "Módulo 1 – Introdução",
      lessons: [
        { id: "a1", title: "Aula 1: O que é Web?", completed: true },
        { id: "a2", title: "Aula 2: Cliente e Servidor", progressPercentage: 30 },
      ],
    },
    {
      id: "m2",
      title: "Módulo 2 – HTML Básico",
      lessons: [
        { id: "a3", title: "Aula 3: Estrutura HTML" },
        { id: "a4", title: "Aula 4: Tags principais" },
      ],
    },
    {
      id: "m3",
      title: "Módulo 3 – Exercícios práticos",
      lessons: [{ id: "q1", title: "Quiz 1: HTML Básico" }],
    },
  ],
  completedModules: 3,
  totalModules: 5,
};

export default function CourseDetailScreen() {
  const course = MOCK;

  return (
    <View style={{ flex: 1, backgroundColor: "#EFF4F3" }}>
      <AppHeader userName="Lydia" onLogout={() => {}} />

      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Título */}
        <Text style={s.title}>{course.title}</Text>

        {/* Prova */}
        <Text style={s.sectionTitle}>Prova</Text>
        <View style={s.card}>
          <Text style={s.cardTitle}>{course.exam.title}</Text>

          {course.exam.lessons.map((l) => (
            <Row key={l.id} lesson={l} />
          ))}

          <Pressable style={s.cta} onPress={() => {}}>
            <Text style={s.ctaText}>Entrar</Text>
          </Pressable>
        </View>

        {/* Exercícios */}
        <Text style={[s.sectionTitle, { marginTop: 16 }]}>Exercícios</Text>
        <Text style={s.subtitle}>
          {course.completedModules} de {course.totalModules} módulos concluídos
        </Text>

        {course.exercises.map((m, idx) => (
          <View key={m.id} style={[s.card, idx > 0 && s.cardSeparated]}>
            <Text style={s.cardTitle}>{m.title}</Text>
            {m.lessons.map((l) => (
              <Row key={l.id} lesson={l} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function Row({ lesson }: { lesson: Lesson }) {
  const pct =
    typeof lesson.progressPercentage === "number" && !isNaN(lesson.progressPercentage)
      ? Math.min(100, Math.max(0, lesson.progressPercentage))
      : null;

  const inProgress = pct !== null && pct > 0 && pct < 100;

  return (
    <View style={s.row}>
      <Ionicons
        name="play-circle"
        size={16}
        color={lesson.completed ? "#22c55e" : "#64748b"}
        style={{ marginRight: 6 }}
      />
      <Text style={s.rowText}>
        {lesson.title}
        {lesson.completed ? " (✓)" : ""}
        {inProgress ? `  (${pct}%)` : ""}
      </Text>

      {inProgress && (
        <View style={s.progressWrap}>
          <View style={[s.progressBar, pct !== null && { width: `${pct}%` }]} />
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  subtitle: {
    marginLeft: 16,
    marginBottom: 8,
    fontWeight: "700",
    color: "#111827",
  },
  card: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  cardSeparated: {
    borderTopWidth: 0,
    borderTopColor: "#e9d8fd", // lilás claro
    marginTop: 12,
  },
  cardTitle: {
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  rowText: {
    flex: 1,
    color: "#111827",
    fontSize: 14,
  },
  progressWrap: {
    height: 6,
    width: 70,
    backgroundColor: "#e5e7eb",
    borderRadius: 8,
    overflow: "hidden",
    marginLeft: 8,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#22c55e",
  },
  cta: {
    alignSelf: "flex-end",
    backgroundColor: "#22c55e",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 8,
  },
  ctaText: { color: "#fff", fontWeight: "800" },
});