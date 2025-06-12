// app/_layout.jsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen"; 

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);        
  const [isLoggedIn, setIsLoggedIn] = useState(false);      

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const value = await AsyncStorage.getItem("isLoggedIn");

        await new Promise((resolve) => setTimeout(resolve, 2000));

        setIsLoggedIn(value === "true");
      } catch (err) {
        console.error("Error reading login status", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="(drawer)" />
        ) : (
          <Stack.Screen name="index" />
        )}
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
