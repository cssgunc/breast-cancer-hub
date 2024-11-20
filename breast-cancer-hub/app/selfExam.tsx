import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {

  const instructions = [
    "Check your breasts in front of a mirror for any symptoms or abnormalities.",
    "Check your nipples carefully. Lumps may be found behind the nipple.",
    "In a sitting or standing position, use the pads of the three middle fingers. Examine using light, medium, and deep pressure. See next step.",
    "Examining starts at the collarbone and continues down and up the entire breast in a vertical pattern.",
    "Lie down, face up, which leads to a more even distribution of your breast tissue. Repeat step 3 and 4."
  ];

  const image_sources_f = [
    '../assets/images/FEMALE ART 1.jpg',
    '../assets/images/FEMALE ART 2.jpg',
    '../assets/images/FEMALE ART 3.jpg',
    '../assets/images/FEMALE ART 4.jpg',
    '../assets/images/FEMALE ART 5.jpg',
  ];

  const image_sources_m = [
    '../assets/images/MALE ART 1.jpg',
    '../assets/images/MALE ART 2.jpg',
    '../assets/images/MALE ART 3.jpg',
    '../assets/images/MALE ART 4.jpg',
    '../assets/images/MALE ART 5.jpg',
  ]

  return (

    <ThemedView style={styles.bodyContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">A Commission for BreastCancerHub</ThemedText>
      </ThemedView>
      <ThemedView style={styles.popText}>
        <ThemedText type="default">Tab for the self-examination screen</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 8,
  },
  bodyContainer: {
    flexDirection: 'column',
    height: '100%',
    margin: 10
  },
  popText: {
    margin: 'auto'
  }
});
