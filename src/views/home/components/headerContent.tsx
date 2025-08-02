// import React, {useEffect, useState} from 'react';
// import {
//   Image,
//   ImageBackground,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   useWindowDimensions,
//   View,
// } from 'react-native';
// import {
//   HeaderContentBackgroundImage,
//   MenuIcon,
//   PointsStarIcon,
// } from '../../../images/icons';
// import HomeHorizontalCard from './home-horizontal-card';
// import {DrawerActions, useNavigation} from '@react-navigation/native';
// import {Colors} from '../../../constants/colors';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// type Props = {};

// const ListHeaderContent = (props: Props) => {
//   const [student, setStudent] = useState<any>({});
//   const navigation = useNavigation();
//   const {width} = useWindowDimensions();

//   const openDrawer = () => {
//     navigation.dispatch(DrawerActions.toggleDrawer());
//   };

//   useEffect(() => {
//     const getUser = async () => {
//       const userData: any = await AsyncStorage.getItem('user');
//       const user = JSON.parse(userData);
//       setStudent(user);
//     };
//     getUser();
//   }, []);

//   return (
//     <ImageBackground
//       style={styles.container}
//       source={HeaderContentBackgroundImage}
//       width={width}
//       height={273}>
//       <View style={styles.menuContainer}>
//         <TouchableOpacity onPress={openDrawer}>
//           <MenuIcon />
//         </TouchableOpacity>
//         <View style={styles.rightContainer}>
//           <View style={styles.pointsContainer}>
//             <PointsStarIcon />
//             <Text style={styles.pointsText}>590</Text>
//           </View>
//           <Image
//             source={{uri: 'https://i.pravatar.cc/100'}}
//             style={styles.avatar}
//           />
//         </View>
//       </View>
//       <Text style={styles.greetingText}>
//         Good Morning,{' '}
//         {student?.firstName ? student?.firstName : student?.fullName}
//       </Text>
//       <HomeHorizontalCard />
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 16,
//   },
//   greetingText: {
//     fontFamily: 'Montserrat-Bold',
//     fontSize: 20,
//     marginVertical: 24,
//     color: Colors.PrimaryBlue,
//   },
//   menuContainer: {
//     paddingVertical: 12,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   rightContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   pointsContainer: {
//     backgroundColor: '#95f0df',
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   pointsText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 6,
//     color: '#000',
//   },
//   avatar: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: '#fff',
//   },
// });
// export default ListHeaderContent; // Export the component

import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import {
  HeaderContentBackgroundImage,
  MenuIcon,
  PointsStarIcon,
  TabHome,
  TabChartLine,
  TabTarget,
  TabAward,
  AddGreenIcon,
} from '../../../images/icons';
import HomeHorizontalCard from './home-horizontal-card';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Colors} from '../../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppContext} from '../../../context/AppContext';
import {BlurView} from '@react-native-community/blur';
import Co2TrackerCard from '../Testing';

const OVERLAY_KEY = 'menuOverlayViewed';

const ListHeaderContent = () => {
  const [student, setStudent] = useState<any>({});
  const navigation = useNavigation();
  const {width, height} = useWindowDimensions();
  const [showOverlay, setShowOverlay] = useState(true);
  const [overlayStep, setOverlayStep] = useState(0);

  const {
    isTouchTourComplete,
    isNotesViewed,
    completeTouchTour,
    isFamilyNotesViewed,
  } = useAppContext();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  useEffect(() => {
    const getUser = async () => {
      const userData: any = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setStudent(user);
      }
    };

    getUser();
  }, []);

  const handleNextOverlay = async () => {
    if (overlayStep < 7) {
      setOverlayStep(prev => prev + 1);
    } else {
      setShowOverlay(false);
      completeTouchTour();
    }
  };

  const tabPositions = [
    {bottom: 0.02, left: 0.05},
    {bottom: 0.02, left: 0.27},
    {bottom: 0.035, left: 0.43},
    {bottom: 0.02, left: 0.63},
    {bottom: 0.02, left: 0.85},
  ];

  const getTabOverlayStyle = (tabIndex: number): ViewStyle => {
    const {bottom, left} = tabPositions[tabIndex];

    return {
      position: 'absolute' as const,
      bottom: height * bottom,
      left: width * left,
      alignItems: 'center',
    };
  };

  return (
    <>
      <ImageBackground
        style={styles.container}
        source={HeaderContentBackgroundImage}
        width={width}
        height={273}>
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={openDrawer}>
            <View style={styles.iconCircle}>
              <MenuIcon />
            </View>
          </TouchableOpacity>
          <View style={styles.rightContainer}>
            <View style={styles.pointsContainer}>
              <PointsStarIcon />
              <Text style={styles.pointsText}>590</Text>
            </View>
            <Image
              source={{uri: 'https://i.pravatar.cc/100'}}
              style={styles.avatar}
            />
          </View>
        </View>
        <Text style={styles.greetingText}>
          Good Morning, {student.firstName}
        </Text>
        <HomeHorizontalCard />
        <Co2TrackerCard />
      </ImageBackground>

      <Modal
        transparent
        visible={
          showOverlay &&
          !isTouchTourComplete &&
          (isNotesViewed || isFamilyNotesViewed)
        }
        animationType="fade">
        <TouchableWithoutFeedback>
          <View style={StyleSheet.absoluteFill}>
            {/* Blur Background */}
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="light"
              blurAmount={1}
              reducedTransparencyFallbackColor="white"
            />

            <View style={styles.overlayContainer}>
              {overlayStep === 0 && (
                <>
                  <View style={styles.menuOverlayPosition}>
                    <View style={styles.iconCircletop}>
                      <MenuIcon />
                    </View>
                  </View>
                  <Text style={styles.overlayText}>
                    Explore all options like family sharing, activities, and
                    settings.
                  </Text>
                </>
              )}

              {overlayStep === 1 && (
                <>
                  <View style={styles.pointsOverlayPosition}>
                    <View style={styles.pointsContainer}>
                      <PointsStarIcon />
                      <Text style={styles.pointsText}>590</Text>
                    </View>
                  </View>
                  <Text style={styles.overlayText}>
                    Check your total points and redeem exciting rewards.
                  </Text>
                </>
              )}

              {overlayStep === 2 && (
                <>
                  <View style={styles.avatarOverlayPosition}>
                    <Image
                      source={{uri: 'https://i.pravatar.cc/100'}}
                      style={styles.avatarOverlay}
                    />
                  </View>
                  <Text style={styles.overlayText}>
                    Manage your details, preferences, and climate Manifesto.
                  </Text>
                </>
              )}

              {overlayStep === 3 && (
                <>
                  <View style={getTabOverlayStyle(0)}>
                    <View style={styles.iconCircle1}>
                      <TabHome />
                    </View>
                  </View>
                  <Text style={[styles.overlayText, {marginTop: height * 0.6}]}>
                    View your dashboard and CO₂ savings at a glance.
                  </Text>
                </>
              )}

              {overlayStep === 4 && (
                <>
                  <View style={getTabOverlayStyle(1)}>
                    <View style={styles.iconCircle1}>
                      <TabTarget />
                    </View>
                  </View>
                  <Text style={[styles.overlayText, {marginTop: height * 0.6}]}>
                    Join challenges to earn extra points and build eco habits.
                  </Text>
                </>
              )}

              {overlayStep === 5 && (
                <>
                  <View style={getTabOverlayStyle(2)}>
                    <View style={styles.iconCircle2}>
                      <AddGreenIcon />
                    </View>
                  </View>
                  <Text style={[styles.overlayText, {marginTop: height * 0.6}]}>
                    Log your daily activities to track and reduce emissions.
                  </Text>
                </>
              )}

              {overlayStep === 6 && (
                <>
                  <View style={getTabOverlayStyle(3)}>
                    <View style={styles.iconCircle1}>
                      <TabChartLine />
                    </View>
                  </View>
                  <Text style={[styles.overlayText, {marginTop: height * 0.6}]}>
                    View your CO₂ trends and progress with detailed insights.
                  </Text>
                </>
              )}

              {overlayStep === 7 && (
                <>
                  <View style={getTabOverlayStyle(4)}>
                    <View style={styles.iconCircle1}>
                      <TabAward />
                    </View>
                  </View>
                  <Text style={[styles.overlayText, {marginTop: height * 0.6}]}>
                    See how you rank among others taking climate action.
                  </Text>
                </>
              )}

              <TouchableOpacity
                onPress={handleNextOverlay}
                style={styles.skipButton}>
                <Text style={styles.skipText}>Skip</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  menuContainer: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle1: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconCircle2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconCircletop: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eff4f3ff',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsContainer: {
    backgroundColor: '#95f0df',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
    color: '#000',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
  },
  greetingText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    marginVertical: 24,
    color: Colors.PrimaryBlue,
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    opacity: 0.9,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  menuOverlayPosition: {
    position: 'absolute',
    top: 12,
    left: 17,
  },
  pointsOverlayPosition: {
    position: 'absolute',
    top: 18,
    right: 53,
  },
  avatarOverlayPosition: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  avatarOverlay: {
    width: 35,
    height: 35,
    borderRadius: 22,
    backgroundColor: '#fff',
  },
  overlayText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 150,
    marginBottom: 28,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  skipButton: {
    position: 'absolute',
    bottom: 150,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  skipText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ListHeaderContent;
