// import {
//   NavigationContainer,
//   DarkTheme as NavDark,
//   DefaultTheme as NavLight,
//   Theme as NavTheme,
// } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { ThemeProvider, useAppTheme } from './src/components/theme/ThemeProvider';

// import HomeScreen from './src/screens/HomeScreen';
// import LoginScreen from "./src/screens/LoginScreen";
// import RecoverPasswordScreen from "./src/screens/RecoverPasswordScreen";
// import RegisterScreen from "./src/screens/RegisterScreen";
// import RootTabs from "./src/components/navigation/RootTabs";

// const Stack = createNativeStackNavigator();

// function ThemedNavigation() {
//   const { theme } = useAppTheme();
//   const base = theme.name === 'dark' ? NavDark : NavLight;
//   const navTheme: NavTheme = {
//     ...base,
//     colors: {
//       ...base.colors,                 
//       background: theme.colors.bg,
//       card: theme.colors.card,
//       text: theme.colors.text,
//       border: theme.colors.border,
//       primary: theme.colors.primary,
//       notification: theme.colors.primary,
//     },
//   };

//   return (
//     <NavigationContainer theme={navTheme}>
//       <Stack.Navigator
//         screenOptions={{
//           headerStyle: { backgroundColor: theme.colors.card },
//           headerTintColor: theme.colors.text,
//           headerTitleStyle: {
//             fontWeight: '700',
//           },
//         }}
//       >
//         {/* <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'TrainMaster' }} /> */}
//         <Stack.Screen name="Entrar" component={LoginScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="Tabs" component={RootTabs} options={{ headerShown: false }}/>
//         <Stack.Screen name="Recover" component={RecoverPasswordScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default function App() {
//   return (
//     <ThemeProvider>
//       <ThemedNavigation />
//     </ThemeProvider>
//   );
// }
import {
  NavigationContainer,
  DarkTheme as NavDark,
  DefaultTheme as NavLight,
  Theme as NavTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider, useAppTheme } from "./src/components/theme/ThemeProvider";

import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RecoverPasswordScreen from "./src/screens/RecoverPasswordScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import RootTabs from "./src/components/navigation/RootTabs";

const Stack = createNativeStackNavigator();

function ThemedNavigation() {
  const { theme } = useAppTheme();
  const base = theme.name === "dark" ? NavDark : NavLight;

  // Apenas o CONTEÚDO das telas muda (preto/branco)
  const hardBg = theme.name === "dark" ? "#000000" : "#FFFFFF";

  const navTheme: NavTheme = {
    ...base,
    colors: {
      ...base.colors,
      // fundo da árvore de navegação acompanha o tema da TELA
      background: hardBg,
      // abaixo não afeta seu header/footer customizados (estão com headerShown: false)
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
        screenOptions={{
          // Garante fundo da SCENE (tela) preto/branco em todas as telas
          contentStyle: { backgroundColor: hardBg },
          // Você usa AppHeader/Footers próprios, então escondemos o header nativo
          headerStyle: { backgroundColor: theme.colors.card },
          headerTintColor: theme.colors.text,
          headerTitleStyle: { fontWeight: "700" },
        }}
      >
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'TrainMaster' }} /> */}
        <Stack.Screen name="Entrar" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Tabs" component={RootTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Recover" component={RecoverPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedNavigation />
    </ThemeProvider>
  );
}
