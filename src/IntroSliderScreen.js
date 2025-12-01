import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const { height, width } = Dimensions.get('window');

const slides = [
  {
    key: 'one',
    title: 'Life is brief, but the universe is ',
    title1:'vast .',
    text: 'At Tourista Adventures, we curate unique and immersive travel experiences to destinations around the globe.',
    image: require('../Image/Rectangle.png'),
  },
  {
    key: 'two',
    title: 'The world is waiting for you, go',
    title1:'discover it.',
    text: 'Embark on an unforgettable journey by venturing outside of your comfort zone. The world is full of hidden gems just waiting to be discovered.',
    image: require('../Image/Splashht.png'),
  },
  {
    key: 'three',
    title: 'People don’t take trips, trips take',
    title1:'people',
    text: 'To get the best of your adventure you just need to leave and go where you like. we are waiting for you',
    image: require('../Image/Splash3.png'),
  },
];

export default function IntroSliderScreen({ navigation }) {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onDone = () => {
    navigation.replace('Login');
  };

  const renderItem = ({ item }) => (
    <ImageBackground source={item.image} style={styles.bgImage}>
      {/* Skip Text */}
      {currentIndex !== 2 && (
        <TouchableOpacity
          style={styles.skipBtn}
          onPress={onDone}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.title1}>
            {item.title1}
        </Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.bottomButtonContainer}>
        {currentIndex !== 2 ? (
          <TouchableOpacity
            onPress={() => sliderRef.current.goToSlide(currentIndex + 1)}
            style={styles.nextButton}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onDone} style={styles.getStartButton}>
            <Text style={styles.getStartText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );

  // Auto-slide for first 2 slides
  useEffect(() => {
    if (currentIndex < 2) {
      const timer = setTimeout(() => {
        sliderRef.current?.goToSlide(currentIndex + 1, true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <AppIntroSlider
      ref={sliderRef}
      renderItem={renderItem}
      data={slides}
      onSlideChange={setCurrentIndex}
      onDone={onDone}
      showNextButton={false}
      showSkipButton={false}
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
    />
  );
}

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'space-between',
  },
  skipBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
  skipText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  textContainer: {
    marginTop: height * 0.60,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
    title1: {
    fontSize: 30,
    color: '#FF6421',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: '#DBDBDB',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  bottomButtonContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  nextButton: {
    backgroundColor: '#FF6421',
    paddingVertical: 10,
    paddingHorizontal: 150,
    borderRadius: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  getStartButton: {
    backgroundColor: '#FF6421',
    paddingVertical: 10,
    paddingHorizontal: 150,
    borderRadius: 10,
  },
  getStartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  dotStyle: {
    backgroundColor: '#ccc',
    bottom:120
  },
  activeDotStyle: {
    backgroundColor: '#FF6421',
    width: 40,
    bottom:120
  },
});
