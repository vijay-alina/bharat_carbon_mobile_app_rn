import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TArticle } from '../types';

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
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    margin: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  image: {
    width: '100%',
    height: 140,
  },
  textSection: {
    padding: 12,
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
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
  },
});

export default ArticleCard;
