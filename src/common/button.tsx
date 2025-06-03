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
import { Colors } from '../constants/colors';

interface CustomButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
  showIcon?: boolean;
  iconComponent?: React.ElementType; // Can accept any component like Svg
  iconProps?: Record<string, any>;   // Props to pass to the icon (e.g., name, color)
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  isRightIcon?: boolean;
  isLeftIcon?: boolean;
  disabled?: boolean;
  borderColor?: string;
  borderWidth?: number;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onPress,
  backgroundColor = '#009688',
  textColor = '#fff',
  showIcon = false,
  iconComponent: IconComponent,
  iconProps = {},
  style,
  textStyle,
  isRightIcon = false,
  isLeftIcon = false,
  disabled = false,
  borderColor,
  borderWidth,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor },
        borderColor && { borderColor },
        borderWidth !== undefined && { borderWidth },
        style,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={styles.content}>
        {showIcon && isLeftIcon && IconComponent && (
          <IconComponent {...iconProps} style={styles.icon} />
        )}

        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {text}
        </Text>

        {showIcon && isRightIcon && IconComponent && (
          <IconComponent {...iconProps} style={styles.icon} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    paddingVertical: 8,
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
    fontSize: 14,
    fontWeight: '600',
  },
  icon: {
    marginLeft: 8,
  },
  disabled: {
    backgroundColor: Colors.GreyNeutrals,
  },
});

export default CustomButton;
