import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../constants/colors';
import WinnersCard from './Components/WinnersCard';
import CustomButton from '../../common/button';
import PodiumImage from '../../images/icons/winner_position_stand.png'
import WinnerCardOne from './Components/WinnerCardOne';
import WinnersCardThree from './Components/WinnerCardThree';

import { useState } from 'react';
import ItemCard from './Components/ItemCard';
import { winnerTypeFilters } from '../../constants/constants';
import { DEVICE_WIDTH } from '../../utils/utils';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<'school' | 'class'>('school');
  const [activeFilter, setActiveFilter] = useState<number>(0);

  const handleFilterChange = (index: number) => {
    setActiveFilter(index);
  }

  const itemWidth = ((DEVICE_WIDTH - 16) * 0.2)

  const renderTabItem = (item: string, index: number) => {
    const isActive = activeFilter === index;
    return (<TouchableOpacity onPress={() => handleFilterChange(index)} key={index} style={{
      marginRight: 10,
      width: itemWidth,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 20,
      alignItems: 'center',
      backgroundColor: isActive ? Colors.Black : Colors.Neutrals100,
    }}>
      <Text style={{ color: isActive ? Colors.White : Colors.Black }}>{item}</Text>
    </TouchableOpacity>)
  }
  return (
    <ScrollView>    <LinearGradient
      colors={[Colors.LightGreen, Colors.DarkGreen]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}>
      <View style={styles.btnContainer}>
        <View style={styles.btn}>
          <CustomButton
            text="School Rank"
            backgroundColor={activeTab === 'school' ? Colors.White : 'transparent'}
            textColor={activeTab === 'school' ? Colors.NeutralsDark : Colors.White}
            borderColor={Colors.White}
            borderWidth={1}
            onPress={() => setActiveTab('school')} />
        </View>
        <View style={styles.btn}>
          <CustomButton
            text="Class Rank (10-B)"
            backgroundColor={activeTab === 'class' ? Colors.White : 'transparent'}
            textColor={activeTab === 'class' ? Colors.NeutralsDark : Colors.White}
            borderColor={Colors.White}
            borderWidth={1}
            onPress={() => setActiveTab('class')} />
        </View>
      </View>

      <View style={styles.winnersWrapper}>
        <View style={styles.winnerRow}>
          <View style={[styles.winnerContainer, { top: 40 }]}>
            <WinnersCard />
          </View>

          <View style={[styles.winnerContainer, { top: -15 }]}>
            <WinnerCardOne />
          </View>

          <View style={[styles.winnerContainer, { top: 60 }]}>
            <WinnersCardThree />
          </View>
        </View>
        <Image
          source={PodiumImage}
          style={styles.podiumImage}
        />
      </View>
      <View style={styles.winnersCardWrapper}>
        <View style={styles.tabContainer}>
          <FlatList
            horizontal
            data={winnerTypeFilters}
            renderItem={({ item, index }) => renderTabItem(item, index)} />
        </View>
        <FlatList data={[1, 2, 3]} renderItem={({ item, index }) => <ItemCard />} />
        <View style={{ height: 80 }} />
      </View>

    </LinearGradient>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 6
  },
  btn: {
    width: '49%',
  },
  winnersWrapper: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  winnerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    marginBottom: 20,
  },
  winnerContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  podiumImage: {
    width: '87%',
    height: 180,
  },
  winnersCardWrapper: {
    backgroundColor: Colors.White,
    width: '100%',
    padding: 8,
    borderRadius: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.Neutrals100,
    paddingVertical: 4,
    borderRadius: 20,
  }


});



export default Leaderboard;