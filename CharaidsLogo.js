import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CharaidsLogo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={[styles.logoText, styles.char]}>Chara</Text>
        <Text style={[styles.logoText, styles.dot]}>.</Text>
        <Text style={[styles.logoText, styles.i]}>i</Text>
        <Text style={[styles.logoText, styles.dot]}>.</Text>
        <Text style={[styles.logoText, styles.ds]}>ds</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 1,
    textShadowColor: '#D6EAF8',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  char: {
    color: '#3498DB', // bright blue
  },
  dot: {
    color: '#5DADE2',
  },
  i: {
    color: '#1F618D', // deep blue
    fontStyle: 'italic',
  },
  ds: {
    color: '#2E86C1',
  },
});

export default CharaidsLogo;
