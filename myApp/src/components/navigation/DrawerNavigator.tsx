// import { createDrawerNavigator } from "@react-navigation/drawer";
// import RootTabs from "./RootTabs";
// import ProfileScreen from "../../screens/ProfileScreen";
// import LoginScreen from "../../screens/LoginScreen";

// const Drawer = createDrawerNavigator();

// export default function DrawerNavigator() {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//         drawerType: "front",
//       }}
//     >
//       <Drawer.Screen name="HomeTabs" component={RootTabs} options={{ title: "Início" }} />
//       <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: "Meu Perfil" }} />
//       <Drawer.Screen name="Login" component={LoginScreen} options={{ title: "Sair" }} />
//     </Drawer.Navigator>
//   );
// }

import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import RootTabs from "./RootTabs";
import DepartmentScreen from "../../screens/DepartmentScreen";
import { useAppTheme } from "../../components/theme/ThemeProvider";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { theme } = useAppTheme();

  return (
    <Drawer.Navigator
      initialRouteName="HomeTabs"
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.text,
        drawerStyle: { backgroundColor: theme.colors.card },
      }}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={RootTabs}
        options={{
          title: "Início",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />

      {/* 👇 Novo item do menu: Departamento */}
      <Drawer.Screen
        name="Department"
        component={DepartmentScreen}
        options={{
          title: "Departamento",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="business-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
