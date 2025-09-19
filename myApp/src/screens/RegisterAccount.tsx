import { useState } from "react";
import {
    View,
    Text,
    Alert,
    ScrollView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { styles as s } from "./styles";
import { required, email, cpf, minLength, passwordsMatch, } from "../components/utils/validators";
import { maskCPF } from "../components/utils/masks";

type Form = {
    name: string;
    email: string;
    doc: string;
    password: string;
    confirmPassword: string;
};
type Errors = Partial<Record<keyof Form, string | null>>;

import LayoutAuth from "../components/layoutAuth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  MainTabs: undefined;
};

export default function RegisterAccountScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [form, setForm] = useState<Form>({
        name: "",
        email: "",
        doc: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Errors>({});

    const update = (k: keyof Form) => (v: string) =>
        setForm((f) => ({ ...f, [k]: v }));

    const compose =
        (...validators: Array<(v: string) => string | null>) =>
            (v: string) =>
                validators.reduce<string | null>((err, fn) => err ?? fn(v), null);

    const validateField = (k: keyof Form): string | null => {
        switch (k) {
            case "name":
                return compose((v) => required(v, "Nome"), minLength(3, "Nome"))(form.name);
            case "email":
                return email(form.email);
            case "doc":
                return cpf(form.doc);
            case "password":
                return compose((v) => required(v, "Senha"), minLength(6, "Senha"))(form.password);
            case "confirmPassword":
                return compose((v) => required(v, "Confirmar senha"), minLength(6, "Senha"), passwordsMatch(form.password))(form.confirmPassword);
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

    Alert.alert(
      "Pronto",
      "Perfil cadastrado com sucesso!",
      [
        {
          text: "OK",
          onPress: () => navigation.replace("Login"), 
          // 👆 replace para não deixar voltar pro cadastro
        },
      ],
      { cancelable: false }
    );
  };

    return (
        <LayoutAuth
            title="Criar conta"
            subtitle={"Digite as informações abaixo:"}    >
            <View style={s.container}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={s.body} keyboardShouldPersistTaps="handled">
                        <View style={s.inputWrap}>
                            <TextInput
                                style={[s.input, errors.doc && s.inputError]}
                                value={form.doc}
                                onChangeText={(t) => setForm((f) => ({ ...f, doc: maskCPF(t) }))}
                                onBlur={() => setErrors((p) => ({ ...p, doc: validateField("doc") }))}
                                placeholder="Digite o CPF"
                                placeholderTextColor="#92A0A6"
                                keyboardType="number-pad"
                                returnKeyType="next"
                            />
                            {errors.doc ? <Text style={s.errorText}>{errors.doc}</Text> : null}
                        </View>

                        <View style={s.inputWrap}>
                            <TextInput
                                style={[s.input, errors.name && s.inputError]}
                                value={form.name}
                                onChangeText={update("name")}
                                onBlur={() => setErrors((p) => ({ ...p, name: validateField("name") }))}
                                placeholder="Digite o nome completo"
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
                                placeholder="Digite o e-mail"
                                placeholderTextColor="#92A0A6"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                returnKeyType="next"
                            />
                            {errors.email ? <Text style={s.errorText}>{errors.email}</Text> : null}
                        </View>

                        <View style={s.inputWrap}>
                            <TextInput
                                style={[s.input, errors.password && s.inputError]}
                                value={form.password}
                                onChangeText={update("password")}
                                onBlur={() => setErrors((p) => ({ ...p, password: validateField("password") }))}
                                placeholder="Digite a senha"
                                placeholderTextColor="#92A0A6"
                               keyboardType="default"
                                secureTextEntry
                                autoCapitalize="none"
                                returnKeyType="next"
                            />
                            {errors.password ? <Text style={s.errorText}>{errors.password}</Text> : null}
                        </View>

                        <View style={s.inputWrap}>
                            <TextInput
                                style={[s.input, errors.confirmPassword && s.inputError]}
                                value={form.confirmPassword}
                                onChangeText={update("confirmPassword")}
                                onBlur={() => setErrors((p) => ({ ...p, confirmPassword: validateField("confirmPassword") }))}
                                placeholder="Confirme a senha"
                                placeholderTextColor="#92A0A6"
                                keyboardType="default"
                                secureTextEntry
                                autoCapitalize="none"
                                returnKeyType="next"
                            />
                            {errors.confirmPassword ? <Text style={s.errorText}>{errors.confirmPassword}</Text> : null}
                        </View>

                        <TouchableOpacity style={s.btnPrimary} onPress={onSubmit} activeOpacity={0.9}>
                            <Text style={s.btnPrimaryText}>Registrar</Text>
                        </TouchableOpacity>

                        <View style={{ height: 100 }} />
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </LayoutAuth>
    );
}