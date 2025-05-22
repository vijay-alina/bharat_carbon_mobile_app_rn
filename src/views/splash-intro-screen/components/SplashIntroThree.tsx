import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import ReceiptAndCheckout from "../../../images/icons/receipt_and_checkout.png";
import PaginationTopBar from "./DotsWithSkip";

const SplashIntroThree = () => {
    return (
        <View style={styles.container}>
        
            <Image
                source={ReceiptAndCheckout}
                resizeMode="contain"
                style={styles.image}
            />
            <View style={styles.card}>
                <Text style={styles.title}>Upload Bills and Earn Reward Points</Text>
                <Text style={styles.description}>
                    Submitt bills, save progress,complete tasks and get rewarded.
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => console.log("Get Started Pressed")}
                >
                    <Text style={styles.buttonText}>
                        Continue Now
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#024064",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        paddingTop: 100, // pushes the image down from top
    },
    skipSlider: {
        width: "100%",
        height: 50,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginBottom: 20, // this creates the gap between image and card
        position: "absolute",
        top: 50, // adjust as per design
    },
    image: {
        width: 300,
        height: 232,
        marginBottom: 40, // this creates the gap between image and card
    },
    card: {
        width: "100%",
        height: 250,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 100, // adjust as per design
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        color: "#555",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#17a086",
        padding: 12,
        borderRadius: 30,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    }
});

export default SplashIntroThree;
