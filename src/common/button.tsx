import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import AerrowIconWithTail from '../images/icons/arrow_right_with_tail.svg';
import { Colors } from '../constants/colors';

interface CustomButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
  showIcon?: boolean;
  iconName?: keyof typeof AerrowIconWithTail; // restricts to valid icon names
  iconColor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isRightIcon?: boolean;
  isLeftIcon?: boolean;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onPress,
  backgroundColor = '#009688',
  textColor = '#fff',
  showIcon = false,
  iconName = 'arrow-forward',
  iconColor = '#fff',
  style,
  textStyle,
  isRightIcon = false,
  isLeftIcon = false,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style, disabled && styles.disabled]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={styles.content}>
      {showIcon && isLeftIcon && (
            <AerrowIconWithTail
                name={iconName}
                color={iconColor}
                style={styles.icon}
            />
        )}
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {text}
        </Text>
        {showIcon && isRightIcon && (
            <AerrowIconWithTail
                name={iconName}
                color={iconColor}
                style={styles.icon}
            />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',

  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginLeft: 8,
  },
  disabled: {
    backgroundColor: Colors.GreyNeutrals,
  }
});

export default CustomButton;
