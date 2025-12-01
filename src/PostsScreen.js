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
const CARD_WIDTH = Math.round(width * 0.68);

const sampleData = [
  {
    id: '1',
    name: 'Heritage Cafe',
    location: 'Banjara',
    image: require('../Image/Rectangle.png'),
    rating: 4.5,
    views: '+12',
    images: [
      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800',
    ],
  },
  {
    id: '2',
    name: 'Blue Orchid',
    location: 'Hyderabad',
    image: require('../Image/Rectangle.png'),
    rating: 4.2,
    views: '+87',
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
    image: require('../Image/Rectangle.png'),
    rating: 4.8,
    views: '+23',
    images: [
      'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800',
      'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
      'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800',
    ],
  },
];

export default function HorizontalCardList({ navigation }) {
  const [bookmarks, setBookmarks] = useState({});
  const [showAll, setShowAll] = useState(false); // Track view all toggle
const { t } = useTranslation();
  const toggleBookmark = id => {
    setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleShowAll = () => setShowAll(prev => !prev);

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
              { left: idx * 18, zIndex: shown.length - idx },
            ]}
            resizeMode="cover"
          />
        ))}
        {images.length > shown.length && (
          <View style={[styles.moreCircle, { left: shown.length * 18 }]}>
            <Text style={styles.moreText}>+{images.length - shown.length}</Text>
          </View>
        )}
      </View>
    );
  };

  const renderCard = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('DetailScreen', { item })} style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image source={item.image} style={styles.mainImage} />

          {/* Bookmark */}
          <TouchableOpacity
            onPress={() => toggleBookmark(item.id)}
            style={styles.bookmarkButton}
            activeOpacity={0.8}
          >
            <Text style={styles.bookmarkText}>
              {bookmarks[item.id] ? '🔖' : '🔲'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={styles.name} numberOfLines={1}>
              {item.name}
            </Text>

            <View style={styles.rowCenter}>
              <Text style={styles.star}>★</Text>
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}
          >
            <View style={{flexDirection:'row'}}>
            <Image
                source={require('../Image/LocationImg.png')}
                style={{ height: 20, width: 20, top: 5, marginEnd:5 }}
              />
            <Text style={styles.location} numberOfLines={1}>
              
              {item.location}
            </Text>
            </View>

            <View style={styles.overlapWrapper}>
              {renderOverlapImages(item.images)}
              <View
                style={{
                  backgroundColor: '#E5F4FF',
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  zIndex: 1,
                  left: 15,
                  marginTop: 3,
                }}
              >
                <Text style={styles.viewsText}>{item.views}</Text>
              </View>
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
        <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
          <Image
            source={require('../Image/Notifications.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('../Image/profilepngicon.png')}
            style={{ height: 50, width: 120 }}
          />
        </TouchableOpacity>
      </View>

      {/* HEADING */}
      <View style={{ marginVertical: 10, alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontSize: 35, fontWeight: '600', textAlign: 'center' }}>
          {t("discover_wonders")}{' '}
          <Text style={{ color: '#FF7029', fontSize: 35, fontWeight: '600' }}>
             {t("world")}!
          </Text>
        </Text>

        <Image
          source={require('../Image/wordIcon.png')}
          style={{ width: 120, height: 20, right: 1, marginTop: 1 }}
        />
      </View>

      {/* BEST DESTINATION HEADER */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 15,
          paddingHorizontal: 15,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: '700' }}>
{t("best_destination")}
          
        </Text>
        <TouchableOpacity onPress={toggleShowAll}>
          <Text style={{ fontSize: 16, color: '#FF7029', fontWeight: '600' }}>
            {showAll ? t("hide") : t("view_all") }
          </Text>
        </TouchableOpacity>
      </View>

      {/* HORIZONTAL FLATLIST */}
      <FlatList
        data={showAll ? sampleData : sampleData.slice(0, 2)} // Show all or first 2
        keyExtractor={i => i.id}
        renderItem={renderCard}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 40,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    marginBottom: 20,
  },
  imageWrapper: {
    height: 350,
    backgroundColor: '#eee',
  },
  mainImage: {
    width: '100%',
    height: 350,
    borderRadius: 20,
  },
  bookmarkButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 6,
    borderRadius: 18,
  },
  bookmarkText: { fontSize: 18 },
  content: {
    padding: 12,
  },
  name: { fontSize: 20, fontWeight: '700', marginBottom: 4, color: '#1B1E28' },
  location: { fontSize: 13, color: '#666', top: 8 },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  star: { color: '#f1c40f', marginRight: 6, fontSize: 16 },
  ratingText: { fontWeight: '700' },
  viewsText: { color: '#666', marginTop: 10, left:7 },
  overlapWrapper: {
    marginTop: 8,
    flexDirection: 'row',
    right: 10,
    bottom: 15,
  },
  overlapContainer: {
    flexDirection: 'row',
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
  },
  overlapImage: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  moreCircle: {
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  moreText: {
    color: '#fff',
    fontSize: 12,
  },
  icon: {
    width: 28,
    height: 28,
  },
});
