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

interface CheckupWidgetMenstruateProps {
    isMenstruating: boolean;
    startDate: string;
    endDate: string;
    completedDate: string;
}

interface CheckupWidgetNoMenstruateProps {
    isMenstruating: boolean;
    completedDate: string;
}

export default function CheckupWidget(checkupWidgetProps: CheckupWidgetMenstruateProps | CheckupWidgetNoMenstruateProps) {
    const formatDate = (date: Date) => date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    // date objects for props
    // const dateStart = new Date(startDate);
    // const dateEnd = new Date(endDate);
    // const dateComplete = new Date(completedDate);

    var startDate : Date = new Date(0);
    var endDate : Date = new Date(0);
    var length;

    if (checkupWidgetProps.isMenstruating) {
        startDate = new Date((checkupWidgetProps as CheckupWidgetMenstruateProps).startDate);
        endDate = new Date((checkupWidgetProps as CheckupWidgetMenstruateProps).endDate);
        length = endDate.getDate() - startDate.getDate();
    }
    const completedDate = new Date(checkupWidgetProps.completedDate);

    console.log(checkupWidgetProps.isMenstruating);

    return (
        <ThemedView>
            {checkupWidgetProps.isMenstruating ? (
                <ThemedView style={[styles.card]}>
                    
                    <ThemedText style={styles.periodText}>
                        {formatDate(startDate)} - {formatDate(endDate)} ({length} days)
                    </ThemedText>
                    <ThemedText style={styles.completedText}>Checkup completed: {formatDate(completedDate)}</ThemedText>
                    <TouchableOpacity
                        // will eventually push to symptom checklist for specific date 
                        onPress={() => router.push(`/selfExamChecklist`)}>
                        <ThemedText style={styles.pastExamsText}>View checkup details</ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            ) : (
                <ThemedView style={[styles.card]}>
                    
                    <ThemedText style={styles.periodText}>
                        {formatDate(completedDate)}
                    </ThemedText>
                    <TouchableOpacity
                        // will eventually push to symptom checklist for specific date 
                        onPress={() => router.push(`/selfExamChecklist`)}>
                        <ThemedText style={styles.pastExamsText}>View checkup details</ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            )}
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
        color: colors.black,
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
