import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const SelfExamScreen2 = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>
      <View style={styles.content}>
        <Text style={styles.step}>Step 2</Text>

        <View style={styles.divider} />

        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/Oct 14 Screenshot from BCH App (1).png')}
            style={styles.image}
          />
        </View>

        <Text style={styles.description}>
          Examine the nipple. Most men find lumps under the nipple.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/male-self-exam')}>
          <Text style={styles.buttonText1}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/male-self-exam3')}>
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
    backgroundColor: '#65558F', 
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
  step: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#65558F', 
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
  imageContainer: {
    borderColor: '#65558F', 
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 20,
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
    marginVertical: 5,
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
    backgroundColor: '#65558F', 
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buttonText1: {
    color: '#65558F', 
    fontWeight: 'bold',
  },
  buttonText2: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default SelfExamScreen2;
