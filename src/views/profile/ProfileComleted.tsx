import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CheckCompleted from "../../images/icons/check_completed.svg"
import HomeIcon from "../../images/icons/home_icon.svg"


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
            <TouchableOpacity style={styles.button}>
                <HomeIcon />
                <Text style={styles.buttonText}> Let's Get Started</Text>
            </TouchableOpacity>
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
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingVertical: 8,
        paddingHorizontal: 12,
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 600
    }

});
export default ProfileCompleted;