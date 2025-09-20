import React from "react";
import {
  NavigationContainer,
  DarkTheme as NavDark,
  DefaultTheme as NavLight,
  Theme as NavTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useAppTheme } from "./src/components/theme/ThemeProvider";
import LoginScreen from "./src/screens/LoginScreen";
import RecoverPasswordScreen from "./src/screens/RecoverPasswordScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import RootTabs from "./src/components/navigation/RootTabs";

const Stack = createNativeStackNavigator();

function ThemedNavigation() {
  const { theme } = useAppTheme();
  const base = theme.name === "dark" ? NavDark : NavLight;
  const hardBg = theme.name === "dark" ? "#000000" : "#FFFFFF";

  const navTheme: NavTheme = {
    ...base,
    colors: {
      ...base.colors,
      background: hardBg,
      card: theme.colors.card,
      text: theme.colors.text,
      border: theme.colors.border,
      primary: theme.colors.primary,
      notification: theme.colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: hardBg },
          headerStyle: { backgroundColor: theme.colors.card },
          headerTintColor: theme.colors.text,
          headerTitleStyle: { fontWeight: "700" },
        }}
      >
        <Stack.Screen name="Tabs" component={RootTabs} />
        <Stack.Screen name="Entrar" component={LoginScreen} />
        <Stack.Screen name="Recover" component={RecoverPasswordScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ThemedNavigation />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
