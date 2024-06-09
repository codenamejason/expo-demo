import { View, Text, TextInput, Button } from "react-native";

import {
  useLoginWithSMS,
  useLoginWithEmail,
  useLoginWithFarcaster,
  useLoginWithSiwe,
  hasError,
  usePrivy,
} from "@privy-io/expo";
import { useState } from "react";

export function LoginScreen() {
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const { state, sendCode: sendSMSCode, loginWithCode } = useLoginWithSMS();
  const { sendCode: sendEmailCode } = useLoginWithEmail();
  const { loginWithFarcaster, state: farcasterState } = useLoginWithFarcaster({
    onSuccess: console.log,
    onError: console.error,
  });
  const { generateSiweMessage, loginWithSiwe } = useLoginWithSiwe();
  const { isReady, user } = usePrivy();

  const handleGenerate = async () => {
    const message = await generateSiweMessage({
      from: {
        domain: "sippp.xyz",
        uri: "https://sippp.xyz",
      },
      wallet: {
        // sepolia chainId with CAIP-2 prefix
        chainId: `eip155:11155111`,
        address,
      },
    });

    setMessage(message);
  };

  // {Platform.select({ ios: "cmd + d", android: "cmd + m" })}

  return (
    <View>
      <View>
        <TextInput onChangeText={setPhone} />
        <Button
          title="Text Code" // Use the title prop instead of children
          disabled={state.status === "sending-code"}
          onPress={() => sendSMSCode({ phone })}
        />

        {state.status === "sending-code" && (
          //  Shows only while the code is sending
          <Text>Sending Code...</Text>
        )}
      </View>

      <View>
        <TextInput onChangeText={setCode} />
        <Button
          // Keeps button disabled until the code has been sent
          title="Login"
          disabled={state.status !== "awaiting-code-input"}
          onPress={() => loginWithCode({ code })}
        />
      </View>

      <View>
        <Text>Login</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          inputMode="email"
        />

        <Button
          title="Send Code To Email"
          onPress={() => sendEmailCode({ email })}
        />
      </View>

      <View>
        <Button
          title="Login with Farcaster"
          onPress={() => {
            loginWithFarcaster({ relyingParty: "https://example.app" });
          }}
        />
      </View>

      <View>
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="0x..."
        />

        <Button title="SIWE" onPress={handleGenerate} />

        {Boolean(message) && <Text>{message}</Text>}
      </View>

      {state.status === "submitting-code" && (
        // Shows only while the login is being attempted
        <Text>Logging in...</Text>
      )}

      {(state.status === "error" || farcasterState.status === "error") && (
        <>
          <Text style={{ color: "red" }}>There was an error</Text>
          <Text style={{ color: "lightred" }}>{state.error.message}</Text>
        </>
      )}

      {/* {hasError(state) && (
        // The `hasError` util is also provided as a convenience
        // (for typescript users, this provides the same type narrowing as above)
        <>
          <Text style={{ color: "red" }}>There was an error</Text>
          <Text style={{ color: "lightred" }}>{state.error.message}</Text>
        </>
      )} */}
    </View>
  );
}
