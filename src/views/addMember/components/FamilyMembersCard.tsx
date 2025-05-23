// components/FamilyMemberCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface FamilyMemberCardProps {
    name: string;
    relation: string;
    points: number;
    co2Value: string;
    co2Status: string;
    statusColor: string;
    avatar?: any; // image source
}

const FamilyMemberCard = ({
    name,
    relation,
    points,
    co2Value,
    co2Status,
    statusColor,
    avatar,
}: FamilyMemberCardProps) => {
    return (
        <View style={styles.card}>
            {avatar && <Image source={avatar} style={styles.avatar} />}
            <Text style={styles.points}>{`${points} points`}</Text>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.relation}>{relation}</Text>
            <Text style={styles.co2Label}>CO₂e (2025)</Text>
            <Text style={styles.co2Value}>{co2Value}</Text>
            <Text style={[styles.status, { color: statusColor }]}>{co2Status}</Text>
        </View>
    );
};

export default FamilyMemberCard;

const styles = StyleSheet.create({
    card: {
        width: 150,
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 12,
        backgroundColor: '#F8F9FA',
        alignItems: 'center',
        margin: 8,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 8,
    },
    points: {
        backgroundColor: '#FFD700',
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
        fontSize: 12,
        marginBottom: 6,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#333',
    },
    relation: {
        fontSize: 12,
        color: '#666',
        marginBottom: 6,
    },
    co2Label: {
        fontSize: 10,
        color: '#888',
    },
    co2Value: {
        fontSize: 14,
        fontWeight: '600',
        color: '#007BFF',
    },
    status: {
        fontSize: 12,
        fontWeight: '500',
        marginTop: 4,
    },
});
