import { Animated, Button, Pressable, StyleSheet, Image, Text, View} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useState } from 'react';
import { TextInput } from 'react-native';
import { getBackgroundColorAsync } from 'expo-system-ui';
import { Link } from 'expo-router';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function UnderstandingBC() {

  return (
    <ParallaxScrollView
      headerImage={
        <Image
          source={{ uri: 'https://example.com/your-image.jpg' }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      }
      headerBackgroundColor={{ light: '#E93C92', dark: '#1A1A1A' }} 
    >
        <ThemedView style={styles.background}>
            <ThemedText>
                Hello, World!
            </ThemedText>
        </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
background: {
    backgroundColor: '#E93C92',
    flex: 1
},
whiteOverlay: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    height: 500,
    marginTop: 150,
    flexGrow: 1,
}
});