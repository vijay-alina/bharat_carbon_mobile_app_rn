import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Colors } from '../../../constants/colors'

type ChallangeInfoItemProps = {
    title: string
    value:string
}

const ChallangeInfoItem: React.FC<ChallangeInfoItemProps> = ({title,value}) =>{
    return(
        <View style={styles.container}>
            <Text style={styles.text}> {title}</Text>
            <Text style={styles.text}> {value}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical:5,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    text: {
        fontSize: 16,
        fontFamily:'Montserrate-Regular',
        color:Colors.GreyNeutrals
    }
})

export default ChallangeInfoItem