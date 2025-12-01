import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Alert,
  Image,
} from 'react-native';
import { useTranslation } from 'react-i18next';

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { t } = useTranslation();
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const showToast = msg => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  };

  const RagisterNow = () => {
    navigation.navigate('RegisterScreen');
  };

  const SignUpNow = () => {
    let isValid = true;

    setNameError('');
    setEmailError('');
    setPasswordError('');

    // Name Validation
    if (!name.trim()) {
      setNameError(t('name_required'));

      isValid = false;
    }

    // Email Validation
    if (!email.trim()) {
      setEmailError(t('email_required'));
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError(t('enter_valid_email'));
        isValid = false;
      }
    }

    // Password Validation (UPDATED → minimum 8 characters)
    if (!password.trim()) {
      setPasswordError(t('password_required'));
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError(t('password_min_length'));
      isValid = false;
    }

    if (!isValid) return;

    navigation.replace('MainApp');
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      >
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.header}>{t('sign_up_now')} </Text>

      <Text style={styles.subHeader}>{t('please_fill_details')}</Text>

      {/* Name Input */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, nameError ? { borderColor: 'red' } : {}]}
          placeholder={t('name')}
          placeholderTextColor="#666"
          value={name}
          onChangeText={text => {
            setName(text);
            setNameError('');
          }}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
      </View>

      {/* Email Input */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, emailError ? { borderColor: 'red' } : {}]}
          placeholder={t('email')}
          placeholderTextColor="#666"
          value={email}
          onChangeText={text => {
            setEmail(text);
            setEmailError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      </View>

      {/* Password Input */}
      <View style={styles.inputWrapper}>
        <View
          style={[
            styles.passwordContainer,
            passwordError ? { borderColor: 'red' } : {},
          ]}
        >
          <TextInput
            style={styles.passwordInput}
            placeholder={t('password')}
            placeholderTextColor="#666"
            value={password}
            onChangeText={text => {
              setPassword(text);
              setPasswordError('');
            }}
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>

      {/* Sign Up Button */}
      <TouchableOpacity onPress={SignUpNow} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>{t('sign_up')}</Text>
      </TouchableOpacity>

      {/* Register */}
      <View style={styles.registerContainer}>
        <Text style={styles.RegisterText}>{t('already_have_account')}</Text>
        <TouchableOpacity onPress={RagisterNow}>
          <Text style={styles.signUpNow}>{t('sign_in')}</Text>
        </TouchableOpacity>
      </View>

      {/* Social Media Icons */}
      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={styles.socialBox}
          onPress={() => showToast(t('facebook_login_clicked'))}
        >
          <Image source={require('../Image/fb.png')} style={styles.imageLogo} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialBox}
          onPress={() => showToast(t('instagram_login_clicked'))}
        >
          <Image
            source={require('../Image/insta.png')}
            style={styles.imageLogo}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialBox}
          onPress={() => showToast(t('twitter_login_clicked'))}
        >
          <Image
            source={require('../Image/twit.png')}
            style={styles.imageLogo}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },

  subHeader: {
    textAlign: 'center',
    fontSize: 16,
    color: '#7D848D',
    marginBottom: 30,
  },

  inputWrapper: {
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#F7F7F9',
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
    borderRadius: 8,
  },

  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 5,
    marginLeft: 5,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#F7F7F9',
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },

  eyeIcon: {
    fontSize: 20,
    paddingHorizontal: 6,
  },

  loginButton: {
    backgroundColor: '#FF6421',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: 180,
    gap: 20,
  },

  socialBox: {
    height: 50,
    width: 50,
    // backgroundColor: '#F7F7F9',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  socialIcon: {
    fontSize: 24,
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  RegisterText: {
    color: '#000',
    fontSize: 15,
  },

  signUpNow: {
    color: '#FF6421',
    fontWeight: 'bold',
    fontSize: 15,
  },

  backBtn: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
    backgroundColor: '#F7F7F9',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
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
});
