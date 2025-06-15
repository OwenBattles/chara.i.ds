import Slider from '@react-native-community/slider';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackButton from './BackButton';
import LoadingScreen from './LoadingScreen';

const TimeSelection = ({ navigation, route }) => {
  const { category, isCustomCategory = false } = route.params || {};
  const [selectedTime, setSelectedTime] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  useEffect(() => {
    // Lock to portrait when component mounts
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };
    lockOrientation();

    // Unlock when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const queryBackend = async (categoryInput) => {
    try {
      setIsLoading(true);
      setShowLoadingScreen(true);
      console.log('Sending request to backend with category:', categoryInput);
      const response = await fetch('https://charaids.onrender.com/generate-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: categoryInput }),
      });

      console.log('Response status:', response.status);
      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (!response.ok) {
        throw new Error(`Failed to generate category items: ${response.status} ${responseText}`);
      }

      const data = JSON.parse(responseText);
      console.log('Parsed response data:', data);
      return data.items || [];
    } catch (error) {
      console.error('Detailed error:', error);
      Alert.alert('Error', 'Failed to generate category items. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
      setShowLoadingScreen(false);
    }
  };

  const startGame = async () => {
    if (!selectedTime) {
      Alert.alert('Error', 'Please select a time limit');
      return;
    }

    if (isCustomCategory) {
      const items = await queryBackend(category);
      if (items) {
        navigation.navigate('GamePlay', {
          timeLimit: selectedTime,
          category: category,
          items: items,
          isCustomCategory: true
        });
      }
    } else {
      navigation.navigate('GamePlay', {
        timeLimit: selectedTime,
        deckId: route.params?.deckId
      });
    }
  };

  if (showLoadingScreen) {
    return <LoadingScreen category={category} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton color="#1F618D" size={32} style={{ marginTop: 10 }} />
      </View>
      <Text style={styles.title}>Select Time Limit</Text>
      <Text style={styles.timerLabel}>{selectedTime} seconds</Text>

      <Slider
        style={styles.slider}
        minimumValue={30}
        maximumValue={180}
        step={15}
        value={selectedTime}
        onValueChange={setSelectedTime}
        minimumTrackTintColor="#3498DB"
        maximumTrackTintColor="#D6DBDF"
        thumbTintColor="#2980B9"
        disabled={isLoading}
      />

      <TouchableOpacity
        style={[styles.startButton, isLoading && styles.disabledButton]}
        onPress={startGame}
        disabled={isLoading}
      >
        <Text style={styles.startButtonText}>
          {isLoading ? 'Generating Items...' : 'Start Game'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#EAF2F8',
    justifyContent: 'center',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F618D',
    marginBottom: 30,
    textAlign: 'center',
  },
  timerLabel: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#154360',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  startButton: {
    backgroundColor: '#3498DB',
    padding: 15,
    borderRadius: 10,
    marginTop: 40,
    width: '80%',
    alignSelf: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  startButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TimeSelection; 