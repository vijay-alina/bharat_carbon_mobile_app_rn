import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '../../../constants/colors'

type StatusComponentProps = {
    badgeText: string
    badgeColor: string
    renderStatus: () => React.ReactNode;
    showDot?: boolean

}

const StatusComponent: React.FC<StatusComponentProps> = ({ badgeText, renderStatus, badgeColor, showDot = false }) => {
    return (
        <View style={styles.container}>
            {renderStatus()}
            <View style={[styles.bedge, { backgroundColor: badgeColor, borderRadius:30 }]}>
                {showDot && <View style={{ height: 10, width: 10, backgroundColor: "#fff", borderRadius: 30 }} />}
                <Text style={styles.bedgetext}>
                    {badgeText}
                </Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    normal: {
        fontSize: 18,
        color: '#0F3555',
    },
    subscript: {
        fontSize: 12,  
        color: '#0F3555',
        marginBottom: -3, 
    },
    bedge: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginTop: 8,

    },
    bedgetext: {
        color: Colors.White,
        fontFamily: 'Montserrat-Regular'

    }
})

export default StatusComponent