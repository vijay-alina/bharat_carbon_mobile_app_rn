import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {Text, TouchableOpacity, View} from 'react-native';
import {BackIcon, UserIcon} from '../images/icons';
import CustomDrawerContent from './customDrawerContent';
import {useNavigation} from '@react-navigation/native';
import {TabNavigator} from './bottomTabNavigator';
import {MemberStackNavigator} from './memberStackNavigator';
import MyProfileScreen from '../views/drawerScreens/MyProfile/MyProfile';
import ReedemPointsScreen from '../views/drawerScreens/ReedemPoints/ReedemPointsScreen';
import ActivitiesScreen from '../views/drawerScreens/Activities/Activities';
import FAQScreen from '../views/Faq/FaqScreen';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChallengeScreen from '../views/drawerScreens/challenge/Challenge';
import SettingsScreen from '../views/drawerScreens/Settings/Settings';
import HelpCenterScreen from '../views/drawerScreens/HelpCenter/HelpCenter';

export type DrawerParamList = {
  MainTabs: undefined;
  MemberStackNavigator: undefined;
  MyProfile: undefined;
  Activities: undefined;
  Challenges: undefined;
  Challenge: undefined;
  RedeemPoints: undefined;
  FAQs: undefined;
  Notifications: undefined;
  Settings: undefined;
  HelpCenter: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function ProfileScreen() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        <BackIcon />
      </TouchableOpacity>
      <Text>Profile Screen</Text>
    </View>
  );
}

type DrawerIconProps = {
  focused: boolean;
  size: number;
  color: string;
};
const PersonIconWrapper = (_props: DrawerIconProps) => <UserIcon />;

export const DrawerNavigator = () => {
  const [student, setStudent] = useState<any>({});
  console.log('student', student);
  const profileData = {
    name: student?.firstName + ' ' + student?.lastName,
    points: 590,
    pointsToNextLevel: 800,
    level: 1,
    classRank: 6,
    schoolRank: 1438,
  };

  const CustomDrawerContentWrapper = (props: DrawerContentComponentProps) => (
    <CustomDrawerContent {...props} {...profileData} />
  );

  useEffect(() => {
    const getUser = async () => {
      const userData: any = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);
      setStudent(user);
    };
    getUser();
  }, []);

  return (
    <Drawer.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#ff0000',
          width: '100%',
        },
        headerShown: false,
        drawerType: 'back',
      }}
      //@ts-ignore
      id="Drawer"
      drawerContent={CustomDrawerContentWrapper}>
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{
          drawerIcon: PersonIconWrapper,
          drawerLabel: 'My Profile',
        }}
      />

      {/* Other screens remain the same */}
      <Drawer.Screen
        name="MemberStackNavigator"
        component={MemberStackNavigator}
      />

      <Drawer.Screen name="MyProfile" component={MyProfileScreen} />

      <Drawer.Screen name="Activities" component={ActivitiesScreen} />

      <Drawer.Screen name="Challenges" component={ChallengeScreen} />

      <Drawer.Screen name="Challenge" component={ProfileScreen} />

      <Drawer.Screen name="RedeemPoints" component={ReedemPointsScreen} />

      <Drawer.Screen name="FAQs" component={FAQScreen} />

      <Drawer.Screen name="Notifications" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="HelpCenter" component={HelpCenterScreen} />
    </Drawer.Navigator>
  );
};
