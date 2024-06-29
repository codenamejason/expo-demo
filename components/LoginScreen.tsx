import { Text, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useLoginWithSMS, useLoginWithEmail, usePrivy } from "@privy-io/expo";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
import { loginStyles } from "@/app/styles";
import { Button } from "./Button";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

export function LoginScreen() {
  const [email, setEmail] = useState(Constants.expoConfig?.extra?.email || "");
  const [code, setCode] = useState("");

  const { user } = usePrivy();
  const emailFlow = useLoginWithEmail();
  // const oauth = useOAuthFlow();

  // Side effects which react to login state changes
  useEffect(() => {
    // Report error
    if (emailFlow.state.status === "error") {
      console.error(emailFlow.state.error);
    } // else if (oauth.state.status === "error") {
    //   console.error(oauth.state.error);
    // }
  }, [emailFlow.state.status]); //, oauth.state.status]);

  if (user) {
    return (
      <ThemedView style={loginStyles.container}>
        <ThemedText>Looks like you are already logged in</ThemedText>;
      </ThemedView>
    );
  }
  // {Platform.select({ ios: "cmd + d", android: "cmd + m" })}

  return (
    <ThemedView style={loginStyles.container}>
      <ThemedText>Login</ThemedText>
      <ThemedText style={{ color: "rgba(0,0,0,0.4)", marginVertical: 10 }}>
        (OTP state:{" "}
        <ThemedText style={{ color: "blue" }}>{emailFlow.state.status}</ThemedText>)
      </ThemedText>
      <StatusBar style="auto" />

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={loginStyles.input}
        inputMode="email"
      />
      <Button
        loading={emailFlow.state.status === "sending-code"}
        onPress={() => emailFlow.sendCode({ email })}
      >
        Send Code
      </Button>

      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="Code"
        style={loginStyles.input}
        inputMode="numeric"
      />
      <Button
        loading={emailFlow.state.status === "submitting-code"}
        disabled={emailFlow.state.status !== "awaiting-code-input"}
        onPress={() => emailFlow.loginWithCode({ code })}
      >
        Login
      </Button>

      {/* <ThemedView style={{display: "flex", flexDirection: "row", gap: 5, margin: 10}}>
        {(["github", "google", "discord", "apple"] as const).map((provider) => (
          <ThemedView key={provider}>
            <Button
              disabled={oauth.state.status === "loading"}
              loading={oauth.state.status === "loading"}
              onPress={() => oauth.start({provider})}
            >
              {`Login with ${provider}`}
            </Button>
          </ThemedView>
        ))}
      </ThemedView> */}
    </ThemedView>
  );
}
