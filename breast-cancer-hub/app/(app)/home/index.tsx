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
import NotificationComponent from "@/app/(app)/home/(components)/NotificationBanner"; // Ensure this path is correct
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getSetting, NotificationTime } from "@/hooks/useSettings";
import LoadingScreen from "@/components/Loading";
import { ExternalLink } from "@/components/navigation/ExternalLink";
import { useColors } from "@/components/style/ColorContext";
import ThemedButton from "@/components/ThemedButton";
import { useCheckupData } from "@/hooks/CheckupContext";
import {
  formatHMTime,
  isSameDate,
  parseISODate,
} from "@/constants/dateTimeUtils";
import i18n from "@/i18n";

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

  const [modalVisible, setModalVisible] = useState(false);

  const { nextCheckup, allCheckups } = useCheckupData();

  const [name, setName] = useState<string | undefined>("");

  const [locale, setLocale] = useState("en-US");

  const [notifEnabled, setNotifEnabled] = useState(true);
  const [notifTimes, setNotifTimes] = useState<NotificationTime[]>([]);

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const isStale = nextCheckup < startOfToday;

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

  useEffect(() => {
    const getLocale = async () => {
      const storedLanguageCode = await getSetting("locale");
      if (storedLanguageCode && i18n.language !== storedLanguageCode) {
        await i18n.changeLanguage(storedLanguageCode);
      }
      await setLocale(storedLanguageCode);
    };

    getLocale();
  }, []);

  useEffect(() => {
    const getNotificationPreferences = async () => {
      const notif = await getSetting("notificationTimes");
      setNotifTimes(notif);

      const notifEnabled = await getSetting("usePushNotifications");
      setNotifEnabled(notifEnabled);
    };

    getNotificationPreferences();
  }, []);

  if (isLoading || name === undefined || isMenstruating === undefined) {
    return <LoadingScreen />;
  }

  // Function to open links
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }

  const enabledTimes = notifTimes.filter((t) => t.enabled);

  function calculateNotificationVariant() {
    let lastCheckup = allCheckups.at(-1);
    let lastCheckupDate: Date;
    let today: Date = new Date();

    if (lastCheckup) {
      lastCheckupDate = parseISODate(lastCheckup.completedOn);
    } else {
      const zero = new Date(0); // Case of no checkups - is the same as having done one in the far past
      zero.setHours(0, 0, 0, 0);
      lastCheckupDate = zero;
    }
    // Already completed today
    let notification_props: {
      variant: "completed" | "due" | "upcoming" | "overdue";
      date: Date;
    };
    if (isSameDate(lastCheckupDate, today)) {
      notification_props = { variant: "completed", date: lastCheckupDate };
    }
    // Due today
    else if (isSameDate(nextCheckup, today)) {
      notification_props = { variant: "due", date: nextCheckup };
    }
    // Not time to do it yet
    else if (today < nextCheckup) {
      notification_props = { variant: "upcoming", date: nextCheckup };
    } else if (today > nextCheckup && lastCheckupDate < nextCheckup) {
      notification_props = { variant: "overdue", date: nextCheckup };
    } else {
      notification_props = { variant: "upcoming", date: nextCheckup };
    }
    return notification_props;
  }

  const LOCAL_NEXT = new Date(
    nextCheckup.getFullYear(),
    nextCheckup.getMonth(),
    nextCheckup.getDate()
  );

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
            {getGreeting()}
            {name ? ", " : ""}
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
        <View style={{ paddingVertical: 10, paddingHorizontal: 16 }}>
          <View style={styles.sectionTitle}>
            <Ionicons
              name="notifications-outline"
              style={[styles.icon, { color: colors.darkHighlight }]}
            />
            <ThemedText type="heading">This Month's Exam</ThemedText>
          </View>

          <NotificationComponent
            variant={calculateNotificationVariant().variant}
            date={calculateNotificationVariant().date}
          />
          <View style={styles.sectionTitle}>
            <Ionicons
              name="notifications-outline"
              style={[styles.icon, { color: colors.darkHighlight }]}
            />
            <ThemedText type="heading">Upcoming Exam Information</ThemedText>
          </View>
          <ThemedView style={{ gap: 16 }}>
            <ThemedView style={styles.upcoming}>
              {isStale && isMenstruating ? (
                <ThemedText bold type="heading">
                  Your next self exam has not been scheduled yet. Come back when
                  your next period begins.
                </ThemedText>
              ) : (
                <ThemedText bold type="heading">
                  Your next self exam is scheduled for{" "}
                  <ThemedText bold colored type="heading">
                    {LOCAL_NEXT.toLocaleDateString(locale, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </ThemedText>
                </ThemedText>
              )}
              {enabledTimes.length > 0 && notifEnabled ? (
                <View style={{ gap: 16 }}>
                  <ThemedText>
                    You have the following push notifications enabled:
                  </ThemedText>

                  {enabledTimes.map((t) => (
                    <ThemedText key={t.id} style={{ marginLeft: 10 }}>
                      • {formatHMTime(t.hour, t.minute)}
                    </ThemedText>
                  ))}
                </View>
              ) : (
                <ThemedText>Push notifications are disabled. </ThemedText>
              )}
              <TouchableOpacity
                onPress={() => router.push("/settings/notifications")}
              >
                <ThemedText type="link">
                  {" "}
                  Click here to change your notifications
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>

          {/* Contact Buttons */}
          <View style={styles.contactButtons}>
            <ThemedButton
              variant="primary"
              onPress={() => {
                router.push("/selfExam/intro");
              }}
            >
              Perform Self Exam Now
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
                      "https://www.breastcancerhub.org/news-2/self-breast-exam-card"
                    )
                  }
                >
                  <ThemedText type="link">
                    Learn More About{"\n"}Breast Self-Exams With Videos
                  </ThemedText>
                </ThemedButton>
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
                    Learn More About{"\n"}Breast Cancer
                  </ThemedText>
                </ThemedButton>

                <ThemedButton
                  variant="secondary"
                  style={styles.modalButton}
                  onPress={() => openLink("https://www.breastcancerhub.org/")}
                >
                  <ThemedText type="link">
                    Learn More About{"\n"}Breast Cancer Hub
                  </ThemedText>
                </ThemedButton>

                <ThemedButton
                  variant="secondary"
                  style={styles.modalButton}
                  onPress={() =>
                    openLink(
                      "https://www.breastcancerhub.org/educational-cards"
                    )
                  }
                >
                  <ThemedText type="link">
                    Learn More About{"\n"}Other Cancers And Symptoms
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
    backgroundColor: "white",
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
  upcoming: {
    borderRadius: 16, // Circular sides
    borderColor: "#B3B3B3",
    //borderWidth: 1,
    padding: 15,
    alignItems: "center",
    position: "relative",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    gap: 16,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
  pastExamsText: {
    marginTop: 20,
    marginBottom: 40,
  },
  contactButtons: {
    marginTop: 60,
    width: "100%",
    flexDirection: "column",
    gap: 10,
  },
  // Footer with logos
  footerContainer: {
    //backgroundColor: colors.darkHighlight,
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
    color: "black",
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
    backgroundColor: "white",
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
