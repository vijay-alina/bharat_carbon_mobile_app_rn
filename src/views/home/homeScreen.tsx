import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  // FlatList,
  // SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import ListHeaderContent from './components/headerContent';
import VerticalClimateCard from './components/home-vertical-card';
import ListFooterContent from './components/footerComponent';
import {AddPlusIcon, FileUploadIcon} from '../../images/icons';
import {Colors} from '../../constants/colors';
import {DEVICE_WIDTH, getLineHeight} from '../../utils/utils';
// import OnboardingModal from './components/OnboardingModal';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import {aboutAppTasks} from '../../constants/constants';

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
const list = [_item, _itemTwo, _itemThree, _itemFour];
const list1 = [_item, _itemTwo];
const list2 = [_itemThree, _itemFour];

export const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const GRADIENT_COLORS = ['#E8FFE8', '#80A380'];
  const PLAIN_COLORS = ['#FFFFFF', '#FFFFFF'];
  const gradientColors = currentStep === 0 ? GRADIENT_COLORS : PLAIN_COLORS;

  const getButtonWrapperStyle = () => {
    if(currentStep === 0) {
      return styles.buttWrapper;
    } else if(currentStep > 0 && currentStep <= 5) {
      return styles.buttWrapper2;
    }
    return styles.buttWrapper3;
  };

  const handleNextClick = () => {
    if (currentStep > 5) {
      setModalVisible(false);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ListHeaderContent />
      <View
        style={{width: DEVICE_WIDTH, flexDirection: 'row', flexWrap: 'wrap'}}>
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

      <View
        style={{width: DEVICE_WIDTH, flexDirection: 'row', flexWrap: 'wrap'}}>
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
      <Modal isVisible={modalVisible}>
        <LinearGradient
          colors={gradientColors}
          style={styles.modalContentContainer}>
          <Text style={styles.titleText}>
            {aboutAppTasks[currentStep].title}
          </Text>
          <Text style={styles.descriptionText}>
            {aboutAppTasks[currentStep].description}
          </Text>
          <View style={getButtonWrapperStyle()}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleNextClick}>
              <Text style={styles.buttonText2}>
                {aboutAppTasks[currentStep].buttonText}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>
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
  modalContentContainer: {
    borderRadius: 20,
    backgroundColor: Colors.White,
    alignItems: 'flex-start',
    padding: 24,
  },
  titleText: {
    color: Colors.ThickGreenShades800,
    fontFamily: 'Montserrat-Medium',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: getLineHeight(24, 120),
    marginBottom: 16,
  },
  descriptionText: {
    color: Colors.Neutrals800,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: getLineHeight(14, 150),
    marginBottom: 16,
  },
  buttWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  buttWrapper2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttWrapper3: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: Colors.PrimaryBlue,
    alignItems: 'center',
  },
  buttonText2: {
    color: Colors.White,
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: getLineHeight(14, 120),
  },
});
