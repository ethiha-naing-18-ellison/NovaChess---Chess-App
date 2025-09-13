// NovaChess - Introduction Screen Component
import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  StyleSheet,
  Animated,
  Image 
} from 'react-native';

const { width, height } = Dimensions.get('window');

export const IntroductionScreen = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const slides = [
    {
      id: 1,
      title: "Welcome to NovaChess",
      subtitle: "Master the Game of Kings",
      description: "Experience the ultimate chess game with beautiful graphics, smart AI opponents, and intuitive gameplay.",
      icon: "♔",
      color: "#1a1a2e" // Dark purple-black
    },
    {
      id: 2,
      title: "Play Anywhere",
      subtitle: "Challenge Friends & AI",
      description: "Play against friends online, challenge AI opponents of different skill levels, or practice with puzzles.",
      icon: "♕",
      color: "#2a2a3a" // Dark purple
    },
    {
      id: 3,
      title: "Learn & Improve",
      subtitle: "Become a Chess Master",
      description: "Track your progress, analyze your games, and learn from the best with our comprehensive chess features.",
      icon: "♖",
      color: "#0f0f1a" // Dark black-purple
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      scrollViewRef.current?.scrollTo({
        x: nextSlide * width,
        animated: true,
      });
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      const prevSlide = currentSlide - 1;
      setCurrentSlide(prevSlide);
      scrollViewRef.current?.scrollTo({
        x: prevSlide * width,
        animated: true,
      });
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const onScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  const renderSlide = (slide, index) => (
    <View key={slide.id} style={[styles.slide, { backgroundColor: slide.color }]}>
      <View style={styles.slideContent}>
        <View style={styles.iconContainer}>
          <Image 
            source={require('../../assets/applicationlogo.png')} 
            style={styles.slideIcon}
            resizeMode="contain"
          />
        </View>
        
        <Text style={styles.slideTitle}>{slide.title}</Text>
        <Text style={styles.slideSubtitle}>{slide.subtitle}</Text>
        <Text style={styles.slideDescription}>{slide.description}</Text>
      </View>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {slides.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor: index === currentSlide ? '#6b46c1' : '#4a5568', // Dark purple accent and muted color
              width: index === currentSlide ? 12 : 8,
              height: index === currentSlide ? 12 : 8,
            },
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {slides.map((slide, index) => renderSlide(slide, index))}
      </ScrollView>

      <View style={styles.footer}>
        {renderDots()}
        
        <View style={styles.buttonContainer}>
          {currentSlide > 0 && (
            <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
              <Text style={styles.previousButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a', // Dark black-purple background
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContent: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(107, 70, 193, 0.3)', // Dark purple with transparency
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 2,
    borderColor: '#6b46c1', // Dark purple accent
  },
  slideIcon: {
    width: 80,
    height: 80,
  },
  slideTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#e2e8f0', // Light text for dark background
    textAlign: 'center',
    marginBottom: 10,
  },
  slideSubtitle: {
    fontSize: 20,
    color: '#e2e8f0',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  slideDescription: {
    fontSize: 16,
    color: '#94a3b8', // Muted light text
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  dot: {
    borderRadius: 6,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.9,
  },
  previousButton: {
    backgroundColor: 'rgba(107, 70, 193, 0.3)', // Dark purple with transparency
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#6b46c1', // Dark purple accent
  },
  previousButtonText: {
    color: '#e2e8f0',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#4a5568', // Muted dark color
  },
  skipButtonText: {
    color: '#94a3b8', // Muted light text
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#3b82f6', // Dark blue accent
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  nextButtonText: {
    color: '#e2e8f0', // Light text for dark background
    fontSize: 16,
    fontWeight: 'bold',
  },
});
