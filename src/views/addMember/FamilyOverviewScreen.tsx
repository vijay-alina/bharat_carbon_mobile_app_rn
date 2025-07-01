import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import FamilyMemberCard from './components/FamilyMembersCard';
import { familyData } from '../../constants/constants';
import { Header } from '../../common/header';
import CustomButton from '../../common/button';
import { useNavigation } from '@react-navigation/native';
import { getMembersThunk } from '../../features/challenge/addMember/addMemberThunk';
import { AppDispatch, RootState } from '../../app/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const screenWidth = Dimensions.get('window').width;
const horizontalPadding = 16;
const cardSpacing = 12;
const availableWidth = screenWidth - horizontalPadding * 2;
const cardWidth = (availableWidth - cardSpacing) / 2;

const FamilyOverviewScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { members, loading } = useSelector((state: RootState) => state.members);

  useEffect(() => {
    dispatch(getMembersThunk());
  }, [dispatch]);

  const handlePress = () => {
    navigation.goBack();
  };

  const handleAddMemberClick = () => {
    //@ts-ignore
    navigation.navigate('AddNewMemberScreen');
  };
  const renderItem = ({ item, index }: { item: any; index: number }) => {
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
          name={item.fullName}
          relation={item.relationship}
          avatar={''}
          co2Value={'00'}
          co2Status={'Normal'}
          points={String(item.points || 0)}
          onPress={() => {
            //@ts-ignore
            navigation.navigate('MemberProfileScreen', { memberId: item._id });
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Family Overview" onBackClick={handlePress} />
      <FlatList
        data={members}
        keyExtractor={item => item._id}
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
