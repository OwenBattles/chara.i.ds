import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CharaidsLogo from './CharaidsLogo';
import CustomTextBox from './TextBox';

const HomePage = ({ navigation }) => {
  const [category, setCategory] = useState('');

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

  const handleStartGame = () => {
    if (!category.trim()) {
      Alert.alert('Error', 'Please enter a category');
      return;
    }

    navigation.navigate('TimeSelection', {
      category: category,
      isCustomCategory: true
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <CharaidsLogo />
      </View>
      <CustomTextBox 
        placeholder="Enter a Category" 
        value={category} 
        onChangeText={setCategory}
        style={styles.textBox}
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={handleStartGame}
      >
        <Text style={styles.buttonText}>Start New Game</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('SavedDecks')}
      >
        <Text style={styles.buttonText}>View Saved Decks</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    marginBottom: 30,
  },
  textBox: {
    width: '90%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomePage; 