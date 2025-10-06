import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';

const UserFormScreen = ({ route, navigation }) => {
  const { user } = route.params || {};

  const [name, setName] = useState(user ? user.name : '');
  const [phone, setPhone] = useState(user ? user.phone : '');
  const [money, setMoney] = useState(user ? user.money : '');
  const [date, setDate] = useState(user ? new Date(user.date) : new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleSave = () => {
    if (!name || !phone || !money) {
      Alert.alert('Missing Information', 'Please fill out all fields.');
      return;
    }

    const newUser = { name, phone, money, date: date.toISOString() };

    if (user) {
      Alert.alert('Success', 'User details updated successfully!');
    } else {
      Alert.alert('Success', 'User added successfully!');
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{user ? 'Edit User' : 'Add User'}</Text>

      <View style={styles.inputContainer}>
        <Icon name="person-outline" size={22} color="#333" />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="call-outline" size={22} color="#333" />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="cash-outline" size={22} color="#333" />
        <TextInput
          style={styles.input}
          placeholder="Amount (Rs)"
          keyboardType="numeric"
          value={money}
          onChangeText={setMoney}
        />
      </View>

      <TouchableOpacity style={styles.inputContainer} onPress={() => setShowPicker(true)}>
        <Icon name="calendar-outline" size={22} color="#333" />
        <Text style={[styles.input, { color: '#333' }]}>
          {date.toDateString()}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{user ? 'Update' : 'Save'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserFormScreen;

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
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
