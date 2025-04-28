import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { NotificationComponent } from "@/components/Notifications"; // Ensure this path is correct
import { CalendarComponent } from "@/components/Calendar"; // Ensure this path is correct
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getCheckupDay } from "@/hooks/usePeriodData";
import { getSetting, SettingsMap } from "@/hooks/useSettings";
import LoadingScreen from "@/components/Loading";
import { ExternalLink } from "@/components/ExternalLink";
import CheckupWidget from "@/components/CheckupWidget";
import CycleHistoryPage from "@/app/cycleHistory";
import CycleLog from "@/components/CycleLog";
import { useColors } from "@/components/ColorContext";

type Noti = {
  id: number;
  variant: "default" | "overdue" | undefined;
  date: Date;
};

export type HomeScreenProps = Partial<{
  name: string;
  isMenstruating: boolean;
}>;

export default function HomeScreen(props: HomeScreenProps) {
  const router = useRouter();

  const {colors, globalStyles} = useColors();

  const [isMenstruating, setIsMenstruating] = useState<boolean | undefined>(
    undefined
  );

  // State for modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // State for notifications
  const [notifications, setNotifications] = useState<Noti[]>([]);

  const [name, setName] = useState<string | undefined>("");

  const [id, setId] = useState({ userId: ""});

  useEffect(() => {
  const init = async () => {
    const userId = await getSetting("userId");
    setId({ userId });

    if (props.isMenstruating === undefined) {
      const s = await getSetting(`${userId}_schedulingType` as keyof SettingsMap);
      setIsMenstruating(s === "period");
    }

    if (props.name === undefined) {
      const value = await getSetting("name");
      setName(value);
    }
  };

  init();
}, []);
  if (name === undefined || isMenstruating === undefined) {
    return LoadingScreen();
  }

  // Function to open links
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  // Function to remove a notification by id
  const removeNotification = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };
  const styles = StyleSheet.create({
    headerContainer: {
      backgroundColor: "white",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      paddingTop: 40,
      paddingBottom: 20,
      flexDirection: "column",
      alignItems: "flex-start",
      zIndex: 1, // Ensure header stays above other content
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,
    },
    headerTopRow: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      paddingHorizontal: 20,
      justifyContent: "space-around",
    },
    logoHomeContainer: {
      padding:10,
      flexDirection: "row",
      alignItems: "center",
    },
    logo: {
      width: 120,
      height: 45,
      marginRight: 10,
    },
    homeText: {
      fontSize: 24,
      color: colors.darkHighlight,
      fontWeight: "bold",
    },
    greetingContainer: {
      flexDirection: "row",
      alignItems: "baseline",
      paddingTop: 10,
      paddingBottom: 10,
      paddingHorizontal: 20,
    },
    greetingText: {
      fontSize: 29,
      fontWeight: "bold",
      color: colors.black,
      lineHeight: 30,
      
    },
    nameText: {
      fontSize: 29,
      fontWeight: "bold",
      color: colors.darkHighlight,
    },
    profileIconContainer: {
      backgroundColor: colors.darkHighlight,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    contentContainer: {
      paddingTop: 20,
    },
    mainContent: {
      paddingTop:40,
      paddingHorizontal: 20,
    },
    introLine: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 30, 
    },
    icon: {
      marginRight: 10,
    },
    introText: {
      fontSize: 20,
      color: colors.black,
      fontWeight: "bold",
    },
    noAlertsText: {
      fontSize: 14,
      color: "grey",
      textAlign: "center",
    },
    calendarIntroText: {
      fontSize: 20,
      color: colors.black,
      fontWeight: "bold",
    },
    customizeText: {
      textAlign: "center",
      color: colors.darkHighlight,
      fontWeight: "bold",
    },
    pastExamsWidgetTitleLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  pastExamsWidgetTitleText: {
    fontSize: 20,
    color: colors.black,
    fontWeight: "bold",
  },
    pastExamsText: {
      marginTop: 20,
      marginBottom: 40,
      fontSize: 16,
      color: colors.blue,
      textAlign: "center",
      fontWeight: "bold",
    },
    contactButton: {
      marginTop: 20,
      marginHorizontal: 100,
      backgroundColor: colors.darkHighlight,
      borderColor: colors.darkHighlight,
      borderWidth: 1,
      borderRadius: 50,
      paddingVertical: 15,
      alignItems: "center",
    },
    contactButtonText: {
      color: colors.white,
      fontWeight: "bold",
    },
    learnMoreButton: {
      marginTop: 10,
      marginBottom: 30,
      marginHorizontal: 20,
      backgroundColor: colors.white,
      borderColor: colors.grayHomePageLearnMoreButton,
      borderWidth: 2,
      borderRadius: 50,
      paddingVertical: 15,
      alignItems: "center",
    },
    learnMoreButtonText: {
      color: colors.darkHighlight,
      fontWeight: "bold",
    },

    // Footer with logos
    footerContainer: {
      backgroundColor: colors.darkHighlight,
      width: "100%",
      paddingVertical: 10,
      minHeight: "100%",
      marginBottom: -1000,
      paddingBottom: 1000,
    },
    logosRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    footerLogoContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    kurlbaumContainer: {
      alignItems: "center",
      justifyContent: "center",
      height: 50,
    },
    footerLogo: {
      width: 100,
      height: 50,
      resizeMode: "contain",
    },
    sarahCannonLogo: {
      width: 160,
      height: 100,
      resizeMode: "contain",
    },
    footerLogoText: {
      fontSize: 10,
      lineHeight: 10,
      color: colors.black,
      marginTop: 2,
      textAlign: "center",
    },

    // Modal styles
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      backgroundColor: colors.white,
      width: "80%",
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
    },
    closeButton: {
      alignSelf: "flex-end",
    },
    modalTitle: {
      fontSize: 20,
      color: colors.darkHighlight,
      fontWeight: "bold",
      marginBottom: 20,
    },
    modalButton: {
      backgroundColor: colors.white,
      borderColor: colors.grayHomePageLearnMoreButton,
      borderWidth: 1,
      borderRadius: 50,
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginBottom: 10,
      width: "100%",
      alignItems: "center",
    },
    modalButtonText: {
      color: colors.blue,
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
  });

  return (
    <ThemedView style={globalStyles.bodyContainerWhite}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Top Row: Logo and Profile Icon */}
        <View style={styles.headerTopRow}>
          {/* Logo and Home */}
          <View style={styles.logoHomeContainer}>
            <Image
              source={require("../../assets/images/BCH-Logo-Stacked-CMYK.png")}
              style={styles.logo}
            />
          </View>
          {/* Profile Icon */}
          <TouchableOpacity
            style={styles.profileIconContainer}
            onPress={() => router.push("/settings")}
          >
            <Ionicons name="person" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <ThemedText style={styles.greetingText}>Good Morning, </ThemedText>
          <ThemedText style={styles.nameText}>{name}!</ThemedText>
        </View>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        {/* Main Content with padding */}
        <View style={styles.mainContent}>
          {/* Alerts Introduction Line */}
          <View style={styles.introLine}>
            <Ionicons
              name="notifications-outline"
              size={20}
              color={colors.darkHighlight}
              style={styles.icon}
            />
            <ThemedText style={styles.introText}>Alerts</ThemedText>
          </View>

          {/* Spacing */}
          <View style={{ height: 40 }} />

          {/* Notifications or No Alerts Message */}
          {notifications.length === 0 ? (
            <ThemedText style={styles.noAlertsText}>
              There are no new alerts
            </ThemedText>
          ) : (
            notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <NotificationComponent
                  variant={notification.variant}
                  date={notification.date}
                  onDismiss={() => removeNotification(notification.id)}
                />
                <View style={{ height: 15 }} />
              </React.Fragment>
            ))
          )}

          {/* Spacing between sections */}
          <View style={{ height: 40 }} />

          {/* Calendar Introduction Line */}
          <View style={styles.introLine}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={colors.darkHighlight}
              style={styles.icon}
            />
            <ThemedText style={styles.calendarIntroText}>
              View your calendar
            </ThemedText>
          </View>

          {/* Spacing */}
          <View style={{ height: 10 }} />

          {/* Calendar Component */}
          <CalendarComponent
            isMenstruating={isMenstruating}
            userId={id.userId}
            updateCheckupDay={() => {
              const ts = getCheckupDay();
              if (ts) {
                const date = new Date(ts.year, ts.month, ts.date + 7);

                setNotifications([
                  {
                    id: 1,
                    variant:
                      new Date().getTime() < date.getTime()
                        ? "default"
                        : "overdue",
                    date,
                  },
                ]);
              }
            }}

          />

          {/* Checkup History Homepage Widget, dates must be ISO format */}
          <View style={styles.pastExamsWidgetTitleLine}>
            <Ionicons
              name="list-outline"
              size={20}
              color={colors.darkHighlight}
              style={styles.icon}
            />
            <ThemedText style={styles.pastExamsWidgetTitleText}>
              {"Recent Checkups"}
            </ThemedText>
          </View>
          <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10}}>
            <CycleLog limit={4} isMenstruating={isMenstruating} />
            <TouchableOpacity
              onPress={() => router.push("../../cycleHistory")}
              style={{
                alignItems: "center",
              }}>
              <ThemedText style={styles.pastExamsText}>
                View your past examinations here
              </ThemedText>
            </TouchableOpacity>
          </View>
          {/* { isMenstruating ?
            (
              <CheckupWidget
                isMenstruating={isMenstruating}
                startDate="2025-03-04T00:00:00Z"
                endDate="2025-03-10T00:00:00Z"
                completedDate="2025-03-17T00:00:00Z"
              />
            ) : (
              <CheckupWidget
                isMenstruating={isMenstruating}
                completedDate="2025-03-17T00:00:00Z"
              />
            )

          } */}


          {/* Debug */}
          <TouchableOpacity
          onPress={() => router.push("/login")}
          >
            <ThemedText style={styles.pastExamsText}>
              Go to Login
            </ThemedText>
          </TouchableOpacity>

          {/* Spacer */}
          <View style={{ height: 20 }} />

          {/* Contact Buttons */}
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => openLink("https://www.breastcancerhub.org/new-page-3")}
          >
            <ThemedText style={styles.contactButtonText}>
              Contact Dr. Lopa
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.learnMoreButton}
            onPress={() => setModalVisible(true)}
          >
            <ThemedText style={styles.learnMoreButtonText}>
              Learn More about Breast Cancer
            </ThemedText>
          </TouchableOpacity>
        </View>

        {/* footer with logos */}
        <View style={styles.footerContainer}>
          <View style={styles.logosRow}>
        
            <ExternalLink href="https://www.facebook.com/KurlbaumIllustration/" asChild>
              <TouchableOpacity style={styles.footerLogoContainer}>
                <View style={styles.kurlbaumContainer}>
                  <Image
                    source={require("../../assets/images/kurlbaum_logo_transparent.png")}
                    style={styles.footerLogo}
                  />
                  <ThemedText style={styles.footerLogoText}>
                    Kurlbaum Illustration
                  </ThemedText>
                </View>
              </TouchableOpacity>
            </ExternalLink>

            <ExternalLink href="https://malebreastcancerhappens.org/" asChild>
              <TouchableOpacity style={styles.footerLogoContainer}>
                <Image
                  source={require("../../assets/images/MBCH-LOGO-transparent.png")}
                  style={styles.footerLogo}
                />
              </TouchableOpacity>
            </ExternalLink>

            <ExternalLink href="https://www.hcamidwest.com/about-us/about-sarah-cannon" asChild>
              <TouchableOpacity style={styles.footerLogoContainer}>
                <Image
                  source={require("../../assets/images/Sarah-Cannon_transparent.png")}
                  style={styles.sarahCannonLogo}
                />
              </TouchableOpacity>
            </ExternalLink>
          </View>
        </View>

      </ScrollView>

      {/* Modal for Learn More */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                {/* Close Button */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Ionicons name="close" size={24} color={colors.darkHighlight} />
                </TouchableOpacity>
                {/* Modal Title */}
                <ThemedText style={styles.modalTitle}>Learn More</ThemedText>

                {/* Buttons */}
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() =>
                    openLink(
                      "https://www.breastcancerhub.org/about-breast-cancer"
                    )
                  }
                >
                  <ThemedText style={styles.modalButtonText}>
                    Learn More about Breast Cancer
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => openLink("https://www.breastcancerhub.org/")}
                >
                  <ThemedText style={styles.modalButtonText}>
                    Learn More About Breast Cancer Hub
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() =>
                    openLink(
                      "https://www.breastcancerhub.org/bchwing-childhood-cancer-hub"
                    )
                  }
                >
                  <ThemedText style={styles.modalButtonText}>
                    Learn More About Other Cancers and its Symptoms
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ThemedView>
  );
}