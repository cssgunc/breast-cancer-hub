import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Importing CalendarComponent
import { CalendarComponent } from '@/components/Calendar';

export default function ManageScheduleScreen() {
  const isMenstruating = true;
  const router = useRouter();
  const [showAllCheckups, setShowAllCheckups] = useState(false);

  // Sample data for previous checkups
  const checkups = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    cycleDate: 'August 4-10, 2024 (6 days)',
    checkupDate: 'Checkup completed: August 17',
  }));

  // Determine how many checkups to display
  const displayedCheckups = showAllCheckups ? checkups : checkups.slice(0, 3);

  const toggleShowAll = () => {
    setShowAllCheckups(!showAllCheckups);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>

        {/* Title */}
        <View style={styles.titleContainer}>
          <ThemedText style={styles.titleBlack}>Manage Your </ThemedText>
          <ThemedText style={styles.titlePink}>Schedule</ThemedText>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Current Cycle Section (only if isMenstruating is true) */}
        {isMenstruating && (
          <>
            <ThemedText style={styles.sectionTitle}>Your Current Cycle</ThemedText>
            {/* Calendar Component */}
            <View style={styles.calendarContainer}>
              <CalendarComponent isMenstruating={true} />
            </View>
            {/* Divider */}
            <View style={styles.divider} />
          </>
        )}

        {/* Recent Past Cycles Section */}
        <View style={styles.recentCyclesHeader}>
          <ThemedText style={styles.sectionTitle}>Your Recent Past Cycles</ThemedText>
          <TouchableOpacity onPress={toggleShowAll}>
            <ThemedText style={styles.viewAllText}>
              {showAllCheckups ? 'View Less' : 'View All'}
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* Checkups Container */}
        <View style={styles.checkupsOuterContainer}>
          <View style={styles.checkupsContainer}>
            {displayedCheckups.map((checkup) => (
              <View key={checkup.id} style={styles.checkupCard}>
                <ThemedText style={styles.checkupCycleText}>
                  {checkup.cycleDate}
                </ThemedText>
                <ThemedText style={styles.checkupDateText}>
                  {checkup.checkupDate}
                </ThemedText>
                <TouchableOpacity>
                  <ThemedText style={styles.viewDetailsText}>View Checkup Details</ThemedText>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7FD',
  },
  headerContainer: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: Platform.OS === 'ios' ? 80 : 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    // Shadow for header
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,

    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1, // Ensures the header is above other components
  },
  backButton: {
    backgroundColor: '#E93C92',
    width: 40,
    height: 40,
    borderRadius: 20, // Circular button
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  titleBlack: {
    fontSize: 29,
    color: 'black',
    fontWeight: 'bold',
  },
  titlePink: {
    fontSize: 29,
    color: '#E93C92',
    fontWeight: 'bold',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  recentCyclesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewAllText: {
    fontSize: 15,
    color: '#E93C92',
    fontWeight: 'bold',
  },
  // Added checkupsOuterContainer
  checkupsOuterContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    // Shadow for the container
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  checkupsContainer: {
    // Removed marginTop to align inside the white container
  },
  checkupCard: {
    backgroundColor: '#FFF7FD',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    // Removed shadow from individual cards
  },
  checkupCycleText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  checkupDateText: {
    fontSize: 15,
    color: 'black',
    marginTop: 5,
  },
  viewDetailsText: {
    fontSize: 15,
    color: '#68C4FF',
    marginTop: 5,
  },
  calendarContainer: {
    backgroundColor: '#FFF7FD', // Matches the page background
    borderRadius: 10,
    padding: 10,
    // Adjust as needed for your CalendarComponent
  },
});
