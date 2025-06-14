import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header} from '../../common/header';
import {useNavigation, useRoute} from '@react-navigation/native';
import LeisureForm from './component/Forms/LeisureForm';
import NutritionForm from './component/Forms/NutritionForm';
import HousingForm from './component/Forms/HousingForm';
import MobilityForm from './component/Forms/MobilityForm';
import GoodsForm from './component/Forms/GoodsForm';

const ChallengeFormSelectionScreen = () => {
  const route = useRoute();
  //@ts-ignore
  const {id, headerLabel} = route.params;
  const navigation = useNavigation();

  const showFormById = () => {
    switch (id) {
      case 1:
        return <NutritionForm />;
      case 2:
        return <HousingForm />;
      case 3:
        return <MobilityForm />;
      case 4:
        return <GoodsForm />;
      case 5:
        return <LeisureForm />;
    }
  };
  return (
    <>
      <Header
        title={headerLabel}
        onBackClick={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.container}>{showFormById()}</View>
    </>
  );
};

export default ChallengeFormSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
