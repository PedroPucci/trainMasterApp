import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F4F3" },
  body: { padding: 16, paddingTop: 12 },

  sectionTitle: {
    color: "#0F1E25",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },

  cardTitle: {
    color: "#0F1E25",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 6,
  },
  cardSubtitle: {
    color: "#0F1E25",
    fontSize: 15,
    fontWeight: "700",
    opacity: 0.9,
  },
});