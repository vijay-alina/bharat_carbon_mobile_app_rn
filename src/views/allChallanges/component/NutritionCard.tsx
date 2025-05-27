import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../constants/colors';
import CustomButton from '../../../common/button';
import StarIcon from '../../../images/icons/star_icon.png';

interface NutritionCardProps {
    title: string;
    subtitle: string;
    points: number;
    days: number;
    imageSource: any; // For images (require/import)
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

const NutritionCard: React.FC<NutritionCardProps> = ({
    title,
    subtitle,
    points,
    days,
    imageSource,
    onPress,
    style
}) => {
    return (
        <LinearGradient
            colors={[Colors.LightGreen, Colors.DarkGreen]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={[styles.cardContainer, style]}
        >
            {/* Badge */}
            <View style={styles.badge}>
                <Image source={StarIcon} style={styles.icon} resizeMode="contain" />
                <View style={styles.badgeTextContainer}>
                    <Text style={styles.badgeText}> {points} Points</Text>
                    <Text style={styles.badgeSubText}>per {days} days</Text>
                </View>
            </View>

            {/* Image */}
            <View style={{ alignItems: 'center' }}>
                <Image source={imageSource} style={styles.image} resizeMode="contain" />
            </View>

            {/* Title + Subtitle */}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>

            {/* Button */}
            <CustomButton
                text="Start Challenge"
                onPress={onPress}
                backgroundColor="#fff"
                textColor={Colors.DarkGreen}
                style={styles.button}
                textStyle={styles.buttonText}
            />

        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 16,
        padding: 10,
        width: 200,
        justifyContent: 'space-between',
    },
    badge: {
        flexDirection: 'row',
        backgroundColor: Colors.DarkGreen,
        borderRadius: 30,
        paddingHorizontal: 5,
        paddingVertical: 4,
        alignItems: 'center',
        width: '60%',
    },
    badgeTextContainer: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginLeft: 5,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFA500',
    },
    badgeSubText: {
        fontSize: 10,
        color: '#fff',
    },
    image: {
        width: 80,
        height: 80,
        marginVertical: 8,
    },
    icon: {
        width: 30,
        height: 30,
        // marginVertical: 8,
    },
    textContainer: {
        // alignItems: 'center',
        marginVertical: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    subtitle: {
        fontSize: 12,
        color: '#f0f0f0',
    },
    button: {
        // Add any ViewStyle properties for the button here if needed
    },
    buttonText: {
        color: Colors.DarkGreen,
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default NutritionCard;
