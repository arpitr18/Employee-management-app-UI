import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function LoginScreen() {
  const [employeeCode, setEmployeeCode] = useState("");

  const handleProceed = async () => {
    if (employeeCode.trim() === "SAN-0908") {
      await AsyncStorage.setItem("isLoggedIn", "true");
      router.replace("(drawer)/(tabs)/home");
    }
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
    <LinearGradient
      colors={["#1e40af", "#3b82f6", "#60a5fa"]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>ABStart</Text>
          <Text style={styles.tagline}>Your Digital HR Partner</Text>
        </View>

        <View style={styles.illustrationContainer}>
          <Text style={styles.illustrationText}>👥</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Feather
              name="user"
              size={20}
              color="#9ca3af"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Employee Code"
              placeholderTextColor="#9ca3af"
              value={employeeCode}
              onChangeText={setEmployeeCode}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.proceedButton,
              employeeCode.trim() ? styles.proceedButtonActive : null,
            ]}
            onPress={handleProceed}
            disabled={!employeeCode.trim()}
          >
            <Text style={styles.proceedButtonText}>Proceed</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.version}>Version: 2.0.12</Text>
          <Text style={styles.copyright}>Copyright © 2025 ABStart</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 80,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
    color: "white",
    opacity: 0.9,
  },
  illustrationContainer: {
    alignItems: "center",
    marginVertical: 40,
  },
  illustrationText: {
    fontSize: 120,
  },
  inputContainer: {
    marginBottom: 40,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: "#1f2937",
  },
  proceedButton: {
    backgroundColor: "#d1d5db",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  proceedButtonActive: {
    backgroundColor: "#10b981",
  },
  proceedButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  footer: {
    alignItems: "center",
    marginBottom: 40,
  },
  version: {
    fontSize: 12,
    color: "white",
    opacity: 0.8,
    marginBottom: 5,
  },
  copyright: {
    fontSize: 12,
    color: "white",
    opacity: 0.8,
  },
});
