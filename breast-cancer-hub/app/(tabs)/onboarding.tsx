import { Button, Pressable, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
// import { TextInput } from 'react-native-gesture-handler';
import { TextInput } from 'react-native';
import { getBackgroundColorAsync } from 'expo-system-ui';
import { Link } from 'expo-router';
import AntDesign from '@expo/vector-icons/build/AntDesign';


export default function HomeScreen() {
  //useState hooks for setting email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //code for validating the email inputted by user
  const handleSubmit = () => {
    if (!email.includes('@') || email.length === 0) {
      alert('Please enter a valid email address.');
      return;
    }}

  //data to send to the backend
  const data = {
    email,
    password,
  };

  // //code from GPT -- ASK TECH LEADS
  // fetch('https://your-backend-endpoint.com/api/login', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(data),
  // })
  //   .then(response => {
  //     if (response.ok) {
  //       console.log('Login successful');
  //       // Clear inputs on successful login
  //       setEmail('');
  //       setPassword('');
  //     } else {
  //       console.log('Login failed');
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });
  // };


  return (

    <ThemedView style={styles.bodyContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">A Commission for BreastCancerHub</ThemedText>
      </ThemedView>
      <ThemedView style={styles.popText}>
        <ThemedText style={styles.topText}>
          <ThemedText style={styles.welcome}>
            WELCOME
          </ThemedText>
          <ThemedText>
            Log in to The Breast Cancer Hub self-exam App!
          </ThemedText>
        </ThemedText>
        <ThemedView style={styles.inputsContainer}>
          <TextInput style={styles.input} placeholder='Email' placeholderTextColor='gray' value={email} onChangeText={setEmail}>
            <AntDesign name="mail" size={24} color="black" />
          </TextInput>
          <TextInput style={styles.input} placeholder='Password' placeholderTextColor='gray' value={password}onChangeText={setPassword}>
            <AntDesign name="lock" size={24} color="black" />
          </TextInput>
          <ThemedView style={styles.forgotPassword}>
            <Link href="" style={styles.link}>Forgot your password?</Link>
          </ThemedView>
          <Pressable style={styles.button}>
            <Button title="Log In" color='white' onPress={handleSubmit} />
          </Pressable>
          <ThemedView style={styles.noAccount}>
            <ThemedText style={styles.noAccountText}>Don't have an account? </ThemedText>
            <Link href="" style={styles.link}>Create one here</Link>
          </ThemedView>
        </ThemedView>
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
    margin: 10,
  },
  inputsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPassword: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingRight: 5,
    marginTop: 5,
  },
  noAccount: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    alignSelf: 'center',
    padding: 20,
  },
  noAccountText: {
    fontSize: 14,
  },
  popText: {
    margin: 'auto'
  },
  input: {
    height: 60,
    width: 344,
    borderColor: '#e93c92',
    borderWidth: 2,
    marginVertical: 10,
    padding: 10,
    borderRadius: 40,
    fontSize: 15,
    marginBottom: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },    
  button: {
    backgroundColor: '#e93c92',
    height: 60,
    width: 250,
    borderColor: '#e93c92',
    borderWidth: 2,
    marginVertical: 10,
    padding: 9,
    borderRadius: 40,
    fontSize: 20,
    marginTop: 35,
  },
  link: {
    color: '#68C4FF',
  },
  topText: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    height: 200
  },
  welcome: {
    color: '#e93c92',
  },
  logInToThe: {

  },
  bchText: {

  },
  selfExamApp: {
    
  }
});
