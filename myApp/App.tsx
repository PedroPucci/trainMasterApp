import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import RecoverPasswordScreen from "./src/screens/RecoverPasswordScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import RootTabs from "./src/components/navigation/RootTabs";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Entrar" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Entrar" component={LoginScreen} />
        <Stack.Screen name="Tabs" component={RootTabs} />
        <Stack.Screen name="Recover" component={RecoverPasswordScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}