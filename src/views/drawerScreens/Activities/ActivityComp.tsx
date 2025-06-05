import React from 'react';
import {ImageSourcePropType, StyleSheet, Text, View, Image} from 'react-native';
import {Colors} from '../../../constants/colors';
import {
  MoreVerticalCircleIcon,
  NutritionAppleIcon,
} from '../../../images/icons';
import AvatarPlaceholder from '../../../images/icons/avatar_placeholder.png';
import PointsComponent from '../../addMember/components/PointsComponent';
import {DEVICE_WIDTH, getLineHeight} from '../../../utils/utils';

export enum ActivityType {
  Nutrition,
  Mobility,
  Housing,
  Leisure,
  Goods,
}

type ActivityCompProps = {
  activityType: ActivityType;
  header: string;
  subHeader: string;
  avatar?: ImageSourcePropType;
  name: string;
};

const ActivityComp = (props: ActivityCompProps) => {
  const getChipBgColor = (activityType: ActivityType) => {
    switch (activityType) {
      case ActivityType.Nutrition:
        return Colors.LightGreenShades100;
      case ActivityType.Mobility:
        return Colors.OrangeLightHover;
      case ActivityType.Housing:
        return Colors.LightBlue;
      case ActivityType.Leisure:
        return Colors.LightRed;
      case ActivityType.Goods:
        return Colors.LightPurple;
      default:
        return Colors.LightGreenShades100;
    }
  };

  const getChipTextColor = (activityType: ActivityType) => {
    switch (activityType) {
      case ActivityType.Nutrition:
        return Colors.LightGreenShades700;
      case ActivityType.Mobility:
        return Colors.OrangeNormal;
      case ActivityType.Housing:
        return Colors.MediumBlue;
      case ActivityType.Leisure:
        return Colors.MediumRed;
      case ActivityType.Goods:
        return Colors.MediumPurple;
      default:
        return Colors.LightGreenShades700;
    }
  };

  const getChipText = (activityType: ActivityType) => {
    switch (activityType) {
      case ActivityType.Nutrition:
        return 'Nutrition';
      case ActivityType.Mobility:
        return 'Mobility';
      case ActivityType.Housing:
        return 'Housing';
      case ActivityType.Leisure:
        return 'Leisure';
      case ActivityType.Goods:
        return 'Goods';
      default:
        return 'NA';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.activityTypeContainer}>
        <View
          style={[
            styles.activityChipContainer,
            {backgroundColor: getChipBgColor(props.activityType)},
          ]}>
          <NutritionAppleIcon />
          <Text style={[styles.chipText, {color: getChipTextColor(props.activityType)}]}>{getChipText(props.activityType)}</Text>
        </View>
        <MoreVerticalCircleIcon />
      </View>
      <Text style={styles.titleText}>{props.header}</Text>
      <Text style={styles.timestampText}>{props.subHeader}</Text>
      <View style={styles.nameAndPointsContainer}>
        <View style={styles.avatarWithNameContainer}>
          <Image source={AvatarPlaceholder} style={styles.avatar} />
          <Text style={styles.nameText}>{props.name}</Text>
        </View>
        <PointsComponent points={'+ 20'} />
      </View>
    </View>
  );
};

export default ActivityComp; // Export the component

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH * 0.9,
    marginHorizontal: 16,
    borderColor: Colors.Neutral200,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    backgroundColor: Colors.White,
    alignSelf: 'center',
    marginTop: 8,
  },
  activityTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityChipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 24,
  },
  chipText: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  nameAndPointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarAndNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  avatarWithNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 28,
    height: 28,
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    fontWeight: '600',
    color: Colors.Black3,
  },
  nameText: {
    fontSize: 14,
    fontFamily: 'Montserrat',
    fontWeight: '500',
    color: Colors.Black3,
    lineHeight: getLineHeight(14, 150),
    marginLeft: 8,
  },
  timestampText: {
    fontSize: 12,
    fontFamily: 'Montserrat',
    fontWeight: '500',
    color: Colors.Gray3,
    lineHeight: getLineHeight(12, 150),
  },
});
