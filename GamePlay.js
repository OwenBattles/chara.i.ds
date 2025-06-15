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
  const [gameOver, setGameOver] = useState(false);
  const [tiltDirection, setTiltDirection] = useState(null);
  const [tiltValue, setTiltValue] = useState(0);
  const [isTilting, setIsTilting] = useState(false);
  const [lastTiltTime, setLastTiltTime] = useState(0);
  const timerRef = useRef(null);
  const lastActionTime = useRef(0);
  const canTriggerAction = useRef(true);

  useEffect(() => {
    if (!isPlaying) return;

    const subscription = Accelerometer.addListener(accelerometerData => {
      const { x } = accelerometerData;
      const now = Date.now();
      
      // Only process tilt if enough time has passed since last action
      if (now - lastActionTime.current >= 500) {
        if (x > 0.5 && !isTilting) {
          handleTilt('right');
          lastActionTime.current = now;
        } else if (x < -0.5 && !isTilting) {
          handleTilt('left');
          lastActionTime.current = now;
        }
      }
      
      setTiltValue(x);
    });

    return () => {
      subscription.remove();
    };
  }, [isPlaying, isTilting]);

  useEffect(() => {
    // Start the timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current);
          // setIsPlaying(false);
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

  const handleNextItem = (wasCorrect) => {
    setAnsweredItems(prev => [...prev, {
      item: items[currentItemIndex],
      wasCorrect
    }]);

    if (currentItemIndex < items.length - 1) {
      setCurrentItemIndex(prev => prev + 1);
    } else {
      // Game is over, navigate to summary
      console.log('currentItemIndex', currentItemIndex);
      console.log('items', items.length);
      navigation.navigate('GameSummary', {
        category,
        score,
        totalItems: items.length,
        answeredItems: [...answeredItems, {
          item: items[currentItemIndex],
          wasCorrect
        }]
      });
    }
  };

  const handleYes = () => {
    if (currentItemIndex < items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  const handleNo = () => {
    if (currentItemIndex < items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    } else {
      setGameOver(true);
    }
  };

  const handleTilt = (direction) => {
    if (isTilting) return;
    setIsTilting(true);
    setTiltDirection(direction);
    setScore(prev => prev + 1);
    setTimeout(() => {
      setIsTilting(false);
      setTiltDirection(null);
    }, 500);
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, tiltDirection === 'left' && styles.tiltingButton]} 
          onPress={handleNo}
        >
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, tiltDirection === 'right' && styles.tiltingButton]} 
          onPress={handleYes}
        >
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#5DADE2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  tiltingButton: {
    backgroundColor: '#3498DB',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  gameOverText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#154360',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F618D',
  },
});

export default GamePlay; 