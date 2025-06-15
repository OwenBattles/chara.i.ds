import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const GamePlay = ({ navigation, route }) => {
  const { timeLimit } = route.params;
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [score, setScore] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    // Start the timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          // Use setTimeout to ensure navigation happens after state updates
          setTimeout(() => {
            navigation.navigate('GameSummary', { score });
          }, 0);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [navigation, score]);

  const handleCorrect = () => {
    setScore(prevScore => prevScore + 1);
  };

  const handleIncorrect = () => {
    setScore(prevScore => Math.max(0, prevScore - 1));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameOver) {
    return (
      <View style={styles.container}>
        <Text style={styles.gameOverText}>Game Over!</Text>
        <Text style={styles.scoreText}>Final Score: {score}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomePage')}>
          <Text style={styles.buttonText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.timer}>Time: {formatTime(timeLeft)}</Text>
        <Text style={styles.score}>Score: {score}</Text>
      </View>

      <View style={styles.gameArea}>
        <Text style={styles.question}>Sample Question</Text>
        {/* Add your game content here */}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.incorrectButton]}
          onPress={handleIncorrect}
        >
          <Text style={styles.buttonText}>Incorrect</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.correctButton]}
          onPress={handleCorrect}
        >
          <Text style={styles.buttonText}>Correct</Text>
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
    flexDirection: 'row', // Changed to row for landscape layout
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  timer: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  score: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60, // Added margin to account for header
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: '45%',
  },
  correctButton: {
    backgroundColor: '#4CAF50',
  },
  incorrectButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GamePlay; 