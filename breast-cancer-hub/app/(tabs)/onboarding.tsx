import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  return (

    <ThemedView style={styles.bodyContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">A Commission for BreastCancerHub</ThemedText>
      </ThemedView>
      <ThemedView style={styles.popText}>
        <ThemedText type="default">Tab for onboarding</ThemedText>
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
