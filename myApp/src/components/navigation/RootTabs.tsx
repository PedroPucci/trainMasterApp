import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import FooterMenu from "../footer/FooterMenu";
import HomeScreen from "../../screens/HomeScreen";
import ProfileScreen from "../../screens/ProfileScreen";

function AprendizadoScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Aprendizado</Text>
    </View>
  );
}
function BuscarScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Buscar</Text>
    </View>
  );
}
function MenuScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Menu</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function RootTabs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const items = [
    { key: "home",        label: "Home",                 icon: "home-outline",            onPress: () => {} },
    { key: "perfil",      label: "Perfil",               icon: "person-outline",          onPress: () => {} },
    { key: "aprendizado", label: "Aprendizado",          icon: "book-outline",            onPress: () => {} },
    { key: "buscar",      label: "Buscar",               icon: "search-outline",          onPress: () => {} },
    { key: "faq",         label: "Perguntas frequentes", icon: "help-circle-outline",     onPress: () => {} },
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
        <Tab.Screen
          name="Aprendizado"
          component={AprendizadoScreen}
          options={{ tabBarLabel: "Aprendizado" }}
        />
        <Tab.Screen name="Buscar" component={BuscarScreen} />
        <Tab.Screen
          name="Menu"
          component={MenuScreen}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setMenuOpen(true);
            },
          }}
          options={{
            tabBarLabel: "Menu",
          }}
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
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => {
                    setMenuOpen(false);
                    item.onPress?.();
                  }}
                >
                  <Ionicons name={item.icon as any} size={22} style={styles.rowIcon} />
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
  backdrop: {
    flex: 1,
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
  sheetTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  list: {
    backgroundColor: "transparent",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  rowIcon: {
    color: "rgba(255,255,255,0.9)",
    width: 28,
  },
  rowLabel: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 6,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
});