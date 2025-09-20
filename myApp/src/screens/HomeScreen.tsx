import * as React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import AppHeader from "../components/header/AppHeader";
import { styles as s } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Calendar, LocaleConfig } from "react-native-calendars";

LocaleConfig.locales["pt-br"] = {
  monthNames: [
    "janeiro","fevereiro","março","abril","maio","junho",
    "julho","agosto","setembro","outubro","novembro","dezembro"
  ],
  monthNamesShort: [
    "jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"
  ],
  dayNames: [
    "domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"
  ],
  dayNamesShort: ["dom","seg","ter","qua","qui","sex","sáb"],
  today: "Hoje",
};
LocaleConfig.defaultLocale = "pt-br";

const reminders = [
  { title: "Progresso: 65% das atividades feitas", subtitle: "Curso: Fundamentos de React" },
  { title: "Progresso: 65% do curso", subtitle: "Curso: Fundamentos de React" },
];

type BadgeItem = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  color: string;
};

const badges: BadgeItem[] = [
  { icon: "ribbon",                title: "Concluiu 10 cursos",        color: "#D9A520" },
  { icon: "flame",                 title: "Sequência de 14 dias",      color: "#FF6B3D" },
  { icon: "trophy",                title: "Top 3% da turma",           color: "#FFB020" },
  { icon: "checkmark-done-circle", title: "120 atividades feitas",     color: "#34C759" },
  { icon: "school",                title: "3 certificações",           color: "#4F7CAC" },
];

function BadgeCell({ icon, title, color }: BadgeItem) {
  const [visible, setVisible] = React.useState(false);

  return (
    <View style={s.badgeCell}>
      <Pressable
        onPressIn={() => setVisible(true)}
        onPressOut={() => setVisible(false)}
        onLongPress={() => setVisible(true)}
        delayLongPress={150}
        accessibilityLabel={title}
        accessibilityHint="Toque e segure para ver a dica"
        style={s.badgePressable}
      >
        <View style={s.badgeMedal}>
          <Ionicons name={icon} size={28} color={color} />
        </View>
      </Pressable>

      {visible && (
        <View style={s.tooltip} pointerEvents="none">
          <Text style={s.tooltipText}>{title}</Text>
          <View style={s.tooltipCaret} />
        </View>
      )}
    </View>
  );
}

export default function HomeScreen() {
  const today = new Date().toISOString().slice(0, 10);
  const [selected, setSelected] = React.useState<string>(today);

  return (
    <View style={s.container}>
      <AppHeader userName="Lydia" onLogout={() => console.log("Sair")} />

      <ScrollView
        contentContainerStyle={[s.body, s.scrollContent]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        <Text style={s.sectionTitle}>Lembretes:</Text>
        {reminders.map((r, i) => (
          <View key={i} style={s.card}>
            <Text style={s.cardTitle}>{r.title}</Text>
            <Text style={s.cardSubtitle}>{r.subtitle}</Text>
          </View>
        ))}

        <Text style={[s.sectionTitle, { marginTop: 8 }]}>Conquistas</Text>
        <View style={s.badgesGrid}>
          {badges.map((b, i) => (
            <BadgeCell key={`${b.title}-${i}`} {...b} />
          ))}
        </View>

        <Text style={[s.sectionTitle, { marginTop: 8 }]}>Atenção às datas</Text>
        <View style={s.calendarCard}>
          <Calendar
            onDayPress={(day) => setSelected(day.dateString)}
            markedDates={{
              [selected]: {
                selected: true,
                selectedColor: "#2A9D8F",
                selectedTextColor: "#ffffff",
              },
            }}
            theme={{
              todayTextColor: "#2A9D8F",
              arrowColor: "#2A9D8F",
              monthTextColor: "#0F1E25",
              textMonthFontWeight: "800",
              textDayFontWeight: "600",
              textDayHeaderFontWeight: "700",
            }}
            style={s.calendar}
          />
        </View>

        <View style={s.legendRow}>
         <View style={s.legendItem}>
          <View style={[s.colorDot, { backgroundColor: "red" }]} />
          <Text style={s.legendText}>Prazo final para avaliação</Text>
          <View style={[s.colorDot, { backgroundColor: "gold" }]} />
          <Text style={s.legendText}>Prazo final para atividades</Text>
         </View>
        </View>
      </ScrollView>
    </View>
  );
}