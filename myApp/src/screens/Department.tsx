import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  UIManager,
  Platform,
  Modal,
  Pressable,
  TouchableOpacity,
  LayoutAnimation,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import AppHeader from "../components/header/AppHeader";
import { useAppTheme } from "../components/theme/ThemeProvider";
import { styles as s } from "./styles";
import { BASE_URL, fetchComTimeout } from "../components/routes/apiConfig";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { authService } from "../services/auth/auth.service";
import { useNavigation, NavigatorScreenParams } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type TabParamList = {
  Inicio: undefined;
  Perfil: undefined;
  Aprendizado: undefined;
  Buscar: undefined;
  Menu: undefined;
};

type DrawerParamList = {
  HomeTabs: NavigatorScreenParams<TabParamList>;
  FaqScreen: undefined;
};

const USER_ID = authService.getUserId();

type DepartmentProps = {
  department: string;
  team: string;
  manager: string;
};

export default function DepartmentScreen() {
  const { theme } = useAppTheme();
  const isDark = theme.name === "dark";
  const hardBg = isDark ? "#000000" : "#FFFFFF";
  const hardText = isDark ? "#FFFFFF" : "#000000";
  const hardMuted = isDark ? "#A3A3A3" : "#666666";
  const hardBorder = isDark ? "#222222" : "#E5E5E5";

  const insets = useSafeAreaInsets();
  const drawerNav = useNavigation<DrawerNavigationProp<DrawerParamList>>();
  const [departmentInfo, setDepartmentInfo] = React.useState<DepartmentProps | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [openId, setOpenId] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggle = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenId((prev) => (prev === id ? null : id));
  };

  const goTab = (screen: keyof TabParamList) => {
    setMenuOpen(false);
    drawerNav.navigate("HomeTabs", { screen });
  };

  async function loadDepartment() {
    try {
      const url = `${BASE_URL}/departments/by-user/${USER_ID}`;
      const res = await fetchComTimeout(url, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      const raw = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(raw);
      } catch {}

      if (!res.ok) {
        const msg = data?.message || raw || `HTTP ${res.status}`;
        Alert.alert("Erro", msg);
        return;
      }

      const info: DepartmentProps = {
        department: data.departmentName ?? "Não informado",
        team: data.teamName ?? "Não informado",
        manager: data.managerName ?? "Não informado",
      };
      setDepartmentInfo(info);
    } catch (e: any) {
      const msg =
        e?.message === "Tempo limite excedido"
          ? "Conexão lenta/instável. Tente novamente."
          : "Não foi possível carregar as informações.";
      Alert.alert("Erro de conexão", msg);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    loadDepartment();
  }, []);

  return (
    <>
      <AppHeader userName="Lydia" onLogout={() => console.log("Sair")} />

      <View style={[s.container, { backgroundColor: hardBg }]}>
        <ScrollView
          contentContainerStyle={[s.body, s.scrollContent]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={[s.sectionTitle, { color: hardText, textAlign: "center" }]}>
            Departamento & Time
          </Text>

          {loading ? (
            <View style={{ marginTop: 32 }}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          ) : departmentInfo ? (
            <View
              style={[
                s.card,
                {
                  backgroundColor: hardBg,
                  borderColor: hardBorder,
                  marginTop: 16,
                },
              ]}
            >
              <Text style={[s.cardTitle, { color: hardText }]}>
                Departamento:{" "}
                <Text style={{ color: hardMuted }}>{departmentInfo.department}</Text>
              </Text>
              <Text style={[s.cardTitle, { color: hardText }]}>
                Time: <Text style={{ color: hardMuted }}>{departmentInfo.team}</Text>
              </Text>
              <Text style={[s.cardTitle, { color: hardText }]}>
                Gerente:{" "}
                <Text style={{ color: hardMuted }}>{departmentInfo.manager}</Text>
              </Text>
            </View>
          ) : (
            <View style={{ marginTop: 32, alignItems: "center" }}>
              <Text
                style={[s.cardSubtitle, { color: hardMuted, textAlign: "center" }]}
              >
                Aguarde o RH cadastrar você no departamento e time
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Footer */}
        <View
          style={[
            footer.wrapper,
            { paddingBottom: Math.max(insets.bottom + 8, 14) },
          ]}
        >
          <FooterItem icon="home" label="Início" onPress={() => goTab("Inicio")} />
          <FooterItem icon="person" label="Perfil" onPress={() => goTab("Perfil")} />
          <FooterItem
            icon="book"
            label="Meu aprendizado"
            onPress={() => goTab("Aprendizado")}
          />
          <FooterItem icon="search" label="Buscar" onPress={() => goTab("Buscar")} />
          <FooterItem icon="menu" label="Menu" onPress={() => setMenuOpen(true)} />
        </View>

        {/* Modal */}
        <Modal
          visible={menuOpen}
          animationType="slide"
          transparent
          onRequestClose={() => setMenuOpen(false)}
        >
          <View style={sheet.container}>
            <Pressable style={sheet.backdrop} onPress={() => setMenuOpen(false)} />
            <View style={sheet.sheet}>
              <View style={sheet.handle} />
              <Text style={sheet.title}>Menu</Text>

              <View>
                <MenuRow
                  icon="home-outline"
                  label="Home"
                  onPress={() => goTab("Inicio")}
                />
                <MenuRow
                  icon="person-outline"
                  label="Perfil"
                  onPress={() => goTab("Perfil")}
                />
                <MenuRow
                  icon="book-outline"
                  label="Meu aprendizado"
                  onPress={() => goTab("Aprendizado")}
                />
                <MenuRow
                  icon="search-outline"
                  label="Buscar"
                  onPress={() => goTab("Buscar")}
                />
                <MenuRow
                  icon="help-circle-outline"
                  label="Perguntas frequentes"
                  onPress={() => setMenuOpen(false)}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

function MenuRow({
  icon,
  label,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  onPress: () => void;
}) {
  return (
    <>
      <TouchableOpacity style={sheet.row} onPress={onPress}>
        <Ionicons name={icon} size={22} style={sheet.rowIcon} />
        <Text style={sheet.rowLabel}>{label}</Text>
      </TouchableOpacity>
      <View style={sheet.divider} />
    </>
  );
}

function FooterItem({
  icon,
  label,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={footer.item}
      android_ripple={{ color: "rgba(255,255,255,0.15)" }}
    >
      <Ionicons name={icon} size={28} color="#FFFFFF" />
      <Text style={footer.label} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const sheet = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-end" },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheet: {
    backgroundColor: "#1f1f1f",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 16,
    minHeight: 360,
    maxHeight: "70%",
  },
  handle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginBottom: 8,
  },
  title: { color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 8 },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 14 },
  rowIcon: { color: "rgba(255,255,255,0.9)", width: 28 },
  rowLabel: { color: "#fff", fontSize: 16, marginLeft: 6 },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
});

const footer = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#50C2C9",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 12,
  },
  item: { alignItems: "center", justifyContent: "center", flex: 1 },
  label: { color: "#FFFFFF", fontSize: 12, marginTop: 2, fontWeight: "700" },
});
