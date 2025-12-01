import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import { useTranslation } from "react-i18next";

export default function DetailScreen({ route, navigation }) {
  const { item } = route.params;
const { t } = useTranslation();
  const [bookmarks, setBookmarks] = useState({});
  const [readMore, setReadMore] = useState(false); // For expandable text

  const toggleBookmark = id => {
    setBookmarks(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const description =
    'Experience the ultimate vacation package with our beach travel package. From airline tickets to recommended hotel rooms and transportation, we have everything you need for a perfect getaway. Enjoy sun, sand, and sea, plus curated activities to make your trip unforgettable.';

    const handleBookNow = () => {
  ToastAndroid.show('Booking Successful!', ToastAndroid.SHORT);
  
  setTimeout(() => {
    navigation.goBack();
  }, 500);
};


  return (
    <ScrollView style={styles.container}>
      {/* Image Header */}
      <View style={styles.imageHeaderContainer}>
        <Image source={item.image} style={styles.mainImage} />

        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{t("details")}</Text>

          {/* Bookmark button */}
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
      </View>

      {/* Content */}
      <View style={styles.content}>

        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{t("location_city")}</Text>
        </View>
        <Image
              source={require('../Image/Ellipse.png')}
              style={{height:40, width:40}}
            />
        </View>

        {/* Location, Rating & Price */}
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Image
              source={require('../Image/LocationImg.png')}
              style={styles.icon}
            />
            <Text style={styles.location} numberOfLines={1}>
              {item.location}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={[styles.rating, { color: '#f1c40f' }]}>★</Text>
            <Text style={styles.rating}>{item.rating.toFixed(1)}</Text>
            <Text style={[styles.rating,{color:'#7D848D'}]}>(280)</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={[styles.views, { color: '#FF6421' }]}>$80/</Text>
            <Text style={styles.views}>{t("per_person")}</Text> 
          </View>
        </View>

        {/* Images */}
        <FlatList
          data={item.images}
          keyExtractor={(i, idx) => i + idx}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 20 }}
          renderItem={({ item: uri }) => (
            <Image source={{ uri }} style={styles.image} />
          )}
        />

        {/* About Destination */}
        <Text style={styles.sectionTitle}>{t("about_destination")}</Text>
        <Text style={styles.description} numberOfLines={readMore ? undefined : 3}>
          {description}
        </Text>
        <TouchableOpacity onPress={() => setReadMore(!readMore)}>
          <Text style={styles.readMoreText}>
            {readMore ? t("read_less") : t("read_more")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.bookNowButton}
        onPress={handleBookNow}
      >
        <Text style={styles.bookNowText}>{t("book_now")}</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  // Image Header
  imageHeaderContainer: { position: 'relative' },
  mainImage: { width: '100%', height: 450 },
  headerRow: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
  backIcon: { color: '#fff', fontSize: 24 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '700' },
  bookmarkButton: {
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
  bookmarkText: { fontSize: 24, color: '#fff' },

  // Content
  content: { padding: 16, backgroundColor: '#fff', borderRadius:35, zIndex:1, bottom:35 },
  name: { fontSize: 24, fontWeight: '700', marginBottom: 10 },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop:20
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: { width: 20, height: 20, marginRight: 5 },

  location: { fontSize: 16, color: '#666' },
  rating: { fontSize: 16, marginRight: 5 },
  views: { fontSize: 16 },

  // Images
  image: { width: 50, height: 50, borderRadius: 12, marginRight: 10 },

  // About Section
  sectionTitle: { fontSize: 20, fontWeight: '700', marginTop: 20, marginBottom: 8 },
  description: { fontSize: 16, color: '#7D848D', lineHeight: 22 },
  readMoreText: { color: '#f1c40f', marginTop: 5, fontWeight: '700' },
  bookNowButton: {
    marginTop: 20,
    backgroundColor: '#FF7029',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom:20
  },
  bookNowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
