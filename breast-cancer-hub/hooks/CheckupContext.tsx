import { createContext, useContext, useEffect, useState } from "react";
import { getSetting, saveSetting } from "./useSettings";
import { PeriodTimestamp } from "./PeriodContext";
import { ScheduleExamNotifications } from "@/notifications/notifications";
import { parseISODate } from "@/constants/dateTimeUtils";
export type Checkup = {
  completedOn: string;
  symptomsChecked: string[];
};

export type CompletedCheckups = Checkup[];

interface CheckupContextValue {
  nextCheckup: Date;
  allCheckups: CompletedCheckups;
  saveCompletedCheckup: (s: string[]) => Promise<void>;
  getCheckup: (d: string) => Promise<Checkup | undefined>;
  getAllCheckups: (d: Date) => Promise<CompletedCheckups>;
  scheduleNextCheckup: (newTs?: PeriodTimestamp[]) => Promise<Date>;
  rescheduleNotifications: () => Promise<void>;
}
const CheckupContext = createContext<CheckupContextValue | null>(null);

export const CheckupProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [allCheckups, setAllCheckups] = useState<Checkup[]>([]); // Store all checkups (date + symptoms)
  const [nextCheckup, setNextCheckup] = useState<Date>(new Date());

  useEffect(() => {
    (async () => {
      const storedCheckup = await getSetting("nextExamDate");
      const storedDate = parseISODate(storedCheckup);
      setNextCheckup(storedDate);
      const storedCheckupHistory = await getSetting("checkups");
      setAllCheckups(storedCheckupHistory);
    })();
  }, []);

  // Save a new checkup (add to the array)
  const saveCompletedCheckup = async (selectedSymptoms: string[]) => {
    // Create object from completed checkup
    const checkupDay = new Date().toISOString().split("T")[0];
    const completedCheckup = {
      completedOn: checkupDay,
      symptomsChecked: selectedSymptoms,
    };

    // Get all stored checkups and check for duplicate date
    const storedCheckups = await getSetting("checkups");
    const idx = storedCheckups.findIndex((c) => c.completedOn === checkupDay);

    // Replace in place
    if (idx >= 0) {
      storedCheckups[idx].symptomsChecked = selectedSymptoms;
    } else {
      storedCheckups.push(completedCheckup);
    }

    await saveSetting("checkups", storedCheckups);
    setAllCheckups(storedCheckups);
  };

  // Fetch symptoms for a specific checkup date
  const getCheckup = async (date: string) => {
    const checkupDate = date;

    const storedCheckups = await getSetting("checkups");

    const checkup = storedCheckups.find(
      (checkup: Checkup) => checkup.completedOn === checkupDate
    );

    return checkup;
  };

  // Fetch all stored checkups
  const getAllCheckups = async () => {
    const allCheckups = await getSetting("checkups");
    setAllCheckups(allCheckups);
    return allCheckups;
  };

  const scheduleNextCheckup = async (timestamps?: PeriodTimestamp[]) => {
    let scheduledExam: Date = new Date();
    const userMenstruationType = await getSetting("schedulingType");
    if (userMenstruationType === "period") {
      let periodTimestamps = timestamps;
      if (!periodTimestamps)
        periodTimestamps = await getSetting("periodTimestamps");
      if (periodTimestamps && periodTimestamps.length > 0) {
        const lastTimestamp = periodTimestamps.at(-1);
        if (lastTimestamp) scheduledExam = addDaysToTimestamp(lastTimestamp, 7);
      } else scheduledExam = new Date(); // No period data, schedule for today
    } else {
      const examDay = userMenstruationType.day;
      scheduledExam = await getNextMonthlyDate(examDay);
    }
    saveSetting("nextExamDate", scheduledExam.toISOString().split("T")[0]);
    setNextCheckup(scheduledExam);
    ScheduleExamNotifications(scheduledExam);
    return scheduledExam;
  };

  // Use when the date itself hasn't changed but notification settings have changed
  const rescheduleNotifications = async () => {
    ScheduleExamNotifications(nextCheckup);
  };
  return (
    <CheckupContext.Provider
      value={{
        nextCheckup,
        allCheckups,
        saveCompletedCheckup,
        getCheckup,
        getAllCheckups,
        scheduleNextCheckup,
        rescheduleNotifications,
      }}
    >
      {children}
    </CheckupContext.Provider>
  );
};

const addDaysToTimestamp = (ts: PeriodTimestamp, days: number) => {
  const timestampDate = new Date(ts.year, ts.month - 1, ts.date);
  timestampDate.setDate(timestampDate.getDate() + days);
  return timestampDate;
};

const getNextMonthlyDate = async (
  targetDay: number,
  from = new Date()
): Promise<Date> => {
  const year = from.getFullYear();
  const month = from.getMonth();

  const storedCheckups = await getSetting("checkups");
  const checkupDates = storedCheckups.map((checkup) => {
    return parseISODate(checkup.completedOn);
  });

  // get last checkup date
  let lastCheckupDate = new Date(0);
  for (let i = 0; i < checkupDates.length; i++) {
    if (checkupDates[i].getTime() > lastCheckupDate.getTime()) {
      lastCheckupDate = checkupDates[i];
    }
  }

  const lastCheckupYear = lastCheckupDate.getFullYear();
  const lastCheckupMonth = lastCheckupDate.getMonth();
  const lastCheckupDay = lastCheckupDate.getDate();

  // Have we passed this date this month already?
  const offset =
    // If last checkup was not the current month, not done this month.
    !(lastCheckupYear === year && lastCheckupMonth === month) ||
    // If last checkup was not on or after the exam day, not done this month.
    lastCheckupDay < targetDay
      ? 0
      : 1;

  const targetMonth = month + offset;

  // Get last day of month
  const daysInMonth = new Date(year, targetMonth + 1, 0).getDate();

  // Clamp day to last day
  const day = Math.min(targetDay, daysInMonth);

  return new Date(year, targetMonth, day);
};
export function useCheckupData() {
  const ctx = useContext(CheckupContext);
  if (!ctx) throw new Error("useCheckup must be inside CheckupProvider");
  return ctx;
}
