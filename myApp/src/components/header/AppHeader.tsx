import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { styles } from "../header/styles";

type Props = {
  userName: string;
  onLogout?: () => void;
  avatarUri?: string;
};

export default function AppHeader({
  userName,
  onLogout,
  avatarUri,
}: Props) {
  const insets = useSafeAreaInsets();

  const Avatar =
    avatarUri ? (
      <Image source={{ uri: avatarUri }} style={styles.avatar} />
    ) : (
      <View style={styles.avatarPlaceholder}>
        <Ionicons name="person" size={34} color="#ffffff" />
      </View>
    );

  return (
    <View style={[styles.container, { paddingTop: insets.top + 6 }]}>
      <View style={styles.circleLg} />
      <View style={styles.circleSm} />
      
      <View style={styles.topRow}>
        <Pressable onPress={onLogout} style={{ marginLeft: "auto" }}>
            <Text style={styles.logout}>Sair</Text>
        </Pressable>
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