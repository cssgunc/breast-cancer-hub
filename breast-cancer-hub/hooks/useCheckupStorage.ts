import { useState } from "react";
import * as SecureStore from "expo-secure-store";

export const useCheckupStorage = () => {
  const [symptoms, setSymptoms] = useState<boolean[]>([]); // Store symptoms of a checkup
  const [allCheckups, setAllCheckups] = useState<any[]>([]); // Store all checkups (date + symptoms)

  // Save a new checkup (add to the array)
  const saveCheckup = async (selectedSymptoms: boolean[]) => {
    const checkupDay = new Date().toISOString().split("T")[0];

    // Get all stored checkups
    const storedCheckupsString = await SecureStore.getItemAsync("checkups");
    let storedCheckups = storedCheckupsString
      ? JSON.parse(storedCheckupsString)
      : [];

    const newCheckup = {
      date: checkupDay,
      symptoms: selectedSymptoms,
    };

    storedCheckups.push(newCheckup);

    await SecureStore.setItemAsync("checkups", JSON.stringify(storedCheckups));

    setSymptoms(selectedSymptoms);
  };

  // Fetch symptoms for a specific checkup date
  const fetchSymptoms = async (date: string) => {
    // const checkupDate = date.toISOString().split("T")[0];
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
      storedCheckups = JSON.parse(storedCheckups); 
      setAllCheckups(storedCheckups);
    } else {
      setAllCheckups([]); // No checkups stored yet
    }
  };

  return {
    symptoms,
    allCheckups,
    saveCheckup,
    fetchSymptoms,
    fetchAllCheckups,
  };
};
