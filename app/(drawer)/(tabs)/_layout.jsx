import React from "react";
import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#6b7280",
        headerShown: false,
        tabBarStyle: {
          // flexDirection:"row",
          justifyContent:"center",
          alignItems: "center",
          paddingBottom: 5,
          paddingTop: 5,
          height: 70,
          // bottom:20
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          title: "Support",
          tabBarIcon: ({ size, color }) => (
            <Feather name="help-circle" size={size} color={color} />
          ),
        }}
      />

      {/* <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
          tabBarIcon: ({ size, color }) => (
            <BarChart3 size={size} color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
