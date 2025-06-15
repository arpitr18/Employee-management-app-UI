import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import * as DocumentPicker from "expo-document-picker";

export default function RaiseTicketScreen() {
  const [selectedModule, setSelectedModule] = useState("");
  const [query, setQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModuleDropdown, setShowModuleDropdown] = useState(false);

  const modules = [
    "Attendance Management",
    "Leave Management",
    "Expense Management",
    "Regularization",
    "Profile Management",
    "Reports",
    "Technical Issues",
    "Other",
  ];

  const handleGoBack = () => {
    router.back();
  };

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    setShowModuleDropdown(false);
  };

  const handleChooseFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setSelectedFile(result.assets[0]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick file");
    }
  };

  const handleSubmit = () => {
    if (!selectedModule.trim()) {
      Alert.alert("Error", "Please select a module");
      return;
    }

    if (!query.trim()) {
      Alert.alert("Error", "Please write your query");
      return;
    }

    Alert.alert("Success", "Your ticket has been submitted successfully!", [
      {
        text: "OK",
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#3b82f6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Raise New Ticket</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowModuleDropdown(!showModuleDropdown)}
            >
              <Text
                style={[
                  styles.dropdownText,
                  !selectedModule && styles.placeholderText,
                ]}
              >
                {selectedModule || "Select module where you're facing issues"}
              </Text>
              <Feather name="arrow-left" size={24} color="#3b82f6" />
            </TouchableOpacity>

            {showModuleDropdown && (
              <View style={styles.dropdownMenu}>
                {modules.map((module, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => handleModuleSelect(module)}
                  >
                    <Text style={styles.dropdownItemText}>{module}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.inputGroup}>
            <TextInput
              style={styles.textArea}
              placeholder="Write your query here..."
              placeholderTextColor="#9ca3af"
              value={query}
              onChangeText={setQuery}
              multiline={true}
              numberOfLines={8}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.optionalLabel}>(Optional)</Text>
            <TouchableOpacity
              style={styles.fileUpload}
              onPress={handleChooseFile}
            >
              <Feather name="paperclip" size={20} color="#6b7280" />
              <Text style={styles.fileUploadText}>
                {selectedFile ? selectedFile.name : "Choose File"}
              </Text>
            </TouchableOpacity>
            {selectedFile && (
              <Text style={styles.selectedFileText}>
                Selected: {selectedFile.name}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.submitContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
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
    fontSize: 18,
    fontWeight: "600",
    color: "#3b82f6",
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  dropdownText: {
    fontSize: 16,
    color: "#1f2937",
    flex: 1,
  },
  placeholderText: {
    color: "#9ca3af",
  },
  dropdownMenu: {
    backgroundColor: "white",
    borderRadius: 12,
    marginTop: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  dropdownItem: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#1f2937",
  },
  textArea: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: "#1f2937",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    minHeight: 150,
  },
  optionalLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 10,
  },
  fileUpload: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    paddingVertical: 20,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#d1d5db",
  },
  fileUploadText: {
    fontSize: 16,
    color: "#6b7280",
    marginLeft: 10,
  },
  selectedFileText: {
    fontSize: 14,
    color: "#10b981",
    marginTop: 10,
    fontWeight: "500",
  },
  submitContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  submitButton: {
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});
