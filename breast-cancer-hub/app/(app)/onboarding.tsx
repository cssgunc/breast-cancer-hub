import React, { useState, useRef, useEffect, } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Image
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { AccountSettingsHeaderComponent } from "@/components/AccountSettingsHeader";
import { LearnMoreTextContainer } from "@/components/LearnMoreText";
import StepIndicators from "@/components/StepIndicators";
import { ExternalLink } from "@/components/ExternalLink";
import { router } from "expo-router";
import { SelectLanguage } from "@/components/SelectLanguage";
import { useColors } from "@/components/ColorContext";
import { saveSetting } from "@/hooks/useSettings";

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const totalSteps = 8; 
  const scrollViewRef = useRef<ScrollView>(null);
  const [telemetryEnabled, setTelemetryEnabled] = useState(false);

  const {colors, globalStyles, setDarkMode} = useColors();
  const [IsDarkThemeEnabled, setIsDarkThemeEnabled] = React.useState(false);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [step]);

  const handleNext = () => {
    saveSetting("useTelemetry", telemetryEnabled);
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    saveSetting("useTelemetry", telemetryEnabled)
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const avatarPress = async (avatarType: boolean) => {
    try {
      saveSetting("avatar", avatarType);
      console.log("Saved avatar presentation");
    }
    catch (e) {
      console.error(e);
    }
  }

  const styles = StyleSheet.create({
    stepOneNextContainer: {
      justifyContent: "flex-end",
    },
    scrollContent: {
      flexGrow: 1,
      paddingTop: 10,
      paddingHorizontal: 10,
      paddingBottom: 20, 
      backgroundColor: "white",
      borderTopLeftRadius: 17,
      borderTopRightRadius: 17,
      marginTop: 10,
    },
    background: {
      padding: 10,
    },
    titleContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    highlightedTitleText: {
      marginBottom: 15,
      paddingTop: 10,
    },
    paragraphTextTitle: {
      marginTop: 10,
    },
    statContainer: {
      backgroundColor: colors.backgroundLightGray,
      padding: 10,
      borderLeftWidth: 4,
      borderColor: colors.darkHighlight,
      marginVertical: 15,
    },
    statText: {
      marginBottom: 10,
    },
    noticeTitle: {
      marginVertical: 10,
    },
    noticeText2: {
      marginTop: 20,
    },
    infoText: {
      marginVertical: 10,
    },
    infoBoldText: {
      marginVertical: 15,
      marginTop: 20,
    },
    quotesContainer: {
      marginVertical: 20,
      alignItems: "center",
      gap: 10,
    },
    buttonStepZeroContainer: {
      flexDirection: "row", 
      justifyContent: "flex-end", 
      width: "100%", 
      paddingHorizontal: 10, 
      marginRight: 30
    },
    image: {
      width: 300,
      height: 300,
    },
    avatar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      gap: 50,
      marginTop: 15,
      marginBottom: 15,
    },
  });

  return (
    <ThemedView style={globalStyles.bodyContainerDarkHighlight}>
      <AccountSettingsHeaderComponent />
      <ScrollView 
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollContent}>
        {step === 0 && (
          //understanding breast cancer section
          <ThemedView style={globalStyles.whiteOverlay}>
            <ThemedView style={styles.background}>
              <ThemedView style={styles.titleContainer}>
                <ThemedText style={globalStyles.titleText}>
                  Understanding
                </ThemedText>
                <ThemedText style={[globalStyles.titleTextDarkHighlight,
                styles.highlightedTitleText]}>
                  Breast Cancer
                </ThemedText>
              </ThemedView>
              <ThemedView style={globalStyles.grayLine} />
              <ThemedText type= "subtitle" style={styles.paragraphTextTitle}>
                What is Breast Cancer?
              </ThemedText>
              <ThemedText>
                Cancer: the development of abnormal cells that divide uncontrollably
                and possess the ability to infiltrate and demolish normal body tissue.
                {"\n\n"}In the body, there are trillions of cells that grow and divide to
                help the body function properly. Cells die when they become old or damaged,
                and new cells replace them.
                {"\n\n"}Breast Cancer is when cancer forms in the breast. This disease can
                occur in both women and men, but is far more prevalent in women.
              </ThemedText>
              <ThemedView style={styles.statContainer}>
                <ThemedText type="subtitle" colored>2nd</ThemedText>
                <ThemedText style={styles.statText}>
                  most common cancer in women
                </ThemedText>
                <ThemedText type="subtitle" colored>1 out of 8</ThemedText>
                <ThemedText style={styles.statText}>
                  women will develop invasive breast cancer over the course of her
                  lifetime
                </ThemedText>
              </ThemedView>
              <StepIndicators totalSteps={totalSteps} currentStep={step} />
              <LearnMoreTextContainer />
            </ThemedView>
          </ThemedView>
        )}

        {step === 1 && (
          //purpose of a self-exam section
          <ThemedView style={globalStyles.whiteOverlay}>
            <ThemedText style={globalStyles.titleText}>
              The Purpose of
            </ThemedText>
            <ThemedText
              style={[
                globalStyles.titleTextDarkHighlight,
                styles.highlightedTitleText,
              ]}
            >
              A Self-Exam
            </ThemedText>
            <ThemedView style={globalStyles.grayLine} />
            <ThemedText type="subtitle" style={styles.noticeTitle} colored>Notice:</ThemedText>
            <ThemedText>
              A self-exam is not a substitute for annual breast cancer screenings.
              <ThemedText italic bold> Mammograms are essential.</ThemedText>
            </ThemedText>
            <ThemedText italic style={styles.noticeText2}>
              The most recent American Cancer Society guidelines recommend women
              ages <ThemedText colored bold>40 to 44</ThemedText> should consider
              annual breast cancer screenings with mammograms. Women ages{" "}
              <ThemedText colored bold>45 to 54</ThemedText> should get mammograms
              every year. Women <ThemedText colored bold>55 and older</ThemedText>{" "}
              should switch to mammograms every 2 years or can continue yearly screening.
            </ThemedText>
            <ThemedText bold style={styles.infoBoldText}>
              Dr. Lopa’s self-exams are effective precautionary and preventative measures
              for detecting symptoms of breast cancer.
            </ThemedText>
            <ThemedText style={styles.infoText}>
              Being familiar with how our breasts look and feel can help us notice
              symptoms such as lumps, pain, or changes in size that may be of concern
              and respond to them.
            </ThemedText>
            <ThemedView style={globalStyles.grayLine} />
            <ThemedView style={styles.quotesContainer}>
              <ThemedText italic colored>
                “The difference is, this could save your life.”
              </ThemedText>
              <ThemedText italic colored>
                “Mammograms are important, self-exams are how you are going to find
                cancer early and save your life.”
              </ThemedText>
              <ThemedText italic colored>
                “Early detection is the key.”
              </ThemedText>
            </ThemedView>
            <StepIndicators totalSteps={totalSteps} currentStep={step} />
            <LearnMoreTextContainer />
          </ThemedView>
        )}

        {step === 2 && (
          //breast cancer screening and techniques section
          <ThemedView style={globalStyles.whiteOverlay}>
            <ThemedView style={styles.background}>
              <ThemedView style={styles.titleContainer}>
                <ThemedText style={globalStyles.titleText}>
                  Breast Cancer
                </ThemedText>
                <ThemedText style={[globalStyles.titleTextDarkHighlight,
                styles.highlightedTitleText]}>
                  Screening & Techniques
                </ThemedText>
              </ThemedView>
              <ThemedView style={globalStyles.grayLine} />
              <ThemedText>
                Breast cancer originates in one or both breasts. Early detection through regular screening is essential because it enables treatment at a stage when the cancer is most manageable, often resulting in less aggressive interventions and improved survival rates.
                {"\n\n"}
                Screening Methods:
                {"\n\n"}• <ThemedText italic bold>Breast Self-Examination:</ThemedText> It is advisable to begin self-exams between the ages of 17 and 18. Becoming familiar with the normal appearance and feel of your breast tissue can help you identify any changes or abnormalities promptly.
                {"\n\n"}• <ThemedText italic bold>Clinical Breast Examination:</ThemedText> This involves a physical examination of the breasts performed by a qualified healthcare provider.
                {"\n\n"}• <ThemedText italic bold>Mammography:</ThemedText> Women aged 40 and older should undergo annual mammograms. However, it is important to note that mammograms may miss approximately 50% of cancers in women with dense breast tissue.
                {"\n\n"}• <ThemedText italic bold>Advanced Imaging for Dense Breasts:</ThemedText> For women with dense breasts, additional screening methods such as 3-D mammography (tomosynthesis), breast MRI, breast ultrasound, or molecular breast imaging (MBI) may be recommended.
                {"\n\n"}• <ThemedText italic bold>High-Risk Individuals:</ThemedText> Those identified as having a high risk for breast cancer should consider initiating screening earlier and undergoing more frequent evaluations.
              </ThemedText>
              <StepIndicators totalSteps={totalSteps} currentStep={step} />
              <LearnMoreTextContainer />
            </ThemedView>
          </ThemedView>
        )}

        {step === 3 && (
          //additional resources and contact information section
          <ThemedView style={globalStyles.whiteOverlay}>
            <ThemedView style={styles.background}>
              <ThemedView style={styles.titleContainer}>
                <ThemedText style={globalStyles.titleText}>
                  Additional Resources &
                </ThemedText>
                <ThemedText style={[globalStyles.titleTextDarkHighlight,
                styles.highlightedTitleText]}>
                  Contact Information
                </ThemedText>
              </ThemedView>
              <ThemedView style={globalStyles.grayLine} />
              <ThemedText>
                If you experience any symptoms or require further testing, please consult your healthcare provider promptly.
                {"\n\n"}For additional support, you can download the "One-stop Lifesaving Early Detection Cards" for other prevalent cancers by visiting:
                {"\n"}
                <ExternalLink href="https://www.breastcancerhub.org/educational-cards" asChild>
                  <TouchableOpacity>
                    <ThemedText type="link">https://www.breastcancerhub.org/educational-cards</ThemedText>
                  </TouchableOpacity>
                </ExternalLink>
                {"\n\n"}To learn more about our grassroots, sustainable solutions that are saving lives globally, please visit:
                {"\n"}
                <ExternalLink href="https://www.breastcancerhub.org" asChild>
                  <TouchableOpacity>
                    <ThemedText type="link">https://www.breastcancerhub.org</ThemedText>
                  </TouchableOpacity>
                </ExternalLink>
                {"\n\n"}If you have any questions, please contact Dr. Lopamudra Das Roy, Founder-President of Breast Cancer Hub, at lopa@breastcancerhub.org.
              </ThemedText>
              <StepIndicators totalSteps={totalSteps} currentStep={step} />
              <LearnMoreTextContainer />
            </ThemedView>
          </ThemedView>
        )}

        {step === 4 && (
          <ThemedView style={globalStyles.whiteOverlay}>
            <ThemedView style={styles.background}>
              <ThemedView style={styles.titleContainer}>
                <ThemedText style={globalStyles.titleText}>
                  Telemetry & Data
                </ThemedText>
                <ThemedText style={[globalStyles.titleTextDarkHighlight, styles.highlightedTitleText]}>
                  Collection
                </ThemedText>
              </ThemedView>
              <ThemedView style={globalStyles.grayLine} />
              <ThemedText>
                {/* Placeholder content — adapt as needed */}
                We would like to collect limited, anonymous usage data to help
                us improve this app and provide a better experience. Your data
                will remain private, and you can opt out at any time.
              </ThemedText>
              <View style={globalStyles.settingsButton}>
                <ThemedText type="default" bold>
                  {telemetryEnabled ? "Currently Opted In" : "Currently Opted Out"}
                </ThemedText>
                <Switch
                  trackColor={{ false: "#767577", true: colors.lightHighlight }}
                  thumbColor={telemetryEnabled ? colors.white : "#f4f3f4"}
                  ios_backgroundColor={colors.darkGray}
                  onValueChange={() => setTelemetryEnabled(!telemetryEnabled)}
                  value={telemetryEnabled}
                />
              </View>
              <StepIndicators totalSteps={totalSteps} currentStep={step} />
              <LearnMoreTextContainer />
            </ThemedView>
          </ThemedView>
        )}

        {step === 5 && (
            <ThemedView style={globalStyles.whiteOverlay}>
              <ThemedView style={styles.background}>
                <ThemedView style={styles.titleContainer}>
                  <ThemedText style={globalStyles.titleText}>
                    Change Your
                  </ThemedText>
                  <ThemedText style={[globalStyles.titleTextDarkHighlight,
                  styles.highlightedTitleText]}>
                    Self-Examination Language
                   </ThemedText>
                </ThemedView>
                <ThemedView style={globalStyles.grayLine} />
                <SelectLanguage></SelectLanguage>
                <StepIndicators totalSteps={totalSteps} currentStep={step} />
                <LearnMoreTextContainer />
              </ThemedView>
            </ThemedView>
        )}

        {step === 6 && (
            <ThemedView style={globalStyles.whiteOverlay}>
              <ThemedView style={styles.background}>
                <ThemedView style={styles.titleContainer}>
                  <ThemedText style={globalStyles.titleText}>
                    Choose Your
                  </ThemedText>
                  <ThemedText style={[globalStyles.titleTextDarkHighlight,
                    styles.highlightedTitleText]}>
                    Color Theme
                  </ThemedText>
                  </ThemedView>
                  <ThemedView style={globalStyles.grayLine} />
                  <View style={globalStyles.settingsButton}>
                  <ThemedText type="default" bold colored>
                    Pink
                  </ThemedText>
                  <Switch
                      trackColor={{ false: "#767577", true: colors.lightHighlight }}
                      thumbColor={IsDarkThemeEnabled ? colors.white : "#f4f3f4"}
                      ios_backgroundColor={ colors.darkGray }
                      onValueChange={() => {
                        setDarkMode(!IsDarkThemeEnabled);
                        setIsDarkThemeEnabled(!IsDarkThemeEnabled);
                      }}
                      value={IsDarkThemeEnabled}
                    />
                    <ThemedText type="default" bold colored>Indigo</ThemedText>
                  </View>
                  
                  <StepIndicators totalSteps={totalSteps} currentStep={step} />
                  <LearnMoreTextContainer />
                </ThemedView>
            </ThemedView>
        )}
        
        {step === 7 && (
            <ThemedView style={globalStyles.whiteOverlay}>
              <ThemedView style={styles.background}>
                <ThemedView style={styles.titleContainer}>
                  <ThemedText style={globalStyles.titleText}>
                    Choose Your
                  </ThemedText>
                  <ThemedText style={[globalStyles.titleTextDarkHighlight,
                    styles.highlightedTitleText]}>
                    Self Examination Avatar
                  </ThemedText>
                </ThemedView>
              <ThemedView style={globalStyles.grayLine} />
              <ThemedView style={styles.avatar}>
                <TouchableOpacity onPress={() => avatarPress(false)}>
                  <Image
                    source={require("../../assets/images/FEMALE ART 1.jpg")}
                    style={styles.image}
                  />
                  <ThemedText type="subtitle" colored style={{textAlign: "center"}}>
                  Female Avatar
                </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => avatarPress(true)}>
                  <Image
                    source={require("../../assets/images/MALE ART 1.jpg")}
                    style={styles.image}
                  />
                  <ThemedText type="subtitle" colored style={{textAlign: "center"}}>
                    Male Avatar
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>

              <StepIndicators totalSteps={totalSteps} currentStep={step} />
              <LearnMoreTextContainer />
              </ThemedView>
            </ThemedView>
        )}

        {/*navigation buttons*/}
          
        {/*conditional for when step = 0 (makes it so the next button stays to the right when the back button isn't present)*/}
        {step === 0 ? (
          <ThemedView style={styles.buttonStepZeroContainer}>
            <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleNext}>
              <ThemedText style={globalStyles.buttonTextPrimary}>Next</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        ) : (
          <ThemedView style={globalStyles.buttonBackNextContainer}>
            
            <ThemedView>
            {step > 0 && (
              <TouchableOpacity style={globalStyles.buttonSecondary} onPress={handleBack}>
                <ThemedText style={globalStyles.buttonTextSecondary}>Back</ThemedText>
              </TouchableOpacity>
            )}
            </ThemedView>
            <ThemedView>
                {step < totalSteps - 1 ? (
              <TouchableOpacity style={globalStyles.buttonPrimary} onPress={handleNext}>
                <ThemedText style={globalStyles.buttonTextPrimary}>Next</ThemedText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={globalStyles.buttonPrimary} onPress={() => {router.dismiss(1); router.push("/askMenstruate")}}>
                <ThemedText style={globalStyles.buttonTextPrimary}>Finish</ThemedText>
              </TouchableOpacity>
            )}
            </ThemedView>
            
          </ThemedView>
        )}
        
      </ScrollView>
    </ThemedView>
  );
}
