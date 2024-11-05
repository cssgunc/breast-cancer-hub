import { Animated, Button, Pressable, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
// import { TextInput } from 'react-native-gesture-handler';
import { TextInput } from 'react-native';
import { getBackgroundColorAsync } from 'expo-system-ui';
import { Link } from 'expo-router';
import AntDesign from '@expo/vector-icons/build/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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
      <ThemedView style={styles.popText}>
        <ThemedView style={styles.topText}>
          <ThemedText style={styles.welcome}>WELCOME</ThemedText>
          <ThemedText style={styles.register}>Log in to The</ThemedText>
          <ThemedText style={styles.bchText}>Breast Cancer Hub</ThemedText>
          <ThemedText style={styles.selfExam}>self-exam App!</ThemedText>
        </ThemedView>
        <ThemedView style={styles.inputsContainer}>
          <ThemedView style={styles.inputContainer}>
            <TextInput
              style={styles.emailInput}
              placeholder="Email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
            />
            <MaterialIcons style={styles.iconPositions} name="mail" size={24} color="#e93c92" />
          </ThemedView>
          <ThemedView style={styles.inputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="gray"
              value={password}
              onChangeText={setPassword}
            />
            <MaterialIcons style={styles.iconPositions} name="lock" size={24} color="gray" />
          </ThemedView>
          <ThemedView style={styles.forgotPassword}>
            <Link href="/" style={styles.link}>Forgot your password?</Link>
          </ThemedView>
          <Pressable style={styles.button}>
            <Button title="Log In" color="white" onPress={handleSubmit} />
          </Pressable>
          <ThemedView style={styles.noAccount}>
            <ThemedText style={styles.noAccountText}>Don't have an account? </ThemedText>
            <Link href="/signup" style={styles.link}>Create one here</Link>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    padding: 10,
  },
  popText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topText: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcome: {
    color: '#e93c92',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  register: {
    color: '#333',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bchText: {
    color: '#e93c92',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selfExam: {
    color: '#333',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECECEC',
    borderRadius: 40,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  emailInput: {
    flex: 1,
    height: 50,
    fontSize: 15,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 15,
  },
  iconPositions: {
    marginHorizontal: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    paddingRight: 20,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#e93c92',
    width: '80%',
    borderRadius: 40,
    marginVertical: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  noAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  noAccountText: {
    fontSize: 14,
  },
  link: {
    color: '#68C4FF',
  },
});
