import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const SelfExamScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>
      <View style={styles.content}>
        <Text style={styles.stepTitle}>Begin your self exam</Text>
        <Text style={styles.step}>Step 1</Text>

        <View style={styles.divider} />

        <View style={styles.imageTextContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/BCH App Screenshot Oct 14.png')}
              style={styles.image}
            />
          </View>

          <Text style={styles.description}>
            Check your breasts in front of a mirror for any symptoms or abnormalities
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.buttonText1}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/self-exam2')}>
          <Text style={styles.buttonText2}>Next</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e93c92',
    padding: 10,
    paddingTop: 30,
    height: 90,
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10, 
    marginTop: -10, 
    paddingTop: 30, 
    overflow: 'hidden',
  },
  stepTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    paddingTop: 10,
    paddingLeft: 40, 
  },
  step: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e93c92',
    marginVertical: 5,
    paddingLeft: 40, 
  },
  divider: {
    width: '80%', 
    height: 2,
    backgroundColor: 'lightgrey', 
    alignSelf: 'center',
    marginVertical: 10,
  },
  imageTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  imageContainer: {
    borderColor: '#e93c92',
    borderRadius: 10,
    width: 290,
    height: 261,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  description: {
    fontSize: 20,
    color: '#3E3E3E',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 40,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  backButton: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 2,
    borderColor: 'lightgrey',
  },
  nextButton: {
    backgroundColor: '#e93c92',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buttonText1: {
    color: '#e93c92',
    fontWeight: 'bold',
  },
  buttonText2: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default SelfExamScreen;
