import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.round(width * 0.94);

const sampleData = [
  {
    id: '1',
    name: 'Heritage Cafe',
    location: 'Banjara',
    image: require('../Image/Rectangle.png'),
    rating: 4.5,
    views: '12',
    date: '16 July-28 July',
    price: '800',
    images: [
      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
      'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
      'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800',
    ],
  },
  {
    id: '2',
    name: 'Blue Orchid',
    location: 'Hyderabad',
    image: require('../Image/Rectangle8843.png'),
    rating: 4.2,
    views: '87',
    date: '16 July-28 July',
    price: '800',
    images: [
      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
    ],
  },
  {
    id: '3',
    name: 'Mumbai Bites',
    location: 'Kondapur',
    image: require('../Image/Rectangle9843.png'),
    rating: 4.8,
    views: '23',
    date: '16 July-28 July',
    price: '800',
    images: [
      'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
      'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
    ],
  },
  {
    id: '4',
    name: 'Mumbai Bites',
    location: 'Kondapur',
    image: require('../Image/Rectangle1843.png'),
    rating: 4.8,
    views: '23',
    date: '16 July-28 July',
    price: '800',
    images: [
      'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
      'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
    ],
  },
  {
    id: '5',
    name: 'Mumbai Bites',
    location: 'Kondapur',
    image: require('../Image/Rectangle2843.png'),
    rating: 4.8,
    views: '23',
    date: '16 July-28 July',
    price: '800',
    images: [
      'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
      'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
    ],
  },
];
export default function PopularPackage({ navigation }) {
  const { t } = useTranslation();
  const renderStars = rating => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text
          key={i}
          style={i <= Math.floor(rating) ? styles.starFilled : styles.starEmpty}
        >
          ★
        </Text>,
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  const renderOverlapImages = (images = []) => {
    const shown = images.slice(0, 4);
    return (
      <View style={styles.overlapContainer}>
        {shown.map((uri, idx) => (
          <Image
            key={uri + idx}
            source={{ uri }}
            style={[
              styles.overlapImage,
              { left: idx * 20, zIndex: shown.length - idx },
            ]}
            resizeMode="cover"
          />
        ))}
        {images.length > shown.length && (
          <View style={[styles.moreCircle, { left: shown.length * 20 }]}>
            <Text style={styles.moreText}>+{images.length - shown.length}</Text>
          </View>
        )}
      </View>
    );
  };

  const renderCard = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardRow}>
          <Image
            source={item.image}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <View style={styles.content}>
            <View style={styles.cardHeader}>
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>${item.price}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <Image
                source={require('../Image/Calendar.png')}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text style={styles.dateText}>{item.date}</Text>
            </View>

            <View style={styles.row}>
              {renderStars(item.rating)}
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            </View>

            <View style={styles.row}>
              {renderOverlapImages(item.images)}
              <Text style={styles.viewsText}>{item.views} {t("person_joined")}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("popular_package")}</Text>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{t("all_popular_trip_package")}</Text>
      </View>

      <FlatList
        data={sampleData}
        keyExtractor={item => item.id}
        renderItem={renderCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 20 },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 1,
    padding: 12,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  mainImage: { width: 120, height: 130, borderRadius: 12, marginRight: 12 },
  content: { flex: 1, justifyContent: 'center' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontSize: 18, fontWeight: '700', color: '#1B1E28', marginBottom: 4 },
  priceContainer: {
    backgroundColor: '#FF6421',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  priceText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  icon: { width: 18, height: 18 },
  dateText: { fontSize: 16, color: '#7D848D', marginLeft: 6 },
  starsContainer: { flexDirection: 'row' },
  starFilled: { color: '#FFD700', fontSize: 16, marginRight: 2 },
  starEmpty: { color: '#E0E0E0', fontSize: 16, marginRight: 2 },
  ratingText: { marginLeft: 6, color: '#555', fontSize: 16 },
  overlapContainer: { flexDirection: 'row', alignItems: 'center', height: 40 },
  overlapImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    position: 'absolute',
  },
  moreCircle: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
  },
  moreText: { color: '#fff', fontSize: 12 },
  viewsText: { marginLeft: 80, color: '#7D848D', fontSize: 16 },

  header: {
    flexDirection: 'row',
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
  backIcon: { color: '#000', fontSize: 35, bottom: 2 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', left: 100 },
  titleContainer: { marginStart: 15, marginVertical: 15 },
  titleText: { fontSize: 23, fontWeight: 'bold', color: '#000' },
  flatListContent: { paddingHorizontal: 16, paddingBottom: 20 },
});
