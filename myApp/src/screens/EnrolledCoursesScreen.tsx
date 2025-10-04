import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import AppHeader from "../components/header/AppHeader";
import { styles as s } from "./styles";
import { useAppTheme } from "../components/theme/ThemeProvider";
import CourseCard from "../components/CourseCard/CourseCard";
import { Course,coursesService } from "../services";


export default function EnrolledCoursesScreen() {
  const { theme } = useAppTheme();
  const isDark = theme.name === "dark";
  const hardBg = isDark ? "#000000" : "#FFFFFF";
  const hardText = isDark ? "#FFFFFF" : "#000000";
  const hardBorder = isDark ? "#FFFFFF 0px 0px 1px" : "#000000 0px 0px 0px";
  const [data, setData] = React.useState<Course[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);


  const load = React.useCallback(async (query?: string) => {
    setError(null);
    setLoading(true);

    // AbortController (evita race em buscas rápidas)
    const controller = new AbortController();
    try {
      const items = await coursesService.getEnrolled();

      setData(items);
    } catch (e: any) {
      if (e?.name !== "CanceledError" && e?.message !== "canceled") {
        setError(e?.message || "Falha ao carregar cursos.");
        setData([]); // ou mantenha o último resultado
      }
    } finally {
      setLoading(false);
    }

    // return para permitir cancelamento externo (debounce effect)
    return () => controller.abort();
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const renderItem = React.useCallback(
    ({ item }: { item: Course }) => <CourseCard item={item} showbutton={true} progress={0} />,
    []
  );

  const keyExtractor = React.useCallback((item: Course) => item.id, []);

  const EmptyState = React.useMemo(
    () => (
      <View style={ss.empty}>
        <Text style={ss.emptyText}>Não existem cursos para o usuário</Text>
      </View>
    ),
    []
  );

  return (
    <View style={[ss.container, { backgroundColor: hardBg }]}>
      <AppHeader userName="Lydia" onLogout={() => console.log("Sair")} />
<Text style={[s.sectionTitle, { color: hardText, marginTop : 12 }]}>Meus Cursos</Text>

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
            contentContainerStyle={
              data.length === 0
                ? { flexGrow: 1, marginTop: 12 }
                : { flexGrow: 1, marginTop: 24, marginBottom: 100 }
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={async () => {
                  setRefreshing(true);
                  await load();
                  setRefreshing(false);
                }}
              />
            }
          />
        )}
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
    elevation: 1,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: "#111827" },
  loader: { flex: 1, alignItems: "center", justifyContent: "center" },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 0,
  },
  emptyText: { color: "#000000", fontSize: 14 },
  errorText: { color: "#ef4444", fontSize: 14 },
});
