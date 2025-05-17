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

  export type DrawerParamList = {
    MainTabs: undefined;
    FamilySharing: undefined;
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
          drawerActiveTintColor: '#3D9D91',
          drawerInactiveTintColor: '#333',
          drawerLabelStyle: {
            marginLeft: -20,
            fontSize: 16,
          },
          drawerItemStyle: {
            borderRadius: 0,
            marginVertical: 5,
            paddingLeft: 10,
          },
        }}
        //@ts-ignore
        id="Drawer"  // Properly typed in newer React Navigation versions
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
          name="FamilySharing"
          component={ProfileScreen}
          options={{
            drawerIcon: PersonIconWrapper,
            drawerLabel: 'Family Sharing',
          }}
        />

        <Drawer.Screen
          name="Activities"
          component={ProfileScreen}
          options={{
            drawerIcon: PersonIconWrapper,
            drawerLabel: 'Activities',
          }}
        />

        <Drawer.Screen
          name="Challenge"
          component={ProfileScreen}
          options={{
            drawerIcon: PersonIconWrapper,
            drawerLabel: 'Challenge',
          }}
        />

        <Drawer.Screen
          name="RedeemPoints"
          component={ProfileScreen}
          options={{
            drawerIcon: PersonIconWrapper,
            drawerLabel: 'Redeem Points',
          }}
        />

        <Drawer.Screen
          name="FAQs"
          component={ProfileScreen}
          options={{
            drawerIcon: PersonIconWrapper,
            drawerLabel: 'FAQs',
          }}
        />

        <Drawer.Screen
          name="Notifications"
          component={ProfileScreen}
          options={{
            drawerIcon: PersonIconWrapper,
            drawerLabel: 'Notifications',
          }}
        />
      </Drawer.Navigator>
    );
  };
