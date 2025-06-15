import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import ModalDropdown from "react-native-modal-dropdown";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";

export default function teamAttedence() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [selectedModule, setSelectedModule] = useState("Select Department");
  const [selectedStatus, setSelectedStatus] = useState("Select Status");
  const [filter, setFilter] = useState(false);

  const moduleOptions = [
    "HR",
    "Accounts",
    "IT",
    "Business Development ",
    "Finance",
  ];
  const statusOptions = ["Absent", "Present", "Late Mark "];

  const handleReset = () => {
    setFromDate("");
    setToDate("");
    setSelectedModule("Select Department");
    setSelectedStatus("Select Status");
  };

  const handleApply = () => {
    console.log("Applied Filters:", {
      fromDate,
      toDate,
      selectedModule,
      selectedStatus,
    });
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            router.replace("(tabs)/home");
          }}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#3b82f6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Team Attendence </Text>
        <TouchableOpacity
          onPress={() => setFilter(!filter)}
          style={styles.filterButton}
        >
          <Feather name="filter" size={20} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      {filter && (
        <View style={styles.filterContainer}>
          <View style={styles.dateRow}>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowFromPicker(true)}
            >
              <Feather name="calendar" size={18} color="#6b7280" />
              <Text style={styles.dateText}>{fromDate || "From Date"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowToPicker(true)}
            >
              <Feather name="calendar" size={18} color="#6b7280" />
              <Text style={styles.dateText}>{toDate || "To Date"}</Text>
            </TouchableOpacity>
          </View>

          {showFromPicker && (
            <DateTimePicker
              mode="date"
              value={fromDate ? new Date(fromDate) : new Date()}
              onChange={(event, selectedDate) => {
                setShowFromPicker(Platform.OS === "ios");
                if (selectedDate) setFromDate(formatDate(selectedDate));
              }}
            />
          )}

          {showToPicker && (
            <DateTimePicker
              mode="date"
              value={toDate ? new Date(toDate) : new Date()}
              onChange={(event, selectedDate) => {
                setShowToPicker(Platform.OS === "ios");
                if (selectedDate) setToDate(formatDate(selectedDate));
              }}
            />
          )}

          <View style={styles.dropdownRow}>
            <Dropdown
              data={moduleOptions.map((item) => ({ label: item, value: item }))}
              labelField="label"
              valueField="value"
              placeholder="Select Department"
              style={styles.dropdown}
              value={selectedModule}
              onChange={(item) => setSelectedModule(item.value)}
            />
            <Dropdown
              data={statusOptions.map((item) => ({ label: item, value: item }))}
              labelField="label"
              valueField="value"
              value={selectedStatus}
              onChange={(item) => setSelectedStatus(item.value)}
              placeholder="Select Status"
              style={styles.dropdown}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Feather name="rotate-ccw" size={18} color="white" />
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Feather name="check" size={18} color="white" />
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.ticketsContainer}>
          {/* <Text style={styles.sectionTitle}>R</Text> */}
          <View style={styles.emptyState}>
            <MaterialIcons name="error" size={48} color="#ef4444" />
            <Text style={styles.emptyStateText}>No records found</Text>
            {/* <Text style={styles.emptyStateSubtext}>
              Create a new ticket to get help from our support team
            </Text> */}
          </View>
        </View>
      </ScrollView>
    </View>
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
    justifyContent: "space-between",
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
    // flex:1,
    fontSize: 18,
    fontWeight: "600",
    color: "#3b82f6",
  },
  filterButton: {
    // alignSelf: "flex-end",
    padding: 5,
  },
  content: {
    flex: 1,
  },
  filterContainer: {
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
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  dateInput: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#f9fafb",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 14,
    color: "#1f2937",
  },
  dropdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dropdown: {
    flex: 1,
    backgroundColor: "#f9fafb",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  dropdownText: {
    fontSize: 14,
    color: "#1f2937",
  },
  placeholderText: {
    color: "#9ca3af",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resetButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3b82f6",
    paddingVertical: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  resetButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
  },
  applyButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#10b981",
    paddingVertical: 15,
    borderRadius: 10,
    marginLeft: 10,
  },
  applyButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
  },
  ticketsContainer: {
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
    color: "#1f2937",
    marginBottom: 20,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ef4444",
    marginTop: 15,
    marginBottom: 5,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 20,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3b82f6",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  floatingButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 14,
  },
});
