import React from 'react';
import {
    View,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Image,
    Text,
    ScrollView,
} from 'react-native';
import AvtarImage from '../../../images/icons/avatar_placeholder.png';
import { Colors } from '../../../constants/colors';
import PointsComponent from '../../addMember/components/PointsComponent';



const ItemCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={AvtarImage} style={styles.avtarImg} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.title}>Maya Kapoor</Text>
                    <Text >10-B</Text>
                    </View>
                </View>
                <PointsComponent points={3469} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: Colors.CardGray,
        paddingVertical: 20,
        paddingHorizontal: 20,
        width: "100%",
        borderRadius: 15,
        marginTop: 8,
    },
    title: {
        fontSize: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    avtarImg: {
        height: 60,
        width: 60,
    },
});

export default ItemCard;