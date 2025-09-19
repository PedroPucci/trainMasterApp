import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { styles } from "./styles";
import LayoutAuth from "../components/layoutAuth";
import { StyleSheet } from "react-native";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  RecoverPassword: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "RecoverPassword"
>;

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

  const [modalVisible, setModalVisible] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  }>({
    type: "success",
    message: "",
  });

  const {
    control: emailControl,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

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

      setFeedback({
        type: "success",
        message: "Verifique seu e-mail para continuar!",
      });
      setModalVisible(true);
      setStep("password");
    } catch {
      setFeedback({
        type: "error",
        message: "Não foi possível enviar o e-mail de recuperação.",
      });
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (data: PasswordFormData) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // trocar por chamada na API

      setFeedback({
        type: "success",
        message: "Sua senha foi redefinida com sucesso!",
      });
      setModalVisible(true);

      // navigation.navigate("Login");
    } catch {
      setFeedback({
        type: "error",
        message: "Não foi possível redefinir a senha.",
      });
      setModalVisible(true);
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
              style={[styles.btnPrimary, loading ? { opacity: 0.6 } : null]}
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
              style={[styles.btnPrimary, loading ? { opacity: 0.6 } : null]}
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

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.box}>
            {/* Ícone condicional */}
            <Text
              style={[
                modalStyles.icon,
                { color: feedback.type === "success" ? "#2ecc71" : "#e74c3c" },
              ]}
            >
              {feedback.type === "success" ? "✔️" : "❌"}
            </Text>

            {/* Mensagem dinâmica */}
            <Text style={modalStyles.message}>{feedback.message}</Text>

            {/* Botão fechar */}
            <TouchableOpacity
              style={modalStyles.closeBtn}
              onPress={() => {
                setModalVisible(false);
                if (feedback.type === "success" && step === "password") {
                  navigation.navigate("Login");
                }
              }}
            >
              <Text style={modalStyles.closeBtnText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LayoutAuth>
  );
}
const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
    elevation: 5,
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  closeBtn: {
    backgroundColor: "#50C2C9",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  closeBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
