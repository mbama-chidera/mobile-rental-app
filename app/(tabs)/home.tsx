// app/(tabs)/index.tsx
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import StatusBar from '../../components/common/StatusBar';
import PropertyCard from '../../components/property/PropertyCard';
import Button from '../../components/common/Button';
import { Colors } from '../../constants/Colors';
import { fetchPropertiesStart, fetchPropertiesSuccess } from '../../store/slices/propertySlice';
import { RootState } from '../../store';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { propertyCards } = useSelector(
    (state: RootState) => state.properties
  );
  
  const [location] = useState('Calgary, AB');

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    dispatch(fetchPropertiesStart());
    
    try {
      const mockProperties = [
        {
          id: '1',
          name: 'Alex Homes',
          address: '10th avenue, Calgary, AB',
          city: 'Calgary',
          country: 'Canada',
          location: '10th avenue, Calgary, AB',
          description: 'Luxury apartment in downtown Calgary',
          pricePerNight: 650,
          bathrooms: 3,
          bedrooms: 3,
          area: 1800,
          amenities: ['WiFi', 'Parking', 'Pool', 'Kitchen'],
          photos: [],
          hostId: 'host_1',
          hostName: 'Alex Manager',
          isVerified: true,
          rating: 4.5,
          reviewCount: 365,
          discount: 20,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          maxGuests: 5,
          checkInTime: '14:00',
          checkOutTime: '11:00',
          isAvailable: true,
        },
        {
          id: '2',
          name: 'Tin Homes',
          address: 'Calgary, AB',
          city: 'Calgary',
          country: 'Canada',
          location: 'Calgary, AB',
          description: 'Modern home in Calgary',
          pricePerNight: 550,
          bathrooms: 2,
          bedrooms: 3,
          area: 1600,
          amenities: ['WiFi', 'Parking', 'Kitchen'],
          photos: [],
          hostId: 'host_2',
          hostName: 'Tin Owner',
          isVerified: true,
          rating: 4.3,
          reviewCount: 245,
          discount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          maxGuests: 4,
          checkInTime: '15:00',
          checkOutTime: '12:00',
          isAvailable: true,
        },
        {
          id: '3',
          name: 'Mbama Homes',
          address: 'Calgary, AB',
          city: 'Calgary',
          country: 'Canada',
          location: 'Calgary, AB',
          description: 'Affordable apartment in Calgary',
          pricePerNight: 150,
          bathrooms: 1,
          bedrooms: 2,
          area: 1000,
          amenities: ['WiFi', 'Kitchen'],
          photos: [],
          hostId: 'host_3',
          hostName: 'Mbama Host',
          isVerified: true,
          rating: 4.9,
          reviewCount: 107,
          discount: 10,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          maxGuests: 3,
          checkInTime: '14:00',
          checkOutTime: '11:00',
          isAvailable: true,
        },
      ];
      
      dispatch(fetchPropertiesSuccess(mockProperties));
    } catch (error) {
      console.error('Failed to load properties:', error);
    }
  };

  const renderPropertyCard = ({ item }: { item: any }) => (
    <Link href={`/property/${item.id}`} asChild>
      <TouchableOpacity style={{ marginRight: 16 }}>
        <PropertyCard 
          property={{
            id: item.id,
            name: item.name,
            location: item.location || `${item.city}, ${item.country}`,
            address: item.address,
            price: item.pricePerNight || item.price,
            discount: item.discount,
            rating: item.rating,
            reviewCount: item.reviewCount
          }} 
          onPress={() => {}} 
        />
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <StatusBar />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.locationLabel}>Location</Text>
            <Text style={styles.locationText}>{location}</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="search" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={Colors.placeholder} />
          <Text style={styles.searchPlaceholder}>Search properties...</Text>
        </TouchableOpacity>

        {/* Recommended Properties */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended Property</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={propertyCards.slice(0, 3)}
            renderItem={renderPropertyCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Nearby Listings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Listings</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {propertyCards.slice(0, 3).map((property: any) => (
            <Link key={property.id} href={`/property/${property.id}`} asChild>
              <TouchableOpacity style={styles.nearbyCard}>
                <View style={styles.nearbyImage} />
                <View style={styles.nearbyContent}>
                  <View style={styles.nearbyHeader}>
                    {property.discount && property.discount > 0 && (
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{property.discount}% Off</Text>
                      </View>
                    )}
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={14} color={Colors.rating} />
                      <Text style={styles.ratingText}>{property.rating}</Text>
                    </View>
                  </View>
                  <Text style={styles.nearbyName}>{property.name}</Text>
                  <Text style={styles.nearbyLocation}>{property.location || `${property.city}, ${property.country}`}</Text>
                  <Text style={styles.nearbyPrice}>${property.pricePerNight || property.price} /night</Text>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </View>

        {/* Become Host CTA */}
        <View style={styles.hostSection}>
          <View style={styles.hostContent}>
            <Text style={styles.hostTitle}>Become a Host</Text>
            <Text style={styles.hostDescription}>
              Earn money by renting out your extra space
            </Text>
            <Link href="/host/become-host" asChild>
              <Button
                title="Get Started"
                onPress={() => {}}
                variant="secondary"
                style={styles.hostButton}
              />
            </Link>
          </View>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  locationLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: Colors.placeholder,
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  horizontalList: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  nearbyCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  nearbyImage: {
    width: 100,
    height: 100,
    backgroundColor: Colors.gray4,
  },
  nearbyContent: {
    flex: 1,
    padding: 12,
  },
  nearbyHeader: {
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
    color: Colors.text,
  },
  nearbyName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  nearbyLocation: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  nearbyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  hostSection: {
    backgroundColor: Colors.primary,
    marginHorizontal: 20,
    marginBottom: 30,
    borderRadius: 12,
    padding: 20,
  },
  hostContent: {
    alignItems: 'center',
  },
  hostTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 8,
  },
  hostDescription: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 16,
  },
  hostButton: {
    backgroundColor: Colors.white,
    minWidth: 120,
  },
});