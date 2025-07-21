import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../constants/colors';
import {DEVICE_WIDTH} from '../utils/utils';
import AnimatedProgressBar from '../common/AnimatedProgressBar';

type ChallengeCompProps = {
  icon: ImageSourcePropType;
  header: string;
  duration: number;
  description: string;
  showPointsBadge?: boolean;
  completedDays: number;
};

const ChallengeComp: React.FC<ChallengeCompProps> = ({
  icon,
  header,
  duration,
  description,
  completedDays,
  //   showPointsBadge,
}) => {
  const progress = (completedDays / duration) * 100;
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <View style={styles.contentContainer}>
        <Text>{header}</Text>
        {duration && <Text>{duration}</Text>}
        <Text>{description}</Text>
        <AnimatedProgressBar
          progress={progress}
          //   title="Alternative colors!"
          //   color1="#34D399"
          //   color2="#10B981"
          segmentCount={10}
          height={10}
          skewAngle={45}
        />
      </View>
    </View>
  );
};

export default ChallengeComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 16,
    borderColor: Colors.Neutral200,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderBottomWidth: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  contentContainer: {
    // marginLeft: 10,
    // width:
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
