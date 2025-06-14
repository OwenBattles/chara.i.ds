import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const GameSummary = ({ navigation, route }) => {
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

  const { score } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Over!</Text>
      
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Final Score</Text>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('HomePage')}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.playAgainButton]}
          onPress={() => navigation.navigate('TimeSelection')}
        >
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  scoreLabel: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  playAgainButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GameSummary; 