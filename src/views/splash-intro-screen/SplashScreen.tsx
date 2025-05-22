import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import PaginationTopBar from "./components/DotsWithSkip";
import SplashScreenOne from "./components/SplashIntroOne";
import SplashIntroTwo from "./components/SplashIntriTwo";
import SplashIntroThree from "./components/SplashIntroThree";

const SplashScreen = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const totalSlides = 3;
    const handleSkip = () => {
        console.log("Skipped");
        setCurrentIndex(totalSlides - 1); // Set to last slide
    }

    const handleContinue = () => {
        console.log("Get Started Pressed");
    }

    const renderSlide = (index: number) => {
        switch (index) {
            case 0:
                return <SplashScreenOne />
            case 1:
                return <SplashIntroTwo />
            case 2:
                return <SplashIntroThree />
        }
    }

    return (
            <View style={styles.container}>
                <PaginationTopBar
                    currentIndex={currentIndex}
                    totalSlides={totalSlides}
                    onSkip={handleSkip}
                />
                {renderSlide(currentIndex)}
            </View>
        );

};

export default SplashScreen;

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
    });