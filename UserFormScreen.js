import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
    Animated,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';

const UserFormScreen = ({ route, navigation }) => {
    const { user, onSave } = route.params || {}; // callback from parent

    const [name, setName] = useState(user ? user.name : '');
    const [phone, setPhone] = useState(user ? user.phone : '');
    const [money, setMoney] = useState(user ? user.money : '');
    const [date, setDate] = useState(user ? new Date(user.date) : new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [focusedField, setFocusedField] = useState('');

    const [shakeAnim] = useState(new Animated.Value(0));
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleSave = () => {
        if (!name || !phone || !money) {
            Animated.sequence([
                Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 6, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: -6, duration: 100, useNativeDriver: true }),
                Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
            ]).start();

            Alert.alert('⚠️ Missing Information', 'Please fill out all fields.');
            return;
        }

        const newUser = {
            id: user ? user.id : Date.now().toString(), // unique id for new user
            name,
            phone,
            money,
            date: date.toISOString(),
        };

        if (onSave) {
            onSave(newUser); // send data back to parent
        }

        Alert.alert('✅ Success', user ? 'User updated successfully!' : 'User added successfully!');
        navigation.goBack();
    };

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.headerText}>
                    {user ? 'Edit User Details' : 'Add New User'}
                </Text>

                <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
                    {/* Full Name */}
                    <View
                        style={[
                            styles.inputContainer,
                            focusedField === 'name' && styles.inputFocused,
                            !name && styles.errorField,
                        ]}>
                        <Icon name="person-outline" size={22} color="#2d3436" />
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            placeholderTextColor="#aaa"
                            value={name}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField('')}
                            onChangeText={setName}
                        />
                    </View>

                    {/* Phone */}
                    <View
                        style={[
                            styles.inputContainer,
                            focusedField === 'phone' && styles.inputFocused,
                            !phone && styles.errorField,
                        ]}>
                        <Icon name="call-outline" size={22} color="#2d3436" />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            placeholderTextColor="#aaa"
                            keyboardType="phone-pad"
                            value={phone}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => setFocusedField('')}
                            onChangeText={setPhone}
                        />
                    </View>

                    {/* Money */}
                    <View
                        style={[
                            styles.inputContainer,
                            focusedField === 'money' && styles.inputFocused,
                            !money && styles.errorField,
                        ]}>
                        <Icon name="cash-outline" size={22} color="#2d3436" />
                        <TextInput
                            style={styles.input}
                            placeholder="Amount (Rs)"
                            placeholderTextColor="#aaa"
                            keyboardType="numeric"
                            value={money}
                            onFocus={() => setFocusedField('money')}
                            onBlur={() => setFocusedField('')}
                            onChangeText={setMoney}
                        />
                    </View>

                    {/* Date Picker */}
                    <TouchableOpacity
                        style={styles.inputContainer}
                        onPress={() => setShowPicker(true)}>
                        <Icon name="calendar-outline" size={22} color="#2d3436" />
                        <Text style={styles.dateText}>{date.toDateString()}</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Date Picker Modal */}
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

                {/* Save Button */}
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.saveButton}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        onPress={handleSave}>
                        <Icon
                            name={user ? 'save-outline' : 'add-circle-outline'}
                            size={20}
                            color="#fff"
                            style={{ marginRight: 6 }}
                        />
                        <Text style={styles.saveButtonText}>
                            {user ? 'Update User' : 'Save User'}
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default UserFormScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fb',
        padding: 20,
    },
    headerText: {
        fontSize: 26,
        fontWeight: '700',
        color: '#2d3436',
        textAlign: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 3,
        elevation: 2,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    inputFocused: {
        borderColor: '#00b894',
        shadowColor: '#00b894',
        shadowOpacity: 0.2,
        elevation: 3,
    },
    errorField: {
        borderColor: '#ff7675',
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#2d3436',
    },
    dateText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#2d3436',
    },
    saveButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00b894',
        paddingVertical: 15,
        borderRadius: 14,
        marginTop: 25,
        shadowColor: '#00b894',
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
});
