import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import SafeScreen from "../../../components/SafeScreen";
const _layout = () => {
  return (
    <>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="myAttendence"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="teamAttendence"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </>
  );
};

export default _layout;

const styles = StyleSheet.create({});
