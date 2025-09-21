import { View, Text, Image, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, NavigationProp, DrawerActions } from "@react-navigation/native";
import { styles } from "../header/styles";
import { useAppTheme } from "../theme/ThemeProvider";

type RootStackParamList = {
  Entrar: undefined;
  Home: undefined;
  Recover: undefined;
  Tabs: undefined;
  App: undefined;
};

type Props = {
  userName: string;
  onLogout?: () => Promise<void> | void;
  avatarUri?: string;
};

export default function AppHeader({ userName, onLogout, avatarUri }: Props) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { mode, setMode } = useAppTheme();

  const handleLogout = async () => {
    try {
      await onLogout?.();
    } finally {
      navigation.reset({ index: 0, routes: [{ name: "Entrar" }] });
    }
  };

  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const Avatar = avatarUri ? (
    <Image source={{ uri: avatarUri }} style={styles.avatar} />
  ) : (
    <View style={styles.avatarPlaceholder}>
      <Ionicons name="person" size={34} color="#ffffff" />
    </View>
  );

  const IconButton = ({
    active,
    onPress,
    icon,
  }: {
    active: boolean;
    onPress: () => void;
    icon: keyof typeof Ionicons.glyphMap;
  }) => (
    <Pressable
      onPress={onPress}
      style={{
        padding: 8,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.5)",
        backgroundColor: active ? "rgba(255,255,255,0.25)" : "transparent",
        marginLeft: 8,
      }}
    >
      <Ionicons name={icon} size={18} color="#ffffff" />
    </Pressable>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + 6 }]}>
      <View style={styles.circleLg} />
      <View style={styles.circleSm} />
      <View style={[styles.topRow, { flexDirection: "row", alignItems: "center" }]}>
        <Pressable
          onPress={handleOpenDrawer}
          style={{
            padding: 8,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.5)",
            backgroundColor: "transparent",
          }}
          accessibilityRole="button"
          accessibilityLabel="Abrir menu"
        >
          <Ionicons name="menu" size={22} color="#ffffff" />
        </Pressable>

        <View style={{ marginLeft: "auto", flexDirection: "row", alignItems: "center" }}>
          <IconButton
            icon="sunny-outline"
            active={mode === "light"}
            onPress={() => setMode("light")}
          />
          <IconButton
            icon="moon"
            active={mode === "dark"}
            onPress={() => setMode("dark")}
          />
          <Pressable onPress={handleLogout} style={{ marginLeft: 10 }}>
            <Text style={styles.logout}>Sair</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.bottomRow}>
        {Avatar}
        <Text style={styles.greeting}>
          <Text style={styles.greetingLight}>Olá, </Text>
          <Text style={styles.greetingBold}>{userName}</Text>
        </Text>
      </View>
    </View>
  );
}