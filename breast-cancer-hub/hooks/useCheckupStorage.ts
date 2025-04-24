import { useState } from "react";
import * as SecureStore from "expo-secure-store";

export const useCheckupStorage = () => {
  const [symptoms, setSymptoms] = useState<boolean[]>([]); // Store symptoms of a checkup
  const [allCheckups, setAllCheckups] = useState<any[]>([]); // Store all checkups (date + symptoms)

  // Save a new checkup (add to the array)
  const saveCheckup = async (selectedSymptoms: boolean[]) => {
    // const checkupDay = new Date().toISOString().split("T")[0];
    const checkupDay = new Date().toISOString();

    // Get all stored checkups
    const storedCheckupsString = await SecureStore.getItemAsync("checkups");
    let storedCheckups = storedCheckupsString
      ? JSON.parse(storedCheckupsString)
      : [];

    const existingIndex = storedCheckups.findIndex(
      (c: { date: string; }) => c.date === checkupDay
    );

    if (existingIndex !== -1) {
      // Update the existing checkup instead of adding a duplicate
      storedCheckups[existingIndex].symptoms = selectedSymptoms;
    } else {
      // New checkup
      storedCheckups.push({ date: checkupDay, symptoms: selectedSymptoms });
    }

    console.log("Stored checkups:", storedCheckups);
    await SecureStore.setItemAsync("checkups", JSON.stringify(storedCheckups));

    setSymptoms(selectedSymptoms);
  };

  // Fetch symptoms for a specific checkup date
  const fetchSymptoms = async (date: string) => {
    // const checkupDate = date.toISOString().split("T")[0];
    // const checkupDate = date.toISOString();
    // assume date passed in is already in format
    const checkupDate = date;

    const storedCheckupsString = await SecureStore.getItemAsync("checkups");
    const storedCheckups = storedCheckupsString
      ? JSON.parse(storedCheckupsString)
      : [];

    const checkup = storedCheckups.find(
      (checkup: any) => checkup.date === checkupDate
    );

    if (checkup) {
      setSymptoms(checkup.symptoms);
    } else {
      setSymptoms([]); // No checkup found for the date
    }
  };

  // Fetch all stored checkups
  const fetchAllCheckups = async () => {
    const storedCheckupsString = await SecureStore.getItemAsync("checkups");
    let storedCheckups = storedCheckupsString
      ? JSON.parse(storedCheckupsString)
      : [];

    if (storedCheckups) {
      setAllCheckups(storedCheckups);
    } else {
      setAllCheckups([]); // No checkups stored yet
    }
  };

  const clearCheckups = async () => {
    await SecureStore.deleteItemAsync("checkups");
    setAllCheckups([]); // Clear the state as well
    setSymptoms([]); // Clear the symptoms state
    console.log("Checkups cleared");
  };

  return {
    symptoms,
    allCheckups,
    saveCheckup,
    fetchSymptoms,
    fetchAllCheckups,
    clearCheckups,
  };
};
