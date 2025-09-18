import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { styles } from "./styles";
import LayoutAuth from "../components/layoutAuth";

// Tipagem das rotas do stack
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  RecoverPassword: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "RecoverPassword"
>;

// Schema de validação separado
const emailSchema = z.object({
  email: z
    .string()
    .nonempty("O e-mail é obrigatório!")
    .email("Digite um e-mail válido!"),
});

const passwordSchema = z.object({
  newPassword: z
    .string()
    .nonempty("A nova senha é obrigatória!")
    .min(6, "A senha deve ter pelo menos 6 caracteres!"),
});

type EmailFormData = z.infer<typeof emailSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

export default function RecoverPassword() {
  const navigation = useNavigation<NavigationProp>();

  const [step, setStep] = useState<"email" | "password">("email");
  const [loading, setLoading] = useState(false);

  // Form para etapa 1 (email)
  const {
    control: emailControl,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  // Form para etapa 2 (nova senha)
  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { newPassword: "" },
  });

  const handleRecoverEmail = async (data: EmailFormData) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // trocar chamada na API

      Alert.alert("Sucesso", "Verifique seu e-mail para continuar!");
      setStep("password");
    } catch {
      Alert.alert("Erro", "Não foi possível enviar o e-mail de recuperação.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (data: PasswordFormData) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // trocar por chamada na API

      Alert.alert("Sucesso", "Sua senha foi redefinida com sucesso!");
      navigation.navigate("Login");
    } catch {
      Alert.alert("Erro", "Não foi possível redefinir a senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutAuth
      title="Recupere sua senha"
      subtitle={
        step === "email"
          ? "Digite seu e-mail para recuperar a senha:"
          : "Digite sua nova senha:"
      }
    >
      <View style={{ display: "flex", width: "100%" }}>
        {/* Step 1 - Formulário de Email */}
        {step === "email" && (
          <>
            <Controller
              control={emailControl}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[
                    styles.inputWrap,
                    emailErrors.email ? styles.inputErrorWrap : null,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Digite o e-mail"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              )}
            />
            {emailErrors.email && (
              <Text style={styles.errorText}>{emailErrors.email.message}</Text>
            )}

            <TouchableOpacity
              style={[
                styles.btnPrimary,
                loading ? { opacity: 0.6 } : null,
              ]}
              onPress={handleEmailSubmit(handleRecoverEmail)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.btnPrimaryText}>Enviar e-mail</Text>
              )}
            </TouchableOpacity>
          </>
        )}

        {/* Step 2 - Formulário de Nova Senha */}
        {step === "password" && (
          <>
            <Controller
              control={passwordControl}
              name="newPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[
                    styles.inputWrap,
                    passwordErrors.newPassword ? styles.inputErrorWrap : null,
                  ]}
                >
                  <TextInput
                    style={styles.input}
                    placeholder="Sua nova senha"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                </View>
              )}
            />
            {passwordErrors.newPassword && (
              <Text style={styles.errorText}>
                {passwordErrors.newPassword.message}
              </Text>
            )}

            <TouchableOpacity
              style={[
                styles.btnPrimary,
                loading ? { opacity: 0.6 } : null,
              ]}
              onPress={handlePasswordSubmit(handleResetPassword)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.btnPrimaryText}>Redefinir senha</Text>
              )}
            </TouchableOpacity>
          </>
        )}

        {/* Links adicionais */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          disabled={loading}
        >
          <Text
            style={{
              color: "#50C2C9",
              textAlign: "center",
              marginTop: 20,
              fontWeight: "600",
            }}
          >
            Fazer login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          disabled={loading}
        >
          <Text
            style={{
              color: "#50C2C9",
              textAlign: "center",
              marginTop: 10,
              fontWeight: "600",
            }}
          >
            Ainda não tem conta? Registrar
          </Text>
        </TouchableOpacity>
      </View>
    </LayoutAuth>
  );
}
