// app/(tabs)/wishlist.tsx
import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import StatusBar from '../../components/common/StatusBar';
import Button from '../../components/common/Button';
import { Colors } from '../../constants/Colors';

interface WishlistProperty {
  id: string;
  name: string;
  location: string;
  address?: string;
  price: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  saved: boolean;
}

export default function WishlistScreen() {
  const [wishlist, setWishlist] = useState<WishlistProperty[]>([
    {
      id: '1',
      name: 'Alex Homes',
      location: '10th avenue, Calgary, AB',
      address: '10th avenue, Calgary, AB',
      price: 650,
      discount: 20,
      rating: 4.5,
      reviewCount: 365,
      saved: true,
    },
    {
      id: '2',
      name: 'Tin Homes',
      location: 'Calgary, AB',
      address: 'Calgary, AB',
      price: 550,
      rating: 4.3,
      reviewCount: 245,
      saved: true,
    },
    {
      id: '3',
      name: 'Mbama Homes',
      location: 'Calgary, AB',
      address: 'Calgary, AB',
      price: 150,
      discount: 10,
      rating: 4.9,
      reviewCount: 107,
      saved: true,
    },
  ]);

  const toggleSave = (id: string) => {
    setWishlist(wishlist.map(item => 
      item.id === id ? { ...item, saved: !item.saved } : item
    ));
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Wishlist</Text>
          <Text style={styles.subtitle}>Your saved properties</Text>
        </View>

        {wishlist.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={80} color={Colors.gray3} />
            <Text style={styles.emptyTitle}>No saved properties</Text>
            <Text style={styles.emptyText}>
              Save properties you like by tapping the heart icon
            </Text>
            <Link href="/explore" asChild>
              <Button
                title="Explore Properties"
                onPress={() => {}}
                style={styles.exploreButton}
              />
            </Link>
          </View>
        ) : (
          <>
            {/* Wishlist Items */}
            <View style={styles.wishlistContainer}>
              {wishlist.map((property) => (
                <View key={property.id} style={styles.wishlistItem}>
                  <Link href={`/property/${property.id}`} asChild>
                    <TouchableOpacity style={styles.propertyInfo}>
                      <View style={styles.propertyImage} />
                      <View style={styles.propertyDetails}>
                        <View style={styles.propertyHeader}>
                          {property.discount && (
                            <View style={styles.discountBadge}>
                              <Text style={styles.discountText}>{property.discount}% Off</Text>
                            </View>
                          )}
                          <View style={styles.ratingContainer}>
                            <Ionicons name="star" size={14} color={Colors.rating} />
                            <Text style={styles.ratingText}>{property.rating}</Text>
                          </View>
                        </View>
                        <Text style={styles.propertyName}>{property.name}</Text>
                        <Text style={styles.propertyLocation}>{property.location}</Text>
                        <Text style={styles.propertyPrice}>${property.price} /night</Text>
                      </View>
                    </TouchableOpacity>
                  </Link>
                  
                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={() => toggleSave(property.id)}
                    >
                      <Ionicons
                        name={property.saved ? "heart" : "heart-outline"}
                        size={24}
                        color={property.saved ? Colors.danger : Colors.textSecondary}
                      />
                    </TouchableOpacity>
                    
                    <Link href={`/booking?propertyId=${property.id}`} asChild>
                      <Button
                        title="Book Now"
                        onPress={() => {}}
                        size="small"
                        style={styles.bookButton}
                      />
                    </Link>
                  </View>
                </View>
              ))}
            </View>

            {/* Clear All */}
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setWishlist([])}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Recommendations */}
        {wishlist.length > 0 && (
          <View style={styles.recommendations}>
            <Text style={styles.sectionTitle}>You might also like</Text>
            <View style={styles.recommendationCard}>
              <View style={styles.recommendationImage} />
              <View style={styles.recommendationInfo}>
                <Text style={styles.recommendationName}>Luxury Villa</Text>
                <Text style={styles.recommendationLocation}>Banff, AB</Text>
                <Text style={styles.recommendationPrice}>$450 /night</Text>
                <Link href="/property/4" asChild>
                  <Button
                    title="View Details"
                    onPress={() => {}}
                    variant="outline"
                    size="small"
                    style={styles.viewButton}
                  />
                </Link>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  exploreButton: {
    minWidth: 200,
  },
  wishlistContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  wishlistItem: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  propertyInfo: {
    flexDirection: 'row',
    padding: 16,
  },
  propertyImage: {
    width: 100,
    height: 100,
    backgroundColor: Colors.gray4,
    borderRadius: 8,
  },
  propertyDetails: {
    flex: 1,
    marginLeft: 16,
  },
  propertyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  discountBadge: {
    backgroundColor: Colors.danger,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  discountText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  propertyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  saveButton: {
    marginRight: 12,
  },
  bookButton: {
    flex: 1,
  },
  clearButton: {
    alignSelf: 'center',
    padding: 12,
    marginVertical: 20,
  },
  clearButtonText: {
    fontSize: 16,
    color: Colors.danger,
    fontWeight: '600',
  },
  recommendations: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  recommendationCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
  },
  recommendationImage: {
    width: 80,
    height: 80,
    backgroundColor: Colors.gray4,
    borderRadius: 8,
  },
  recommendationInfo: {
    flex: 1,
    marginLeft: 16,
  },
  recommendationName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  recommendationLocation: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  recommendationPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 12,
  },
  viewButton: {
    alignSelf: 'flex-start',
  },
});