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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!email.includes('@') || email.length === 0) {
      alert('Please enter a valid email address.');
      return;
    }

    const data = { email, password };

    fetch('https://your-backend-endpoint.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          console.log('Login successful');
          setEmail('');
          setPassword('');
        } else {
          alert('Login failed. Please check your credentials.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  return (

    <ThemedView style={styles.bodyContainer}>
      <ThemedView style={styles.topText}>
          <ThemedText style={styles.welcome}>WELCOME</ThemedText>
          <ThemedText style={styles.register}>Register in to The</ThemedText>
          <ThemedText style={styles.bchText}>Breast Cancer Hub</ThemedText>
          <ThemedText style={styles.selfExam}>self-exam App!</ThemedText>
        </ThemedView>
        <ThemedView style={styles.inputsContainer}>
          <TextInput style={styles.input} placeholder='Email' placeholderTextColor='gray' value={email} onChangeText={setEmail}>
          </TextInput>
          <TextInput style={styles.passwordInput} placeholder='Password' placeholderTextColor='gray' value={password}onChangeText={setPassword}>
          </TextInput>
          <ThemedView style={styles.forgotPassword}>
            <Link href="/" style={styles.link}>Forgot your password?</Link>
          </ThemedView>
          <Pressable style={styles.button}>
            <Button title="Log In" color='white' onPress={handleSubmit} />
          </Pressable>
          <ThemedView style={styles.noAccount}>
            <ThemedText style={styles.noAccountText}>Don't have an account? </ThemedText>
            <Link href="/singup" style={styles.link}>Create one here</Link>
          </ThemedView>
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
  passwordInput: {
    height: 60,
    width: 344,
    marginVertical: 10,
    padding: 10,
    borderRadius: 40,
    fontSize: 15,
    marginBottom: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: '#ECECEC'
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
    padding: 20,
    alignItems: 'flex-start', 
    justifyContent: 'center',
    width: 370
  },
  welcome: {
    color: '#e93c92', 
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',  
    marginBottom: 3, 
    marginTop: 52
  },
  register: {
    color: '#333',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 3,
    lineHeight: 40,   
  },
  bchText: {
    color: '#e93c92', 
    fontWeight: 'bold',
    fontSize: 35,
    marginTop: 3,    
    lineHeight: 40, 
  },
  selfExam: {
    color: '#333',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 3,
    lineHeight: 40, 
  },
});

//lock: <AntDesign name="lock" size={24} color="black" />
//email: <AntDesign name="mail" size={24} color="black" />
