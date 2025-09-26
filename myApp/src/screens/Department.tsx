import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import AppHeader from "../components/header/AppHeader";
import { useAppTheme } from "../components/theme/ThemeProvider";
import { styles as s } from "./styles";

type DepartmentProps = {
  userName: string;
  onLogout: () => void;
};

export default function DepartmentScreen({ userName, onLogout }: DepartmentProps) {
  const { theme } = useAppTheme();
  const isDark = theme.name === "dark";
  const hardBg = isDark ? "#000000" : "#FFFFFF";
  const hardText = isDark ? "#FFFFFF" : "#000000";
  const hardMuted = isDark ? "#A3A3A3" : "#666666";
  const hardBorder = isDark ? "#222222" : "#E5E5E5";

  
  const [hasDepartment, setHasDepartment] = React.useState(true);

  const departmentData = {
    department: "Desenvolvimento de sistema",
    team: "Legado do sistema de faturamento",
    manager: "Michale Jordan",
  };

  return (
    <View style={[s.container, { backgroundColor: hardBg }]}>
      <AppHeader userName={userName} onLogout={onLogout} />

      <ScrollView
        contentContainerStyle={[s.body, s.scrollContent]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[s.sectionTitle, { color: hardText }]}>
          Departamento & Time
        </Text>

        {!hasDepartment ? (
          <View style={{ marginTop: 40, alignItems: "center" }}>
            <Text style={{ color: hardMuted, textAlign: "center" }}>
              Aguarde o RH cadastrar você no departamento {"\n"}e time
            </Text>
          </View>
        ) : (
          <View
            style={[
              s.card,
              {
                backgroundColor: hardBg,
                borderColor: hardBorder,
                marginTop: 20,
              },
            ]}
          >
            <Text style={[s.cardSubtitle, { color: hardText }]}>
              Departamento: {departmentData.department}
            </Text>
            <Text style={[s.cardSubtitle, { color: hardText }]}>
              Time: {departmentData.team}
            </Text>
            <Text style={[s.cardSubtitle, { color: hardText }]}>
              Gerente: {departmentData.manager}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
