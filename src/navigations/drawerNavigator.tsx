import {
    createDrawerNavigator,
    DrawerContentComponentProps,
    DrawerNavigationProp,
  } from '@react-navigation/drawer';
  import { Text, TouchableOpacity, View } from 'react-native';
  import { BackIcon, UserIcon } from '../images/icons';
  import CustomDrawerContent from './customDrawerContent';
  import { useNavigation } from '@react-navigation/native';
import { TabNavigator } from './bottomTabNavigator';
import { MemberStackNavigator } from './memberStackNavigator';

  export type DrawerParamList = {
    MainTabs: undefined;
    MemberStackNavigator: undefined;
    Activities: undefined;
    Challenge: undefined;
    RedeemPoints: undefined;
    FAQs: undefined;
    Notifications: undefined;
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

  const profileData = {
    name: 'Sanjana Dutta',
    points: 590,
    pointsToNextLevel: 800,
    level: 1,
    classRank: 6,
    schoolRank: 1438,
  };

  const CustomDrawerContentWrapper = (props: DrawerContentComponentProps) => (
    <CustomDrawerContent {...props} {...profileData} />
  );

  type DrawerIconProps = {
    focused: boolean;
    size: number;
    color: string;
  };
  const PersonIconWrapper = (_props: DrawerIconProps) => <UserIcon />;

  export const DrawerNavigator = () => {
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

        <Drawer.Screen
          name="Activities"
          component={ProfileScreen}
        />

        <Drawer.Screen
          name="Challenge"
          component={ProfileScreen}
        />

        <Drawer.Screen
          name="RedeemPoints"
          component={ProfileScreen}
        />

        <Drawer.Screen
          name="FAQs"
          component={ProfileScreen}
        />

        <Drawer.Screen
          name="Notifications"
          component={ProfileScreen}
        />
      </Drawer.Navigator>
    );
  };
