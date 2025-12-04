// components/property/PropertyCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    location: string;  // This is the display location
    address?: string;  // Make address optional
    price: number;
    discount?: number;
    rating: number;
    reviewCount: number;
  };
  onPress: () => void;
  variant?: 'horizontal' | 'vertical';
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onPress,
  variant = 'vertical',
}) => {
  const discountedPrice = property.discount
    ? property.price * (1 - property.discount / 100)
    : property.price;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        variant === 'horizontal' && styles.horizontalContainer,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Image Container */}
      <View style={[
        styles.imageContainer,
        variant === 'horizontal' && styles.horizontalImageContainer,
      ]}>
        <View style={[
          styles.image,
          variant === 'horizontal' && styles.horizontalImage,
        ]} />
        
        {/* Discount Badge */}
        {property.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{property.discount}% Off</Text>
          </View>
        )}
        
        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color={Colors.rating} />
          <Text style={styles.ratingText}>{property.rating}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={[
        styles.content,
        variant === 'horizontal' && styles.horizontalContent,
      ]}>
        <Text style={styles.name} numberOfLines={1}>
          {property.name}
        </Text>
        
        <Text style={styles.location} numberOfLines={1}>
          {property.location}
        </Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${discountedPrice.toFixed(2)}</Text>
          <Text style={styles.perNight}> /night</Text>
          
          {property.discount && (
            <Text style={styles.originalPrice}>
              ${property.price.toFixed(2)}
            </Text>
          )}
        </View>
        
        <View style={styles.reviewsContainer}>
          <Ionicons name="star" size={14} color={Colors.rating} />
          <Text style={styles.reviewsText}>
            {property.rating} ({property.reviewCount} reviews)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 280, // Fixed width for horizontal scroll
  },
  horizontalContainer: {
    flexDirection: 'row',
    height: 120,
    width: 'auto', // Override width for horizontal layout
  },
  imageContainer: {
    position: 'relative',
  },
  horizontalImageContainer: {
    width: 120,
    height: '100%',
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: Colors.gray4,
  },
  horizontalImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.danger,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
    color: Colors.text,
  },
  content: {
    padding: 12,
  },
  horizontalContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  perNight: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  originalPrice: {
    fontSize: 14,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  reviewsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewsText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
});

export default PropertyCard;