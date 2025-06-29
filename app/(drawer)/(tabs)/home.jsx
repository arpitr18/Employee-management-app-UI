import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function index() {
  const navigation = useNavigation();
  const router = useRouter();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "long" }); // e.g., "Wednesday"
  const date = now.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  }); // e.g., "12 June"
  const year = now.getFullYear(); // e.g., 2025

  const featureCards = [
    {
      title: "MY ATTENDANCE",
      icon: "user",
      color: "#10b981",
      route: "/myAttendence",
    },
    {
      title: "TEAM ATTENDANCE",
      icon: "bar-chart",
      color: "#3b82f6",
      route: "/teamAttendence",
    },
    // {
    //   title: "MY REGULARIZATION",
    //   icon: "user-check",
    //   color: "#8b5cf6",
    //   route: "/myRegularization",
    // },
    // {
    //   title: "TEAM REGULARIZATION",
    //   icon: "calendar",
    //   color: "#f59e0b",
    //   route: "/myRegularization",
    // },
    {
      title: "MY LEAVES",
      icon: "send",
      color: "#06b6d4",
      route: "/myLeaves",
    },
    {
      title: "TEAM LEAVES",
      icon: "users",
      color: "#84cc16",
      route: "/teamLeaves",
    },
    {
      title: "MY EXPENSE",
      icon: "dollar-sign",
      color: "#ef4444",
      route: "/myExpense",
    },
    {
      title: "TEAM EXPENSE",
      icon: "settings",
      color: "#f97316",
      route: "/teamExpense",
    },
  ];

  const handleCardPress = (card) => {
    try {
      // router.dismissAll();
      // router.push(card.route);
      router.replace(card.route);
    } catch (error) {
      Alert.alert(
        "Feature Coming Soon",
        `${card.title} feature will be available soon!`,
        [{ text: "OK" }]
      );
      console.log(`Navigation error for ${card.route}:`, error);
    }
  };

  const handlePunchOut = () => {
    Alert.alert("Confirm Punch Out", "Are you sure you want to Punch Out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          Alert.alert("Punched Out", "Successful");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#1e40af", "#3b82f6", "#60a5fa"]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={openDrawer} style={styles.menuButton}>
            <Feather name="menu" size={24} color="white" />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.greeting}>Hi, Vaibhav 👋</Text>
            <Text style={styles.role}>Accounts Manager</Text>
          </View>

          <Text style={styles.logo}>अB</Text>
        </View>

        <View style={styles.dateCard}>
          <View style={styles.dateInfo}>
            <Text style={styles.dayText}>{day}</Text>
            <Text style={styles.dateText}>{date}</Text>
            <Text style={styles.yearText}>{year}</Text>
          </View>
          <TouchableOpacity onPress={handlePunchOut} style={styles.punchButton}>
            <Text style={styles.punchButtonText}>PUNCH OUT</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.cardsContainer}>
        {featureCards.map((card, index) => (
          <TouchableOpacity
            onPress={() => handleCardPress(card)}
            key={index}
            style={styles.featureCard}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: `${card.color}20` },
              ]}
            >
              <Feather name={card.icon} size={32} color={card.color} />
            </View>
            <Text style={styles.cardTitle}>{card.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      ></ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  menuButton: {
    padding: 5,
  },
  headerText: {
    flex: 1,
    marginLeft: 15,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  role: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  dateCard: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backdropFilter: "blur(10px)",
  },
  dateInfo: {
    flex: 1,
  },
  dayText: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
  dateText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginVertical: 2,
  },
  yearText: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
  },
  punchButton: {
    backgroundColor: "#f97316",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  punchButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  featureCard: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1f2937",
    textAlign: "center",
    lineHeight: 16,
  },
});
