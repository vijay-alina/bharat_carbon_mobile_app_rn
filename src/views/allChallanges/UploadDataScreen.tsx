import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import CategoryCard from './component/CategoryCard';
import {Categories} from '../../constants/constants';
import CustomButton from '../../common/button';
import {Header} from '../../common/header';
import {useNavigation} from '@react-navigation/native';
import {TChallenge} from '../../types';
import {useAppSelector} from '../../hooks/hooks';

const UploadDataScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedChallenge, setSelectedChallenge] = useState<TChallenge>(
    Categories[0],
  );

  useFocusEffect(
    React.useCallback(() => {
      Keyboard.dismiss();
    }, []),
  );

  const renderItem = ({item}: any) => (
    <CategoryCard
      label={item.label}
      icon={item.icon as any}
      isSelected={selectedChallenge.id === item.id}
      onPress={() => setSelectedChallenge(item)}
    />
  );

  return (
    <>
      <Header
        title="Upload Data"
        isHomeScreen={true}
        onHomeClick={() => {
          navigation.navigate('DrawerNavigator', {
            screen: 'MainTabs',
            params: {
              screen: 'Home',
            },
          });
        }}
        onBackClick={() => {
          navigation.goBack();
        }}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <Text style={styles.title}>Upload Your Climate Action Proof</Text>
          <Text style={styles.description}>
            Earn points by sharing your sustainable actions.
          </Text>
          <Text style={styles.titleTwo}>
            Select category to track your 2025 eco action
          </Text>
          <FlatList
            data={Categories}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.contentContainerStyle}
            showsVerticalScrollIndicator={false}
          />
          <View style={styles.btnContainer}>
            <CustomButton
              text={'Proceed to input'}
              onPress={() => {
                //@ts-ignore
                navigation.navigate('ChallengeFormSelectionScreen', {
                  id: selectedChallenge.id,
                  headerLabel: selectedChallenge.heaaderLabel,
                });
              }}
              backgroundColor="#17a086"
              style={styles.submitButton}
              textStyle={styles.buttonTextStyle}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
    fontFamily: 'Montserrat-Bold',
  },
  description: {
    fontSize: 14,
    color: '#000',
    marginBottom: 20,
    fontFamily: 'Montserrat-Medium',
  },
  titleTwo: {
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
  },
  btnContainer: {
    alignItems: 'center',
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 30,
    paddingVertical: 16,
  },
  buttonTextStyle: {
    fontWeight: 'bold',
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
});

export default UploadDataScreen;
