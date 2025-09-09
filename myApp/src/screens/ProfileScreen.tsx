import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AppHeader from "../components/header/AppHeader";
import { styles as s } from "./styles";

export default function ProfileScreen() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    birth: "",
    doc: "",
    maritalStatus: "",
    gender: "",
  });

  const update = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = () => {
    console.log("Atualizar perfil:", form);
  };

  return (
    <View style={s.container}>
      <AppHeader
        userName="Lydia dos Santos"
        role="Desenvolvedora Java"
        runningCount={3}
        completedCount={14}
        onLogout={() => console.log("Sair")}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={s.body} keyboardShouldPersistTaps="handled">
          <Text style={s.sectionTitle}>Perfil</Text>

          <View style={s.inputWrap}>
            <TextInput
              style={s.input}
              value={form.name}
              onChangeText={update("name")}
              placeholder="Nome completo"
              placeholderTextColor="#92A0A6"
              returnKeyType="next"
            />
          </View>

          <View style={s.inputWrap}>
            <TextInput
              style={s.input}
              value={form.email}
              onChangeText={update("email")}
              placeholder="E-mail"
              placeholderTextColor="#92A0A6"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
          </View>

          <View style={s.inputWrap}>
            <TextInput
              style={s.input}
              value={form.birth}
              onChangeText={update("birth")}
              placeholder="Data de nascimento"
              placeholderTextColor="#92A0A6"
              returnKeyType="next"
            />
          </View>

          <View style={s.inputWrap}>
            <TextInput
              style={s.input}
              value={form.doc}
              onChangeText={update("doc")}
              placeholder="CPF"
              placeholderTextColor="#92A0A6"
              keyboardType="numeric"
              returnKeyType="next"
            />
          </View>

          <View style={s.inputWrap}>
            <TextInput
              style={s.input}
              value={form.maritalStatus}
              onChangeText={update("maritalStatus")}
              placeholder="Estado civil"
              placeholderTextColor="#92A0A6"
              returnKeyType="next"
            />
          </View>

          <View style={s.inputWrap}>
            <TextInput
              style={s.input}
              value={form.gender}
              onChangeText={update("gender")}
              placeholder="Gênero"
              placeholderTextColor="#92A0A6"
              returnKeyType="done"
            />
          </View>

          <TouchableOpacity style={s.btnPrimary} onPress={onSubmit} activeOpacity={0.9}>
            <Text style={s.btnPrimaryText}>Atualizar</Text>
          </TouchableOpacity>

          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}