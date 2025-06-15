import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

// Accept props from API response
const AppliedExpenseCard = ({ title, expenseDate, appliedDate, amount, status }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    }); // Example: 11 June
  };

  return (
    <View style={styles.card}>
      {/* Top Section */}
      <View style={styles.topSection}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.label}>Expense Date</Text>
          <Text style={styles.date}>{formatDate(expenseDate)}</Text>
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
          <Text style={styles.label}>Applied Date</Text>
          <Text style={styles.date}>{formatDate(appliedDate)}</Text>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.amount}>₹{amount}</Text>
        <TouchableOpacity style={styles.cancelButton}>
          <Entypo name="circle-with-cross" size={16} color={"white"} />
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppliedExpenseCard;


const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    alignItems: "flex-end",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#1f2937", // Gray-800
  },
  label: {
    fontSize: 12,
    color: "#6b7280", // Gray-500
  },
  date: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827", // Gray-900
  },
  statusBadge: {
    backgroundColor: "#3b82f6", // Blue
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 6,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#10b981", // Green
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ef4444", // Red
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  cancelText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
  },
});
