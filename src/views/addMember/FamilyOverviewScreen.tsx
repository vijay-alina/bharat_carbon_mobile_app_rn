// screens/FamilyOverviewScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import FamilyMemberCard from './components/FamilyMembersCard';
import { familyData } from '../../constants/constants';

const FamilyOverviewScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Family Overview</Text>

            <FlatList
                data={familyData}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <FamilyMemberCard
                        name={item.name}
                        relation={item.relation}
                        points={item.points}
                        co2Value={item.co2Value}
                        co2Status={item.co2Status}
                        statusColor={item.statusColor}
                    />
                )}
            />

            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Member ⨁</Text>
            </TouchableOpacity>
        </View>
    );
};

export default FamilyOverviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 16,
    },
    row: {
        justifyContent: 'space-evenly',
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    addButton: {
        backgroundColor: '#00C897',
        borderRadius: 30,
        paddingVertical: 16,
        margin: 20,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
