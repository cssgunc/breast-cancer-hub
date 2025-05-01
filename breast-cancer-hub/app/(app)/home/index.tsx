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
import { ThemedView } from "@/components/style/ThemedView";
import { ThemedText } from "@/components/style/ThemedText";
import NotificationComponent from "@/app/(app)/home/(components)/Notification"; // Ensure this path is correct
import CalendarComponent from "@/app/(app)/home/(components)/Calendar"; // Ensure this path is correct
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getCheckupDay } from "@/hooks/usePeriodData";
import { getSetting, SettingsMap } from "@/hooks/useSettings";
import LoadingScreen from "@/components/Loading";
import { ExternalLink } from "@/components/navigation/ExternalLink";
import CycleLog from "./(components)/CycleLogWidget";
import { useColors } from "@/components/style/ColorContext";

type Noti = {
  id: number;
  variant: "default" | "overdue" | undefined;
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

  // State for modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // State for checkup history feature flag
  const [checkupHistoryEnabled, setCheckupHistoryEnabled] = useState(false);

  // State for notifications
  const [notifications, setNotifications] = useState<Noti[]>([]);

  const [name, setName] = useState<string | undefined>("");

  const [id, setId] = useState({ userId: "" });

  useEffect(() => {
    const init = async () => {
      const userId = await getSetting("userId");
      setId({ userId });

      if (props.isMenstruating === undefined) {
        const s = await getSetting(
          `${userId}_schedulingType` as keyof SettingsMap
        );
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
      backgroundColor: colors.darkHighlight,
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
      ...globalStyles.buttonSecondary,
      paddingHorizontal: 20,
      marginBottom: 10,
      width: "100%",
    },
  });

  return (
    <ThemedView style={globalStyles.bodyContainerWhite}>
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
            <Ionicons name="person" size={24} color={colors.white} />
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
        {/* Main Content with padding */}
        <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
          {/* Alerts Section */}
          <View style={styles.sectionTitle}>
            <Ionicons name="notifications-outline" style={styles.icon} />
            <ThemedText type="heading">Alerts</ThemedText>
          </View>
          {/* Notifications or No Alerts Message */}
          {notifications.length === 0 ? (
            <ThemedText type="caption">There are no new alerts</ThemedText>
          ) : (
            notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <NotificationComponent
                  variant={notification.variant}
                  date={notification.date}
                  onDismiss={() => removeNotification(notification.id)}
                />
              </React.Fragment>
            ))
          )}
          {/* Calendar Section */}
          <View style={styles.sectionTitle}>
            <Ionicons name="calendar-outline" style={styles.icon} />
            <ThemedText type="heading">View your calendar</ThemedText>
          </View>

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
            <TouchableOpacity
              style={globalStyles.buttonPrimary}
              onPress={() =>
                openLink("https://www.breastcancerhub.org/new-page-3")
              }
            >
              <ThemedText style={globalStyles.buttonTextPrimary}>
                Contact Dr. Lopa
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={globalStyles.buttonSecondary}
              onPress={() => setModalVisible(true)}
            >
              <ThemedText style={globalStyles.buttonTextSecondary}>
                Learn More about Breast Cancer
              </ThemedText>
            </TouchableOpacity>
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
                <TouchableOpacity
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
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => openLink("https://www.breastcancerhub.org/")}
                >
                  <ThemedText type="link">
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
                  <ThemedText type="link">
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
