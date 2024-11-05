import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';

export function NotificationComponent() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null; // Do not render if the notification is deleted

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (isExpanded) {
          // Collapse the notification if it's already expanded
          setIsExpanded(false);
        } else {
          // Expand the notification
          setIsExpanded(true);
        }
      }}
    >
      <ThemedView style={[styles.container, isExpanded && { opacity: 0.5 }]}>
        {/* Left Circle with Date */}
        <View style={styles.dateCircle}>
          <ThemedText style={styles.monthText}>Oct.</ThemedText>
          <ThemedText style={styles.dayText}>19</ThemedText>
        </View>
        {/* Right Side with Header and Body */}
        <View style={styles.textContainer}>
          <ThemedText style={styles.headerText}>Examinations</ThemedText>
          <ThemedText style={styles.bodyText}>Complete your self examination.</ThemedText>
        </View>
      </ThemedView>

      {isExpanded && (
        <View style={styles.dismissOverlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.dismissBox}>
              <ThemedText style={styles.dismissText}>Dismiss</ThemedText>
              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF7FD',
    borderRadius: 50, // Makes the sides completely circular
    borderColor: '#B3B3B3',
    borderWidth: 1,
    padding: 15,
    alignItems: 'center',
    position: 'relative',
  },
  dateCircle: {
    backgroundColor: '#E93C92',
    width: 60,
    height: 60,
    borderRadius: 30, // Half of width and height to make it circular
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  monthText: {
    fontSize: 16,
    color: 'white',
  },
  dayText: {
    fontSize: 20,
    color: 'white',
  },
  textContainer: {
    flex: 1,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
  bodyText: {
    fontSize: 14,
    color: 'black',
  },
  dismissOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dismissBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 50, // For circular sides
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  dismissText: {
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
});
