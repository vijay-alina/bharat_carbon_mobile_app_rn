import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {PointsIcon} from '../../../images/icons';

type TPointsProps = {
  points: string;
};

const PointsComponent: React.FC<TPointsProps> = ({points}) => {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <LinearGradient colors={['#FFE73A', '#FFE73A', '#FDCC4D']} style={{borderRadius: 20}}>
      <View style={styles.container}>
        <PointsIcon />
        <Text>{`${points}`}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default PointsComponent; // Export the component
