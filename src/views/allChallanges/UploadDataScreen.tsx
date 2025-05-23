import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import CategoryCard from './component/CategoryCard';
import { Categories } from '../../constants/constants';
import CustomButton from "../../common/button";



const UploadDataScreen = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upload Your Climate Action Proof</Text>
            <Text style={styles.description}>
                Earn points by sharing your sustainable actions.
            </Text>
            <Text style={styles.titleTwo}>Select category to track your 2025 eco action  </Text>
            {Categories.map((d, i: number) => (
                <CategoryCard
                    key={i}
                    label={d.label}
                    icon={d.icon as any}
                    isSelected={selectedId === d.id}
                    onPress={() => setSelectedId(d.id)}
                />
            ))}
            <CustomButton
                text={"Proceed to input"}
                onPress={() => { }}
                // showIcon={!isSubmitting}
                iconName="arrow-forward"
                backgroundColor="#17a086"
                style={styles.submitButton}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 600,
        color: '#000',
        marginBottom: 6,
    },
    description: {
        fontSize: 16,
        color: '#000',
        // textAlign: 'center',
        marginBottom: 20,
    },
    titleTwo: {
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 600,
    },
    card: {
        borderRadius: 20,
        height: 120,
        width: '100%',
        backgroundColor: '#fff000',
    },
    submitButton: {
        marginTop: 20,
        borderRadius: 30,
        paddingVertical: 16,
    },

})

export default UploadDataScreen;