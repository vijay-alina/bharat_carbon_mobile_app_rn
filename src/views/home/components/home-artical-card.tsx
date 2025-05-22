import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TArticle } from '../types';
import { Colors } from '../../../constants/colors';

interface ArticleCardProps {
  item: TArticle;
  index: number;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ item, index }) => {
  return (
    <View style={styles.card} key={index.toString()}>
      <Image source={{ uri: item.imageUri }} style={styles.image} resizeMode="cover" />
      <View style={styles.textSection}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.category}</Text>
        </View>
        <Text style={styles.title}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 350,
    height: 250,
    backgroundColor: Colors.White,
    borderRadius: 16,
    overflow: 'hidden',
    margin: 10,
    // elevation: 2,
    shadowColor: Colors.Black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 10,
  },
  textSection: {
    marginTop: 12,
  },
  badge: {
    backgroundColor: '#d6f0c4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  badgeText: {
    fontSize: 12,
    color: '#4d7c0f',
    letterSpacing: 1,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111',
  },
});

export default ArticleCard;
