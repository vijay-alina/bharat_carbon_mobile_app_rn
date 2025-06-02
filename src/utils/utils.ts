import {Dimensions} from 'react-native';

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

export const getLineHeight = (fontSize: number, percentage: number) => {
  const lineHeight = fontSize * (percentage / 100);
  return lineHeight;
};

export const getLetterSpacing = (fontSize: number, percentage: number) => {
  return fontSize * (percentage / 100);
};
