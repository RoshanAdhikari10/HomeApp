import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [users, setUsers] = useState([
    { id: '1', name: 'Roshan', phone: '9817113485', money: '500', date: new Date().toISOString() },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👥 User List</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('UserForm', { user: item })}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text>📞 {item.phone}</Text>
            <Text>💰 Rs {item.money}</Text>
            <Text>📅 {new Date(item.date).toDateString()}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('UserForm')}
      >
        <Text style={styles.addText}>➕ Add New User</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fb',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: '#2d3436',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  addText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
