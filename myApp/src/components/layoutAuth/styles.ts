import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F3",
    position: "relative",
  },
  shape: {
    position: "absolute",
    left: -100,
    top: -100,
  },
  body: {
    paddingHorizontal: 32,
    paddingVertical: 80,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#0F1E25",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  sectionSubtitle: { textAlign: "center", marginBottom: 20, color: "#555" },
  logo: {
    width: 160,
    height: 160,
    alignSelf: "center",
    marginBottom: 48,
  },
  header:{
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 16,
  }
});
