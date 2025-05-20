import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BackIcon } from '../images/icons';

// Header component that takes title and isHomeScreen as props
type HeaderProps = {
  title?: string;
  isHomeScreen?: boolean;
  onBackClick?: () => void;
  onHomeClick?: () => void;
};

const Header: React.FC<HeaderProps> = ({ title = "Analytics", isHomeScreen = false, onBackClick, onHomeClick }) => {
  return (
    <View style={styles.headerContainer}>
      {/* Back button on the left */}
      <TouchableOpacity 
        onPress={onBackClick} 
        style={styles.iconButton}
      >
        <BackIcon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      
      {/* Title centered */}
      <Text style={styles.title}>{title}</Text>
      
      {/* Home icon on the right (only shown if isHomeScreen is true) */}
      <View style={styles.rightContainer}>
        {isHomeScreen ? (
          <TouchableOpacity 
            onPress={onHomeClick} 
            style={styles.iconButton}
          >
            <BackIcon name="home" size={24} color="#000" />
          </TouchableOpacity>
        ) : (
          // Empty View for maintaining layout when home icon is not shown
          <View style={styles.placeholderWidth} />
        )}
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
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
  }
});