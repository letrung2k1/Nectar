import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  TextInput 
} from 'react-native';

const ExplorerScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Pizza', image: require('../../assets/carot.jpg') },
    { name: 'Burgers', image: require('../../assets/carot.jpg') },
    { name: 'Steak', image: require('../../assets/carot.jpg') },
  ];

  const popularItems = [
    { 
      name: 'Food 1', 
      image: require('../../assets/carot.jpg'), 
      price: 15,
      discount: '10% OFF'
    },
    { 
      name: 'Food 2', 
      image: require('../../assets/carot.jpg'), 
      price: 35,
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search for meals or area"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Text style={styles.sectionTitle}>Top Categories</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryItem}>
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.popularItemsHeader}>
        <Text style={styles.sectionTitle}>Popular Items</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View all</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.popularItemsContainer}>
        {popularItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.popularItemCard}>
            {item.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{item.discount}</Text>
              </View>
            )}
            <Image source={item.image} style={styles.popularItemImage} />
            <Text style={styles.popularItemName}>{item.name}</Text>
            <Text style={styles.popularItemPrice}>${item.price}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  categoryName: {
    marginTop: 5,
    fontSize: 14,
  },
  popularItemsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  viewAllText: {
    color: '#46A758',
  },
  popularItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popularItemCard: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 10,
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#46A758',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    zIndex: 1,
  },
  discountText: {
    color: 'white',
    fontSize: 10,
  },
  popularItemImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  popularItemName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  popularItemPrice: {
    color: '#46A758',
    fontWeight: 'bold',
  }
});

export default ExplorerScreen;