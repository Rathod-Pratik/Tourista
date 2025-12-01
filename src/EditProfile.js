import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';

export default function EditProfile({ route, navigation }) {
  const { user, setUser } = route.params;
   const { t } = useTranslation();

  const [firstName, setFirstName] = useState(user.name.split(" ")[0]);
  const [lastName, setLastName] = useState(user.name.split(" ")[1]);
  const [mobile, setMobile] = useState('9876543210');
  const [location, setLocation] = useState('Algeria');
  const [profileImg, setProfileImg] = useState(user.profileImg);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (res) => {
      if (!res.didCancel) {
        setProfileImg(res.assets[0].uri);
      }
    });
  };

  const handleDone = () => {
    setUser({
      ...user,
      name: `${firstName} ${lastName}`,
      profileImg,
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{t('editProfile')}</Text>

        <TouchableOpacity onPress={handleDone}>
          <Text style={styles.doneText}>{t('done')}</Text>
        </TouchableOpacity>
      </View>

      {/* IMAGE + NAME */}
      <TouchableOpacity onPress={pickImage} style={styles.imgWrapper}>
        <Image source={{ uri: profileImg }} style={styles.profileImg} />
        <Text style={styles.nameText}>{firstName} {lastName}</Text>

        <Text style={styles.changePhoto}>{t('changeProfilePicture')}</Text>
      </TouchableOpacity>

      {/* INPUTS WITH LABELS */}

      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>{t('firstName')}</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>{t('lastName')}</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

     

      <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>{t('location')}</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />
      </View>

       <View style={styles.inputWrapper}>
        <Text style={styles.inputLabel}>{t('mobileNumber')}</Text>
        <TextInput
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
          keyboardType="number-pad"
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
  },

  doneText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6421',
  },

  backIcon: {
    fontSize: 40,
    fontWeight: 'bold',
  },

  imgWrapper: {
    alignItems: 'center',
    marginTop: 30,
  },

  profileImg: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },

  nameText: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
    color: '#000',
  },

  changePhoto: {
    color: '#FF6421',
    marginTop: 8,
    fontWeight: '900',
    fontSize: 18,
  },

  inputWrapper: {
    marginTop: 20,
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});
