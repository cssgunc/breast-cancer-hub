import { StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { colors } from "./StyleSheet";

interface CheckupWidgetProps {
    startDate: string;
    endDate: string;
    completedDate: string;
}

export default function CheckupWidget({ startDate, endDate, completedDate }: CheckupWidgetProps) {
    const formatDate = (date: Date) => date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

    // date objects for props
    const dateStart = new Date(startDate);
    const dateEnd = new Date(endDate);
    const dateComplete = new Date(completedDate);

    const length = dateEnd.getDate() - dateStart.getDate();

    return (
        <ThemedView style={[styles.card]}>
            <ThemedText style={styles.periodText}>
                {formatDate(dateStart)} - {formatDate(dateEnd)} ({length} days)
            </ThemedText>
            <ThemedText style={styles.completedText}>Checkup completed: {formatDate(dateComplete)}</ThemedText>
            <TouchableOpacity
                // will eventually push to symptom checklist for specific date 
                onPress={() => router.push(`/selfExamChecklist`)}>
                <ThemedText style={styles.pastExamsText}>View checkup details</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#E0E0E0",
        boxShadow: "0.5px 0.5px 3px 0 rgb(0 0 0 / 80%)",
    },
    periodText: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#000000",
    },
    completedText: {
        fontSize: 14,
    },
    pastExamsText: {
        fontSize: 14,
        color: colors.blue,
        fontWeight: "bold",
        fontStyle: "italic",
    },
});
