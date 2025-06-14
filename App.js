import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import GamePlay from './GamePlay';
import GameSummary from './GameSummary';
import HomePage from './HomePage';
import SavedDecks from './SavedDecks';
import TimeSelection from './TimeSelection';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="HomePage"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="HomePage" 
          component={HomePage} 
          options={{ title: 'Chara.i.ds' }}
        />
        <Stack.Screen 
          name="SavedDecks" 
          component={SavedDecks} 
          options={{ title: 'Saved Decks' }}
        />
        <Stack.Screen 
          name="TimeSelection" 
          component={TimeSelection} 
          options={{ title: 'Select Time' }}
        />
        <Stack.Screen 
          name="GamePlay" 
          component={GamePlay} 
          options={{ title: 'Game' }}
        />
        <Stack.Screen 
          name="GameSummary" 
          component={GameSummary} 
          options={{ title: 'Game Summary' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 