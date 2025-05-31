import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import DayChallengeCard from './component/DayChallengeCard'; 
import { Colors } from '../../constants/colors';
import BasketIllustration from '../../images/icons/Healthy_food_online_shopping.png'; 
import { challengeData } from '../../constants/constants'; 


const VegetarianChallengeScreen = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.title}>Vegetarian Challenge</Text>
            <Text style={styles.subtitle}>
                Every vegetarian meal can save up to 2 kg CO₂e{'\n'}Take a step today!
            </Text>

            {/* Illustration */}
            <Image source={BasketIllustration} style={styles.illustration} resizeMode="contain" />

            {/* Challenge List */}
            <FlatList
                data={challengeData}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <DayChallengeCard
                        title={item.title}
                        description={item.description}
                        reward={item.reward}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.GreenShades || '#D9F0EA', // Replace with your color
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        fontFamily: 'Montserrat-Bold',
        color: Colors.White,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        color: Colors.White,
        textAlign: 'center',
        marginBottom: 20,
    },
    illustration: {
        width: '100%',
        height: 250,
        marginBottom: 24,
    },
    listContent: {
        paddingBottom: 16,
    },
});

export default VegetarianChallengeScreen;
