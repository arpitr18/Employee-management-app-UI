import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState("Basic");
  const [profileImage, setProfileImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const tabs = [
    { name: "Basic", icon: "user" },
    { name: "Emp", icon: "user-check" },
    { name: "Family", icon: "users" },
    { name: "Bank", icon: "credit-card" },
    { name: "Docs", icon: "file-text" },
  ];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission is required to access the gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      await AsyncStorage.setItem("profileImage", uri);
    }
  };
  const loadProfileImage = async () => {
    const savedImage = await AsyncStorage.getItem("profileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
  };
  useEffect(() => {
    loadProfileImage();
  }, []);

  const renderDetails = () => {
    const dataMap = {
      Basic: [
        { label: "Full Name", value: "Arpit Rai", icon: "user" },
        { label: "Date of Birth", value: "18-Sept-2004", icon: "calendar" },
        { label: "Gender", value: "Male", icon: "user" },
        { label: "Mobile", value: "8369310785", icon: "phone" },
        { label: "Email", value: "arpitrai1809@gmail.com", icon: "mail" },
        { label: "Current Address", value: "Kandivali", icon: "home" },
        { label: "Permanent Address", value: "Noida", icon: "home" },
      ],
      Emp: [
        { label: "Department", value: "Accounts", icon: "briefcase" },
        { label: "Joining Date", value: "12-Jan-2016", icon: "calendar" },
        { label: "Designation", value: "Manager", icon: "award" },
      ],
      Family: [
        { label: "Spouse Name", value: "Unmarried", icon: "user" },
        { label: "Children", value: "N/A", icon: "users" },
      ],
      Bank: [
        { label: "Bank Name", value: "HDFC", icon: "credit-card" },
        { label: "Account Number", value: "XXXX-XXXX-1234", icon: "hash" },
      ],
      Docs: [
        { label: "PAN", value: "ABCDE1234F", icon: "file-text" },
        { label: "Aadhaar", value: "1234-5678-9012", icon: "file-text" },
      ],
    };

    const currentDetails = dataMap[activeTab];

    return (
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>
          {activeTab.toUpperCase()} DETAILS
        </Text>
        {currentDetails.map((detail, index) => (
          <View key={index} style={styles.detailRow}>
            <View style={styles.detailLeft}>
              <Feather name={detail.icon} size={20} color="#3b82f6" />
              <Text style={styles.detailLabel}>{detail.label}</Text>
            </View>
            <Text style={styles.detailValue}>{detail.value}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#3b82f6" />
        </TouchableOpacity> */}
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <LinearGradient
        colors={["#3b82f6", "#10b981"]}
        style={styles.profileCard}
      >
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.profileImageContainer}
        >
          <View style={styles.profileImage}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.imageStyle}
                // resizeMode="cover"
              />
            ) : (
              <Feather name="user" size={24} color="#3b82f6" />
            )}
          </View>
          <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
            <Feather name="edit-2" size={20} color="#3b82f6" />
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Arpit Rai</Text>
          <Text style={styles.profileRole}>Accounts Manager </Text>
          {/* <Text style={styles.profileDepartment}>Accounts</Text> */}
        </View>
        <View style={styles.empCodeContainer}>
          <Text style={styles.empCodeText}>EMP CODE: ARP-1809</Text>
        </View>
      </LinearGradient>

      <View style={styles.tabsContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={[styles.tab, activeTab === tab.name && styles.activeTab]}
            onPress={() => setActiveTab(tab.name)}
          >
            <Feather
              name={tab.icon}
              size={20}
              color={activeTab === tab.name ? "#3b82f6" : "#6b7280"}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === tab.name && styles.activeTabText,
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderDetails()}
      </ScrollView>

      <Modal visible={modalVisible} transparent={true}>
        <Pressable
          style={styles.modalContainer}
          onPress={() => setModalVisible(false)}
        >
          <Image
            source={{ uri: profileImage }}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3b82f6",
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
  },
  profileCard: {
    margin: 20,
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
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
    // overflow: "hidden",
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    bottom: 3,
    right: -2,
    backgroundColor: "white",
    borderRadius: "50%",
    padding: 5,
    elevation: 3,
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  profileRole: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
  },
  profileDepartment: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
  },
  empCodeContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  empCodeText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  tabsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#3b82f6",
  },
  tabText: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 5,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#3b82f6",
    fontWeight: "600",
  },
  detailsContainer: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3b82f6",
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  detailLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 10,
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    textAlign: "right",
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: "50%",
  },
  fullImage: {
    width: "80%",
    height: "80%",
  },
});
