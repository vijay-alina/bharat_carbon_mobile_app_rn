import { NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp } from '@react-navigation/native';

// Define your drawer params
export type DrawerParamList = {
  Profile: undefined;
  FamilySharing: undefined;
  Activities: undefined;
  Challenge: undefined;
  RedeemPoints: undefined;
  FAQs: undefined;
  Notifications: undefined;
};

// Define your tab params, noting that Home contains the drawer navigator
export type TabParamList = {
  Home: NavigatorScreenParams<DrawerParamList>;
  History: undefined;
  Add: undefined;
  Stats: undefined;
  Profile: undefined;
};

// Create a composite type for components inside drawer screens
export type TabDrawerNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<DrawerParamList>,
  BottomTabNavigationProp<TabParamList>
>;
