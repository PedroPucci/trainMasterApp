import axios from "axios";
import { Platform } from "react-native";

// .env (Expo injeta EXPO_PUBLIC_*)
const ENV_PROD = process.env.EXPO_PUBLIC_API_URL;      // ex: https://api.suaapp.com
const ENV_DEV  = process.env.EXPO_PUBLIC_API_URL_DEV;  // ex: http://192.168.0.10:7009/api
const PORT = process.env.EXPO_PUBLIC_API_PORT ?? "7009";
const LAN  = process.env.EXPO_PUBLIC_API_LAN ?? "192.168.0.10";

// Heurística de dev
function resolveDevBaseUrl() {
  // prioridade: variável .env específica
  if (ENV_DEV) return ENV_DEV;

  // emulador Android
  if (Platform.OS === "android") return `http://10.0.2.2:${PORT}/api`;

  // iOS/Device físico
  return `http://${LAN}:${PORT}/api`;
}

const baseURL = __DEV__ ? resolveDevBaseUrl() : (ENV_PROD ?? "https://seu-dominio.com/api");

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// Interceptores (token, logs, etc)
api.interceptors.request.use((cfg) => {
  // exemplo: cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);