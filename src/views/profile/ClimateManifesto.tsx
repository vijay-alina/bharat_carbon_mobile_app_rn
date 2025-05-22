import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ManifestItem from "./components/ManifestItem";
import * as Constants from "../../constants/constants";
import CustomButton from "../../common/button";

const ClimateManifesto = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Our Mission</Text>
                <Text style={styles.description}>
                    Empowering you to make everyday choices that fight climate change and build a greener, more sustainable future.
                </Text>
            </View>
            <View>
                <Text style={styles.title}>{Constants.ClimateManifesto.whatBeBelieve.title}</Text>
                {Constants.ClimateManifesto.whatBeBelieve.items.map((item, index) => (
                    <ManifestItem key={index} icon={item.icon} title={item.title} />))}
                <Text style={styles.title}>{Constants.ClimateManifesto.OurCommitments.title}</Text>
                {Constants.ClimateManifesto.OurCommitments.items.map((item, index) => (
                    <ManifestItem key={index} icon={item.icon} title={item.title} />))}
                <Text style={styles.title}>{Constants.ClimateManifesto.yourRole.title}</Text>
                <Text style={{ marginBottom: 8, fontSize: 16, }}>By joining us, You commit to:</Text>
                {Constants.ClimateManifesto.yourRole.items.map((item, index) => (
                    <ManifestItem key={index} icon={""} title={item.title} />))}
            </View>
            <CustomButton
                text="Accept & Continue"
                onPress={() => { }}
                //   showIcon={!isSubmitting}
                //   iconName="arrow-forward"
                backgroundColor="#17a086"
            //   style={styles.submitButton}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        marginBottom: 10,
    },
    subTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',

    }
})

export default ClimateManifesto;

