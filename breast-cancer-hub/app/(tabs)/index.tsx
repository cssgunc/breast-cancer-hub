import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { NotificationComponent } from '@/components/Notifications';
import { CalendarComponent } from '@/components/Calendar'; // Ensure this path is correct
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.bodyContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Header Content */}
        <View style={styles.headerContent}>
          <ThemedText style={styles.homeText}>Home</ThemedText>
          <View style={styles.greetingContainer}>
            <ThemedText style={styles.greetingText}>Good Morning, </ThemedText>
            <ThemedText style={styles.nameText}>Jane!</ThemedText>
          </View>
        </View>
        {/* Profile Icon */}
        <TouchableOpacity style={styles.profileIconContainer}>
          <Ionicons name="person" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.contentContainer}>
        {/* Notifications Introduction Line */}
        <View style={styles.introLine}>
          <Ionicons name="notifications" size={20} color="#E93C92" style={styles.icon} />
          <ThemedText style={styles.introText}>Today</ThemedText>
          <View style={{ flex: 1 }} />
          <TouchableOpacity>
            <ThemedText style={styles.viewAllText}>View all</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} /> {/* Spacing */}
        {/* Notifications */}
        <NotificationComponent />
        <View style={{ height: 15 }} /> {/* Spacing between notifications */}
        <NotificationComponent />
        <View style={{ height: 40 }} /> {/* Spacing between sections */}

        {/* Spacer */}
        <View style={{ height: 20 }} />

        {/* Calendar Introduction Line */}
        <View style={styles.introLine}>
          <Ionicons name="calendar" size={20} color="#E93C92" style={styles.icon} />
          <ThemedText style={styles.calendarIntroText}>View your calendar</ThemedText>
        </View>

        <View style={{ height: 10 }} /> {/* Spacing */}

        {/* Calendar Component */}
        <CalendarComponent />

        {/* Customization Rectangle */}
        <TouchableOpacity style={styles.customizeContainer}>
          <ThemedText style={styles.customizeText}>
            Customize and manage breast{'\n'}examination schedule here
          </ThemedText>
        </TouchableOpacity>

        {/* View Past Examinations */}
        <TouchableOpacity>
          <ThemedText style={styles.pastExamsText}>View your past examinations here</ThemedText>
        </TouchableOpacity>

        {/* Spacer */}
        <View style={{ height: 20 }} />

        {/* Contact Buttons */}
        <TouchableOpacity style={styles.contactButton}>
          <ThemedText style={styles.contactButtonText}>Contact Dr. Lopez</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.learnMoreButton}>
          <ThemedText style={styles.learnMoreButtonText}>Learn More about Breast Cancer</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    backgroundColor: 'white', // Changed to white background
  },
  headerContainer: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    // Shadow (only visible on the bottom)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  headerContent: {
    flex: 1,
  },
  homeText: {
    fontSize: 24,
    color: '#E93C92',
    fontWeight: 'bold', // Made 'Home' bold
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingTop: 30,
    paddingBottom: 10,
  },
  greetingText: {
    fontSize: 29,
    fontWeight: 'bold',
    color: 'black',
  },
  nameText: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#E93C92',
  },
  profileIconContainer: {
    backgroundColor: '#E93C92',
    width: 40,
    height: 40,
    borderRadius: 20, // Makes it circular
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  introLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  introText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold', // Made 'Today' bold
  },
  viewAllText: {
    fontSize: 15,
    color: '#E93C92',
  },
  calendarIntroText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold', // Made 'View your calendar' bold
  },
  customizeContainer: {
    marginTop: 20,
    marginHorizontal: 50,
    backgroundColor: 'white',
    borderColor: '#E93C92',
    borderWidth: 2,
    borderRadius: 50, // Circular sides
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  customizeText: {
    textAlign: 'center',
    color: '#E93C92', // Changed text color to #E93C92
    fontWeight: 'bold',
  },
  pastExamsText: {
    marginTop: 20,
    marginBottom: 40,
    fontSize: 16,
    color: '#68C4FF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  contactButton: {
    marginTop: 20,
    marginHorizontal: 100,
    backgroundColor: '#E93C92', // Filled with #E93C92
    borderColor: '#E93C92', // Bordered with #E93C92
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: 'center',
  },
  contactButtonText: {
    color: 'white', // White text
    fontWeight: 'bold', // Bold text
  },
  learnMoreButton: {
    marginTop: 10,
    marginBottom: 30,
    marginHorizontal: 20,
    backgroundColor: 'white', // White filled
    borderColor: '#D5D5D5', // Bordered with #D5D5D5
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 15,
    alignItems: 'center',
  },
  learnMoreButtonText: {
    color: '#E93C92', // Text in #E93C92
    fontWeight: 'bold',
  },
});
