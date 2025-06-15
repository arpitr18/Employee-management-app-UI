import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import { Drawer } from "expo-router/drawer";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

function CustomDrawerContent(props) {
  const [profileImage, setProfileImage] = useState(null);
  // const router = useRouter();
  const menuItems = [
    { title: "Policy ", icon: "file-text" },
    { title: "My Holiday ", icon: "calendar" },
    { title: "My Attendance ", icon: "user" },
    { title: "Team Attendance ", icon: "users" },
    { title: "My Team Employees ", icon: "briefcase" },
    { title: "My Regularization ", icon: "settings" },
    { title: "Team Regularization ", icon: "settings" },
    { title: "My Leave ", icon: "calendar" },
    { title: "Team Leaves ", icon: "users" },
  ];

  const handleLogout = ({ navigation }) => {
    Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("isLoggedIn");
            // await AsyncStorage.clear();
            router.replace("/");
          } catch (err) {
            console.error("Logout error:", err);
          }
        },
      },
    ]);
  };

  const loadProfileImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem("profileImage");
      // console.log("Loaded Image:", savedImage);
      if (savedImage !== null) {
        setProfileImage(savedImage);
      }
    } catch (err) {
      console.log("Error loading image:", err);
    }
  };

  useEffect(() => {
    loadProfileImage();
  });

  return (
    <LinearGradient
      colors={["#1e40af", "#3b82f6"]}
      style={styles.drawerContainer}
    >
      <TouchableOpacity
          onPress={() => {
            router.push("/(tabs)/profile");
          }}
        >
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <View style={styles.profileImage}>
                {profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={styles.imageStyle}
                    resizeMode="cover"
                  />
                ) : (
                  <Feather name="user" size={24} color="#3b82f6" />
                )}
              </View>
            </View>
            <Text style={styles.profileName}>Vaibhav Birla</Text>
            <Text style={styles.profileCode}>SAN-9010</Text>

            <View style={styles.empDetails}>
              <Text style={styles.empCode}>SAN-9010</Text>
              <Text style={styles.empName}>Vaibhav Birla</Text>
            </View>

            <View style={styles.punchSection}>
              <View style={styles.punchItem}>
                <Text style={styles.punchLabel}>PUNCH IN</Text>
                <Text style={styles.punchTime}>--:--</Text>
              </View>
              <View style={styles.punchItem}>
                <Text style={styles.punchLabel}>PUNCH OUT</Text>
                <Text style={styles.punchTime}>--:--</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}
      >
        

        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <Text style={styles.menuText}>{item.title}</Text>
              <Feather name="arrow-right-circle" size={20} color="#10b981" />
            </TouchableOpacity>
          ))}
        </View>
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <Text style={styles.appVersion}>App Version: 2.0.12 </Text>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>LOGOUT</Text>
          <Feather name="log-out" size={20} color="white" />
        </Pressable>
      </View>
    </LinearGradient>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: "80%",
        },
      }}
    >
      <Drawer.Screen name="(tabs)" />
      {/* <Drawer.Screen name="(comps)" /> */}
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical:20
  },
  drawerContent: {
    flexGrow: 1,
    paddingTop: 0,
  },
  profileSection: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.2)",
  },
  profileImageContainer: {
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  profileCode: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 20,
  },
  empDetails: {
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.3)",
  },
  empCode: {
    fontSize: 16,
    color: "#fbbf24",
    fontWeight: "600",
  },
  empName: {
    fontSize: 14,
    color: "white",
    marginTop: 2,
  },
  punchSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  punchItem: {
    alignItems: "center",
    flex: 1,
  },
  punchLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 5,
  },
  punchTime: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  menuSection: {
    flex: 1,
    paddingVertical: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "rgba(255,255,255,0.7)",
    marginVertical: 5,
    borderRadius: 10,
  },
  menuText: {
    fontSize: 16,
    color: "#ef4444",
    marginLeft: 15,
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  appVersion: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 15,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: "100%",
    justifyContent: "center",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "800",
    color: "white",
    marginRight: 10,
  },
});


