import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PointsComponent from '../../addMember/components/PointsComponent'
import DropIcon from '../../../images/icons/water_droplet.svg'
import {Colors} from '../../../constants/colors'

const ChallengeHistoryItem = () => {
    return (
        <View style={styles.container}>
            <View style={styles.upperWrapper}>
                <View style={styles.titleWrapper}>
                    <DropIcon />
                    <Text style={styles.title}>
                        Housing
                    </Text>

                </View>
                <PointsComponent
                    points={12}
                />
            </View>
            <Text style={styles.description}>Saved 15L water last week</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor:Colors.White,
        borderRadius:14
    },
    upperWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    titleWrapper: {
        flexDirection: 'row'
    },
    title: {
        marginLeft: 8,
        fontSize: 16,
        fontFamily: 'Montserrat-Bold'
    },
    description: {
        marginTop: 8,
        fontSize: 16,
        fontFamily: 'Monserrat-Regular'
    }

})

export default ChallengeHistoryItem
