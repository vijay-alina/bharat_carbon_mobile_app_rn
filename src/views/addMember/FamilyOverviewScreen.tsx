import React from 'react';
import {View, StyleSheet, FlatList, Dimensions} from 'react-native';
import FamilyMemberCard from './components/FamilyMembersCard';
import {familyData} from '../../constants/constants';
import {Header} from '../../common/header';
import CustomButton from '../../common/button';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const horizontalPadding = 16;
const cardSpacing = 12;
const availableWidth = screenWidth - horizontalPadding * 2;
const cardWidth = (availableWidth - cardSpacing) / 2;

const FamilyOverviewScreen = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.goBack();
    };

    const handleAddMemberClick = () => {
        //@ts-ignore
        navigation.navigate('AddNewMemberScreen');
    }
  const renderItem = ({item, index}: {item: any; index: number}) => {
    const isLeftColumn = index % 2 === 0;
    return (
      <View
        style={[
          styles.cardContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            width: cardWidth,
            marginRight: isLeftColumn ? cardSpacing : 0,
          },
        ]}>
        <FamilyMemberCard
          name={item.name}
          relation={item.relation}
          points={item.points}
          co2Value={item.co2Value}
          co2Status={item.co2Status}
          avatar={item.avatar}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Family Overview" onBackClick={handlePress} />
      <FlatList
        data={familyData}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <CustomButton
        text="Add Member"
        onPress={handleAddMemberClick}
        style={styles.addButton}
      />
    </View>
  );
};

export default FamilyOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: horizontalPadding,
    paddingTop: 16,
    paddingBottom: 20,
  },
  cardContainer: {
    marginBottom: 16,
  },
  addButton: {
    width: '90%',
    alignSelf: 'center',
  },
});
