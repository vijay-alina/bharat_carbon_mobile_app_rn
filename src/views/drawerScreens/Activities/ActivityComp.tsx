import React from 'react';
import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import { MoreVerticalCircleIcon, NutritionAppleIcon } from '../../../images/icons';

export enum ActivityType {
    Nutrition,
    Mobility,
    Housing,
    Leisure,
    Goods,
};

type ActivityCompProps = {
    activityType: ActivityType,
    header: string,
    subHeader: string,
    avatar: ImageSourcePropType,
    name: string,
};

const ActivityComp = (props: ActivityCompProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.activityTypeContainer}>
                <View style={styles.activityChipContainer}>
                    <NutritionAppleIcon />
                    <Text>Nutrition</Text>
                </View>
                <MoreVerticalCircleIcon />
            </View>
            <Text>{props.header}</Text>
            <Text>{props.subHeader}</Text>
            <View style={styles.nameAndPointsContainer}>

            </View>
        </View>
    )
};

export default ActivityComp; // Export the component

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        borderColor: Colors.Neutral200,
        borderRadius: 12,
        borderWidth: 1,
        padding: 12,
        backgroundColor: Colors.White,
        alignSelf: 'center',
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
        borderRadius: 12,
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
});
