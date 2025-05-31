import React from "react"
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'

import { Colors } from '../../constants/colors'
import ProfileSection from "./components/ProfileSection"
import StatusComponent from "./components/StatusComponent"
import VerticalDivider from "../../images/icons/vertical_divider.png"
import ChallangeInfoItem from "./components/ChallengeInfoItem"
import ChallengeHistoryItem from "./components/ChallengeHistoryItem"


const MemberProfileScreen = () => {
    return (
        <View style={styles.container}>
            <ProfileSection />
            <View style={styles.wrapper}>
                <StatusComponent
                    badgeText="10.5 KG"
                    badgeColor={Colors.Black}
                    renderStatus={() => (
                        <View style={styles.row}>
                            <Text style={{ fontSize: 18, color: '#0F3555' }}>CO</Text>
                            <Text style={{ fontSize: 12, color: '#0F3555', marginBottom: -3 }}>2</Text>
                            <Text style={{ fontSize: 18, color: '#0F3555' }}>e (2025)</Text>
                        </View>
                    )}
                />
                <Image
                    source={VerticalDivider}
                    style={styles.verticalDivider}
                />
                <StatusComponent
                    badgeColor={Colors.GreenNormal}
                    showDot={true}
                    badgeText="Normal"
                    renderStatus={() => (
                        <View style={styles.row}>
                            <Text style={{ fontSize: 18, color: '#0F3555' }}>Status</Text>
                        </View>
                    )}
                />
            </View>

            <View style={{ marginTop: 10 }}>
                <ChallangeInfoItem
                    title="Completed Challanges"
                    value="5"
                />
                <ChallangeInfoItem
                    title="Active Challanges"
                    value="1"
                />
                <ChallangeInfoItem
                    title="Last Activity"
                    value="2 Days ago"
                />
            </View>
            <ChallengeHistoryItem/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    wrapper: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 40
    },
    verticalDivider: {
        width: 2,
        height: '100%'
    }

})

export default MemberProfileScreen;