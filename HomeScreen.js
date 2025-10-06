import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
    const [users, setUsers] = useState([]); // no dummy data

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Icon name="people-outline" size={60} color="#b2bec3" />
            <Text style={styles.emptyText}>No users yet</Text>
            <Text style={styles.subText}>Add your first user to get started</Text>
        </View>
    );

    const renderUserCard = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('UserForm', { user: item })}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Icon name="person-circle-outline" size={24} color="#0984e3" />
                <Text style={styles.name}>{item.name}</Text>
            </View>
            <View style={styles.detailRow}>
                <Icon name="call-outline" size={16} color="#636e72" />
                <Text style={styles.detailText}>{item.phone}</Text>
            </View>
            <View style={styles.detailRow}>
                <Icon name="cash-outline" size={16} color="#636e72" />
                <Text style={styles.detailText}>Rs {item.money}</Text>
            </View>
            <View style={styles.detailRow}>
                <Icon name="calendar-outline" size={16} color="#636e72" />
                <Text style={styles.detailText}>
                    {new Date(item.date).toDateString()}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>👥 User List</Text>

            {users.length === 0 ? (
                renderEmptyState()
            ) : (
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.id}
                    renderItem={renderUserCard}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            )}

            {/* Floating Add Button */}
            <TouchableOpacity
                style={styles.fab}
                activeOpacity={0.9}
                onPress={() => navigation.navigate('UserForm')}
            >
                <Icon name="add-outline" size={28} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f3f6',
        padding: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        color: '#2d3436',
        marginBottom: 15,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowRadius: 6,
        elevation: 3,
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2d3436',
        marginLeft: 6,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
        marginLeft: 4,
    },
    detailText: {
        marginLeft: 6,
        fontSize: 15,
        color: '#636e72',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#636e72',
        marginTop: 10,
    },
    subText: {
        fontSize: 15,
        color: '#b2bec3',
        marginTop: 4,
    },
    fab: {
        position: 'absolute',
        bottom: 25,
        right: 25,
        backgroundColor: '#00b894',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#00b894',
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 5,
    },
});
