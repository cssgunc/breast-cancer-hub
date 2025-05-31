import { ScrollView } from "react-native";
import CheckupWidget from "../../checkupHistory/(components)/CycleEntry";
import { useCheckupData } from "@/hooks/CheckupContext";
import { ThemedText } from "@/components/style/ThemedText";

export default function CheckupLog() {
  const { allCheckups } = useCheckupData();

  return (
    <ScrollView style={{ height: "90%", flexDirection: "column", gap: 16 }}>
      {allCheckups.length > 0 ? (
        allCheckups.map((item, index) => (
          <CheckupWidget key={index} {...item} />
        ))
      ) : (
        <ThemedText>You have had no previous checkups.</ThemedText>
      )}
    </ScrollView>
  );
}
