import { useState } from "react";
import { getSetting, saveSetting } from "./useSettings";

export type Checkup = {
  completedOn: string; // Serves as ID when editing/viewing
  symptomsChecked: string[];
};

export type CompletedCheckups = Checkup[];

export const useCheckupData = () => {
  const [allCheckups, setAllCheckups] = useState<Checkup[]>([]); // Store all checkups (date + symptoms)

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

    saveSetting("checkups", storedCheckups);
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

  return {
    allCheckups,
    saveCompletedCheckup,
    getCheckup,
    getAllCheckups,
  };
};
