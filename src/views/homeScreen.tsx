import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { BackIcon } from '../images/icons';

export const HomeScreen = () => {
  const navigation = useNavigation();

  const openDrawer = () => {
    console.log('Attempting to open drawer');
    // Using this specific approach to ensure it works in any navigation context
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={openDrawer}
          style={styles.menuButton}
          // Make the touchable area larger for easier tapping
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <BackIcon />
          <Text style={styles.menuText}>Menu</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>Home Screen Content</Text>
        <TouchableOpacity
          onPress={openDrawer}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Open Drawer (Testing)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
});
