import React, { useState } from "react";
import { View, Text, Modal, Pressable, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation, NavigatorScreenParams } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import FooterMenu from "../footer/FooterMenu";
import HomeScreen from "../../screens/HomeScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import SearchScreen from "../../screens/SearchScreen";
import EnrolledCoursesScreen from "../../screens/EnrolledCoursesScreen";
import CourseDetailScreen from "../../screens/CourseDetailScreen"; // 👈 importa a tela de detalhes
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type TabParamList = {
  Inicio: undefined;
  Perfil: undefined;
  Aprendizado: undefined;
  Buscar: undefined;
  Menu: undefined;
};

type DrawerParamList = {
  HomeTabs: NavigatorScreenParams<TabParamList>;
  Department: undefined;
  FaqScreen: undefined;
  ExamOverView: undefined;
};

type IconName = React.ComponentProps<typeof Ionicons>["name"];

/* 👇 Cria um stack só para a aba de Aprendizado */
const AprendizadoStackNav = createNativeStackNavigator();

function AprendizadoStack() {
  return (
    <AprendizadoStackNav.Navigator screenOptions={{ headerShown: false }}>
      <AprendizadoStackNav.Screen
        name="AprendizadoHome"
        component={EnrolledCoursesScreen}
      />
      <AprendizadoStackNav.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
      />
    </AprendizadoStackNav.Navigator>
  );
}

/* 👇 Pode fazer o mesmo se quiser para a aba Buscar */
const BuscarStackNav = createNativeStackNavigator();

function BuscarStack() {
  return (
    <BuscarStackNav.Navigator screenOptions={{ headerShown: false }}>
      <BuscarStackNav.Screen name="BuscarHome" component={SearchScreen} />
      <BuscarStackNav.Screen name="CourseDetail" component={CourseDetailScreen} />
    </BuscarStackNav.Navigator>
  );
}

function MenuScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Menu</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator<TabParamList>();

export default function RootTabs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerNav = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const goTab = (tab: keyof TabParamList) => () => {
    setMenuOpen(false);
    drawerNav.navigate("HomeTabs", { screen: tab });
  };

  const items: { key: string; label: string; icon: IconName; onPress: () => void }[] = [
    { key: "home", label: "Home", icon: "home-outline", onPress: goTab("Inicio") },
    { key: "perfil", label: "Perfil", icon: "person-outline", onPress: goTab("Perfil") },
    { key: "aprendizado", label: "Aprendizado", icon: "book-outline", onPress: goTab("Aprendizado") },
    { key: "buscar", label: "Buscar", icon: "search-outline", onPress: goTab("Buscar") },
    { key: "faq", label: "Perguntas frequentes", icon: "help-circle-outline", onPress: () => { setMenuOpen(false); drawerNav.navigate("FaqScreen"); } },
    { key: "exam", label: "Provas", icon: "reader-outline", onPress: () => { setMenuOpen(false); drawerNav.navigate("ExamOverView"); } },
    { key: "departamento", label: "Departamento", icon: "business-outline", onPress: () => { setMenuOpen(false); drawerNav.navigate("Department"); } },
  ];

  return (
    <>
      <Tab.Navigator
        initialRouteName="Inicio"
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <FooterMenu {...props} />}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
        {/* 👇 Usa o stack no lugar da tela direta */}
        <Tab.Screen
          name="Aprendizado"
          component={AprendizadoStack}
          options={{ tabBarLabel: "Aprendizado" }}
        />
        <Tab.Screen
          name="Buscar"
          component={BuscarStack}
        />
        <Tab.Screen
          name="Menu"
          component={MenuScreen}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setMenuOpen(true);
            },
          }}
          options={{ tabBarLabel: "Menu" }}
        />
      </Tab.Navigator>

      <Modal
        visible={menuOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setMenuOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setMenuOpen(false)} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.sheetTitle}>Menu</Text>

          <View style={styles.list}>
            {items.map((item, idx) => (
              <View key={item.key}>
                <TouchableOpacity style={styles.row} onPress={item.onPress}>
                  <Ionicons name={item.icon} size={22} style={styles.rowIcon} />
                  <Text style={styles.rowLabel}>{item.label}</Text>
                </TouchableOpacity>
                {idx < items.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)" },
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
  sheetTitle: { color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 8 },
  list: { backgroundColor: "transparent" },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 14 },
  rowIcon: { color: "rgba(255,255,255,0.9)", width: 28 },
  rowLabel: { color: "#fff", fontSize: 16, marginLeft: 6 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: "rgba(255,255,255,0.15)" },
});
