import { View, Text, StyleSheet, ScrollView } from "react-native";
import AppHeader from "../components/header/AppHeader";

export default function HomeScreen() {
  return (
    <View style={s.container}>
      <AppHeader
        userName="Lydia"
        onLogout={() => console.log("Sair")}
      />
      <ScrollView contentContainerStyle={s.body}>
        <Text>Lembretes:</Text>
        {/* ...seu conteúdo */}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F4F3" },
  body: { padding: 16, paddingTop: 12 },
});