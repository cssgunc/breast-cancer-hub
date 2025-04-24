import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColors } from "@/components/ColorContext";
import { useEffect, useState } from "react";
import { getSetting } from "@/hooks/useSettings";
import CycleLog from "@/components/CycleLog";
import { useCheckupStorage } from "@/hooks/useCheckupStorage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function CycleHistoryPage() {
    const [loading, setLoading] = useState(true);
    const [isMenstruating, setIsMenstruating] = useState<boolean>(true);
    const {colors, globalStyles } = useColors();
   
    const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.backgroundGray,
    },
    logContainer: {
        backgroundColor: colors.white,
        borderRadius: 15,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        // iOS shadow properties
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        // Android elevation
        elevation: 5,
        margin: 20,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
    titleText: {
        fontSize: 32,
        fontWeight: "bold",
        color: colors.darkHighlight,
        lineHeight: 32,
    },
    log: {
        paddingTop: 20,
    },
    icon: {
        marginRight: 10,
    },
    clearButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
}) 

    const { clearCheckups } = useCheckupStorage();

    useEffect(() => {
        getSetting("schedulingType").then((s) => {
            setIsMenstruating(s === "period"); // assumes isMenstruating exists
        })
        setLoading(false);
    })

    if (loading) {
        return <View style={[globalStyles.bodyContainerDarkHighlight]} />;
    }
    else {
        return (
                <SafeAreaView style={[globalStyles.bodyContainerDarkHighlight]}>
                    <ThemedView style={[styles.logContainer]}>
                        <View style={{ height: 30 }} />
                        <View style={styles.headerRow}>
                        <ThemedText style={styles.titleText}>Cycle History</ThemedText>

                        {/* Clear function for debug */}
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={clearCheckups}
                        >
                            <ThemedText style={{ color: "red", fontSize: 16 }}>Clear</ThemedText>
                            <MaterialIcons name="delete-forever" size={28} color={"red"} />
                        </TouchableOpacity>

                        </View>
                        <CycleLog isMenstruating={isMenstruating}></CycleLog>
                    </ThemedView>
                </SafeAreaView>
        );
    }

}