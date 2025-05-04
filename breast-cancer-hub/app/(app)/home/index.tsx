import { useEffect, useState } from "react";
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
import { ThemedView } from "@/components/style/ThemedView";
import { ThemedText } from "@/components/style/ThemedText";
import NotificationComponent from "@/app/(app)/home/(components)/Notification"; // Ensure this path is correct
import CalendarComponent from "@/app/(app)/home/(components)/Calendar"; // Ensure this path is correct
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getSetting } from "@/hooks/useSettings";
import LoadingScreen from "@/components/Loading";
import { ExternalLink } from "@/components/navigation/ExternalLink";
import CycleLog from "./(components)/CycleLogWidget";
import { useColors } from "@/components/style/ColorContext";
import ThemedButton from "@/components/ThemedButton";
import { useCheckupData } from "@/hooks/CheckupContext";
import { PeriodTimestamp } from "@/hooks/PeriodContext";
import { isSameDate, parseISODate } from "@/constants/dateTimeUtils";

import * as Notifications from "expo-notifications";

type Notif = {
  variant: "upcoming" | "overdue" | "completed";
  date: Date;
};

export type HomePageProps = Partial<{
  name: string;
  isMenstruating: boolean;
}>;

export default function HomePage(props: HomePageProps) {
  const router = useRouter();

  const { colors, globalStyles } = useColors();

  const [isMenstruating, setIsMenstruating] = useState<boolean | undefined>(
    undefined
  );

  const [isLoading, setIsLoading] = useState(true);
  // State for modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // State for checkup history feature flag
  const [checkupHistoryEnabled, setCheckupHistoryEnabled] = useState(false);

  const { nextCheckup, scheduleNextCheckup, allCheckups } = useCheckupData();

  const [name, setName] = useState<string | undefined>("");

  useEffect(() => {
    const init = async () => {
      if (props.isMenstruating === undefined) {
        const s = await getSetting("schedulingType");
        setIsMenstruating(s === "period");
      }

      if (props.name === undefined) {
        const value = await getSetting("name");
        setName(value);
      }

      await new Promise((r) => setTimeout(r, 300));
      setIsLoading(false);
    };

    init();
  }, []);

  if (isLoading || name === undefined || isMenstruating === undefined) {
    return <LoadingScreen />;
  }

  // Function to open links
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  function calculateNotificationVariant() {
    console.log(allCheckups);
    let lastCheckup = allCheckups.at(-1);
    let lastCheckupDate : Date;
    if (lastCheckup) {
      lastCheckupDate = parseISODate(lastCheckup.completedOn);
      console.log("Last checkup date:")
      console.log(lastCheckupDate);
    } else {
      const today = new Date(0); // Case of no checkups - is the same as having done one in the far past
      today.setHours(0, 0, 0, 0);
      lastCheckupDate = today;
    }
    // Already completed today
    let notification_props : {variant: "completed" | "due" | "upcoming" | "overdue", date: Date};
    if (isSameDate(lastCheckupDate, new Date())) {
      notification_props = {variant: "completed", date: lastCheckupDate};
    }
    // Due today
    else if (isSameDate(nextCheckup, new Date())) {
      notification_props = {variant: "due", date: nextCheckup};
    }
    // Not time to do it yet
    else if (new Date() < nextCheckup) {
      notification_props = {variant: "upcoming", date: nextCheckup};
    }
    else { notification_props = {variant: "overdue", date: nextCheckup}; }
    console.log(notification_props);
    return notification_props;
  }

  const styles = StyleSheet.create({
    headerContainer: {
      backgroundColor: "white",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      paddingTop: 20,
      paddingBottom: 20,
      paddingHorizontal: 20,
      flexDirection: "column",
      alignItems: "flex-start",
      zIndex: 1, // Ensure header stays above other content
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,
      height: "20%",
    },
    logoProfileContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      height: "100%",
    },
    logo: {
      height: "100%",
      width: 150,
      flexShrink: 1,
    },
    profileIconContainer: {
      backgroundColor: colors.white,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    greetingContainer: {
      flex: 0,
      flexWrap: "wrap",
      flexDirection: "row",
      width: "100%",
      paddingTop: 10,
    },
    sectionTitle: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 20,
    },
    icon: {
      fontSize: 20,
      color: colors.darkHighlight,
      marginRight: 10,
    },
    pastExamsText: {
      marginTop: 20,
      marginBottom: 40,
    },
    contactButtons: {
      marginTop: 16,
      width: "100%",
      flexDirection: "column",
      gap: 10,
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
    modalTitle: {
      marginBottom: 20,
    },
    modalButton: {
      paddingHorizontal: 20,
      marginBottom: 10,
      width: "100%",
    },
  });

  return (
    <ThemedView bgColor={colors.white} style={globalStyles.bodyContainer}>
      {/* Header */}
      <View style={styles.headerContainer}>
        {/* Top Row: Logo and Profile Icon */}
        <View style={styles.logoProfileContainer}>
          <Image
            source={require("@/assets/images/bch_logo_with_bch_wings_cancer_hubs_720.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          {/* Profile Icon */}
          <TouchableOpacity
            style={styles.profileIconContainer}
            onPress={() => router.push("/settings")}
          >
            <MaterialIcons
              name="settings"
              size={28}
              color={colors.darkHighlight}
            />
          </TouchableOpacity>
        </View>
        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <ThemedText type="title" style={{ fontSize: 26 }}>
            Good Morning,{" "}
          </ThemedText>
          <ThemedText type="title" style={{ fontSize: 26 }} colored>
            {name}!
          </ThemedText>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <TouchableOpacity
        onPress={ async () => {
          await getSetting("notificationTimes").then(async (val) => {
            console.log("nt:");
            console.log(val);
            console.log("nextCheckup:")
            console.log(nextCheckup);
            // await scheduleNextCheckup().then(async (val) => {
            //   console.log("nc:")
            //   console.log(val);
            //   console.log("nextCheckup:")
            //   console.log(nextCheckup);
            //   await Notifications.getAllScheduledNotificationsAsync().then((val) => {
            //     console.log("getAll:");
            //     console.log(val);
            //   })
            //   }
            // )
            }
          )
          }}>
          <ThemedText>
            a
          </ThemedText>
        </TouchableOpacity>
        {/* Main Content with padding */}
        <View style={{ paddingVertical: 10, paddingHorizontal: 16 }}>
          {/* Alerts Section */}
          <View style={styles.sectionTitle}>
            <Ionicons name="notifications-outline" style={styles.icon} />
            <ThemedText type="heading">Upcoming Exams</ThemedText>
          </View>
          {/* Notifications or No Alerts Message */}
          {/* {notifications.length === 0 ? (
            <ThemedText type="caption">There are no new alerts</ThemedText>
          ) : (
            notifications.map((notification) => ( 
          <React.Fragment key={notification.id}> */}
          <NotificationComponent
            variant = {calculateNotificationVariant().variant}
            date = {calculateNotificationVariant().date}
            //onDismiss={() => removeNotification(notification.id)}
          />
          {/* </React.Fragment>
           ))
          )} */}
          {/* Calendar Section */}
          <View style={styles.sectionTitle}>
            <Ionicons name="calendar-outline" style={styles.icon} />
            <ThemedText type="heading">Your Calendar</ThemedText>
          </View>

          {/* Calendar Component */}
          <CalendarComponent
            isMenstruating={isMenstruating}
            onDayChanged={async (newTimestamps: PeriodTimestamp[]) => {
              await scheduleNextCheckup(newTimestamps);
            }}
          />

          {/* Checkup History Homepage Widget, dates must be ISO format */}
          {checkupHistoryEnabled && (
            <>
              <View style={styles.sectionTitle}>
                <Ionicons name="list-outline" style={styles.icon} />
                <ThemedText type="heading">{"Recent Checkups"}</ThemedText>
              </View>
              <View style={{ flex: 1 }}>
                <CycleLog limit={4} isMenstruating={isMenstruating} />
                <TouchableOpacity
                  onPress={() => router.push("/checkupHistory")}
                  style={{
                    alignItems: "center",
                  }}
                >
                  <ThemedText type="link" style={styles.pastExamsText}>
                    View your past examinations here
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Contact Buttons */}
          <View style={styles.contactButtons}>
            <ThemedButton
              onPress={() =>
                openLink("https://www.breastcancerhub.org/new-page-3")
              }
            >
              Contact BCH
            </ThemedButton>

            <ThemedButton
              variant="secondary"
              onPress={() => setModalVisible(true)}
            >
              Learn More about Breast Cancer
            </ThemedButton>
          </View>
        </View>

        {/* footer with logos */}
        <View style={styles.footerContainer}>
          <View style={styles.logosRow}>
            <ExternalLink
              href="https://www.facebook.com/KurlbaumIllustration/"
              asChild
            >
              <TouchableOpacity style={styles.footerLogoContainer}>
                <View style={styles.kurlbaumContainer}>
                  <Image
                    source={require("@/assets/images/kurlbaum_logo_transparent.png")}
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
                  source={require("@/assets/images/MBCH-LOGO-transparent.png")}
                  style={styles.footerLogo}
                />
              </TouchableOpacity>
            </ExternalLink>

            <ExternalLink
              href="https://www.hcamidwest.com/about-us/about-sarah-cannon"
              asChild
            >
              <TouchableOpacity style={styles.footerLogoContainer}>
                <Image
                  source={require("@/assets/images/Sarah-Cannon_transparent.png")}
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
                  style={{ alignSelf: "flex-end" }}
                  onPress={() => setModalVisible(false)}
                >
                  <Ionicons
                    name="close"
                    size={24}
                    color={colors.darkHighlight}
                  />
                </TouchableOpacity>
                {/* Modal Title */}
                <ThemedText type="heading" colored style={styles.modalTitle}>
                  Learn More
                </ThemedText>

                <ThemedText type="caption" italic>
                  BCH stands against All Types of Cancer via
                </ThemedText>
                <ThemedText
                  type="caption"
                  italic
                  bold
                  style={{ marginBottom: 16 }}
                >
                  BCH Wings-Cancer Hubs
                </ThemedText>
                {/* Buttons */}
                <ThemedButton
                  variant="secondary"
                  style={styles.modalButton}
                  onPress={() =>
                    openLink(
                      "https://www.breastcancerhub.org/about-breast-cancer"
                    )
                  }
                >
                  <ThemedText type="link">
                    Learn More about Breast Cancer
                  </ThemedText>
                </ThemedButton>

                <ThemedButton
                  variant="secondary"
                  style={styles.modalButton}
                  onPress={() => openLink("https://www.breastcancerhub.org/")}
                >
                  <ThemedText type="link">
                    Learn More About Breast Cancer Hub
                  </ThemedText>
                </ThemedButton>

                <ThemedButton
                  variant="secondary"
                  style={styles.modalButton}
                  onPress={() =>
                    openLink(
                      "https://www.breastcancerhub.org/bchwing-childhood-cancer-hub"
                    )
                  }
                >
                  <ThemedText type="link">
                    Learn More About Other Cancers and its Symptoms
                  </ThemedText>
                </ThemedButton>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ThemedView>
  );
}
