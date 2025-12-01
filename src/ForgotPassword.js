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
  Modal,
} from 'react-native';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const SignUpNow = () => {
    let isValid = true;

    setEmailError('');

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

    if (!isValid) return;

    // Show modal
    setModalVisible(true);
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

      <Text style={styles.header}>Forgot password</Text>

      <Text style={styles.subHeader}>
        Enter your email account to reset your password
      </Text>

      {/* Email Input */}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, emailError ? { borderColor: 'red' } : {}]}
          placeholder="Email"
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

      {/* Reset Button */}
      <TouchableOpacity onPress={SignUpNow} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Reset Password</Text>
      </TouchableOpacity>

      {/* ⭐ Reset Password Modal ⭐ */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
          }}
          style={styles.modalBackground}
        >
          <TouchableOpacity
              onPress={() => {
                //ssetModalVisible(false);
                navigation.navigate('OTPVerificationScreen');
              }}
              style={styles.modalContainer}>
            <TouchableOpacity
              onPress={() => {
                //ssetModalVisible(false);
               // navigation.navigate('OTPVerificationScreen');
              }}
              style={styles.loginButtonContainer}
            >
              <Image
                source={require('../Image/modelicon.png')}
                style={styles.imageLogo}
              />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Check your email</Text>

            <Text style={styles.modalMsg}>
              We have sent password recovery instructions to your email.
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
    marginBottom: 20,
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

  loginButton: {
    backgroundColor: '#FF6421',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 50,
  },

  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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

  /* ⭐ Modal Styles ⭐ */
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 10,
  },

  imageLogo: {
    height: 40,
    width: 40,
    marginBottom: 20,
    resizeMode: 'contain',
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },

  modalMsg: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },

  okButton: {
    backgroundColor: '#FF6421',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },

  okText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
