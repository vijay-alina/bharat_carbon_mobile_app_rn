import React from "react"
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import ProfileImage from '../../../images/icons/avatar_placeholder.png'
import PointsComponent from "../../addMember/components/PointsComponent" 
import { Colors } from "react-native/Libraries/NewAppScreen" 


const ProfileSection = () =>{
    return (
        <View style={styles.container}>
            <Image
                source={ProfileImage}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={styles.pointsContainer}>
                <PointsComponent points={12} />
            </View>
            <Text style={styles.memberNameText}>
                Kavya Mehta
            </Text>
            <Text style={styles.memberRelationText}>
                Daughter
            </Text>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 100,
        width: 100
    },
    pointsContainer: {
        position: 'absolute',
        top: 90,
    },
    memberNameText: {
        fontSize: 22,
        fontFamily: 'Montserrat-Bold',
        marginTop: 22,
    },
    memberRelationText: {
        fontFamily: 'Montserrat-Regular',
        color: Colors.MediumGrey
    }
})


export default ProfileSection