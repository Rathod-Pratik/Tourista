import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';

// Import translation files
import en from './en.json';
import hi from './hi.json';

const LANGUAGE_KEY = 'user-language';

// Language detector plugin
const languageDetector = {
  type: 'languageDetector',
  async: true,
  init: () => {},
  detect: (callback) => {
    AsyncStorage.getItem(LANGUAGE_KEY)
      .then(language => {
        callback(language || 'en'); // fallback to 'en'
      })
      .catch(() => {
        callback('en');
      });
  },
  cacheUserLanguage: (language) => {
    AsyncStorage.setItem(LANGUAGE_KEY, language).catch(err =>
      console.log('Error caching language', err)
    );
  },
};

// i18n initialization
i18n
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      hi: { translation: hi },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    react: {
      useSuspense: false,
    },
  });

// Function to change language
export const changeLanguage = async (language) => {
  try {
    await i18n.changeLanguage(language);
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
  } catch (err) {
    console.log('Error changing language', err);
  }
};

// Function to load stored language manually
export const loadLanguage = async () => {
  try {
    const storedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (storedLanguage) {
      await i18n.changeLanguage(storedLanguage);
    }
  } catch (err) {
    console.log('Error loading language', err);
  }
};

export default i18n;
