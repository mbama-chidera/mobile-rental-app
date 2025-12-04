// app/profile/my-listings.tsx - Complete fixed version
import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import StatusBar from '../../components/common/StatusBar';
import Button from '../../components/common/Button';
import { Colors } from '../../constants/Colors';
import { RootState } from '../../store';

interface Listing {
  id: string;
  name: string;
  location: string;
  address?: string;
  price: number;
  pricePerNight?: number; // Add this
  discount?: number;
  verified: boolean;
  imageCount: number;
  status: 'active' | 'inactive';
  bookings: number;
  views: number;
  waitlist: number;
  city?: string;
  country?: string;
}

export default function MyListingsScreen() {
  const dispatch = useDispatch();
  const { userProperties } = useSelector((state: RootState) => state.properties);
  const { isHost } = useSelector((state: RootState) => state.auth);
  
  const [activeTab, setActiveTab] = useState('all');
  const [listings, setListings] = useState<Listing[]>([
    {
      id: '1',
      name: 'Mbama Homes',
      location: 'Calgary, AB',
      address: 'Calgary, AB',
      price: 150,
      pricePerNight: 150, // Add this
      verified: true,
      imageCount: 3,
      status: 'active',
      bookings: 12,
      views: 245,
      waitlist: 3,
      city: 'Calgary',
      country: 'Canada'
    },
    {
      id: '2',
      name: 'Highest Homes',
      location: 'Original, +6',
      address: 'Original, +6',
      price: 450,
      pricePerNight: 450, // Add this
      verified: false,
      imageCount: 4,
      status: 'inactive',
      bookings: 0,
      views: 78,
      waitlist: 0,
      city: 'Original',
      country: 'Canada'
    },
  ]);

  const [analytics, setAnalytics] = useState({
    totalBookings: 12,
    totalViews: 323,
    totalWaitlist: 3,
    monthlyEarnings: 1800,
    occupancyRate: 78,
  });

  const removeListing = (id: string) => {
    setListings(listings.filter(listing => listing.id !== id));
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Listings</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
              All
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'favorites' && styles.activeTab]}
            onPress={() => setActiveTab('favorites')}
          >
            <Text style={[styles.tabText, activeTab === 'favorites' && styles.activeTabText]}>
              Favorites
            </Text>
          </TouchableOpacity>
        </View>

        {/* Analytics */}
        <View style={styles.analyticsSection}>
          <Text style={styles.sectionTitle}>Analytics</Text>
          <Text style={styles.timePeriod}>This month</Text>
          
          <View style={styles.analyticsGrid}>
            <View style={styles.analyticCard}>
              <Text style={styles.analyticValue}>{analytics.totalBookings}</Text>
              <Text style={styles.analyticLabel}>Total Booking</Text>
            </View>
            
            <View style={styles.analyticCard}>
              <Text style={styles.analyticValue}>{analytics.totalViews}</Text>
              <Text style={styles.analyticLabel}>Total Views</Text>
            </View>
            
            <View style={styles.analyticCard}>
              <Text style={styles.analyticValue}>{analytics.totalWaitlist}</Text>
              <Text style={styles.analyticLabel}>Total Waitlist</Text>
            </View>
            
            <View style={styles.analyticCard}>
              <Text style={styles.analyticValue}>{analytics.occupancyRate}%</Text>
              <Text style={styles.analyticLabel}>Occupancy Rate</Text>
            </View>
          </View>
        </View>

        {/* Earnings */}
        <View style={styles.earningsSection}>
          <View style={styles.earningsHeader}>
            <View>
              <Text style={styles.earningsLabel}>Total Earnings</Text>
              <Text style={styles.earningsAmount}>${analytics.monthlyEarnings}</Text>
            </View>
            <Button
              title="View Details"
              onPress={() => {}}
              variant="outline"
              size="small"
            />
          </View>
        </View>

        {/* Listings */}
        <View style={styles.listingsSection}>
          <Text style={styles.sectionTitle}>Your Properties</Text>
          
          {listings.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="home-outline" size={60} color={Colors.gray3} />
              <Text style={styles.emptyTitle}>No Listings Yet</Text>
              <Text style={styles.emptyText}>
                Start earning by listing your property
              </Text>
              <Button
                title="Add Property"
                onPress={() => router.push('/host/add-property')}
                style={styles.addButton}
              />
            </View>
          ) : (
            listings.map((listing) => (
              <View key={listing.id} style={styles.listingCard}>
                {/* Property Image */}
                <View style={styles.listingImage}>
                  <View style={styles.imageCount}>
                    <Ionicons name="images" size={12} color={Colors.white} />
                    <Text style={styles.imageCountText}>+{listing.imageCount}</Text>
                  </View>
                </View>
                
                {/* Property Info */}
                <View style={styles.listingInfo}>
                  <View style={styles.listingHeader}>
                    <View>
                      <Text style={styles.listingName}>{listing.name}</Text>
                      <Text style={styles.listingLocation}>{listing.location}</Text>
                    </View>
                    {listing.verified && (
                      <View style={styles.verifiedBadge}>
                        <Ionicons name="checkmark-circle" size={16} color={Colors.verified} />
                      </View>
                    )}
                  </View>
                  
                  {/* FIXED: Use price instead of pricePerNight */}
                  <Text style={styles.listingPrice}>${listing.price} /night</Text>
                  
                  <View style={styles.listingStats}>
                    <View style={styles.statItem}>
                      <Ionicons name="calendar" size={14} color={Colors.textSecondary} />
                      <Text style={styles.statText}>{listing.bookings} bookings</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Ionicons name="eye" size={14} color={Colors.textSecondary} />
                      <Text style={styles.statText}>{listing.views} views</Text>
                    </View>
                  </View>
                  
                  <View style={styles.listingActions}>
                    {/* FIXED: Correct navigation */}
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => router.push(`/property/${listing.id}`)}
                    >
                      <Text style={styles.editButtonText}>Edit Details</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeListing(listing.id)}
                    >
                      <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Add Property CTA */}
        {listings.length > 0 && (
          <View style={styles.addPropertySection}>
            <Button
              title="Add New Property"
              onPress={() => router.push('/host/add-property')}
              leftIcon={<Ionicons name="add" size={20} color={Colors.white} />}
              style={styles.addPropertyButton}
            />
          </View>
        )}

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>Tips for Success</Text>
          
          <View style={styles.tipItem}>
            <Ionicons name="star" size={20} color={Colors.warning} />
            <Text style={styles.tipText}>Keep your calendar updated</Text>
          </View>
          
          <View style={styles.tipItem}>
            <Ionicons name="star" size={20} color={Colors.warning} />
            <Text style={styles.tipText}>Respond quickly to inquiries</Text>
          </View>
          
          <View style={styles.tipItem}>
            <Ionicons name="star" size={20} color={Colors.warning} />
            <Text style={styles.tipText}>Add high-quality photos</Text>
          </View>
          
          <View style={styles.tipItem}>
            <Ionicons name="star" size={20} color={Colors.warning} />
            <Text style={styles.tipText}>Set competitive pricing</Text>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
    marginRight: 12,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.white,
  },
  analyticsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  timePeriod: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  analyticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  analyticCard: {
    width: '48%',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  analyticValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  analyticLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  earningsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary + '10',
    padding: 20,
    borderRadius: 12,
  },
  earningsLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  earningsAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 4,
  },
  listingsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  addButton: {
    minWidth: 200,
  },
  listingCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  listingImage: {
    width: 120,
    height: 120,
    backgroundColor: Colors.gray4,
    position: 'relative',
  },
  imageCount: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  imageCountText: {
    color: Colors.white,
    fontSize: 10,
    marginLeft: 2,
  },
  listingInfo: {
    flex: 1,
    padding: 16,
  },
  listingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  listingName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  listingLocation: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  verifiedBadge: {
    marginLeft: 8,
  },
  listingPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 12,
  },
  listingStats: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  listingActions: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  editButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  removeButton: {
    flex: 1,
    backgroundColor: Colors.danger,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  removeButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  addPropertySection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  addPropertyButton: {
    paddingVertical: 16,
  },
  tipsSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: Colors.text,
    marginLeft: 12,
  },
});