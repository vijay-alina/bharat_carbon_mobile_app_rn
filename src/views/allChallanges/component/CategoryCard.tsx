import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
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
    <View style={[styles.cardContent]}>
      <Image source={icon} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={[styles.label, isSelected && styles.labelSelected]}>
          {label}
        </Text>
        <Text style={styles.subText}>{subText}</Text>
      </View>
      <View style={[styles.radio, isSelected && styles.radioSelected]} />
    </View>
  );

  return (
    <>
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      {isSelected ? (
        <LinearGradient
          colors={['#147D6F', '#0A524C']}
          style={styles.cardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {CardContent}
        </LinearGradient>
      ) : (
        <View style={styles.cardDefault}>{CardContent}</View>
      )}
    </TouchableOpacity>
    
    </>
  );
};

const styles = StyleSheet.create({
  cardDefault: {
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardGradient: {
    height: 100,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  labelSelected: {
    color: '#fff',
  },
  subText: {
    color: '#888',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  radioSelected: {
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
});

export default CategoryCard;
