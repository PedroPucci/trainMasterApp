import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootTabs from "../myApp/src/components/navigation/RootTabs";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}