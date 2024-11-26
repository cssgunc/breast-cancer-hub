import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Linking, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AccountSettingsHeaderComponent } from '@/components/AccountSettingsHeader';
import { getSetting } from '../hooks/useSettings';
import { LearnMoreTextContainer } from '../components/LearnMoreText';

export default function HomeScreen() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [checkText, setCheckText] = useState("");

  useEffect(() => {
    const getType = async () => {
      const schedulingType = await getSetting('schedulingType');
      if (schedulingType == 'period') {
        setCheckText("Check yourself a week after your period starts.");
      } else {
        setCheckText("Check yourself the same day every month.");
      }
      setIsLoading(false);
    };

    getType();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <AccountSettingsHeaderComponent />

      <ThemedView style={styles.whiteOverlay}>
        <ThemedText style={styles.highlightedTitleText}>You're All Set!</ThemedText>
        <ThemedView style={styles.grayLine} />

        <View>
          <div style={{ 
            width: '100%',
            height: '100%',
            minWidth: '200px',
            minHeight: '200px',
            borderRadius: '50%', 
            backgroundColor: '#E93C92',
            alignContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../assets/images/BCH App Image 4.png')} style={{width: '75%', height: '77.5%', borderWidth: 0, objectFit: 'contain'}} />
            </View>
          </div>
        </View>
        
        <ThemedView style={styles.headerWhite}>
          <ThemedText style={styles.instructionTextBold}>Navigate to your calendar now.</ThemedText>
        </ThemedView>

        <ThemedView>
          <ThemedText style={styles.infoSourceText}>{ checkText }</ThemedText>
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonNext} onPress={() => router.push('/')}>
            <ThemedText style={styles.buttonTextNext}>Let's Go!</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonBack} onPress={() => Linking.openURL('https://www.breastcancerhub.org/about-breast-cancer')}>
            <ThemedText style={styles.buttonTextBack}>Explore Early Detection for Other Cancers</ThemedText>
          </TouchableOpacity>
        </ThemedView>

      </ThemedView>



    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E93C92',
  },
  headerWhite: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  iconWrapper: {
    backgroundColor: '#EFCEE6',
    borderRadius: 30,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 10,
  },
  whiteOverlay: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  // titleText: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   color: '#000000',
  //   paddingTop: 25,
  // },
  highlightedTitleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E93C92',
    marginBottom: 15,
    paddingTop: 10,
  },
  // subtitleText: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   color: '#000000',
  //   marginTop: 20,
  //   marginBottom: 10,
  // },
  instructionTextBold: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  infoSourceText: {
    fontSize: 12,
    color: '#999999',
    marginTop: 20,
    fontStyle: 'italic',
  },
  learnMoreText: {
    fontSize: 12,
    color: '#68C4FF',
    fontWeight: 'bold',
  },
  learnMoreTextContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    rowGap: 20,
    marginTop: 20,
    'alignItems': 'center',
  },
  buttonBack: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '60%',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ACACAC',
  },
  buttonNext: {
    backgroundColor: '#E93C92',
    paddingVertical: 10,
    paddingHorizontal: 40,
    width: '60%',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#E93C92',
  },
  buttonTextBack: {
    color: '#E93C92',
    fontSize: 14,
    textAlign: 'center'
  },
  buttonTextNext: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center'
  },
  grayLine: {
    height: 2,
    backgroundColor: '#D3D3D3',
    marginVertical: 10,
  },
});