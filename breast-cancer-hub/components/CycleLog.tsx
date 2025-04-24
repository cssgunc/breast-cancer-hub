import { ScrollView } from "react-native";
import { useEffect } from "react";
import { useColors } from "@/components/ColorContext";
import CheckupWidget from "@/components/CheckupWidget";
import { useCheckupStorage } from "@/hooks/useCheckupStorage";

// placeholder, future cycle data must be get from API call
// const cycleData = [
//     { startDate: "2024-08-04", endDate: "2024-08-10", completedDate: "2024-08-17" },
//     { startDate: "2024-07-01", endDate: "2024-07-06", completedDate: "2024-07-14" },
//     { startDate: "2024-06-04", endDate: "2024-06-10", completedDate: "2024-06-17" },
//     { startDate: "2024-05-29", endDate: "2024-06-02", completedDate: "2024-06-12" },
//     { startDate: "2024-04-30", endDate: "2024-05-04", completedDate: "2024-05-10" },
//     { startDate: "2024-03-25", endDate: "2024-03-31", completedDate: "2024-04-05" },
// ];

interface CycleLogProps {
    limit?: number;
    isMenstruating: boolean;
}

export default function CycleLog({ limit, isMenstruating }: CycleLogProps) {
    const { allCheckups, fetchAllCheckups } = useCheckupStorage();
    // const displayedCycles = limit ? cycleData.slice(0, limit) : cycleData;
    var cycleData = allCheckups;
    var displayedCycles = limit ? cycleData.slice(0, limit) : cycleData;

    useEffect(() => {
        fetchAllCheckups();
        cycleData = allCheckups;
        displayedCycles = limit ? cycleData.slice(0, limit) : cycleData;
      }, []);

    return (
        <ScrollView>
            {displayedCycles!.map((checkup) => (
                <CheckupWidget key={checkup.date} {...checkup} isMenstruating={isMenstruating} />
            ))}
        </ScrollView>
    );
}