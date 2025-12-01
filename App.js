// App.js
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Old Screens
import PostsScreen from './src/PostsScreen';
import CounterScreen from './src/CounterScreen';
import IconScreen from './src/IconScreen';

// New Screens
import SplashScreen from './src/SplashScreen';
import IntroSliderScreen from './src/IntroSliderScreen';
import LoginScreen from './src/LoginScreen';
import RegisterScreen from './src/RegisterScreen';
import ForgotPassword from './src/ForgotPassword';
import ProfileScreen from './src/ProfileScreen';
import EditProfile from './src/EditProfile';
import SearchScreen from './src/SearchScreen';
import ChatScreenMain from './src/ChatScreenMain';
import DetailScreen from './src/DetailScreen';
import NotificationScreen from './src/NotificationScreen';
import FavoritePlaces from './src/FavoritePlaces';
import PopularPackage from './src/PopularPackage';
import PopularPlacesOne from './src/PopularPlacesOne';
import i18n, { loadLanguage } from './src/i18n';
import OTPVerificationScreen from './src/OTPVerificationScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="PostsScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="PostsScreen" component={PostsScreen} />
      <Stack.Screen 
  name="DetailScreen" 
  component={DetailScreen}/>

    </Stack.Navigator>
  );
}

const CustomTabButton = ({ children, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={{
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

function MainApp() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 65,
          position: 'absolute',
          left: 10,
          right: 10,
          elevation: 5,
          backgroundColor: '#fff',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('./Image/HomeIcon.png')}
              style={{ width: 25, height: 25, marginTop: 10 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Counter"
        component={CounterScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('./Image/Calendar.png')}
              style={{ width: 25, height: 25, marginTop: 10 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Icon"
        component={IconScreen}
        options={{
          tabBarButton: props => (
            <CustomTabButton {...props}>
              <Image
                source={require('./Image/Searchicon.png')}
                style={{ width: 60, height: 60, borderRadius: 30, top: 5 }}
              />
            </CustomTabButton>
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('./Image/Caht.png')}
              style={{ width: 25, height: 25, marginTop: 10 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('./Image/profileimages.jpg')}
              style={{
                width: 25,
                height: 25,
                borderRadius: 12.5,
                marginTop: 10,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [languageLoaded, setLanguageLoaded] = useState(false);

  useEffect(() => {
    const initLanguage = async () => {
      await loadLanguage(); 
      setLanguageLoaded(true); 
    };
    initLanguage();
  }, []);

  if (!languageLoaded) return null; 

  return (
    <>
      <StatusBar
        backgroundColor="#f2f2f2"
        barStyle="dark-content"
        translucent={false}
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="IntroSlider" component={IntroSliderScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainApp" component={MainApp} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="EditProfile" component={EditProfile} />

          <Stack.Screen name="ChatScreenMain" component={ChatScreenMain} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />

          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
          />

          <Stack.Screen name="FavoritePlaces" component={FavoritePlaces} />

          <Stack.Screen name="PopularPackage" component={PopularPackage} />

          <Stack.Screen name="PopularPlacesOne" component={PopularPlacesOne} />
          <Stack.Screen
            name="OTPVerificationScreen"
            component={OTPVerificationScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
