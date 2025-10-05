import axios from "axios";
import { Platform } from "react-native";

/**
 * =============================
 * ⚙️ CONFIGURAÇÃO DAS URLs BASE
 * =============================
 *
 * Este arquivo define a configuração global de acesso à API,
 * incluindo URLs diferentes para ambiente de desenvolvimento e produção.
 *
 * A ideia é que toda a comunicação com o backend passe por aqui.
 * Assim, se o endereço da API mudar, basta alterar neste único ponto.
 */

/**
 * 🌐 Variáveis de ambiente
 * Expo injeta automaticamente todas as variáveis que começam com EXPO_PUBLIC_.
 * Elas devem ser configuradas no arquivo `.env` do projeto.
 */
const ENV_PROD = process.env.EXPO_PUBLIC_API_URL;      // URL da API em produção → ex: https://api.suaapp.com
const ENV_DEV  = process.env.EXPO_PUBLIC_API_URL_DEV;  // URL da API em desenvolvimento → ex: http://192.168.0.10:7009/api
const PORT = process.env.EXPO_PUBLIC_API_PORT ?? "7009";        // Porta padrão usada no backend local
const LAN  = process.env.EXPO_PUBLIC_API_LAN ?? "192.168.0.10"; // IP local da máquina de desenvolvimento

/**
 * ==============================
 * 🧠 Função auxiliar para DEV
 * ==============================
 * Determina qual URL usar quando estamos em ambiente de desenvolvimento (__DEV__ = true)
 *
 * 1. Se houver uma variável de ambiente DEV específica, usa ela.
 * 2. Se estiver rodando no emulador Android, usa 10.0.2.2 para acessar o host local.
 * 3. Caso contrário (iOS / físico), usa o IP LAN informado.
 */
function resolveDevBaseUrl() {
  if (ENV_DEV) return ENV_DEV; // prioridade para variável explícita
  if (Platform.OS === "android") return `http://10.0.2.2:${PORT}/api`;
  return `http://${LAN}:${PORT}/api`;
}

/**
 * ==============================
 * 🌍 Escolha da URL final
 * ==============================
 *
 * - Em modo DEV → usamos o retorno da função acima
 * - Em modo PROD → usamos a ENV_PROD ou uma fallback genérica
 */
const baseURL = __DEV__
  ? resolveDevBaseUrl()
  : (ENV_PROD ?? "https://seu-dominio.com/api");

/**
 * ==============================
 * 📡 Instância Axios global
 * ==============================
 *
 * Esta instância será usada por todos os serviços para fazer requisições HTTP.
 * Ter uma instância única facilita:
 *  - Alterar cabeçalhos globalmente
 *  - Adicionar interceptores (ex: autenticação, logs, tratamento de erros)
 *  - Garantir timeouts padronizados
 */
export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000, // 15 segundos → evita travar indefinidamente em conexões lentas
});

/**
 * ==============================
 * 🧰 Interceptores de requisição
 * ==============================
 * Executados antes de cada request.
 * Úteis para adicionar tokens de autenticação ou fazer logs.
 */
api.interceptors.request.use((cfg) => {
  // Exemplo: inserir token JWT automaticamente em todas as requisições
  // const token = AuthStorage.getToken();
  // if (token) cfg.headers.Authorization = `Bearer ${token}`;

  return cfg;
});

/**
 * ==============================
 * 🚨 Interceptores de resposta
 * ==============================
 * Executados após receber a resposta.
 * Aqui podemos centralizar o tratamento de erros,
 * redirecionar para login se o token expirou, etc.
 */
api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err) // repassa o erro para quem chamou o service
);
