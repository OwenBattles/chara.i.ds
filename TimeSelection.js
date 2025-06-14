import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TimeSelection = ({ navigation, route }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const times = [30, 60, 90, 120]; // Time in seconds

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const startGame = () => {
    if (selectedTime) {
      navigation.navigate('GamePlay', {
        timeLimit: selectedTime,
        deckId: route.params?.deckId
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Time Limit</Text>
      <View style={styles.timeContainer}>
        {times.map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeButton,
              selectedTime === time && styles.selectedTimeButton
            ]}
            onPress={() => handleTimeSelect(time)}
          >
            <Text style={[
              styles.timeText,
              selectedTime === time && styles.selectedTimeText
            ]}>
              {time} seconds
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.startButton, !selectedTime && styles.disabledButton]}
        onPress={startGame}
        disabled={!selectedTime}
      >
        <Text style={styles.startButtonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  timeButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedTimeButton: {
    backgroundColor: '#007AFF',
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
  selectedTimeText: {
    color: 'white',
  },
  startButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  startButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TimeSelection; 