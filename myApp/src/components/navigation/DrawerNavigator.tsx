import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";
import RootTabs from "./RootTabs";
import { useAppTheme } from "../../components/theme/ThemeProvider";

const Drawer = createDrawerNavigator();
function EmptyScreen() {
  return null;
}

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

      <Drawer.Screen
        name="Department"
        component={EmptyScreen}
        options={{
          title: "Departamento",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="business-outline" color={color} size={size} />
          ),
        }}
        listeners={{
          drawerItemPress: (e) => {
            e.preventDefault();
          },
        }}
      />
    </Drawer.Navigator>
  );
}