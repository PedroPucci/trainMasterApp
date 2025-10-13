import React from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import QuestionRunner, { Question } from "../components/QuestionRunner/QuestionRunner";
import { ReviewParams } from "./ReviewAnswersScreen";
import { AprendizadoStackParamList } from "../components/navigation/RootTabs";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

/** ===========================
 * Params aceitos pela tela
 * =========================== */
export type QuestionFlowParams = {
  mode: "exam" | "exercise";     // define comportamento (single x multiple)
  title?: string;                // título da tela
  source?: "javaExam" | "javaExercises"; // chave de mock interno
  questions?: Question[];        // opcional: pode passar dataset pronto por navegação
  startIndex?: number;           // índice inicial (default 0)
};

/** ===========================
 * Mocks internos opcionais
 * =========================== */
// EXAME – single choice Java
const JAVA_EXAM: Question[] = [
  {
    id: "q1",
    statement: "Qual das opções representa corretamente o método principal em um programa Java?",
    imageUrl: "https://wallpapers.com/images/hd/java-programming-language-logo-transparent-25l46zqv57xeywg7-25l46zqv57xeywg7.jpg",
    options: [
      { id: "a", text: "public static int main(String args[])" },
      { id: "b", text: "public static void main(String[] args)" },
      { id: "c", text: "public void main(String args[])" },
      { id: "d", text: "static public void main()" },
    ],
  },
  {
    id: "q2",
    statement: "O que é a JVM (Java Virtual Machine)?",
    options: [
      { id: "a", text: "Um compilador que converte código Java em linguagem de máquina" },
      { id: "b", text: "Um interpretador responsável por executar bytecode Java" },
      { id: "c", text: "Um IDE usado para escrever programas em Java" },
      { id: "d", text: "Uma biblioteca padrão do Java" },
    ],
  },
  {
    id: "q3",
    statement: "Qual palavra-chave é usada para herança em Java?",
    options: [
      { id: "a", text: "extends" },
      { id: "b", text: "implements" },
      { id: "c", text: "inherits" },
      { id: "d", text: "super" },
    ],
  },
  {
    id: "q4",
    statement: "Sobre tipos primitivos em Java, é correto afirmar que:",
    options: [
      { id: "a", text: "String é um tipo primitivo" },
      { id: "b", text: "boolean pode armazenar apenas true ou false" },
      { id: "c", text: "float e double têm a mesma precisão" },
      { id: "d", text: "char é usado apenas para números inteiros" },
    ],
  },
  {
    id: "q5",
    statement: "O que acontece quando ocorre uma exceção não tratada em Java?",
    options: [
      { id: "a", text: "O programa ignora e continua normalmente" },
      { id: "b", text: "A JVM encerra o programa exibindo um stack trace" },
      { id: "c", text: "A exceção é automaticamente tratada pelo compilador" },
      { id: "d", text: "O programa entra em loop infinito" },
    ],
  },
].map(q => ({ ...q, multiple: false })); // exam = single choice

// EXERCÍCIOS – multiple choice (exemplo simples reaproveitando enunciados)
const JAVA_EXERCISES: Question[] = JAVA_EXAM.map(q => ({ ...q, multiple: true }));

/** Resolve dataset final: por 'source' ou por 'questions' */
function resolveQuestions(source?: QuestionFlowParams["source"], override?: Question[]) {
  if (override && override.length) return override;
  switch (source) {
    case "javaExam": return JAVA_EXAM;
    case "javaExercises": return JAVA_EXERCISES;
    default: return JAVA_EXAM; // fallback
  }
}
type Nav = NativeStackNavigationProp<AprendizadoStackParamList, "QuestionFlow">;
export default function QuestionFlowScreen() {
  const nav = useNavigation<Nav>();
  const route = useRoute<RouteProp<Record<string, QuestionFlowParams>, string>>();
  const {
    mode = "exam",
    title,
    source = "javaExam",
    questions: override,
    startIndex = 0,
  } = route.params ?? {};

  const QUESTIONS = React.useMemo(() => resolveQuestions(source, override), [source, override]);
  const [index, setIndex] = React.useState(Math.max(0, Math.min(startIndex, QUESTIONS.length - 1)));
  const [answers, setAnswers] = React.useState<Record<string, string[]>>({});

  const total = QUESTIONS.length;
  const question = QUESTIONS[index];
  const selected = answers[question.id] ?? [];

  const isFirst = index === 0;
  const isLast = index === total - 1;

  const setSelectedForCurrent = (ids: string[]) => {
    setAnswers(prev => ({ ...prev, [question.id]: ids }));
  };

  const onPrev = () => setIndex(i => Math.max(0, i - 1));
   const onNext = () => {
    if (isLast) {
      nav.navigate("ReviewAnswers", {
        mode,
        title: title ?? (mode === "exam" ? "Prova" : "Questões"),
        questions: QUESTIONS,
        answers,
      } satisfies ReviewParams);
      return;
    }
    setIndex(i => Math.min(total - 1, i + 1));
  };

  const nextDisabled = selected.length === 0;

  return (
    <QuestionRunner
      mode={mode}
      title={title ?? (mode === "exam" ? "Prova" : "Questões")}
      progress={{ current: index + 1, total }}
      question={question}
      selected={selected}
      onChangeSelected={setSelectedForCurrent}
      onPrev={onPrev}
      onNext={onNext}
      prevDisabled={isFirst}
      nextDisabled={nextDisabled}
      nextLabel={isLast ? "Verificar" : "Próximo"}
      hidePrev={false} // mude para isFirst se quiser esconder o Anterior na primeira
    />
  );
}
