import React, { useState } from "react"; 
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import LayoutAuth from "../components/layoutAuth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateCpf = () => {
    if (!cpf.trim()) {
      setCpfError("O CPF é obrigatório.");
      return false;
    } else if (!/^\d+$/.test(cpf)) {
      setCpfError("Digite apenas números.");
      return false;
    } else if (cpf.length !== 11) {
      setCpfError("CPF deve ter 11 dígitos.");
      return false;
    }
    setCpfError("");
    return true;
  };

  const validateSenha = () => {
    if (!senha.trim()) {
      setSenhaError("A senha é obrigatória.");
      return false;
    } else if (senha.length < 6) {
      setSenhaError("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }
    setSenhaError("");
    return true;
  };

  const handleLoginPress = () => {
    const cpfValid = validateCpf();
    const senhaValid = validateSenha();

    if (cpfValid && senhaValid) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://suaapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Login realizado com sucesso!");
        navigation.replace("Home"); 
      } else {
        Alert.alert("Erro", data.message || "CPF ou senha inválidos.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutAuth
      title="Seja bem-vindo!"
      subtitle="Digite suas credenciais para acessar sua conta:"
    >
      <View style={styles.container}>
      
        <TextInput
          placeholder="CPF"
          style={[styles.input, cpfError ? styles.inputError : null]}
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={cpf}
          onChangeText={(text) => {
            setCpf(text.replace(/[^0-9]/g, ""));
            if (cpfError) validateCpf();
          }}
          onBlur={validateCpf}
        />
        {cpfError && <Text style={styles.errorText}>{cpfError}</Text>}

        <TextInput
          placeholder="Senha"
          style={[styles.input, senhaError ? styles.inputError : null]}
          placeholderTextColor="#999"
          secureTextEntry
          value={senha}
          onChangeText={(text) => {
            setSenha(text);
            if (senhaError) validateSenha();
          }}
          onBlur={validateSenha}
        />
        {senhaError && <Text style={styles.errorText}>{senhaError}</Text>}

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.loginButton, loading && { opacity: 0.7 }]}
          onPress={handleLoginPress}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Ainda não tem conta?{" "}
          <Text style={styles.registerLink}>Registrar</Text>
        </Text>
      </View>
    </LayoutAuth>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", alignItems: "center", justifyContent: "center" },
  instruction: { fontSize: 14, color: "#555", textAlign: "center", marginVertical: 10 },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  inputError: { borderColor: "red" },
  errorText: { color: "red", fontSize: 12, alignSelf: "flex-start", marginLeft: 10, marginBottom: 5 },
  forgotPassword: { alignSelf: "flex-end", marginTop: 5, marginBottom: 20, color: "#63B8B8", fontSize: 13 },
  loginButton: {
    backgroundColor: "#63B8B8",
    paddingVertical: 14,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  registerText: { color: "#444", fontSize: 14 },
  registerLink: { color: "#63B8B8", fontWeight: "bold" },
});
