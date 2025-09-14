import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AppHeader from "../components/header/AppHeader";
import { styles as s } from "./styles";
import { required, email, cpf, birthDateBR, oneOf } from "../components/utils/validators";
import { maskDateBR, maskCPF } from "../components/utils/masks";

const ESTADOS_CIVIS = ["Solteiro", "Casado", "Divorciado", "Viúvo", "União estável"];
const GENEROS = ["Feminino", "Masculino", "Outro", "Prefiro não dizer"];

type Form = {
  name: string;
  email: string;
  birth: string;
  doc: string;
  maritalStatus: string;
  gender: string;
};
type Errors = Partial<Record<keyof Form, string | null>>;

import Ionicons from "@expo/vector-icons/Ionicons";

type CenteredPickerProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
  error?: string | null;
};

function CenteredPicker({
  value,
  onChange,
  placeholder,
  options,
  error,
}: CenteredPickerProps) {
  return (
    <View style={[s.inputWrap, error && s.inputErrorWrap, s.pickerWrapper]}>
      <Text style={s.pickerValueText} numberOfLines={1}>
        {value || placeholder}
      </Text>

      <Ionicons name="chevron-down" size={18} color="#92A0A6" style={s.pickerChevron} />

      <Picker
        selectedValue={value}
        onValueChange={(val) => onChange(val as string)}
        style={s.pickerOverlay}
        dropdownIconColor="transparent"
      >
        <Picker.Item label={placeholder} value="" color="#92A0A6" />
        {options.map((opt) => (
          <Picker.Item key={opt} label={opt} value={opt} />
        ))}
      </Picker>
    </View>
  );
}

export default function ProfileScreen() {
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    birth: "",
    doc: "",
    maritalStatus: "",
    gender: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const update = (k: keyof Form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const validateField = (k: keyof Form): string | null => {
    switch (k) {
      case "name":
        return required(form.name, "Nome");
      case "email":
        return email(form.email);
      case "birth":
        return birthDateBR(form.birth);
      case "doc":
        return cpf(form.doc);
      case "maritalStatus":
        return oneOf(ESTADOS_CIVIS, "Estado civil")(form.maritalStatus);
      case "gender":
        return oneOf(GENEROS, "Gênero")(form.gender);
      default:
        return null;
    }
  };

  const validateAll = (): boolean => {
    const next: Errors = {};
    (Object.keys(form) as (keyof Form)[]).forEach((k) => (next[k] = validateField(k)));
    setErrors(next);
    return Object.values(next).every((e) => !e);
  };

  const onSubmit = () => {
    if (!validateAll()) {
      Alert.alert("Atenção", "Corrija os campos destacados.");
      return;
    }
    Alert.alert("Pronto", "Perfil atualizado com sucesso!");
  };

  return (
    <View style={s.container}>
      <AppHeader userName="Lydia" onLogout={() => console.log("Sair")} />

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={s.body} keyboardShouldPersistTaps="handled">
          <Text style={s.sectionTitle}>Perfil</Text>

          <View style={s.inputWrap}>
            <TextInput
              style={[s.input, errors.name && s.inputError]}
              value={form.name}
              onChangeText={update("name")}
              onBlur={() => setErrors((p) => ({ ...p, name: validateField("name") }))}
              placeholder="Nome completo"
              placeholderTextColor="#92A0A6"
              autoCapitalize="words"
              returnKeyType="next"
            />
            {errors.name ? <Text style={s.errorText}>{errors.name}</Text> : null}
          </View>

          <View style={s.inputWrap}>
            <TextInput
              style={[s.input, errors.email && s.inputError]}
              value={form.email}
              onChangeText={update("email")}
              onBlur={() => setErrors((p) => ({ ...p, email: validateField("email") }))}
              placeholder="E-mail"
              placeholderTextColor="#92A0A6"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
            {errors.email ? <Text style={s.errorText}>{errors.email}</Text> : null}
          </View>

          <View style={s.inputWrap}>
            <TextInput
              style={[s.input, errors.birth && s.inputError]}
              value={form.birth}
              onChangeText={(t) => setForm((f) => ({ ...f, birth: maskDateBR(t) }))}
              onBlur={() => setErrors((p) => ({ ...p, birth: validateField("birth") }))}
              placeholder="Data de nascimento (dd/mm/aaaa)"
              placeholderTextColor="#92A0A6"
              keyboardType="numeric"
              returnKeyType="next"
            />
            {errors.birth ? <Text style={s.errorText}>{errors.birth}</Text> : null}
          </View>

          <View style={s.inputWrap}>
            <TextInput
              style={[s.input, errors.doc && s.inputError]}
              value={form.doc}
              onChangeText={(t) => setForm((f) => ({ ...f, doc: maskCPF(t) }))}
              onBlur={() => setErrors((p) => ({ ...p, doc: validateField("doc") }))}
              placeholder="CPF"
              placeholderTextColor="#92A0A6"
              keyboardType="number-pad"
              returnKeyType="next"
            />
            {errors.doc ? <Text style={s.errorText}>{errors.doc}</Text> : null}
          </View>

           <View style={s.shadowWrap}>           
              <CenteredPicker
                value={form.maritalStatus}
                onChange={(v) => {
                  update("maritalStatus")(v);
                  setErrors((p) => ({ ...p, maritalStatus: validateField("maritalStatus") }));
                }}
                placeholder="Selecione o estado civil"
                options={ESTADOS_CIVIS}
                error={errors.maritalStatus}
              />
            </View>

            <View style={s.shadowWrap}>           
              <CenteredPicker
                value={form.gender}
                onChange={(v) => {
                  update("gender")(v);
                  setErrors((p) => ({ ...p, gender: validateField("gender") }));
                }}
                placeholder="Selecione o gênero"
                options={GENEROS}
                error={errors.gender}
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