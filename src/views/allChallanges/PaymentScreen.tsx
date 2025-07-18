/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView} from 'react-native';
import PaymentOption from './component/PaymentOptionCard';
import {PaymentMethods} from '../../constants/constants';
import {Header} from '../../common/header';
import CustomButton from '../../common/button';
import {Colors} from '../../constants/colors';
import VegetarianChallengeCard from './component/VegetarianChallengeCard';
import ChallengeCompleteCard from './component/ChallengeCompleted';
import {useNavigation} from '@react-navigation/native';
import {useAppContext} from '../../context/AppContext';
import {AddGreenIcon} from '../../images/icons';

// type PaymentMethod = {
//     id: string;
//     label: string;
//     icon: any; // For static require images
// };

const PaymentScreen: React.FC = () => {
  const navigation = useNavigation();
  const {completeSubscription} = useAppContext();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Choose Payment Method" />
      <View style={styles.content}>
        <FlatList
          data={PaymentMethods}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <PaymentOption
              label={item.label}
              icon={item.icon}
              selected={selectedId === item.id}
              onPress={() => setSelectedId(item.id)}
            />
          )}
          contentContainerStyle={styles.list}
        />

        {/* <VegetarianChallengeCard /> */}

        <CustomButton
          text="Add Payment Method"
          onPress={() => {
            completeSubscription();
          }}
          backgroundColor={Colors.GreenNormalTwo}
          textColor={Colors.ThickGreenShades700}
          showIcon
          isLeftIcon={true}
          iconComponent={AddGreenIcon}
          iconProps={{width: 20, height: 20, fill: '#fff'}}
          // isRightIcon
        />
        <CustomButton
          text={'Accept & Continue'}
          onPress={() => {
            completeSubscription();
          }}
          // showIcon={!isSubmitting}
          backgroundColor="#17a086"
          textColor="#fff"
          textStyle={{fontFamily: 'Montserrat-Bold', fontSize: 16}}
          style={styles.submitButton}
        />
      </View>
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
    // padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  list: {
    // padding: 20,
  },
  submitButton: {
    marginBottom: 60,
    borderRadius: 30,
    paddingVertical: 16,
  },
});

export default PaymentScreen;
