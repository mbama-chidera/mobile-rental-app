// app/property/[id].tsx
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Button from '../../components/common/Button';
import StatusBar from '../../components/common/StatusBar';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock property data - in a real app, fetch this based on the id from Redux or API
  type Property = {
    id: string;
    name: string;
    address: string;
    city: string;
    country: string;
    description: string;
    pricePerNight: number;
    bathrooms: number;
    bedrooms: number;
    area: number;
    amenities: string[];
    photos: string[];
    hostId: string;
    hostName: string;
    isVerified: boolean;
    rating: number;
    reviewCount: number;
    discount: number;
    maxGuests: number;
    checkInTime: string;
    checkOutTime: string;
  };

  const mockProperties: Record<string, Property> = {
    '1': {
      id: '1',
      name: 'Alex Homes',
      address: '10th avenue, Calgary, AB',
      city: 'Calgary',
      country: 'Canada',
      description: 'Luxury apartment in downtown Calgary with stunning views and modern amenities. Perfect for families or groups looking for comfort and convenience.',
      pricePerNight: 650,
      bathrooms: 3,
      bedrooms: 3,
      area: 1800,
      amenities: ['WiFi', 'Parking', 'Pool', 'Kitchen', 'AC', 'Heating', 'TV', 'Washer'],
      photos: [],
      hostId: 'host_1',
      hostName: 'Alex Manager',
      isVerified: true,
      rating: 4.5,
      reviewCount: 365,
      discount: 20,
      maxGuests: 5,
      checkInTime: '14:00',
      checkOutTime: '11:00',
    },
    '2': {
      id: '2',
      name: 'Tin Homes',
      address: 'Calgary, AB',
      city: 'Calgary',
      country: 'Canada',
      description: 'Modern home in Calgary with contemporary design and all essential amenities. Great for comfortable living.',
      pricePerNight: 550,
      bathrooms: 2,
      bedrooms: 3,
      area: 1600,
      amenities: ['WiFi', 'Parking', 'Kitchen', 'AC', 'Heating', 'TV'],
      photos: [],
      hostId: 'host_2',
      hostName: 'Tin Owner',
      isVerified: true,
      rating: 4.3,
      reviewCount: 245,
      discount: 0,
      maxGuests: 4,
      checkInTime: '15:00',
      checkOutTime: '12:00',
    },
    '3': {
      id: '3',
      name: 'Mbama Homes',
      address: 'Calgary, AB',
      city: 'Calgary',
      country: 'Canada',
      description: 'Affordable apartment in Calgary perfect for budget travelers. Clean, comfortable, and conveniently located.',
      pricePerNight: 150,
      bathrooms: 1,
      bedrooms: 2,
      area: 1000,
      amenities: ['WiFi', 'Kitchen', 'Heating'],
      photos: [],
      hostId: 'host_3',
      hostName: 'Mbama Host',
      isVerified: true,
      rating: 4.9,
      reviewCount: 107,
      discount: 10,
      maxGuests: 3,
      checkInTime: '14:00',
      checkOutTime: '11:00',
    },
  };

  // Get the property based on the id, fallback to property 1 if not found
  const property = mockProperties[id as string] || mockProperties['1'];

  const discountedPrice = property.discount
    ? property.pricePerNight * (1 - property.discount / 100)
    : property.pricePerNight;

  const handleBookNow = () => {
    // Navigate to booking screen with property id
    router.push(`/booking?propertyId=${property.id}`);
  };

  const handleWriteReview = () => {
    // Navigate to write review screen with property id
    router.push(`/property/write-review?propertyId=${property.id}`);
  };

  return (
    <View style={styles.container}>
      <StatusBar />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={60} color={Colors.placeholder} />
          </View>

          {/* Header Overlay */}
          <View style={styles.headerOverlay}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.white} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? Colors.danger : Colors.white}
              />
            </TouchableOpacity>
          </View>

          {/* Discount Badge */}
          {property.discount > 0 && (
            <View style={styles.discountBadgeContainer}>
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{property.discount}% OFF</Text>
              </View>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Title & Rating */}
          <View style={styles.titleSection}>
            <View style={styles.titleRow}>
              <Text style={styles.propertyName}>{property.name}</Text>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={16} color={Colors.rating} />
                <Text style={styles.ratingText}>{property.rating}</Text>
              </View>
            </View>
            <Text style={styles.location}>
              <Ionicons name="location-outline" size={16} color={Colors.textSecondary} />
              {' '}{property.address}
            </Text>
            <Text style={styles.reviewCount}>{property.reviewCount} reviews</Text>
          </View>

          {/* Price */}
          <View style={styles.priceSection}>
            <View style={styles.priceRow}>
              {property.discount > 0 && (
                <Text style={styles.originalPrice}>${property.pricePerNight}</Text>
              )}
              <Text style={styles.price}>${discountedPrice.toFixed(0)}</Text>
              <Text style={styles.perNight}> /night</Text>
            </View>
          </View>

          {/* Property Info */}
          <View style={styles.infoSection}>
            <View style={styles.infoCard}>
              <Ionicons name="bed-outline" size={24} color={Colors.primary} />
              <Text style={styles.infoLabel}>{property.bedrooms}</Text>
              <Text style={styles.infoSubLabel}>Bedrooms</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="water-outline" size={24} color={Colors.primary} />
              <Text style={styles.infoLabel}>{property.bathrooms}</Text>
              <Text style={styles.infoSubLabel}>Bathrooms</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="resize-outline" size={24} color={Colors.primary} />
              <Text style={styles.infoLabel}>{property.area}</Text>
              <Text style={styles.infoSubLabel}>sq ft</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="people-outline" size={24} color={Colors.primary} />
              <Text style={styles.infoLabel}>{property.maxGuests}</Text>
              <Text style={styles.infoSubLabel}>Guests</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{property.description}</Text>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {property.amenities.map((amenity, index) => (
                <View key={index} style={styles.amenityItem}>
                  <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Check-in/Check-out */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Check-in & Check-out</Text>
            <View style={styles.timeRow}>
              <View style={styles.timeCard}>
                <Ionicons name="log-in-outline" size={24} color={Colors.primary} />
                <Text style={styles.timeLabel}>Check-in</Text>
                <Text style={styles.timeValue}>{property.checkInTime}</Text>
              </View>
              <View style={styles.timeCard}>
                <Ionicons name="log-out-outline" size={24} color={Colors.primary} />
                <Text style={styles.timeLabel}>Check-out</Text>
                <Text style={styles.timeValue}>{property.checkOutTime}</Text>
              </View>
            </View>
          </View>

          {/* Host Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hosted by</Text>
            <View style={styles.hostCard}>
              <View style={styles.hostAvatar}>
                <Text style={styles.hostInitial}>{property.hostName[0]}</Text>
              </View>
              <View style={styles.hostInfo}>
                <View style={styles.hostNameRow}>
                  <Text style={styles.hostName}>{property.hostName}</Text>
                  {property.isVerified && (
                    <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
                  )}
                </View>
                <Text style={styles.hostLabel}>Property Host</Text>
              </View>
              <TouchableOpacity style={styles.messageButton}>
                <Ionicons name="chatbubble-outline" size={20} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Reviews Section */}
          <View style={styles.section}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Reviews</Text>
              <TouchableOpacity onPress={handleWriteReview}>
                <Text style={styles.writeReviewText}>Write Review</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.reviewsSubtext}>
              {property.reviewCount} reviews from verified guests
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomPrice}>
          <Text style={styles.bottomPriceAmount}>${discountedPrice.toFixed(0)}</Text>
          <Text style={styles.bottomPriceLabel}>/night</Text>
        </View>
        <Button
          title="Book Now"
          onPress={handleBookNow}
          style={styles.bookButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageContainer: {
    width: width,
    height: 300,
    position: 'relative',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.gray4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerOverlay: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  discountBadgeContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
  },
  discountBadge: {
    backgroundColor: Colors.danger,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  discountText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  propertyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
    color: Colors.text,
  },
  location: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  priceSection: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: 18,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  perNight: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    backgroundColor: Colors.card,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 8,
  },
  infoSubLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 12,
  },
  amenityText: {
    fontSize: 15,
    color: Colors.text,
    marginLeft: 8,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeCard: {
    flex: 1,
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  timeLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 4,
  },
  hostCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 12,
  },
  hostAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hostInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  hostInfo: {
    flex: 1,
    marginLeft: 12,
  },
  hostNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginRight: 6,
  },
  hostLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  writeReviewText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  reviewsSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  bottomPrice: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  bottomPriceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  bottomPriceLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  bookButton: {
    paddingHorizontal: 32,
  },
});