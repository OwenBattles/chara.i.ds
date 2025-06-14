import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SavedDecks = ({ navigation }) => {
  // Placeholder data - replace with actual data management
  const savedDecks = [
    { id: '1', name: 'Deck 1', cards: 20 },
    { id: '2', name: 'Deck 2', cards: 15 },
  ];

  const renderDeck = ({ item }) => (
    <TouchableOpacity 
      style={styles.deckItem}
      onPress={() => navigation.navigate('TimeSelection', { deckId: item.id })}
    >
      <Text style={styles.deckName}>{item.name}</Text>
      <Text style={styles.deckInfo}>{item.cards} cards</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Decks</Text>
      <FlatList
        data={savedDecks}
        renderItem={renderDeck}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  list: {
    flex: 1,
  },
  deckItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  deckName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  deckInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default SavedDecks; 