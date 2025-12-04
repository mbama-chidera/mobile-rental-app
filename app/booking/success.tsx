// app/booking/success.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import StatusBar from '../../components/common/StatusBar';
import Button from '../../components/common/Button';
import { Colors } from '../../constants/Colors';

export default function BookingSuccessScreen() {
  const bookingDetails = {
    propertyName: 'Alex Homes',
    address: '10th avenue, Calgary, AB',
    checkIn: 'October 04, 2025',
    checkOut: 'November 03, 2025',
    guests: '05 Person',
    amount: '$650.00',
    tax: '$50.00',
    total: '$700.00',
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={80} color={Colors.success} />
        </View>

        {/* Success Message */}
        <Text style={styles.successTitle}>Congratulations!</Text>
        <Text style={styles.successMessage}>
          Your Booking Was Successfully.
        </Text>
        <Text style={styles.successSubMessage}>
          You can check your booking on the menu Profile.
        </Text>

        {/* Booking Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <View style={styles.propertyInfo}>
              <View style={styles.propertyTitleRow}>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>20% Off</Text>
                </View>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color={Colors.rating} />
                  <Text style={styles.ratingText}>4.5</Text>
                </View>
              </View>
              <Text style={styles.propertyName}>Alex Homes</Text>
              <Text style={styles.propertyAddress}>10th avenue, Calgary, AB</Text>
              <Text style={styles.propertyPrice}>$650 /night</Text>
            </View>
          </View>

          <View style={styles.summaryDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Booking Date</Text>
              <Text style={styles.detailValue}>August 24, 2025 | 10:00 AM</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Check In</Text>
              <Text style={styles.detailValue}>{bookingDetails.checkIn}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Check Out</Text>
              <Text style={styles.detailValue}>{bookingDetails.checkOut}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Guest</Text>
              <Text style={styles.detailValue}>{bookingDetails.guests}</Text>
            </View>
          </View>

          <View style={styles.summaryTotal}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Amount</Text>
              <Text style={styles.totalValue}>{bookingDetails.amount}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tax & Fees</Text>
              <Text style={styles.totalValue}>{bookingDetails.tax}</Text>
            </View>
            <View style={styles.totalDivider} />
            <View style={styles.totalRow}>
              <Text style={styles.finalTotalLabel}>Total</Text>
              <Text style={styles.finalTotalValue}>{bookingDetails.total}</Text>
            </View>
          </View>

          <View style={styles.paymentMethod}>
            <Text style={styles.paymentLabel}>Payment Method</Text>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentValue}>Paypal</Text>
              <TouchableOpacity>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="View E-Receipt"
            onPress={() => {}}
            variant="outline"
            style={styles.actionButton}
          />
          <Button
            title="View My Bookings"
            onPress={() => router.push('/(tabs)/profile')}
            style={styles.actionButton}
          />
        </View>

        {/* Home Button */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.replace('/(tabs)')}
        >
          <Ionicons name="home" size={20} color={Colors.primary} />
          <Text style={styles.homeButtonText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  successIcon: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  successSubMessage: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  summaryCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 30,
  },
  summaryHeader: {
    marginBottom: 20,
  },
  propertyInfo: {
    marginBottom: 16,
  },
  propertyTitleRow: {
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
  ratingBadge: {
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
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  propertyAddress: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  propertyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  summaryDetails: {
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
  summaryTotal: {
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 20,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  totalValue: {
    fontSize: 14,
    color: Colors.text,
  },
  totalDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  finalTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  finalTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  paymentMethod: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 20,
  },
  paymentLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  changeText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  homeButtonText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
    marginLeft: 8,
  },
});