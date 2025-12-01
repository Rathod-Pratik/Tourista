import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
   ToastAndroid,
  Alert,
} from 'react-native';
import { useTranslation } from "react-i18next";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
const { t } = useTranslation();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const RagisterNow = () => {
    navigation.navigate('RegisterScreen');
  };

   

  const forgotNow = () => {
    navigation.navigate('ForgotPassword');
  };

   const showToast = msg => {
      if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
      } else {
        Alert.alert(msg);
      }
    };

  const SignUpNow = () => {
    let isValid = true;

    setEmailError('');
    setPasswordError('');

    // Email Validation
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError('Enter a valid email');
        isValid = false;
      }
    }

    // Password Validation
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
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

      <Text style={styles.header}>{t("signInNow")}</Text>

      <Text style={styles.subHeader}>
        {t("pleaseSignInToContinue")}
      </Text>

      {/* Email Input Wrapper */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            emailError ? { borderColor: 'red' } : {},
          ]}
          placeholder={t("email")}
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

      {/* Password Input Wrapper */}
      <View style={styles.inputWrapper}>
        <View
          style={[
            styles.passwordContainer,
            passwordError ? { borderColor: 'red' } : {},
          ]}
        >
          <TextInput
            style={styles.passwordInput} 
            placeholder={t("password")}
            placeholderTextColor="#666"
            value={password}
            onChangeText={text => {
              setPassword(text);
              setPasswordError('');
            }}
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.eyeIcon}>
              {showPassword ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        </View>

        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
      </View>

      {/* Forgot Password */}
      <TouchableOpacity
        style={styles.forgotWrapper}
        onPress={forgotNow} 
      >
        <Text style={styles.forgotText}>{t("forgotPassword")}</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity onPress={SignUpNow} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>{t("signIn")}</Text>
      </TouchableOpacity>

      {/* Register */}
      <View style={styles.registerContainer}>
        <Text style={styles.RegisterText}>{t("dontHaveAccount")} </Text>
        <TouchableOpacity onPress={RagisterNow}>
          <Text style={styles.signUpNow}>{t("signUp")} </Text>
        </TouchableOpacity>
      </View>

       {/* Social Media Icons */}
            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={styles.socialBox}
                onPress={() => showToast('Facebook  Clicked')}
              >
                      <Image source={require('../Image/fb.png')} style={styles.imageLogo} />
      
              </TouchableOpacity>
      
              <TouchableOpacity
                style={styles.socialBox}
                onPress={() => showToast('Instagram  Clicked')}
              >
                <Image source={require('../Image/insta.png')} style={styles.imageLogo} />
              </TouchableOpacity>
      
              <TouchableOpacity
                style={styles.socialBox}
                onPress={() => showToast('Twitter  Clicked')}
              >
                <Image source={require('../Image/twit.png')} style={styles.imageLogo} />
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

  forgotWrapper: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },

  forgotText: {
    color: '#FF6421',
    fontSize: 15,
    fontWeight: 'bold',
  },

  loginButton: {
    backgroundColor: '#FF6421',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
   imageLogo:{
    height:40, width:40
  },
   socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: 180,
    gap: 20,
  },
});
