import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { height } = Dimensions.get("window");

export default function LoginScreen() {
  const [employeeCode, setEmployeeCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");

  const handleProceed = async () => {
    const trimmedCode = employeeCode.trim();
    const trimmedPassword = password.trim();

    if (trimmedCode !== "SAN-0908") {
      setErr("No such user found");
      return;
    }

    if (trimmedPassword !== "Pass@1234") {
      setErr("Incorrect password");
      return;
    }

    // Success
    setErr("");
    await AsyncStorage.setItem("isLoggedIn", "true");
    router.replace("(drawer)/(tabs)/home");
  };

  // const checkLoginStatus = async () => {
  //   const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
  //   if (isLoggedIn === "true") {
  //     router.replace("(drawer)/(tabs)/home");
  //   }
  // };

  // useEffect(() => {
  //   checkLoginStatus();
  // }, []);

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
    >
      <LinearGradient
        colors={["#1e40af", "#3b82f6", "#60a5fa"]}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.headerSection}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>ABStart</Text>
              <Text style={styles.tagline}>Your Digital HR Partner</Text>
            </View>
          </View>

          <View style={styles.whiteContainer}>
            <View style={styles.illustrationContainer}>
              <View style={styles.illustrationCircle}>
                <Text style={styles.illustrationText}>👥</Text>
              </View>
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.subtitleText}>
                Enter your credentials to continue
              </Text>
            </View>

            {err ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={20} color="#ef4444" />
                <Text style={styles.errorText}>{err}</Text>
                <TouchableOpacity onPress={() => setErr("")}>
                  <Ionicons name="close" size={20} color="#6b7280" />
                </TouchableOpacity>
              </View>
            ) : null}

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Feather
                  name="user"
                  size={20}
                  color="#6b7280"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter Employee Code"
                  placeholderTextColor="#9ca3af"
                  value={employeeCode}
                  onChangeText={setEmployeeCode}
                  autoCapitalize="characters"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Feather
                  name="lock"
                  size={20}
                  color="#6b7280"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter Password"
                  placeholderTextColor="#9ca3af"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.passwordToggle}
                >
                  <Feather
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#6b7280"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  styles.proceedButton,
                  employeeCode.trim() && password.trim()
                    ? styles.proceedButtonActive
                    : null,
                ]}
                onPress={handleProceed}
                disabled={!employeeCode.trim() || !password.trim()}
              >
                <Text style={styles.proceedButtonText}>Proceed</Text>
                <Feather
                  name="arrow-right"
                  size={20}
                  color="white"
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.version}>Version 2.0.12</Text>
              <Text style={styles.copyright}>Copyright © 2025 ABStart</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  headerSection: {
    height: height * 0.3,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    color: "white",
    opacity: 0.9,
    fontWeight: "300",
  },
  whiteContainer: {
    height: height * 0.8,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 32,
    elevation: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: -4 },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    justifyContent: "center",
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fee2e2", // red-100
    borderColor: "#fecaca", // red-200
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    flex: 1,
    color: "#b91c1c", // red-700
    fontSize: 14,
    fontWeight: "500",
  },

  illustrationContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  illustrationCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  illustrationText: {
    fontSize: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    marginVertical: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: "#1f2937",
    fontWeight: "500",
  },
  proceedButton: {
    backgroundColor: "#d1d5db",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  proceedButtonActive: {
    backgroundColor: "#10b981",
  },
  proceedButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  footer: {
    alignItems: "center",
    paddingBottom: 100,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
    paddingTop: 20,
  },
  version: {
    fontSize: 12,
    color: "#9ca3af",
    marginBottom: 4,
    fontWeight: "500",
  },
  copyright: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "400",
  },
});
