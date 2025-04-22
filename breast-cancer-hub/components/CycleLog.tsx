import { ScrollView } from "react-native";
import CheckupWidget from "@/components/CheckupWidget";

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
    limit?: number;
    isMenstruating: boolean;
}

export default function CycleLog({ limit, isMenstruating }: CycleLogProps) {
    const displayedCycles = limit ? cycleData.slice(0, limit) : cycleData;

    return (
        <ScrollView>
            {displayedCycles.map((item, index) => (
                <CheckupWidget key={index} {...item} isMenstruating={isMenstruating} />
            ))}
        </ScrollView>
    );
}