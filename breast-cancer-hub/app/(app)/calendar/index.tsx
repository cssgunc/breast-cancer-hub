import { useEffect, useState } from "react";
import { getSetting } from "@/hooks/useSettings";
import CalendarOnboardingScreen from "../customizeCalendar";
import CustomizeExamDateScreen from "../customizeExamDate";
import { useLocalSearchParams } from "expo-router";

export default function CalendarPage() {
  const [menstruates, setMenstruates] = useState(false);
  const params = useLocalSearchParams();

  useEffect(() => {
    getSetting("schedulingType").then((schedulingType) => {
      setMenstruates(schedulingType === "period");
    });
  }, []);

  return menstruates ? (
    <CalendarOnboardingScreen
      initialMonth={params.month ? Number(params.month) : undefined}
      initialYear={params.year ? Number(params.year) : undefined}
      fromBottomNav={params.fromBottomNav === "1"}
    />
  ) : (
    <CustomizeExamDateScreen fromBottomNav={params.fromBottomNav === "1"} />
  );
}
