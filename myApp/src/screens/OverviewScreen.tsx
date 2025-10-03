import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import AppHeader from "../components/header/AppHeader";
import { styles as s } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "../components/theme/ThemeProvider";
import { BASE_URL, fetchComTimeout } from "../components/routes/apiConfig";


type Feedback = {
  id: number;
  user: string;
  date: string;
  comment: string;
  rating: number;
};

// const feedbacks: Feedback[] = [
//   {
//     id: 1,
//     user: "Maria Aline",
//     date: "10/05/2022",
//     comment: "Aprendi bastante sobre o curso, recomendo!",
//     rating: 5,
//   },
//   {
//     id: 2,
//     user: "Pedro Lucas",
//     date: "12/09/2023",
//     comment:
//       "Gostei muito do curso e tive oportunidade de melhorar meu conhecimento.",
//     rating: 4,
//   },
//   {
//     id: 3,
//     user: "Lia",
//     date: "11/01/2024",
//     comment: "Curso muito bom, mas o instrutor podia falar mais devagar.",
//     rating: 4,
//   },
// ];

function RatingStars({ rating }: { rating: number }) {
  return (
    <View style={{ flexDirection: "row", marginTop: 4 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Ionicons
          key={i}
          name={i < rating ? "star" : "star-outline"}
          size={16}
          color="#FFD700"
        />
      ))}
    </View>
  );
}

function FeedbackCard({ user, date, comment, rating }: Feedback) {
  return (
    <View style={local.card}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="person-circle" size={40} color="#4F7CAC" />
        <View style={{ marginLeft: 8 }}>
          <Text style={local.cardUser}>{user}</Text>
          <Text style={local.cardDate}>{date}</Text>
        </View>
      </View>
      <Text style={local.cardComment}>{comment}</Text>
      <RatingStars rating={rating} />
    </View>
  );
}

export default function OverviewScreen() {
  const { theme } = useAppTheme() ?? {
    theme: { name: "light", colors: { primary: "#51C391" } },
  };
  const hardText = theme.name === "dark" ? "#FFF" : "#000";

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [successModal, setSuccessModal] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleMatricula = () => setSuccessModal(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetchComTimeout(`${BASE_URL}/course-feedback`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar feedbacks");
        }
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <View style={[s.container, { backgroundColor: "#E9F1F0", flex: 1 }]}>
      <AppHeader userName="Lydia" onLogout={() => console.log("Sair")} />

      <ScrollView
        contentContainerStyle={[s.body, s.scrollContent]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={s.overviewTitle}>Fundamentos da Web</Text>
        <Text style={s.overviewSubtitle}>Visão Geral</Text>
        <Text style={s.overviewDescription}>
          Aprenda os princípios básicos da internet e como funciona a
          comunicação cliente-servidor.{"\n"}
          Conheça a estrutura do HTML e as principais tags utilizadas.{"\n"}
          Entenda noções iniciais de CSS para estilizar páginas.{"\n"}
          Pratique com exercícios e provas para fixar o aprendizado.
        </Text>

        <TouchableOpacity
          style={[s.overviewButton, { backgroundColor: "#50C2C9" }]}
          onPress={handleMatricula}
        >
          <Text style={s.overviewButtonText}>Matricular-se</Text>
        </TouchableOpacity>

        <Text style={[s.sectionTitle, { color: hardText }]}>Feedbacks:</Text>
        {feedbacks.map((fb) => (
          <FeedbackCard key={fb.id} {...fb} />
        ))}
      </ScrollView>

        

      <Modal
        visible={successModal}
        transparent
        animationType="fade"
        onRequestClose={() => setSuccessModal(false)}
      >
        <View style={local.modalContainer}>
          <View style={local.modalBox}>
            <Ionicons
              name="checkmark-circle-outline"
              size={64}
              color="#51C391"
            />
            <Text style={local.modalTitle}>Matrícula realizada!</Text>
            <Pressable
              style={[
                local.primaryButton,
                { backgroundColor: "#50C2C9", marginTop: 16 },
              ]}
              onPress={() => setSuccessModal(false)}
            >
              <Text style={local.primaryButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>


    </View>
  );
}

const local = StyleSheet.create({
  primaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  primaryButtonText: { color: "#FFF", fontSize: 16, fontWeight: "600" },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardUser: { fontWeight: "bold", fontSize: 14 },
  cardDate: { fontSize: 12, color: "#777" },
  cardComment: { marginTop: 6, fontSize: 13, color: "#333" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: "#FFF",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    width: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  modalTitle: { marginTop: 12, fontSize: 18, fontWeight: "600", color: "#333" },
  menuOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)" },
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: "70%",
    backgroundColor: "#FFF",
    padding: 20,
    elevation: 6,
  },
  menuTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  menuItemText: { marginLeft: 10, fontSize: 16, color: "#333" },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navItem: {
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 2,
    color: "#333",
  },
});
