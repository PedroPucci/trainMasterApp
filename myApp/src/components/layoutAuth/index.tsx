import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

type LayoutAuthProp = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function LayoutAuth({
  title,
  subtitle,
  children,
}: LayoutAuthProp) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/images/shape.png")}
          style={styles.shape}
          resizeMode="contain"
        />
        <View style={styles.body}>
          {/* Logo */}
          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Título */}
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionSubtitle}>{subtitle}</Text>
          {children}
        </View>
      </View>
    </ScrollView>
  );
}
