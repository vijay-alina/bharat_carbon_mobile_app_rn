import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import PaymentOption from './component/PaymentOptionCard';
import { PaymentMethods } from '../../constants/constants';
import { Header } from '../../common/header';
import CustomButton from '../../common/button';
import { Colors } from '../../constants/colors';
import NutritionCard from './component/NutritionCard';
import RadishImage from '../../images/icons/girl_with_phone.png'; // Example
import ChallengeCompleteCard from './component/ChallengeCompleted';

// type PaymentMethod = {
//     id: string;
//     label: string;
//     icon: any; // For static require images
// };



const PaymentScreen: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <SafeAreaView style={styles.container}>
            <Header title='Choose Payment Method' />
            <FlatList
                data={PaymentMethods}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PaymentOption
                        label={item.label}
                        icon={item.icon}
                        selected={selectedId === item.id}
                        onPress={() => setSelectedId(item.id)}
                    />
                )}
                contentContainerStyle={styles.list}

            />

            <ChallengeCompleteCard
                title="Challenge Complete!"
                description="You successfully completed the 7-Day Vegetarian Challenge!"
                points={100}
                onShare={() => console.log('Share Achievement')}
                onStartNew={() => console.log('Start New Challenge')}
            />


            <CustomButton
                text="Add Payment Method"
                onPress={() => console.log('Pressed')}
                backgroundColor={Colors.GreenNormalTwo}
                textColor={Colors.ThickGreenShades700}
                showIcon
                // iconComponent={AerrowIconWithTail}
                iconProps={{ width: 20, height: 20, fill: '#fff' }}
            // isRightIcon
            />
            {/* <CustomButton
                text={"Add Payment Method"}
                onPress={() => { }}
                // showIcon={!isSubmitting}
                iconName="arrow-forward"
                backgroundColor={Colors.GreenNormalTwo}
                textColor={Colors.ThickGreenShades700}
                textStyle={{ fontFamily: 'Montserrat-Bold', fontSize: 16 }}
                style={styles.submitButton}
            />
                <CustomButton
                text={"Accept & Continue"}
                onPress={() => { }}
                // showIcon={!isSubmitting}
                iconName="arrow-forward"
                backgroundColor="#17a086"
                textColor='#fff'
                textStyle={{ fontFamily: 'Montserrat-Bold', fontSize: 16 }}
                style={styles.submitButton}
            /> */}

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    list: {
        paddingBottom: 20,
    },
    submitButton: {
        marginBottom: 60,
        borderRadius: 30,
        paddingVertical: 16,
    },
});

export default PaymentScreen;
