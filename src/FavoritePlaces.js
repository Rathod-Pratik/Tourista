import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 30) / 2; // 2 columns with margin

const sampleData = [
  {
    id: '1',
    name: 'Heritage Cafe',
    location: 'Banjara Hills',
    image: require('../Image/Rectangle.png'),
    rating: 4,
  },
  {
    id: '2',
    name: 'Cafe Mocha',
    location: 'Hitech City',
    image: require('../Image/Rectangle839.png'),
    rating: 5,
  },
  {
    id: '3',
    name: 'Sunset Lounge',
    location: 'Gachibowli',
    image: require('../Image/Rectangle9839.png'),
    rating: 3,
  },
  {
    id: '4',
    name: 'Morning Brew',
    location: 'Madhapur',
    image: require('../Image/Rectangle.png'),
    rating: 4,
  },
  {
    id: '5',
    name: 'Cafe Mocha',
    location: 'Hitech City',
    image: require('../Image/Rectangle839.png'),
    rating: 4,
  },
  {
    id: '6',
    name: 'Sunset Lounge',
    location: 'Gachibowli',
    image: require('../Image/Rectangle9839.png'),
    rating: 4,
  },
  {
    id: '7',
    name: 'Cafe Mocha',
    location: 'Hitech City',
    image: require('../Image/Rectangle839.png'),
    rating: 4,
  },
  {
    id: '8',
    name: 'Sunset Lounge',
    location: 'Gachibowli',
    image: require('../Image/Rectangle9839.png'),
    rating: 4,
  },
];

export default function FavoritePlaces({ navigation }) {
  const [data, setData] = useState(sampleData);
  const [favorites, setFavorites] = useState({}); // track heart selection
const { t } = useTranslation();
  const toggleFavorite = id => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderStars = rating => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text
          key={i}
          style={{
            color: i <= rating ? '#FFD700' : '#E0E0E0', // filled vs empty star
            fontSize: 16,
            marginRight: 2,
            bottom: 3,
          }}
        >
          ★
        </Text>,
      );
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 2,
        }}
      >
        {stars}
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => toggleFavorite(item.id)}
        >
          <Text style={{ fontSize: 20 }}>
            {favorites[item.id] ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
            marginTop: 5,
          }}
        >
          <Image
            source={require('../Image/LocationImg.png')}
            style={{ height: 16, width: 16 }}
          />
          <Text style={[styles.location]}>{item.location}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 2,
          }}
        >
          {renderStars(item.rating)}
          <Text style={{ marginLeft: 4, color: '#555', fontSize: 16 }}>
            {item.rating}.0
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={[styles.views, { color: '#FF6421' }]}>$80/</Text>
          <Text style={styles.views}>{t("per_person")}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("popular_places")}</Text>
      </View>

      <View style={{ marginStart: 15, marginVertical: 15 }}>
        <Text style={{ fontSize: 23, fontWeight: 'bold', color: '#000' }}>
          {' '}
          {t("all_popular_places")}
        </Text>
      </View>

      {/* FlatList */}
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 15,
        }}
        contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10, // reduce padding to align with icon
    marginTop: 20,
  },
  backBtn: {
    justifyContent: 'center', // centers the arrow vertically
    alignItems: 'center',
    backgroundColor: '#F7F7F9',
    borderRadius: 20,
    height: 40,
    width: 40,
  },
  backIcon: { color: '#000', fontSize: 35, bottom:2 },

  headerBtn: { fontSize: 16, color: '#FF6421' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', left:110 },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  search: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#000',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: '#ccc',
    marginHorizontal: 8,
  },
  searchIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  card: {
    width: ITEM_WIDTH,
    borderRadius: 10,
    backgroundColor: '#fff',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Android shadow
    elevation: 3,
    //marginBottom: 10,
    alignItems: 'center', // center image horizontally
    paddingBottom: 10,
  },
  image: {
    width: '90%',
    height: 150,
    borderRadius: 20,
    marginTop: 10,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 8,
    alignItems: 'flex-start', // center text below image
    left: 10,
  },
  name: { fontWeight: 'bold', fontSize: 16, marginBottom: 2 },
  location: { color: '#555', left: 5 },
  infoItem: { flexDirection: 'row', alignItems: 'center' },
  views: { fontSize: 14 },
  heartIcon: {
    position: 'absolute',
    top: 20,
    right: 20, // adjust to move heart horizontally
    borderRadius: 20,
    padding: 5,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});
