import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useTranslation } from 'react-i18next';

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState('');
const { t } = useTranslation();
  const chatData = [
    {
      id: '1',
      name: 'Rahul',
      message: 'Hey, how are you?',
      time: '10:30 AM',
      img: require('../Image/insta.png'),
      status: 'online',
      messageStatus: 'seen', // ✔✔ blue
    },
    {
      id: '2',
      name: 'Priya',
      message: 'Meeting kab hai?',
      time: '09:10 AM',
      img: require('../Image/insta.png'),
      status: 'offline',
      messageStatus: 'delivered', // ✔ single tick
    },
    {
      id: '3',
      name: 'Ankit',
      message: 'Ok done!',
      time: 'Yesterday',
      img: require('../Image/insta.png'),
      status: 'online',
      messageStatus: 'double', // ✔✔ grey
    },
    {
      id: '4',
      name: 'Sneha',
      message: 'Thanks 😊',
      time: 'Yesterday',
      img: require('../Image/insta.png'),
      status: 'offline',
      messageStatus: 'seen', // ✔✔ blue
    },
  ];

  const filteredList = chatData.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{t('messages')}</Text>

        <TouchableOpacity>
          <Image source={require('../Image/Dots.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        {' '}
        <Text style={styles.headerTitle}>{t('messages')}</Text>{' '}
        <TouchableOpacity>
          {' '}
          <Image
            source={require('../Image/Edit.png')}
            style={styles.icon}
          />{' '}
        </TouchableOpacity>{' '}
      </View>

      {/* ---------- SEARCH BAR ---------- */}
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search chats..."
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* ---------- CHAT LIST ---------- */}
      <FlatList
        data={filteredList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("ChatScreenMain", { user: item })}
 style={styles.chatCard}>
            {/* Profile + Status Dot */}
            <View style={{ position: 'relative' }}>
              <Image source={item.img} style={styles.profileImage} />

              {/* Status Dot */}
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor:
                      item.status === 'online' ? 'green' : 'yellow',
                  },
                ]}
              />
            </View>

            {/* Chat Content */}
            <View style={styles.chatContent}>
              {/* Name + Time */}
              <View style={styles.row}>
                <Text style={styles.chatName}>{item.name}</Text>

                <View>
                  <Text style={styles.chatTime}>{item.time}</Text>
                  <View style={styles.tickRow}>
                    {item.messageStatus === 'delivered' && (
                      <Text style={styles.singleTick}>✔</Text>
                    )}

                    {item.messageStatus === 'double' && (
                      <Text style={styles.doubleTickGrey}>✔✔</Text>
                    )}

                    {item.messageStatus === 'seen' && (
                      <Text style={styles.doubleTickBlue}>✔✔</Text>
                    )}
                  </View>
                </View>
              </View>

              {/* Message */}
              <Text style={styles.chatMessage}>{item.message}</Text>

              {/* ---------- TICKS BELOW MESSAGE ---------- */}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* ---------- HEADER ---------- */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 14,
    justifyContent: 'space-between',
    marginTop:20
  },

  backBtn: {
    height: 42,
    width: 42,
    borderRadius: 21,
    backgroundColor: '#F7F7F9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },

  icon: {
    width: 28,
    height: 28,

  },

  /* ---------- SEARCH BAR ---------- */
  searchBar: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  searchInput: {
    backgroundColor: '#F2F2F2',
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
  },

  /* ---------- CHAT LIST ---------- */
  chatCard: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 0.3,
    borderColor: '#D3D3D3',
  },

  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },

  // Online/Offline Status Dot
  statusDot: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: '#fff',
  },

  chatContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },

  chatName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },

  chatMessage: {
    fontSize: 14,
    color: '#555',
    marginTop: 3,
  },

  chatTime: {
    fontSize: 12,
    color: '#777',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  /* ---------- TICKS ---------- */
  tickRow: {
    flexDirection: 'row',
    marginTop: 3,
  },

  singleTick: {
    fontSize: 14,
    color: 'grey',
  },

  doubleTickGrey: {
    fontSize: 14,
    color: 'grey',
  },

  doubleTickBlue: {
    fontSize: 14,
    color: '#1DA1F2', // WhatsApp blue
  },
});
