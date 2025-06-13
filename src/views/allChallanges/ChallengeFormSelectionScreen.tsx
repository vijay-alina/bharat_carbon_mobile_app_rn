import React from 'react';
import { View, Text, Button } from 'react-native';
import NutritionForm from './component/Forms/NutritionForm';
import { Header } from '../../common/header';
import { useNavigation } from '@react-navigation/native';
import MobilityForm from './component/Forms/MobilityForm';
import GoodsForm from './component/Forms/GoodsForm';
import HousingForm from './component/Forms/HousingForm';
import HomeAndLifestyleForm from './component/Forms/LeisureForm';
import LeisureForm from './component/Forms/LeisureForm';


const ChallengeFormSelectionScreen = () => {
    const navigation = useNavigation();
    return (
        <>
        <Header title="What Did You Eat" onBackClick={() => {navigation.goBack()}} />
            <View style={{ flex: 1, }}>
                {/* <NutritionForm /> */}
                {/* <MobilityForm /> */}
                {/* <GoodsForm/> */}
                {/* <HousingForm/> */}
                <LeisureForm/>
            </View>
        </>
    );
};

export default ChallengeFormSelectionScreen;
