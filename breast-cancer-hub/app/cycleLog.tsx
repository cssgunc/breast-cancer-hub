import { View, FlatList, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
// import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CheckupWidget from "@/components/CheckupWidget";
import { colors } from "@/components/StyleSheet";

// placeholder, future cycle data must be get from API call
const cycleData = [
    { startDate: "2024-08-04", endDate: "2024-08-10", completedDate: "2024-08-17" },
    { startDate: "2024-07-01", endDate: "2024-07-06", completedDate: "2024-07-14" },
    { startDate: "2024-06-04", endDate: "2024-06-10", completedDate: "2024-06-17" },
    { startDate: "2024-05-29", endDate: "2024-06-02", completedDate: "2024-06-12" },
    { startDate: "2024-04-30", endDate: "2024-05-04", completedDate: "2024-05-10" },
    { startDate: "2024-03-25", endDate: "2024-03-31", completedDate: "2024-04-05" },
];

interface CycleLogProps {
    limit?: number; // limit for number of checkups displayed on home page
}

export default function CycleLogPage({ limit }: CycleLogProps) {
    const displayedCycles = limit ? cycleData.slice(0, limit) : cycleData;

    return (
        <ThemedView>
            <View style={styles.titleLine}>
                <Ionicons
                    name="list-outline"
                    size={20}
                    color={colors.darkPink}
                    style={styles.icon}
                />
                <ThemedText style={styles.titleText}>
                    {limit ? "Recent Checkups" : "Cycle History"}
                </ThemedText>
            </View>
            <FlatList
                data={displayedCycles}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <CheckupWidget {...item} />}
            />
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    titleLine: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 30,
    },
    titleText: {
        fontSize: 20,
        color: colors.black,
        fontWeight: "bold",
    },
    icon: {
        marginRight: 10,
    }
}) 