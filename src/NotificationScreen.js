import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useTranslation } from "react-i18next";

// Sample notification data
const sampleNotifications = {
  recent: [
    {
      id: "1",
      title: "Order Shipped",
      subtitle: "Your order #1234 has been shipped",
      time: "2h ago",
      image: require("../Image/insta.png"), // local image
      read: false,
    },
    {
      id: "2",
      title: "New Message",
      subtitle: "You have received a new message",
      time: "5h ago",
      image: require("../Image/NotiImg.png"),
      read: true,
    },
  ],
  earlier: [
    {
      id: "3",
      title: "Discount Offer",
      subtitle: "Get 20% off on your next purchase",
      time: "1d ago",
      image: require("../Image/NotiImg.png"),
      read: false,
    },
    {
      id: "4",
      title: "Payment Received",
      subtitle: "Your payment was successful",
      time: "2d ago",
      image: require("../Image/NotiImg.png"),
      read: true,
    },
  ],
  archived: [
    {
      id: "5",
      title: "Subscription Ended",
      subtitle: "Your subscription ended yesterday",
      time: "5d ago",
      image: require("../Image/NotiImg.png"),
      read: true,
    },
  ],
};

export default function NotificationScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("recent");
  const [notifications, setNotifications] = useState(sampleNotifications);
const { t } = useTranslation();
  const clearAll = () => {
    setNotifications((prev) => ({ ...prev, [activeTab]: [] }));
  };

  const toggleRead = (id) => {
    setNotifications((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((n) =>
        n.id === id ? { ...n, read: !n.read } : n
      ),
    }));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleRead(item.id)}>
      <View
        style={[
          styles.itemContainer,
          { backgroundColor: item.read ? "#fff" : "#E5F4FF" },
        ]}
      >
        <Image
          source={item.image}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={[styles.title, !item.read && { fontWeight: "bold" }]}>
            {item.title}
          </Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  const tabs = ["recent", "earlier", "archived"];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("popular_places")}</Text>
        <TouchableOpacity onPress={clearAll}>
          <Text style={styles.clearText}>{t("clear_all")}</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notification List */}
      {notifications[activeTab].length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{t("no_notifications")}</Text>
        </View>
      ) : (
        <FlatList
          data={notifications[activeTab]}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginHorizontal: 10,
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  clearText: {
    fontSize: 16,
    color: "#FF7029",
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    borderBottomColor: "#ccc",
  },
  tabButton: {
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
  },
  activeTabText: {
    color: "#FF7029",
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor:'red'
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: "#999",
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});
