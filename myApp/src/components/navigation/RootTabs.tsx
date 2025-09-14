import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FooterMenu from "../footer/FooterMenu";
import HomeScreen from "../../screens/HomeScreen";
import ProfileEditScreen from "../../screens/ProfileScreen";

const AprendizadoScreen = () => null;
const BuscarScreen      = () => null;
const MenuScreen        = () => null;

const Tab = createBottomTabNavigator();

export default function RootTabs() {
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