import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 
import { Colors } from '../../../constants/colors';

interface CategoryCardProps {
  label: string;
  subText?: string;
  icon: ImageSourcePropType;
  isSelected: boolean;
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  label,
  subText = 'No Entry',
  icon,
  isSelected,
  onPress,
}) => {
  const CardContent = (
    <View style={styles.cardContent}>
      <Image source={icon} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={[styles.label, isSelected && styles.labelSelected]}>
          {label}
        </Text>
        <Text style={[styles.subText, isSelected && styles.subTextSelected]}>
          {subText}
        </Text>
      </View>
      <View
        style={[
          styles.radioWrapper,
          isSelected && styles.radioWrapperSelected,
        ]}
      >
        <View style={[styles.radio, isSelected && styles.radioSelected]} />
      </View>
    </View>
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      {isSelected ? (
        <LinearGradient
          colors={['#147D6F', '#0A524C']}
          style={styles.cardGradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          {CardContent}
        </LinearGradient>
      ) : (
        <View style={styles.cardDefault}>{CardContent}</View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardDefault: {
    height: 110,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardGradient: {
    height: 110,
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 12,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#000',
  },
  labelSelected: {
    color: '#fff',
  },
  subText: {
    color: Colors.GreyNeutrals,
  },
  subTextSelected: {
    color: '#eee',
  },
  radioWrapper: {
    width: 26,
    height: 26,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioWrapperSelected: {
    borderWidth: 2,
    borderColor: '#fff', // Ring color
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  radioSelected: {
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
});

export default CategoryCard;
