import { Text, TouchableOpacity, View } from 'react-native';
import { BackIcon } from '../../images/icons';
import SplashScreenOne from '../splash-intro-screen/components/SplashIntroOne';
// import SplashIntroTwo from '../splash-intro-screen/SplashIntriTwo';
import SplashIntroThree from '../splash-intro-screen/components/SplashIntroThree';
import SplashScreen from '../splash-intro-screen/SplashScreen';

export const AddScreen = () => {

  const toggleDrawer = () => {
    //   navigation.toggleDrawer();
  };

  return (
    // <SplashScreenOne/>
    // <SplashIntroTwo />
    <SplashScreen />

    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //   <TouchableOpacity onPress={toggleDrawer}>
    //     <BackIcon />
    //   </TouchableOpacity>
    //   <Text>Add Screen</Text>
    // </View>
  );
};
