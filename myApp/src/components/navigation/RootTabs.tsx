import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FooterMenu from "../footer/FooterMenu";
import HomeScreen from "../../screens/HomeScreen";
import ProfileEditScreen from "../../screens/ProfileScreen";
import RegisterAccountScreen from "../../screens/RegisterAccount";
import RecoverPassword from "../../screens/RecoverPassword";
import LoginScreen from "../../screens/LoginScreen";

const AprendizadoScreen = () => null;
const BuscarScreen      = () => null;
const MenuScreen        = () => null;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function RootTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      tabBar={(props) => <FooterMenu {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Inicio"      component={HomeScreen} />
      <Tab.Screen name="Perfil"      component={ProfileEditScreen} />
      <Tab.Screen name="Aprendizado" component={AprendizadoScreen} options={{ tabBarLabel: "Meu aprendizado" }} />
      <Tab.Screen name="Buscar"      component={BuscarScreen} />
      <Tab.Screen name="Menu"        component={MenuScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }} 
      initialRouteName="Login"  // 👈 aqui define a primeira tela
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterAccountScreen} />
      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />

      {/* Depois as tabs normais */}
      <Stack.Screen name="Home" component={RootTabs} />
    </Stack.Navigator>
  );
}