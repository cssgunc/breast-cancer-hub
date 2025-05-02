import { useEffect } from "react";
import { useRouter } from "expo-router";
import { getSetting } from "@/hooks/useSettings";
import LoadingScreen from "@/components/Loading";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const userId = await getSetting("userId");
      if (userId) {
        router.replace("/home");
      } else {
        router.replace("/welcome");
      }
    })();
  }, [router]);

  return LoadingScreen();
}
