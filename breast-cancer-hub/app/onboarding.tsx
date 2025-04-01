import React, { useState, useRef, useEffect, } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { AccountSettingsHeaderComponent } from "@/components/AccountSettingsHeader";
import { LearnMoreTextContainer } from "@/components/LearnMoreText";
import { colors, globalStyles } from "@/components/StyleSheet";
import StepIndicators from "@/components/StepIndicators";
import { ExternalLink } from "@/components/ExternalLink";
import { router } from "expo-router";
import { SelectLanguage } from "@/components/SelectLanguage";

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const totalSteps = 5; 
  const scrollViewRef = useRef<ScrollView>(null);

  //scrolls to top whenever the step changes
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [step]);

  //TODO: Upon pressing back or next, scroll to top of screen
  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <ThemedView style={globalStyles.bodyContainerDarkPink}>
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
                <ThemedText style={[globalStyles.titleTextDarkPink,
                styles.highlightedTitleText]}>
                  Breast Cancer
                </ThemedText>
              </ThemedView>
              <ThemedView style={globalStyles.grayLine} />
              <ThemedText style={styles.paragraphTextTitle}>
                What is Breast Cancer?
              </ThemedText>
              <ThemedText style={styles.paragraphText}>
                Cancer: the development of abnormal cells that divide uncontrollably
                and possess the ability to infiltrate and demolish normal body tissue.
                {"\n\n"}In the body, there are trillions of cells that grow and divide to
                help the body function properly. Cells die when they become old or damaged,
                and new cells replace them.
                {"\n\n"}Breast Cancer is when cancer forms in the breast. This disease can
                occur in both women and men, but is far more prevalent in women.
              </ThemedText>
              <ThemedView style={styles.statContainer}>
                <ThemedText style={styles.statTextBold}>2nd</ThemedText>
                <ThemedText style={styles.statText}>
                  most common cancer in women
                </ThemedText>
                <ThemedText style={styles.statTextBold}>1 out of 8</ThemedText>
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
                globalStyles.titleTextDarkPink,
                styles.highlightedTitleText,
              ]}
            >
              A Self-Exam
            </ThemedText>
            <ThemedView style={globalStyles.grayLine} />
            <ThemedText style={styles.noticeTitle}>Notice:</ThemedText>
            <ThemedText style={styles.noticeText}>
              A self-exam is not a substitute for annual breast cancer screenings.
              <Text style={styles.boldText}> Mammograms are essential.</Text>
            </ThemedText>
            <ThemedText style={styles.noticeText2}>
              The most recent American Cancer Society guidelines recommend women
              ages <Text style={styles.highlightText}>40 to 44</Text> should consider
              annual breast cancer screenings with mammograms. Women ages{" "}
              <Text style={styles.highlightText}>45 to 54</Text> should get mammograms
              every year. Women <Text style={styles.highlightText}>55 and older</Text>{" "}
              should switch to mammograms every 2 years or can continue yearly screening.
            </ThemedText>
            <ThemedText style={styles.infoBoldText}>
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
              <ThemedText style={styles.quoteText}>
                “The difference is, this could save your life.”
              </ThemedText>
              <ThemedText style={styles.quoteText}>
                “Mammograms are important, self-exams are how you are going to find
                cancer early and save your life.”
              </ThemedText>
              <ThemedText style={styles.quoteText}>
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
                <ThemedText style={[globalStyles.titleTextDarkPink,
                styles.highlightedTitleText]}>
                  Screening & Techniques
                </ThemedText>
              </ThemedView>
              <ThemedView style={globalStyles.grayLine} />
              <ThemedText style={styles.paragraphText}>
                Breast cancer originates in one or both breasts. Early detection through regular screening is essential because it enables treatment at a stage when the cancer is most manageable, often resulting in less aggressive interventions and improved survival rates.
                {"\n\n"}
                Screening Methods:
                {"\n\n"}• <ThemedText style={styles.boldText}>Breast Self-Examination:</ThemedText> It is advisable to begin self-exams between the ages of 17 and 18. Becoming familiar with the normal appearance and feel of your breast tissue can help you identify any changes or abnormalities promptly.
                {"\n\n"}• <ThemedText style={styles.boldText}>Clinical Breast Examination:</ThemedText> This involves a physical examination of the breasts performed by a qualified healthcare provider.
                {"\n\n"}• <ThemedText style={styles.boldText}>Mammography:</ThemedText> Women aged 40 and older should undergo annual mammograms. However, it is important to note that mammograms may miss approximately 50% of cancers in women with dense breast tissue.
                {"\n\n"}• <ThemedText style={styles.boldText}>Advanced Imaging for Dense Breasts:</ThemedText> For women with dense breasts, additional screening methods such as 3-D mammography (tomosynthesis), breast MRI, breast ultrasound, or molecular breast imaging (MBI) may be recommended.
                {"\n\n"}• <ThemedText style={styles.boldText}>High-Risk Individuals:</ThemedText> Those identified as having a high risk for breast cancer should consider initiating screening earlier and undergoing more frequent evaluations.
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
                <ThemedText style={[globalStyles.titleTextDarkPink,
                styles.highlightedTitleText]}>
                  Contact Information
                </ThemedText>
              </ThemedView>
              <ThemedView style={globalStyles.grayLine} />
              <ThemedText style={styles.paragraphText}>
                If you experience any symptoms or require further testing, please consult your healthcare provider promptly.
                {"\n\n"}For additional support, you can download the "One-stop Lifesaving Early Detection Cards" for other prevalent cancers by visiting:
                {"\n"}
                <ExternalLink href="https://www.breastcancerhub.org/educational-cards" asChild>
                  <TouchableOpacity>
                    <ThemedText style={styles.linkText}>https://www.breastcancerhub.org/educational-cards</ThemedText>
                  </TouchableOpacity>
                </ExternalLink>
                {"\n\n"}To learn more about our grassroots, sustainable solutions that are saving lives globally, please visit:
                {"\n"}
                <ExternalLink href="https://www.breastcancerhub.org" asChild>
                  <TouchableOpacity>
                    <ThemedText style={styles.linkText}>https://www.breastcancerhub.org</ThemedText>
                  </TouchableOpacity>
                </ExternalLink>
                {"\n\n"}If you have any questions, please contact Dr. Lopamudra Das Roy, Founder-President of Breast Cancer Hub, at lopa@breastcancerhub.org.
              </ThemedText>
              <StepIndicators totalSteps={totalSteps} currentStep={step} />
              <LearnMoreTextContainer />
            </ThemedView>
          </ThemedView>
        )}

        {step === 4 &&(
            <ThemedView style={globalStyles.whiteOverlay}>
              <ThemedView style={styles.background}>
                <ThemedView style={styles.titleContainer}>
                  <ThemedText style={globalStyles.titleText}>
                    Change Your
                  </ThemedText>
                  <ThemedText style={[globalStyles.titleTextDarkPink,
                  styles.highlightedTitleText]}>
                    Self-Examination Language
                   </ThemedText>
                </ThemedView>
                <ThemedView style={globalStyles.grayLine} />
                <ThemedView style={styles.selectLanguages}>
                  <SelectLanguage></SelectLanguage>
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
            <TouchableOpacity style={globalStyles.buttonNext} onPress={handleNext}>
              <ThemedText style={globalStyles.buttonTextNext}>Next</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        ) : (
          <ThemedView style={globalStyles.buttonBackNextContainer}>
            
            <ThemedView>
            {step > 0 && (
              <TouchableOpacity style={globalStyles.buttonBack} onPress={handleBack}>
                <ThemedText style={globalStyles.buttonTextBack}>Back</ThemedText>
              </TouchableOpacity>
            )}
            </ThemedView>
            <ThemedView>
                {step < totalSteps - 1 ? (
              <TouchableOpacity style={globalStyles.buttonNext} onPress={handleNext}>
                <ThemedText style={globalStyles.buttonTextNext}>Next</ThemedText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={globalStyles.buttonNext} onPress={() => {router.dismiss(1); router.push("/askMenstruate")}}>
                <ThemedText style={globalStyles.buttonTextNext}>Finish</ThemedText>
              </TouchableOpacity>
            )}
            </ThemedView>
            
          </ThemedView>
        )}
        
      </ScrollView>
    </ThemedView>
  );
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
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  paragraphText: {
    fontSize: 16,
    color: colors.black,
    marginVertical: 10,
    lineHeight: 24,
  },
  statContainer: {
    backgroundColor: "#F9F9F9",
    padding: 10,
    borderLeftWidth: 4,
    borderColor: colors.darkPink,
    marginVertical: 15,
  },
  statTextBold: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.darkPink,
  },
  statText: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 10,
  },

  noticeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.darkPink,
    marginVertical: 10,
  },
  noticeText: {
    fontSize: 16,
    color: colors.black,
    lineHeight: 24,
  },
  noticeText2: {
    fontSize: 15,
    color: colors.darkGray,
    lineHeight: 24,
    fontStyle: "italic",
    marginTop: 20,
  },
  highlightText: {
    color: colors.darkPink,
    fontWeight: "bold",
  },
  boldText: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  infoText: {
    fontSize: 16,
    color: colors.black,
    marginVertical: 10,
    lineHeight: 24,
  },
  infoBoldText: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.black,
    marginVertical: 15,
    lineHeight: 24,
    marginTop: 20,
  },
  quotesContainer: {
    marginVertical: 20,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: "italic",
    color: colors.darkPink,
    textAlign: "center",
    marginBottom: 10,
  },
  buttonStepZeroContainer: {
    flexDirection: "row", 
    justifyContent: "flex-end", 
    width: "100%", 
    paddingHorizontal: 10, 
    marginRight: 30
  },
  linkText: {
    color: colors.blue
  },
  selectLanguages: {
    marginTop: 30,
    marginBottom: 30,
  }
});
