import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    fontSize: 40,
  },
  input: {
    fontSize: 40,
    width: 400,
    padding: 10,
    borderColor: "#000",
    borderWidth: 2,
  },
  inputSm: {
    fontSize: 32,
    width: "100%",
    padding: 10,
    borderColor: "#111",
    borderWidth: 1,
  },
});
