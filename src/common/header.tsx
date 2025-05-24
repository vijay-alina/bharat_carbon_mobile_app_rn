import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ViewStyle} from 'react-native';
import {BackIcon, HomeIcon} from '../images/icons';
import { getLineHeight } from '../utils/utils';
import { Colors } from '../constants/colors';
import { TextStyle } from 'react-native';

type HeaderProps = {
  title?: string;
  isHomeScreen?: boolean;
  onBackClick?: () => void;
  onHomeClick?: () => void;
  hasTransparentBackground?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export const Header: React.FC<HeaderProps> = ({
  title = 'Analytics',
  isHomeScreen = false,
  onBackClick,
  onHomeClick,
  hasTransparentBackground = false,
  containerStyle,
  textStyle = {color: Colors.Black},
}) => {
  return (
    <View style={[styles.headerContainer, hasTransparentBackground && styles.transparentBackground, containerStyle]}>
      <TouchableOpacity onPress={onBackClick} style={styles.iconButton}>
        <BackIcon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={[styles.title, textStyle as TextStyle]}>{title}</Text>
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
    backgroundColor: Colors.White,
    borderBottomStartRadius: 24,
    borderBottomEndRadius: 24,
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  iconButton: {
    padding: 4,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    lineHeight: getLineHeight(16, 120),
    color: Colors.Black,
  },
  rightContainer: {
    width: 32, // Ensures same width as back button for proper alignment
    alignItems: 'flex-end',
  },
  placeholderWidth: {
    width: 24,
  },
});
