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
  },
  {
    id: '2',
    name: 'Cafe Mocha',
    location: 'Hitech City',
    image: require('../Image/Rectangle839.png'),
  },
  {
    id: '3',
    name: 'Sunset Lounge',
    location: 'Gachibowli',
    image: require('../Image/Rectangle9839.png'),
  },
  {
    id: '4',
    name: 'Morning Brew',
    location: 'Madhapur',
    image: require('../Image/Rectangle.png'),
  },
  {
    id: '5',
    name: 'Cafe Mocha',
    location: 'Hitech City',
    image: require('../Image/Rectangle839.png'),
  },
  {
    id: '6',
    name: 'Sunset Lounge',
    location: 'Gachibowli',
    image: require('../Image/Rectangle9839.png'),
  },
  {
    id: '7',
    name: 'Cafe Mocha',
    location: 'Hitech City',
    image: require('../Image/Rectangle839.png'),
  },
  {
    id: '8',
    name: 'Sunset Lounge',
    location: 'Gachibowli',
    image: require('../Image/Rectangle9839.png'),
  },
];

export default function CafeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(sampleData);
const { t } = useTranslation();
  const handleSearch = text => {
    setSearch(text);
    const filtered = sampleData.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setData(filtered);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
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

        <View style={styles.infoItem}>
          <Text style={[styles.views, { color: '#FF6421' }]}>$80/</Text>
          <Text style={styles.views}>{t("person")}</Text>
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
        <Text style={styles.headerTitle}>{t("cafes")}</Text>
        <TouchableOpacity
          onPress={() => {
            setSearch(''); // clear search text
            setData(sampleData); // reset FlatList to full data
          }}
        >
          <Text style={styles.headerBtn}>{t("cancel")}</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder={t("search_places")}
          value={search}
          onChangeText={handleSearch}
          style={styles.search}
          placeholderTextColor={'#7D848D'}
        />
        <View style={styles.iconContainer}>
          <View style={styles.separator} />
          <Image
            source={require('../Image/Vectora.png')}
            style={styles.searchIcon}
          />
        </View>
      </View>

      <View style={{marginStart:15,marginVertical:15}}>
        <Text style={{fontSize:23, fontWeight:'bold', color:'#000'}}> {t("search_places")}</Text>
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
    justifyContent: 'space-between',
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
  backIcon: { color: '#000', fontSize: 24 },

  headerBtn: { fontSize: 16, color: '#FF6421' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },

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
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Android shadow
    elevation: 5,
    //marginBottom: 10,
    alignItems: 'center', // center image horizontally
    paddingBottom: 10,
  },
  image: {
    width: '90%',
    height: 120,
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
  location: { color: '#555', marginBottom: 5, left: 5 },
  infoItem: { flexDirection: 'row', alignItems: 'center' },
  views: {  fontSize: 14 },
});
