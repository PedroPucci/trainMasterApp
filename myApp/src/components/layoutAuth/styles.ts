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
    padding: 32,
    paddingTop: 12,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    color: "#0F1E25",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 27,
    textAlign: "center",
  },
  sectionSubtitle: { textAlign: "center", marginBottom: 20, color: "#555" },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },
});
