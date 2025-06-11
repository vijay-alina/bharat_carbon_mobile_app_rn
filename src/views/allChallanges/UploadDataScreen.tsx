import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CategoryCard from './component/CategoryCard';
import { Categories } from '../../constants/constants';
import CustomButton from '../../common/button';
import { Header } from '../../common/header';
import { useNavigation } from '@react-navigation/native';

const UploadDataScreen = () => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState<string | null>('1');

  const renderItem = ({ item }: any) => (
    <CategoryCard
      label={item.label}
      icon={item.icon as any}
      isSelected={selectedId === item.id}
      onPress={() => setSelectedId(item.id)}
    />
  );

  return (
    <>
      <Header title="Upload Data" onBackClick={() => { navigation.goBack(); }} />
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
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.btnContainer}>
          <CustomButton
            text={'Proceed to input'}
            onPress={() => {
              //@ts-ignore
              navigation.navigate('ChallengeFormSelectionScreen');
            }}
            backgroundColor="#17a086"
            style={styles.submitButton}
            textStyle={styles.buttonTextStyle}
          />
        </View>
      </View>
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
});

export default UploadDataScreen;
