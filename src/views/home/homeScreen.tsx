import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  // FlatList,
  // SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ListHeaderContent from './components/headerContent';
import VerticalClimateCard from './components/home-vertical-card';
import ListFooterContent from './components/footerComponent';
import {AddPlusIcon, FileUploadIcon} from '../../images/icons';
import {Colors} from '../../constants/colors';
import {DEVICE_WIDTH, getLineHeight} from '../../utils/utils';
import OnboardingModal from './components/OnboardingModal';

const _item = {
  imageUri: require('../../images/icons/girl_with_phone.png'),
  title: 'Take Your First Climate Action!',
  subtitle:
    'Upload a bill or photo to start earning points and reduce your carbon footprint today.',
  buttonText: 'Upload Now',
  gradientColors: ['#ff832b', '#000000'],
  icon: <FileUploadIcon />,
};

const _itemTwo = {
  imageUri: require('../../images/icons/parent_with_kid.png'),
  title: 'Take Your First Climate Action!',
  subtitle:
    'Upload a bill or photo to start earning points and reduce your carbon footprint today.',
  buttonText: 'Add Faimly Member',
  gradientColors: ['#6750a3', '#000000'],
  icon: <AddPlusIcon />,
};
const _itemThree = {
  imageUri: require('../../images/icons/solar_panels.png'),
  title: 'Take Your First Climate Action!',
  subtitle:
    'Upload a bill or photo to start earning points and reduce your carbon footprint today.',
  buttonText: 'Explore Housing',
  gradientColors: ['#17a086', '#083a31'],
  icon: null,
};
const _itemFour = {
  imageUri: require('../../images/icons/boy_with_bicycle.png'),
  title: 'Take Your First Climate Action!',
  subtitle:
    'Upload a bill or photo to start earning points and reduce your carbon footprint today.',
  buttonText: 'Explore Mobility',
  gradientColors: ['#17a086', '#083a31'],
  icon: null,
};
const list = [_item, _itemTwo,_itemThree, _itemFour];
const list1 = [_item, _itemTwo];
const list2 = [_itemThree, _itemFour];

export const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <ScrollView style={styles.container}>
      <ListHeaderContent />
      <View style={{width: DEVICE_WIDTH, flexDirection: 'row', flexWrap: 'wrap'}}>
      {list1.map((item, index) => (
        <VerticalClimateCard
          key={index.toString()}
          imageUri={item.imageUri}
          title={item.title}
          subtitle={item.subtitle}
          buttonText={item.buttonText}
          gradientColors={item.gradientColors}
          icon={item.icon}
        />
      ))}
      </View>
      <View style={styles.sectionDividerContainer}>
        <Text style={styles.labelText}>Explore Challenges</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={{width: DEVICE_WIDTH, flexDirection: 'row', flexWrap: 'wrap'}}>
      {list2.map((item, index) => (
        <VerticalClimateCard
          key={index.toString()}
          imageUri={item.imageUri}
          title={item.title}
          subtitle={item.subtitle}
          buttonText={item.buttonText}
          gradientColors={item.gradientColors}
          icon={item.icon}
        />
      ))}
      </View>
      <View style={styles.sectionDividerContainer}>
        <Text style={styles.labelText}>Recommended Articles</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <ListFooterContent />
      <View style={{height: 60}} />
      <OnboardingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      {/* <FlatList
        ListHeaderComponent={ListHeaderContent}
        data={list}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        renderItem={({item, index}) => (
          <VerticalClimateCard
            key={index.toString()}
            imageUri={item.imageUri}
            title={item.title}
            subtitle={item.subtitle}
            buttonText={item.buttonText}
            gradientColors={item.gradientColors}
            icon={item.icon}
          />
        )}
        ListFooterComponent={ListFooterContent}
        ListFooterComponentStyle={styles.footerContainerStyle}
      /> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingBottom: 80,
  },
  contentContainer: {
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  menuButton: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    marginLeft: 5,
    fontSize: 14,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3D9D91',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  footerContainerStyle: {
    marginLeft: 10,
  },
  sectionDividerContainer: {
    width: DEVICE_WIDTH * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingVertical: 12,
  },
  labelText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: Colors.BlueShades900,
    lineHeight: getLineHeight(14, 120),
  },
  viewAllText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: Colors.ThickGreenShades700,
  },
});
