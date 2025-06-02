import { ScrollView } from "react-native";
import CheckupWidget from "../../checkupHistory/(components)/CycleEntry";
import { useCheckupData } from "@/hooks/CheckupContext";
import { ThemedText } from "@/components/style/ThemedText";

export default function CheckupLog() {
  const { allCheckups } = useCheckupData();

  const sortedCheckups = [...allCheckups].sort(
    (a, b) =>
      new Date(b.completedOn).getTime() - new Date(a.completedOn).getTime()
  );

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1, flexDirection: "column", gap: 16 }}
    >
      {sortedCheckups.length > 0 ? (
        sortedCheckups.map((item, index) => (
          <CheckupWidget key={index} {...item} />
        ))
      ) : (
        <ThemedText type="caption" italic>
          You have had no previous exams.
        </ThemedText>
      )}
    </ScrollView>
  );
}
