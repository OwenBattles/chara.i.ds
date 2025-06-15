import React, { useState } from 'react';
import {
    Slider,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const TimeSelectScreen = ({ route, navigation }) => {
  const { defaultTime = 60, category, isCustomCategory = false } = route.params;
  const [selectedTime, setSelectedTime] = useState(defaultTime);

  const handleStart = () => {
    navigation.navigate('Game', {
      category,
      timeLimit: selectedTime,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Time</Text>

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
      />

      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2F8',
    padding: 20,
    justifyContent: 'center',
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
    marginTop: 40,
    backgroundColor: '#3498DB',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TimeSelectScreen;
