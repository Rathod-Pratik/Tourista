import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useTranslation } from "react-i18next";

const getWeekDates = startDate => {
  const weekDates = [];
  const start = new Date(startDate);
  start.setDate(start.getDate() - start.getDay()); // start of week
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    weekDates.push({
      day: date.toLocaleString('en-US', { weekday: 'narrow' }),
      date: date.getDate(),
      fullDate: date,
    });
  }
  return weekDates;
};

// Sample schedule data
const scheduleData = [
  {
    id: '1',
    name: 'Team Meeting',
    location: 'Conference Room A',
    date: '2025-11-18',
    image: require('../Image/Rectangle29.png'),
    screen: 'FavoritePlaces',
  },
  {
    id: '2',
    name: 'Project Review',
    location: 'Online',
    date: '2025-11-19',
    image: require('../Image/Rectangle2222.png'),
    screen: 'PopularPackage',
  },
  {
    id: '3',
    name: 'Client Call',
    location: 'Zoom',
    date: '2025-11-20',
    image: require('../Image/Rectangle299.png'),
    screen: 'PopularPlacesOne',
  },
  {
    id: '4',
    name: 'Client Call',
    location: 'Zoom',
    date: '2025-11-20',
    image: require('../Image/Rectangle.png'),
    screen: 'PopularPlacesOne',
  },
  {
    id: '5',
    name: 'Client Call',
    location: 'Zoom',
    date: '2025-11-20',
    image: require('../Image/Rectangle299.png'),
    screen: 'PopularPlacesOne',
  },
  {
    id: '6',
    name: 'Client Call',
    location: 'Zoom',
    date: '2025-11-20',
    image: require('../Image/Rectangle29.png'),
    screen: 'PopularPlacesOne',
  },
];

export default function Calendar({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(new Date());
  const weekDates = getWeekDates(weekStart);
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation();

  const goToPreviousWeek = () => {
    const newStart = new Date(weekStart);
    newStart.setDate(newStart.getDate() - 7);
    setWeekStart(newStart);
  };

  const goToNextWeek = () => {
    const newStart = new Date(weekStart);
    newStart.setDate(newStart.getDate() + 7);
    setWeekStart(newStart);
  };

  const renderDateItem = ({ item }) => {
    const isSelected =
      item.fullDate.toDateString() === selectedDate.toDateString();
    return (
      <TouchableOpacity
        style={[styles.dateContainer, isSelected && styles.selectedDate]}
        onPress={() => setSelectedDate(item.fullDate)}
      >
        <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>
          {item.day}
        </Text>
        <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
          {item.date}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderScheduleItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.scheduleItem}
      onPress={() => navigation.navigate(item.screen, { item })}
    >
      <Image source={item.image} style={styles.scheduleImage} />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../Image/Calendar.png')}
            style={{ height: 20, width: 20 }}
          />
          <Text style={styles.scheduleDate}>{item.date}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={styles.scheduleName}>{item.name}</Text>
          <Image
            source={require('../Image/Arrow.png')}
            style={{ height: 25, width: 25 }}
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../Image/LocationImg.png')}
            style={{ height: 20, width: 20 }}
          />
          <Text style={styles.scheduleLocation}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Show either all items or only first 3
  const displayedData = showAll ? scheduleData : scheduleData.slice(0, 3);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("schedule")}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('NotificationScreen')}
        >
          <Image
            source={require('../Image/Notifications.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Week Calendar */}
      <View style={styles.container}>
        <View style={styles.weekHeader}>
          <TouchableOpacity onPress={goToPreviousWeek}>
            <Text style={styles.arrowText}>{'<'}</Text>
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {selectedDate.toLocaleString('default', { month: 'long' })}
          </Text>
          <TouchableOpacity onPress={goToNextWeek}>
            <Text style={styles.arrowText}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={weekDates}
          renderItem={renderDateItem}
          keyExtractor={item => item.fullDate.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </View>

      {/* My Schedule Section */}
      <View style={styles.scheduleHeader}>
        <Text style={styles.scheduleTitle}>{t("my_schedule")}</Text>
        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
          <Text style={styles.viewAllText}>{showAll ? t("hide") : t("view_all")}</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displayedData}
        renderItem={renderScheduleItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
  },
  backBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F9',
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  backIcon: { color: '#000', fontSize: 40 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  icon: { width: 28, height: 28 },

  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  monthText: { fontSize: 16, fontWeight: '600' },
  arrowText: { fontSize: 18, fontWeight: '600', paddingHorizontal: 10 },

  dateContainer: {
    width: 50,
    height: 60,
    marginHorizontal: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDate: { backgroundColor: '#FF7029' },
  dayText: { fontSize: 12, color: '#555' },
  dateText: { fontSize: 16, fontWeight: '600', color: '#555' },
  selectedDayText: { color: '#fff' },
  selectedDateText: { color: '#fff' },

  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  scheduleTitle: { fontSize: 30, fontWeight: 'bold' },
  viewAllText: { fontSize: 18, color: '#FF7029' },

  scheduleItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderRadius:20
  },

  scheduleImage: { width: 100, height: 100, borderRadius: 10 },
  scheduleName: { fontSize: 18, fontWeight: '900', marginVertical: 8 },
  scheduleLocation: { fontSize: 12, color: '#555', marginTop: 2, marginLeft: 10 },
  scheduleDate: { fontSize: 15, color: '#999', marginTop: 2, marginLeft: 10 },
});
