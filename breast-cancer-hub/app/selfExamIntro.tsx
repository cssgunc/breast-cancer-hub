import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { AccountSettingsHeaderComponent } from '@/components/AccountSettingsHeader';
import { getSetting } from '../hooks/useSettings';
import { LearnMoreTextContainer } from '../components/LearnMoreText';

export default function SelfExamInfo() {
  const router = useRouter();

  const info_f = [
    {id: 1, text: "Swelling of part or all of a breast."},
    {id: 2, text: "Skin irritation or dimpling (sometimes looking like an orange peel)"},
    {id: 3, text: "Breast or nipple pain."},
    {id: 4, text: "Nipple retraction (turning inward)"},
    {id: 5, text: "Redness, scaliness, or thickening of the nipples or breast skin"},
    {id: 6, text: "Nipple discharge (other than breast milk)"},
  ]
  const info_m = [
    {id: 1, text: "A painless lump or thickening in your breast tissue."},
    {id: 2, text: "Changes to the skin covering your breast, such as dimpling, wrinkling, redness, or scaling."},
    {id: 3, text: "Changes to your nipple, such as redness or scaling, or a nipple that begins to turn inward."},
    {id: 4, text: "Discharge from your nipple."},
  ]

  const [info, setInfo] = useState([{id: 1, text: "Loading signs and symptoms... "}])

  const [isLoading, setIsLoading] = useState(true);

  const [examTypeF, setExamTypeF] = useState(true);

  useEffect(() => {
    const getType = async () => {
      const schedulingType = await getSetting('schedulingType');
      setExamTypeF(schedulingType == 'period');
      setInfo(examTypeF ? info_f : info_m);
      setIsLoading(false);
    };

    getType();
  
  }, []);
  
  if (isLoading == true) {
    return (
      <ThemedView style={styles.container}>
      {/* Header Container */}
      <AccountSettingsHeaderComponent />

      {/* Page Title */}
      <ThemedView style={styles.whiteOverlay}>
        <ThemedText style={styles.highlightedTitleText}>Before You Begin</ThemedText>
        <ThemedText style={styles.titleText}>Things to Look For</ThemedText>

        <ThemedView style={styles.grayLine} />
      </ThemedView>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.whiteOverlay}>
        
          {/* Info Section */}
          <ThemedText style={styles.subtitleText}>Signs and Symptoms</ThemedText>

          <LearnMoreTextContainer />

          {/* Navigation Buttons */}
          <ThemedView style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonBack} onPress={() => router.back()}>
              <ThemedText style={styles.buttonTextBack}>Back</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNext} onPress={() => router.push('/selfExam')}>
              <ThemedText style={styles.buttonTextNext}>Next</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
    );
  } else {

    return (
      <ThemedView style={styles.container}>
        {/* Header Container */}
        <AccountSettingsHeaderComponent />

        {/* Page Title */}
        <ThemedView style={styles.whiteOverlay}>
          <ThemedText style={styles.highlightedTitleText}>Before You Begin</ThemedText>
          <ThemedText style={styles.titleText}>Things to Look For</ThemedText>

          <ThemedView style={styles.grayLine} />
        </ThemedView>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ThemedView style={styles.whiteOverlay}>
          
            {/* Info Section */}
            <ThemedText style={styles.subtitleText}>Signs and Symptoms</ThemedText>
              <ThemedView style={styles.listContainer}>
                {info.map((item: { id: number; text: string}) => (
                  <ThemedView key={item.id} style={styles.listItemContainer}>
                    <ThemedText style={styles.instructionTextBold}>{item.id + "."}</ThemedText>
                    <ThemedText style={styles.instructionText}>{item.text}</ThemedText>
                  </ThemedView>
                ))}
              </ThemedView>

            <LearnMoreTextContainer />

            {/* Navigation Buttons */}
            <ThemedView style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonBack} onPress={() => router.back()}>
                <ThemedText style={styles.buttonTextBack}>Back</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonNext} onPress={() => router.push('/selfExam')}>
                <ThemedText style={styles.buttonTextNext}>Next</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E93C92',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E93C92',
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
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    paddingTop: 25,
  },
  highlightedTitleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E93C92',
    marginBottom: 15,
    paddingTop: 10,
  },
  subtitleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: 'column',
    paddingVertical: 20,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  listItemContainer: {
    flexDirection: 'row',
    columnGap: 20,
    textAlign: 'left',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  instructionTextBold: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E93C92',
  },
  instructionText: {
    fontSize: 16,
    color: '#666666',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonBack: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ACACAC',
  },
  buttonNext: {
    backgroundColor: '#E93C92',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#E93C92',
  },
  buttonTextBack: {
    color: '#E93C92',
    fontSize: 18,
  },
  buttonTextNext: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  grayLine: {
    height: 2,
    backgroundColor: '#D3D3D3',
    marginVertical: 10,
  },
});