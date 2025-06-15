import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import CharaidsLogo from './CharaidsLogo';

const LoadingScreen = ({ category }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <CharaidsLogo />
      </View>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498DB" />
        <Text style={styles.loadingText}>
          Generating items for "{category}"...
        </Text>
        <Text style={styles.subText}>
          This may take a few moments
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF2F8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 50,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 20,
    color: '#1F618D',
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  subText: {
    fontSize: 16,
    color: '#5DADE2',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default LoadingScreen; 