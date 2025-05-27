import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../../common/button'; // adjust the path
import YellowStar from '../../../images/icons/star_icon.png'; // adjust the path
import { Colors } from '../../../constants/colors';

interface ChallengeCompleteCardProps {
    title: string;
    description: string;
    points: number;
    onShare: () => void;
    onStartNew: () => void;
}

const ChallengeCompleteCard: React.FC<ChallengeCompleteCardProps> = ({
    title,
    description,
    points,
    onShare,
    onStartNew,
}) => {
    return (
        <LinearGradient
            colors={[Colors.LightGreen, Colors.DarkGreen]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.cardContainer}
        >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>

            <View style={styles.iconWrapper}>
                <Image
                    source={YellowStar}
                    style={styles.image}
                    resizeMode="contain" />
            </View>

            <Text style={styles.pointsText}>You Earned: {points} Points</Text>

            <CustomButton
                text="Share Achievement"
                onPress={onShare}
                backgroundColor="#fff"
                textColor="#333"
                style={styles.button}
            />

            <CustomButton
                text="Start New Challenge"
                onPress={onStartNew}
                backgroundColor="#fff"
                textColor="#333"
                style={styles.button}
            />
        </LinearGradient>
    );
};

export default ChallengeCompleteCard;

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 20,
        padding: 24,
        margin: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 8,
        fontFamily: 'Montserrat-Bold',
    },
    description: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 12,
        fontFamily: 'Montserrat-Regular',
    },
    iconWrapper: {
        marginVertical: 14,
    },
    pointsText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 24,
        fontFamily: 'Montserrat-Medium',
    },
    image: {
        height: 100,
        width: 100,
    },
    button: {
        width: '100%',
        marginVertical: 6,
    },
});
