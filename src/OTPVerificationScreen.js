// OTPVerificationScreen.js
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Keyboard,
  Platform,
} from 'react-native';

export default function OTPVerificationScreen({ route, navigation }) {
  const phone = route?.params?.phone ?? 'your-email@example.com';
  const otpLength = route?.params?.otpLength ?? 4;

  const [otpArray, setOtpArray] = useState(Array(otpLength).fill(''));
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  // TIMER
  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setInterval(() => {
      setTimeLeft(prev => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const otpValue = () => otpArray.join('');

  const handleChangeText = (text, index) => {
    if (text.length > 1) {
      const pasted = text.split('').slice(0, otpLength);
      const newOtp = [...pasted, ...Array(otpLength - pasted.length).fill('')];
      setOtpArray(newOtp);
      inputsRef.current[Math.min(pasted.length - 1, otpLength - 1)]?.focus();
      return;
    }

    const newOtp = [...otpArray];
    newOtp[index] = text;
    setOtpArray(newOtp);

    if (text && index < otpLength - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newOtp.every(ch => ch !== '')) Keyboard.dismiss();
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && otpArray[index] === '' && index > 0) {
      inputsRef.current[index - 1]?.focus();
      const newOtp = [...otpArray];
      newOtp[index - 1] = '';
      setOtpArray(newOtp);
    }
  };

  // 🔥 VERIFY WITHOUT API
  const verifyOtp = () => {
    const code = otpValue();

    if (code.length !== otpLength) {
      setError('Please enter the complete OTP.');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', `OTP Verified: ${code}`);
      // navigation.replace("Home")
    }, 1000);
  };

  // 🔥 RESEND WITHOUT API
  const resendOtp = () => {
    if (timeLeft > 0) return;

    setResendLoading(true);
    setError('');

    setTimeout(() => {
      setResendLoading(false);
      setTimeLeft(30);
      setOtpArray(Array(otpLength).fill(''));
      inputsRef.current[0]?.focus();
      Alert.alert('OTP Sent', `A new OTP is sent to ${phone}`);
    }, 800);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      <Text style={styles.title}>OTP Verification</Text>

      <Text style={styles.subtitle}>
        Please check your email {phone} to see the verification code
      </Text>

      <Text style={styles.label}>OTP Code</Text>

      <View style={styles.otpRow}>
        {Array(otpLength)
          .fill(0)
          .map((_, i) => (
            <TextInput
              key={i}
              ref={ref => (inputsRef.current[i] = ref)}
              value={otpArray[i]}
              onChangeText={text =>
                handleChangeText(text.replace(/[^0-9]/g, ''), i)
              }
              onKeyPress={e => handleKeyPress(e, i)}
              keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
              maxLength={1}
              style={styles.otpInput}
              textContentType="oneTimeCode"
              autoFocus={i === 0}
              selectionColor="#FF6421"
            />
          ))}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.verifyButton, loading && styles.disabledButton]}
        onPress={verifyOtp}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.verifyButtonText}>Verify</Text>}
      </TouchableOpacity>

      <View style={styles.resendRow}>
        <Text style={styles.resendText}>
          {timeLeft > 0 ? `Resend available in ${timeLeft}s` : "Didn't receive the code?"}
        </Text>

        <TouchableOpacity onPress={resendOtp} disabled={timeLeft > 0 || resendLoading}>
          {resendLoading ? <ActivityIndicator /> : <Text style={styles.resendButtonText}>Resend</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ----------------------------------
//               STYLES
// ----------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 120,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },

  subtitle: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 10,
    lineHeight: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
    marginLeft: 4,
  },

  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 12,
    marginBottom: 20,
  },

  otpInput: {
    width: 55,
    height: 60,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },

  verifyButton: {
    width: '100%',
    backgroundColor: '#FF6421',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  disabledButton: {
    opacity: 0.7,
  },

  resendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 4,
  },

  resendText: {
    color: '#666',
    fontSize: 14,
  },

  resendButtonText: {
    color: '#FF6421',
    fontSize: 15,
    fontWeight: '700',
  },

  errorText: {
    color: '#d32f2f',
    marginBottom: 8,
    textAlign: 'center',
    marginTop: 8,
  },

  backBtn: {
    position: 'absolute',
    top: 30,
    left: 20,
    backgroundColor: '#F7F7F9',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },

  backIcon: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#000',
    marginTop: -4,
  },
});
