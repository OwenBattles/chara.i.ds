import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // or any icon set

const BackButton = ({ color = '#2980B9', size = 28, style }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.button, style]}
    >
      <Ionicons name="arrow-back" size={size} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: '#EAF2F8',
    shadowColor: '#2980B9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default BackButton;
