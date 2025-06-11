import React from 'react';
import { View, Text, Button } from 'react-native';
import NutritionForm from './component/Forms/NutritionForm';
import { Header } from '../../common/header';
import { useNavigation } from '@react-navigation/native';

const ChallengeFormSelectionScreen = () => {
    const navigation = useNavigation();
    return (
        <>
        <Header title="What Did You Eat" onBackClick={() => {navigation.goBack()}} />
            <View style={{ flex: 1, }}>
                <NutritionForm />
            </View>
        </>
    );
};

export default ChallengeFormSelectionScreen;
