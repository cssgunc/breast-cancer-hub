import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CompleteScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Icons can be added here if needed */}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>You're all set!</Text>

        <View style={styles.divider} />

        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <Image
              source={require('../../assets/images/BCH App Image 4.png')}
              style={styles.iconImage}
            />
          </View>
        </View>

        <Text style={styles.subtitle}>Navigate to your calendar now.</Text>

        <Text style={styles.description}>
          Check your breasts the same day of every month. Check yourself a week after your period starts
        </Text>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progress}></View>
          </View>
          <Text style={styles.progressText}>100%</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Let's go!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Explore Early Detection for Other Cancers</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#65558F', 
    height: 100,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: -10,
    paddingTop: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#65558F',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
  },
  divider: {
    width: '90%',
    height: 2,
    backgroundColor: 'lightgrey',
    marginVertical: 10,
    alignSelf: 'center',
  },
  iconContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#65558F', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#65558F', 
    textAlign: 'center',
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  progressBarContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 15,
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    width: '100%',
    height: '100%',
    backgroundColor: '#65558F', 
  },
  progressText: {
    fontSize: 14,
    color: '#65558F',
    marginTop: 5,
  },
  footer: {
    padding: 20,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#65558F', 
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderColor: '#65558F', 
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  secondaryButtonText: {
    color: '#65558F', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CompleteScreen;
