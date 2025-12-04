// app/(tabs)/explore.tsx
import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import StatusBar from '../../components/common/StatusBar';
import PropertyCard from '../../components/property/PropertyCard';
import { Colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');

interface ExploreProperty {
  id: string;
  name: string;
  location: string;
  address?: string;
  price: number;
  rating: number;
  type: string;
  discount?: number;
}

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'house', label: 'House' },
    { id: 'apartment', label: 'Apartment' },
    { id: 'villa', label: 'Villa' },
    { id: 'cabin', label: 'Cabin' },
  ];

  const properties: ExploreProperty[] = [
    { id: '1', name: 'Modern Apartment', location: 'Downtown, Calgary', address: '123 Main St, Calgary', price: 120, rating: 4.8, type: 'apartment' },
    { id: '2', name: 'Luxury Villa', location: 'Banff, AB', address: '456 Mountain Rd, Banff', price: 450, rating: 4.9, type: 'villa' },
    { id: '3', name: 'Cozy Cabin', location: 'Kananaskis, AB', address: '789 Forest Ln, Kananaskis', price: 200, discount: 15, rating: 4.7, type: 'cabin' },
    { id: '4', name: 'Family House', location: 'NW Calgary', address: '321 Suburb St, Calgary', price: 300, rating: 4.6, type: 'house' },
    { id: '5', name: 'Studio Loft', location: 'Beltline, Calgary', address: '654 Urban Ave, Calgary', price: 180, rating: 4.5, type: 'apartment' },
    { id: '6', name: 'Mountain Retreat', location: 'Canmore, AB', address: '987 Alpine Way, Canmore', price: 350, discount: 10, rating: 4.9, type: 'villa' },
  ];

  const filteredProperties = activeFilter === 'all'
    ? properties
    : properties.filter(p => p.type === activeFilter);

  return (
    <View style={styles.container}>
      <StatusBar />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Explore</Text>
          <Text style={styles.subtitle}>Find your perfect stay</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search locations, properties..."
            placeholderTextColor={Colors.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          <View style={styles.filtersContainer}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  styles.filterButton,
                  activeFilter === filter.id && styles.filterButtonActive,
                ]}
                onPress={() => setActiveFilter(filter.id)}
              >
                <Text style={[
                  styles.filterText,
                  activeFilter === filter.id && styles.filterTextActive,
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Map View */}
        <TouchableOpacity style={styles.mapPreview}>
          <View style={styles.mapPlaceholder} />
          <View style={styles.mapOverlay}>
            <Text style={styles.mapText}>View on Map</Text>
            <Ionicons name="map" size={20} color={Colors.white} />
          </View>
        </TouchableOpacity>

        {/* Properties Grid */}
        <View style={styles.propertiesContainer}>
          <Text style={styles.sectionTitle}>Available Properties</Text>
          
          <FlatList
            data={filteredProperties}
            renderItem={({ item }) => (
              <Link href={`/property/${item.id}`} asChild>
                <TouchableOpacity style={styles.propertyItem}>
                  <View style={styles.propertyImage} />
                  <View style={styles.propertyInfo}>
                    <View style={styles.propertyHeader}>
                      <Text style={styles.propertyName}>{item.name}</Text>
                      <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={14} color={Colors.rating} />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                      </View>
                    </View>
                    <Text style={styles.propertyLocation}>{item.location}</Text>
                    <View style={styles.propertyFooter}>
                      <Text style={styles.propertyPrice}>${item.price} /night</Text>
                      {item.discount && (
                        <View style={styles.discountBadge}>
                          <Text style={styles.discountText}>{item.discount}% Off</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </Link>
            )}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            numColumns={2}
            columnWrapperStyle={styles.propertyRow}
          />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: Colors.text,
  },
  filtersScroll: {
    marginHorizontal: 20,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.white,
    fontWeight: '600',
  },
  mapPreview: {
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: Colors.gray4,
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mapText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  propertiesContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  propertyRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  propertyItem: {
    width: (width - 48) / 2,
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
  },
  propertyImage: {
    width: '100%',
    height: 120,
    backgroundColor: Colors.gray4,
  },
  propertyInfo: {
    padding: 12,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  propertyName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
  },
  propertyLocation: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  propertyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  propertyPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  discountBadge: {
    backgroundColor: Colors.danger,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
});