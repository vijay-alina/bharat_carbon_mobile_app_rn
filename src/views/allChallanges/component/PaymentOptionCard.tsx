import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

type PaymentOptionProps = {
  label: string;
  icon: ImageSourcePropType;
  selected: boolean;
  onPress: () => void;
};

const PaymentOption: React.FC<PaymentOptionProps> = ({ label, icon, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, selected ? styles.cardSelected : styles.cardDefault]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.label}>{label}</Text>
      </View>

      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1.5,
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  cardDefault: {
    borderColor: '#ccc',
  },
  cardSelected: {
    borderColor: '#00bfa5',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: {
    borderColor: '#00bfa5',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00bfa5',
  },
});

export default PaymentOption;
