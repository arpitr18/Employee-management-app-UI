// app/splash.jsx
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/"); // redirect to index.js or login screen
    }, 5000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ABStart</Text>
      <Text style={styles.tagline}>Your Digitial HR Partner </Text>
      <ActivityIndicator size="large" color="#2563eb" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e3a8a",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    color: "white",
    marginBottom: 7,
    fontWeight: "bold",
  },
  tagline: {
    fontSize: 14,
    color: "white",
    opacity: 0.9,
    marginBottom: 20,
  },
});
