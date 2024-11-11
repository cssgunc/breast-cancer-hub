import { Button, Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { Link } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // New state for name input

    const handleSubmit = () => {
        if (!email.includes('@') || email.length === 0) {
            alert('Please enter a valid email address.');
            return;
        }

        if (password.length === 0) {
            alert('Please enter a password.');
            return;
        }

        if (name.length === 0) {
            alert('Please enter your name.');
            return;
        }

        submitToBackend();
    };

    const submitToBackend = () => {
        const [first_name, last_name = ''] = name.split(' '); // Split name into first and last names
        const data = {
            email,
            password,
            first_name,
            last_name
        };

        fetch('https://your-backend-endpoint.com/auth', { // Updated endpoint based on documentation
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 400) {
                    throw new Error('All fields are required or email already exists');
                } else {
                    throw new Error('Server error occurred');
                }
            })
            .then(responseData => {
                console.log(responseData.message);
                alert(responseData.message);
                setEmail('');
                setPassword('');
                setName('');
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
            });
    };

    return (
        <ThemedView style={styles.bodyContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.topText}>
                    <Text style={styles.welcome}>WELCOME</Text>
                    <Text style={styles.register}>Register in to The</Text>
                    <Text style={styles.bchText}>Breast Cancer Hub</Text>
                    <Text style={styles.selfExam}>self-exam App!</Text>
                </View>
                <View style={styles.inputsContainer}>
                    <View style={[styles.inputContainer, styles.emailContainer]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="gray"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <MaterialIcons name="mail" size={24} color="#e93c92" style={styles.icon} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Password"
                            placeholderTextColor="gray"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <MaterialIcons name="lock" size={24} color="gray" style={styles.icon} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Confirm password"
                            placeholderTextColor="gray"
                            secureTextEntry
                        />
                        <MaterialIcons name="lock" size={24} color="gray" style={styles.icon} />
                    </View>
                    <Text style={styles.userInfoLabel}>User Information</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Name"
                            placeholderTextColor="gray"
                            value={name}
                            onChangeText={setName}
                        />
                        <MaterialIcons name="person" size={24} color="gray" style={styles.icon} />
                    </View>
                    <Pressable style={styles.button}>
                        <Button title="Sign Up" color="white" onPress={handleSubmit} />
                    </Pressable>
                    <View style={styles.noAccount}>
                        <Text style={styles.noAccountText}>Already have an account? </Text>
                        <Link href="/login" style={styles.link}>Log in here</Link>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.info}>Information is collected for Dr. Lopa's team</Text>
                        <Link href="/" style={styles.link}>Learn more here</Link>
                    </View>
                </View>
            </ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        padding: 10,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    topText: {
        marginBottom: 20,
        marginTop: 100,
        alignItems: 'flex-start', 
        justifyContent: 'center',
    },
    welcome: {
      color: '#e93c92', 
      fontSize: 20,
      fontWeight: 'bold',
      textTransform: 'uppercase',  
      marginBottom: 3, 
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
      height: 60
    },
    emailContainer: {
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 40,
      paddingHorizontal: 15,
      marginVertical: 10,
      borderColor: '#e93c92',
      borderWidth: 2,      
      height: 60
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        fontSize: 15,
        height: 60,
        borderColor: '#e93c92',
    },
    passwordInput: {
        flex: 1,
        paddingVertical: 15,
        fontSize: 15,
        height: 60
    },
    icon: {
        marginHorizontal: 10,
    },
    userInfoLabel: {
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10,
        alignSelf: 'center',
        paddingLeft: 15,
    },
    button: {
        backgroundColor: '#e93c92',
        height: 60,
        width: '100%',
        borderRadius: 40,
        justifyContent: 'center',
        marginTop: 20,
    },
    noAccount: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    noAccountText: {
        fontSize: 14,
    },
    link: {
        color: '#68C4FF',
    },
    infoContainer: {
        alignItems: 'center',
        paddingTop: 15,
    },
    info: {
        fontStyle: 'italic',
        fontSize: 12,
    },
});