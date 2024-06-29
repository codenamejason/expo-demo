import { ActivityIndicator, Image } from "react-native";
import { usePrivy } from "@privy-io/expo";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { LoginScreen } from "@/components/LoginScreen";
import { homeStyles as styles } from "@/app/styles";

export default function HomeScreen() {
  const { isReady, user } = usePrivy();

  if (!isReady) {
    return (
      <ThemedView
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" />
        <ThemedText style={{ color: "rgba(0,0,0,0.3)", marginTop: 10 }}>
          Preparing
        </ThemedText>
      </ThemedView>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}
