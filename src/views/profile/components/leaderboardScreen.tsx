// LeaderboardScreen.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
type User = {
    id: number;
    name: string;
    class: string;
    points: number;
    isMe: boolean;
    rank: number;
};

const tabs = ['Today', 'Weekly', 'Monthly', 'All-Time'];

const users = [
    { id: 1, name: 'Akshay Swami (Me)', class: '11-A', points: 910, isMe: true, rank: 18 },
    { id: 2, name: 'Sanjana Dutta', class: '10-A', points: 2590, isMe: false, rank: 4 },
];

const LeaderboardScreen = () => {
    const [selectedTab, setSelectedTab] = useState('Monthly');

    return (
        <View style={styles.container}>
            {/* Tabs */}
            <View style={styles.tabContainer}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            styles.tab,
                            selectedTab === tab && styles.activeTab,
                        ]}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                selectedTab === tab && styles.activeTabText,
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* User List */}
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <UserCard user={item} />}
            />
        </View>
    );
};

const UserCard: React.FC<{ user: User }> = ({ user }) => {
    return (
        <View
            style={[
                styles.userCard,
                user.isMe && styles.highlightedCard,
            ]}
        >
            <View style={styles.avatarPlaceholder}>
                <Text style={styles.rank}>#{user.rank}</Text>
            </View>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userClass}>{user.class}</Text>
            </View>
            <View style={styles.pointsContainer}>
                <Text style={styles.pointsIcon}>🔥</Text>
                <Text style={styles.pointsText}>{user.points} pts</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        backgroundColor: '#f4f4f4',
        flex: 1,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        backgroundColor: '#e0e0e0',
        paddingVertical: 8,
        borderRadius: 25,
        marginHorizontal: 12,
    },
    tab: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
    },
    activeTab: {
        backgroundColor: 'black',
    },
    tabText: {
        color: '#000',
        fontSize: 14,
    },
    activeTabText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 14,
        marginHorizontal: 12,
        marginBottom: 10,
    },
    highlightedCard: {
        backgroundColor: '#87B562',
    },
    avatarPlaceholder: {
        backgroundColor: '#ccc',
        borderRadius: 30,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rank: {
        fontWeight: 'bold',
    },
    userInfo: {
        flex: 1,
        marginLeft: 12,
    },
    userName: {
        fontWeight: '600',
        fontSize: 15,
        color: '#fff',
    },
    userClass: {
        fontSize: 13,
        color: '#fff',
    },
    pointsContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFE94D',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 6,
        alignItems: 'center',
    },
    pointsIcon: {
        marginRight: 6,
    },
    pointsText: {
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default LeaderboardScreen;
