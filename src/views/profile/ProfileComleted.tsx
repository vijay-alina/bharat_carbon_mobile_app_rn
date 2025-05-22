import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CheckCompleted from "../../images/icons/check_completed.svg"


const ProfileCompleted = () => {
    return (
        <LinearGradient
            colors={['#0fb497', '#0e9b8c']}
            style={styles.container}
        >
            <CheckCompleted width={100} height={100} />
            <Text style={styles.title}>Profile Completed</Text>
            <Text style={styles.description}>
                You've personalized your journey and committed to the Climate Manifesto. You're ready to make a difference!
            </Text>
            {/* <Image
                source={{ uri: 'https://example.com/your-image.png' }} // Replace with your image URL
                style={styles.image}
            /> */}
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 40,
    },
    title: {
        fontSize: 24,
        // fontWeight: 'semibold',
        color: '#fff',
        marginBottom: 6,
    },
    description: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
    },
});
export default ProfileCompleted;