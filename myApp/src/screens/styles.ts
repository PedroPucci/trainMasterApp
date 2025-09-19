import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F4F3" },

  body: { padding: 16, paddingTop: 12 },

  sectionTitle: {
    color: "#0F1E25",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 27,
    textAlign: "center",
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

  /* ======== BADGES (grid com no máximo 5 por linha) ======== */
  badgesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6,
  },

  badgeCell: {
    width: "20%",
    paddingHorizontal: 6,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  badgePressable: {
    alignItems: "center",
    justifyContent: "center",
  },

  badgeMedal: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  /* ======== TOOLTIP ======== */
  tooltip: {
    position: "absolute",
    bottom: 64,
    maxWidth: 140,
    backgroundColor: "#111",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 6,
    alignItems: "center",
    zIndex: 2,
  },

  tooltipText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },

  tooltipCaret: {
    position: "absolute",
    bottom: -6,
    left: "50%",
    marginLeft: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#111",
  },
  calendarCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    overflow: "hidden",
  },

  calendar: {
    width: "100%",
    maxWidth: 320,
    alignSelf: "center",
    borderRadius: 20,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },

  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 8,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginRight: 16,
    marginBottom: 8,
  },

  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ccc",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },

  legendText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0F1E25",
    opacity: 0.9,
  },
  shadowWrap: {
    borderRadius: 24,
    marginBottom: 4,
    shadowOffset: { width: 0, height: 6 },
  },
  inputWrap: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    overflow: "hidden",
  },
  input: {
    color: "#0F1E25",
    fontSize: 14,
    paddingVertical: 4,
  },
  btnPrimary: {
    backgroundColor: "#50C2C9",
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  btnPrimaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  inputError: {
    borderWidth: 1.2,
    borderColor: "#E63946",
  },
  errorText: {
    marginTop: 6,
    color: "#E63946",
    fontSize: 12,
    fontWeight: "600",
  },
  inputErrorWrap: {
    borderWidth: 1.2,
    borderColor: "#E63946",
  },
  // picker: {
  //   height: 48,
  //   color: "#0F1E25",
  //   width: "100%",
  //   alignSelf: "center",
  // },
  // pickerContainer: {
  //   alignItems: "center",
  // },
  // pickerItemIOS: {
  //   textAlign: "center",
  // },

  pickerWrapper: {
    justifyContent: "center",
  },

  pickerOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0,
  },

  pickerValueText: {
    color: "#0F1E25",
    fontSize: 14,
    paddingVertical: 4,
    textAlign: "left",
  },

  pickerChevron: {
    position: "absolute",
    right: 16,
    top: "50%",
    marginTop: -9,
  },
  circleLg: {
    position: "absolute",
    top: -70,
    left: 0,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(80, 194, 201,0.35)",
  },
  circleSm: {
    position: "absolute",
    top: 0,
    left: -100,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(80, 194, 201,0.35)",
  },
});