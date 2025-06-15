import { Accelerometer } from 'expo-sensors';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const GamePlay = ({ navigation, route }) => {
  const { timeLimit, items = [], category } = route.params;
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [score, setScore] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [answeredItems, setAnsweredItems] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);
  const lastActionTime = useRef(0);
  const canTriggerAction = useRef(true);

  useEffect(() => {
    // Start the timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          setIsPlaying(false);
          // Use setTimeout to ensure navigation happens after state updates
          setTimeout(() => {
            navigation.navigate('GameSummary', { 
              score,
              totalItems: items.length,
              answeredItems
            });
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
  }, [navigation, score, items.length, answeredItems]);

  useEffect(() => {
    if (!isPlaying) return;

    // Set up accelerometer
    Accelerometer.setUpdateInterval(100);

    const subscription = Accelerometer.addListener((data) => {
      const now = Date.now();
      
      // Check if enough time has passed since last action
      if (now - lastActionTime.current < 1000) return;

      // Check if phone is level enough to trigger new action
      if (Math.abs(data.z) < 0.3) {
        canTriggerAction.current = true;
        return;
      }

      // If we can't trigger an action yet, return
      if (!canTriggerAction.current) return;

      // Handle tilt actions
      if (data.z > 0.7) {
        handleCorrect();
        lastActionTime.current = now;
        canTriggerAction.current = false;
      } else if (data.z < -0.7) {
        handleIncorrect();
        lastActionTime.current = now;
        canTriggerAction.current = false;
      }
    });

    // Cleanup accelerometer listener
    return () => {
      subscription.remove();
      Accelerometer.removeAllListeners();
    };
  }, [isPlaying]);

  const handleCorrect = () => {
    setScore(prevScore => prevScore + 1);
    handleNextItem(true);
  };

  const handleIncorrect = () => {
    setScore(prevScore => Math.max(0, prevScore - 1));
    handleNextItem(false);
  };

  const handleNextItem = (wasCorrect) => {
    setAnsweredItems(prev => [...prev, {
      item: items[currentItemIndex],
      wasCorrect
    }]);

    if (currentItemIndex < items.length - 1) {
      setCurrentItemIndex(prev => prev + 1);
    } else {
      // All items have been answered
      clearInterval(timerRef.current);
      setIsPlaying(false);
      navigation.navigate('GameSummary', { 
        score,
        totalItems: items.length,
        answeredItems: [...answeredItems, {
          item: items[currentItemIndex],
          wasCorrect
        }]
      });
    }
  };

  const handleExit = () => {
    setIsPlaying(false);
    clearInterval(timerRef.current);
    navigation.navigate('GameSummary', { 
      score,
      totalItems: items.length,
      answeredItems
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.exitButton}
          onPress={handleExit}
        >
          <Text style={styles.exitButtonText}>Exit</Text>
        </TouchableOpacity>
        <Text style={styles.timer}>Time: {formatTime(timeLeft)}</Text>
        <Text style={styles.score}>Score: {score}</Text>
      </View>

      <View style={styles.gameArea}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.question}>{items[currentItemIndex]}</Text>
        <Text style={styles.progress}>
          Item {currentItemIndex + 1} of {items.length}
        </Text>
        <Text style={styles.instructions}>
          Tilt up for correct, down for skip
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2F8',
    padding: 20,
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  exitButton: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  exitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  timer: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F618D',
  },
  score: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F618D',
  },
  gameArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  category: {
    fontSize: 20,
    color: '#5DADE2',
    marginBottom: 20,
    fontWeight: '600',
  },
  question: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#154360',
    marginBottom: 20,
  },
  progress: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 10,
  },
  instructions: {
    fontSize: 18,
    color: '#5DADE2',
    marginTop: 30,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default GamePlay; 