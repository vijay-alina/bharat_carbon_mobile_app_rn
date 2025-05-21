import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {BackIcon, HomeIcon} from '../images/icons';

type HeaderProps = {
  title?: string;
  isHomeScreen?: boolean;
  onBackClick?: () => void;
  onHomeClick?: () => void;
};

export const Header: React.FC<HeaderProps> = ({
  title = 'Analytics',
  isHomeScreen = false,
  onBackClick,
  onHomeClick,
}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBackClick} style={styles.iconButton}>
        <BackIcon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightContainer}>
        {isHomeScreen ? (
          <TouchableOpacity onPress={onHomeClick} style={styles.iconButton}>
            <HomeIcon name="home" size={24} color="#000" />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholderWidth} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomStartRadius: 24,
    borderBottomEndRadius: 24,
  },
  iconButton: {
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
  },
  rightContainer: {
    width: 32, // Ensures same width as back button for proper alignment
    alignItems: 'flex-end',
  },
  placeholderWidth: {
    width: 24,
  },
});
