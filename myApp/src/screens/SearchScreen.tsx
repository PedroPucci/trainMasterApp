import * as React from "react";
import { View, Text, ScrollView, StyleSheet, TextInput, ActivityIndicator, FlatList, RefreshControl } from "react-native";
import AppHeader from "../components/header/AppHeader";
import { styles as s } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "../components/theme/ThemeProvider";
import CourseCard from "../components/CourseCard/CourseCard";

export type Course = {
  id: string;
  title: string;
  author: string;
  dateISO: string;      // ex: "2021-10-20"
  description: string;
  thumbnailUrl?: string;
  duration?: string;    // ex: "20:20"
};

export default function SearchScreen() {
  const today = new Date().toISOString().slice(0, 10);
  const [selected, setSelected] = React.useState<string>(today);
  const { theme } = useAppTheme();
  const isDark = theme.name === "dark";
  const hardBg = isDark ? "#000000" : "#FFFFFF";
  const hardText = isDark ? "#FFFFFF" : "#000000";
  const hardMuted = isDark ? "#A3A3A3" : "#666666";
  const hardBorder = isDark ? "#222222" : "#E5E5E5";
  const primary = theme.colors.primary;

  const [q, setQ] = React.useState("");
  const [data, setData] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const MOCK_courses = [
    {
      id: "1",
      title: "Fundamentos Web",
      author: "Rodrigo Branas",
      dateISO: "2021-10-20",
      description: "Venha aprender sobre os conceitos básicos da Web",
      thumbnailUrl: "https://placehold.co/280x160?text=thumb",
      duration: "20:20"
    },
    {
      id: "2",
      title: "Fundamentos Web",
      author: "Rodrigo Branas",
      dateISO: "2021-10-20",
      description: "Venha aprender sobre os conceitos básicos da Web",
      thumbnailUrl: "https://placehold.co/280x160?text=thumb",
      duration: "20:20"
    },
    {
      id: "3",
      title: "Fundamentos Web",
      author: "Rodrigo Branas",
      dateISO: "2021-10-20",
      description: "Venha aprender sobre os conceitos básicos da Web",
      thumbnailUrl: "https://placehold.co/280x160?text=thumb",
      duration: "20:20"
    },
    {
      id: "4",
      title: "Fundamentos Web",
      author: "Rodrigo Branas",
      dateISO: "2021-10-20",
      description: "Venha aprender sobre os conceitos básicos da Web",
      thumbnailUrl: "https://placehold.co/280x160?text=thumb",
      duration: "20:20"
    },
    {
      id: "5",
      title: "Fundamentos Web",
      author: "Rodrigo Branas",
      dateISO: "2021-10-20",
      description: "Venha aprender sobre os conceitos básicos da Web",
      thumbnailUrl: "https://placehold.co/280x160?text=thumb",
      duration: "20:20"
    }
  ]

  const load = React.useCallback(async (query?: string) => {
    setError(null);
    setLoading(true);
    try {
      const res = null; //await fetchCourses(query);
      setData(MOCK_courses);
    } catch (e: any) {
      setError("Falha ao carregar cursos.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { load(); }, [load]);
  // debounce simples de 350ms para busca
  React.useEffect(() => {
    const t = setTimeout(() => load(q), 350);
    return () => clearTimeout(t);
  }, [q, load]);

  const renderItem = React.useCallback(({ item }: { item: Course }) => (
    <CourseCard item={item} />
  ), []);

  const keyExtractor = React.useCallback((item: Course) => item.id, []);

  const EmptyState = React.useMemo(() => (
    <View style={ss.empty}>
      <Text style={ss.emptyText}>Não existem cursos cadastrados</Text>
    </View>
  ), []);

  return (
    <View style={[ss.container, { backgroundColor: hardBg }]}>
      <AppHeader userName="Lydia" onLogout={() => console.log("Sair")} />

      <View style={ss.content}>
        <View style={ss.searchBox}>
          <Text style={ss.searchIcon}><Ionicons name="search" size={32} color="black" /></Text>
          <TextInput
            placeholder="Pesquisar cursos"
            placeholderTextColor="#000000"
            value={q}
            onChangeText={setQ}
            style={ss.searchInput}
            returnKeyType="search"
          />
        </View>
        {loading ? (
          <View style={ss.loader}>
            <ActivityIndicator size="large" />
          </View>
        ) : error ? (
          <View style={ss.empty}>
            <Text style={s.errorText}>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ListEmptyComponent={EmptyState}
            contentContainerStyle={data.length === 0 ? { flexGrow: 1, marginTop: 12 } : { flexGrow: 1, marginTop: 24 , marginBottom: 100 } }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={async () => {
                  setRefreshing(true);
                  await load(q);
                  setRefreshing(false);
                }}
              />
            }
          />
        )}
      </View>
    </View>
  );
}

const BG = "#626464ff";

const ss = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  content: { flex: 1, marginTop: 24 },
  searchBox: {
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingHorizontal: 12,
    height: 44,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: "#111827" },
  loader: { flex: 1, alignItems: "center", justifyContent: "center" },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 0
  },
  emptyText: { color: "#000000", fontSize: 14 },
  errorText: { color: "#ef4444", fontSize: 14 }
});