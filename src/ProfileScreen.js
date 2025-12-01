import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { changeLanguage as changeAppLanguage } from './i18n'; // import your i18n changeLanguage function

export default function ProfileScreen({ navigation }) {
  const { t } = useTranslation(); // i18n hook

  const [user, setUser] = useState({
    name: 'Vaishnav Sai',
    email: 'vaishnav@gmail.com',
    profileImg: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    rewards: 120,
    trips: 15,
    bucket: 8,
  });

  // Language switch function
  const switchLanguage = async (lng) => {
    await changeAppLanguage(lng); // call i18n function that also stores language
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{t('profile')}</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('EditProfile', { user, setUser })}
          style={styles.editIconBtn}
        >
          <Image source={require('../Image/EditArrow.png')} style={styles.imageLogo} />
        </TouchableOpacity>
      </View>

      {/* PROFILE IMAGE */}
      <View style={styles.profileWrapper}>
        <Image source={{ uri: user.profileImg }} style={styles.profileImg} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* STATS */}
      <View style={styles.statsRow}>
        <View style={styles.statsBox}>
          <Text style={styles.statsLabel}>{t('rewardPoints')}</Text>
          <Text style={styles.statsNumber}>{user.rewards}</Text>
        </View>

        <View style={styles.statsBox}>
          <Text style={styles.statsLabel}>{t('travelTrips')}</Text>
          <Text style={styles.statsNumber}>{user.trips}</Text>
        </View>

        <View style={styles.statsBox}>
          <Text style={styles.statsLabel}>{t('bucketList')}</Text>
          <Text style={styles.statsNumber}>{user.bucket}</Text>
        </View>
      </View>

      {/* MENU LIST */}
      <View style={styles.menuWrapper}>
        <TouchableOpacity style={styles.menuRow}>
          <Image source={require('../Image/Profile.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>{t('profile')}</Text>
          <View style={{ flex: 1 }} />
          <Image source={require('../Image/Arrow.png')} style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuRow}>
          <Image source={require('../Image/bookmark.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>{t('bookmarked')}</Text>
          <View style={{ flex: 1 }} />
          <Image source={require('../Image/Arrow.png')} style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuRow}>
          <Image source={require('../Image/Plane.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>{t('previousTrips')}</Text>
          <View style={{ flex: 1 }} />
          <Image source={require('../Image/Arrow.png')} style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuRow}>
          <Image source={require('../Image/Settings.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>{t('settings')}</Text>
          <View style={{ flex: 1 }} />
          <Image source={require('../Image/Arrow.png')} style={styles.arrowIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuRow}>
          <Image source={require('../Image/Version.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>{t('version')}</Text>
          <View style={{ flex: 1 }} />
          <Image source={require('../Image/Arrow.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>

      {/* LANGUAGE SWITCH */}
      <View style={styles.statsRow}>
        <TouchableOpacity style={styles.statsBox} onPress={() => switchLanguage('hi')}>
          <Text style={styles.statsLabel}>{t('hindi')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.statsBox} onPress={() => switchLanguage('en')}>
          <Text style={styles.statsLabel}>{t('english')}</Text>
        </TouchableOpacity>

       


      </View>
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  /* HEADER */
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    marginTop:10,
    backgroundColor: '#fff',
  },

  backBtn: {
    backgroundColor: '#fff',
    height: 42,
    width: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },

  editIconBtn: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 2,
  },

  /* PROFILE */
  profileWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },

  profileImg: {
    height: 110,
    width: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#fff',
  },

  name: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
  },

  email: {
    fontSize: 16,
    color: '#555',
  },

  /* STATS */
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 30,
  },

  statsBox: {
    backgroundColor: '#fff',
    width: '33%',
    paddingVertical: 18,
    alignItems: 'center',
    elevation: 3,
  },

  statsNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FF6421',
  },

  statsLabel: {
    fontSize: 14,
    color: '#1B1E28',
    marginTop: 4,
    fontWeight: 'bold',
  },

  backIcon: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#000',
    marginTop: -4,
  },
  imageLogo: {
    height: 40,
    width: 40,
  },

  menuWrapper: {
    marginTop: 25,
    paddingHorizontal: 20,
  },

  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.6,
    borderColor: '#ddd',
  },

  menuIcon: {
    height: 30,
    width: 30,
    marginRight: 15,
  },

  menuIconone: {
    height: 30,
    width: 30,
    marginRight: 15,
  },

  menuText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  arrowIcon: {
  height: 24,
  width: 24,
  tintColor: '#000',
},
});
