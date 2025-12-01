import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreenMain({ route, navigation }) {
  const { user } = route.params;
  const { t } = useTranslation();
  const [message, setMessage] = useState('');

  const [chat, setChat] = useState([
    { id: '1', text: 'Hello!', type: 'received' },
    { id: '2', text: 'Hi, How are you?', type: 'sent' },
  ]);

  const sendMessage = () => {
    if (message.trim() === '') return;

    const newMsg = {
      id: Date.now().toString(),
      text: message,
      type: 'sent',
    };

    setChat([...chat, newMsg]);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.onlineText}>
              {user.status === 'online'
                ? t('Active now')
                : t('lastSeenRecently')}
            </Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <Image
                source={require('../Image/callicon.png')}
                style={styles.headerIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dateSeparator}>
          <Text style={styles.dateText}>Today</Text>
        </View>

        <FlatList
          data={chat}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatListContent}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageBubble,
                item.type === 'sent'
                  ? styles.sentMessage
                  : styles.receivedMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />

        <View style={styles.inputArea}>
          <TextInput
            style={styles.textInput}
            placeholder="Message"
            placeholderTextColor="#777"
            value={message}
            onChangeText={setMessage}
          />

          <View style={styles.fileIcon}>
            {message.trim() === '' ? (
              <TouchableOpacity>
                <Image
                  source={require('../Image/pin.png')}
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={sendMessage}>
                <Image
                  source={require('../Image/msfSend.jpg')}
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={styles.AudioButton}>
            <Image
              source={require('../Image/voice.png')}
              style={styles.Audioicon}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 70,
    borderBottomWidth: 0.3,
    borderColor: '#ccc',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: '#F7F7F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    width: 44,
    height: 44,
  },
  backArrow: {
    fontSize: 34,
    color: '#000',
    marginTop: -4,
    marginRight: 2,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  onlineText: {
    fontSize: 12,
    color: 'green',
    textAlign: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 20,
    width: 44,
    justifyContent: 'flex-end',
  },
  headerIcon: {
    width: 40,
    height: 40,
  },
  // Date Separator Styles
  dateSeparator: {
    alignItems: 'center',
    marginVertical: 10,
  },
  dateText: {
    backgroundColor: '#F7F7F9',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
    fontSize: 12,
    color: '#666',
    overflow: 'hidden',
  },
  chatListContent: {
    paddingBottom: 20,
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  sentMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#E9E9EB',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 15,
    color: '#000',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 0.3,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    fontSize: 15,
    paddingRight: 40,
  },
  fileIcon: {
    position: 'absolute',
    right: 70,
    height: '100%',
    justifyContent: 'center',
    zIndex: 1,
  },
  actionIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  Audioicon: {
    width: 40,
    height: 40,
  },
});