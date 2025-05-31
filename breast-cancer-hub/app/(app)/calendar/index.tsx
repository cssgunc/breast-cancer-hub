import { useEffect, useState } from "react";
import { getSetting } from "@/hooks/useSettings";
import CalendarOnboardingScreen from "../customizeCalendar";
import CustomizeExamDateScreen from "../customizeExamDate";

export default function CalendarPage() {
  const [menstruates, setMenstruates] = useState(false);
  useEffect(() => {
    getSetting("schedulingType").then((schedulingType) => {
      setMenstruates(schedulingType === "period");
    });
  }, []);

  return menstruates ? (
    <CalendarOnboardingScreen />
  ) : (
    <CustomizeExamDateScreen />
  );
}
