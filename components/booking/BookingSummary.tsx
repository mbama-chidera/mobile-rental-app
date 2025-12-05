import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors } from '../../constants/Colors';

interface BookingSummaryProps {
  propertyName: string;
  propertyImage: string;
  checkIn: string;
  checkOut: string;
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
  pricePerNight: number;
  numberOfNights: number;
  cleaningFee?: number;
  serviceFee?: number;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  propertyName,
  propertyImage,
  checkIn,
  checkOut,
  guests,
  pricePerNight,
  numberOfNights,
  cleaningFee = 0,
  serviceFee = 0,
}) => {
  const subtotal = pricePerNight * numberOfNights;
  const total = subtotal + cleaningFee + serviceFee;

  const totalGuests = guests.adults + guests.children + guests.infants;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Booking Summary</Text>

      <View style={styles.propertyCard}>
        <Image
          source={{ uri: propertyImage }}
          style={styles.propertyImage}
        />
        <View style={styles.propertyInfo}>
          <Text style={styles.propertyName} numberOfLines={2}>
            {propertyName}
          </Text>
        </View>
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Check-in</Text>
          <Text style={styles.detailValue}>{formatDate(checkIn)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Check-out</Text>
          <Text style={styles.detailValue}>{formatDate(checkOut)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Guests</Text>
          <Text style={styles.detailValue}>
            {totalGuests} {totalGuests === 1 ? 'Guest' : 'Guests'}
          </Text>
        </View>

        {guests.adults > 0 && (
          <Text style={styles.guestBreakdown}>
            {guests.adults} {guests.adults === 1 ? 'Adult' : 'Adults'}
            {guests.children > 0 && `, ${guests.children} ${guests.children === 1 ? 'Child' : 'Children'}`}
            {guests.infants > 0 && `, ${guests.infants} ${guests.infants === 1 ? 'Infant' : 'Infants'}`}
          </Text>
        )}
      </View>

      <View style={styles.priceCard}>
        <Text style={styles.priceTitle}>Price Details</Text>

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>
            ${pricePerNight} × {numberOfNights} {numberOfNights === 1 ? 'night' : 'nights'}
          </Text>
          <Text style={styles.priceValue}>${subtotal.toFixed(2)}</Text>
        </View>

        {cleaningFee > 0 && (
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Cleaning fee</Text>
            <Text style={styles.priceValue}>${cleaningFee.toFixed(2)}</Text>
          </View>
        )}

        {serviceFee > 0 && (
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service fee</Text>
            <Text style={styles.priceValue}>${serviceFee.toFixed(2)}</Text>
          </View>
        )}

        <View style={styles.dividerThick} />

        <View style={styles.priceRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  propertyCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
  },
  propertyImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  propertyInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  propertyName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  detailsCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  guestBreakdown: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  priceCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
  },
  priceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: Colors.text,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  dividerThick: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
});

export default BookingSummary;