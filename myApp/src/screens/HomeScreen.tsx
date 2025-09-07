import { View, Text, ScrollView } from "react-native";
import AppHeader from "../components/header/AppHeader";
import { styles as s } from "./styles";

const reminders = [
  {
    title: "Progresso geral: 65% das atividades feitas",
    subtitle: "Curso: Fundamentos de Banco de Dados",
  },
  {
    title: "Progresso geral: 65% do curso",
    subtitle: "Curso: Fundamentos de React",
  },
];

export default function HomeScreen() {
  return (
    <View style={s.container}>
      <AppHeader userName="Lydia" onLogout={() => console.log("Sair")} />

      <ScrollView contentContainerStyle={s.body}>
        <Text style={s.sectionTitle}>Lembretes:</Text>

        {reminders.map((r, i) => (
          <View key={i} style={s.card}>
            <Text style={s.cardTitle}>{r.title}</Text>
            <Text style={s.cardSubtitle}>{r.subtitle}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}