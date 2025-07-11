import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../constants/colors';
import YellowStar from '../../../images/icons/star_icon.png';
import * as Progress from 'react-native-progress';

type ChallengeCardProps = {
  icon: ImageSourcePropType;
  header: string;
  duration: number;
  description: string;
  color: string;
  points: number;
  completedDays: number;
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({
  icon,
  header,
  duration,
  color,
  description,
  points,
  completedDays,
}) => {
  const complitionPercentage = (completedDays / duration) * 100;
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.badgeContainer}>
          <Image source={YellowStar} style={styles.starIcon} />
          <Text style={styles.badgeText}>+{points}</Text>
          <Text style={styles.badgeText}>Points</Text>
        </View>
        <Image source={icon} style={styles.icon} resizeMode="contain" />
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.textBottomMargin, styles.headerText]}>
          {header}
        </Text>
        {duration && (
          <Text style={[styles.textBottomMargin, styles.durationText]}>
            Day: {completedDays} of {duration}
          </Text>
        )}
        <Text style={styles.textBottomMargin}>{description}</Text>
        <View style={styles.progressBarContainer}>
          <Progress.Bar
            progress={complitionPercentage / 100}
            style={[styles.progressBar]}
            color={color}
            unfilledColor="#E8F5E8"
            borderWidth={0}
            width={null}
          />
          <View>
            <Text style={{color: color}}>
              {complitionPercentage.toFixed(1)}%
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChallengeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 16,
    borderColor: Colors.Neutral200,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderBottomWidth: 4,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeContainer: {
    backgroundColor: Colors.LightGreen,
    // padding: 3,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 5,
    alignItems: 'center',
    width: 35,
    position: 'absolute',
    zIndex: 1,
  },
  starIcon: {
    width: 15,
    height: 15,
    marginBottom: 1,
  },
  badgeText: {
    color: 'yellow',
    fontSize: 5,
    fontWeight: '500',
  },
  contentContainer: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  textBottomMargin: {
    marginBottom: 2,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.Black2,
  },
  durationText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.Black2,
  },
  icon: {
    width: 100,
    height: 100,
  },
  progressBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 10,
  },
  progressBar: {
    width: '80%',
    marginRight: 10,
  },
});
