import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColors } from "@/components/ColorContext";
import { useEffect, useState } from "react";
import { getSetting } from "@/hooks/useSettings";
import CycleLog from "@/components/CycleLog";

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
    }
}) 

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
                        <ThemedText style={styles.titleText}>Cycle History</ThemedText>
                        <CycleLog isMenstruating={isMenstruating}></CycleLog>
                    </ThemedView>
                </SafeAreaView>
        );
    }

}