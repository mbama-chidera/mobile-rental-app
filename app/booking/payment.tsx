import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/common/Button';
import StatusBar from '../../components/common/StatusBar';
import { Colors } from '../../constants/Colors';

export default function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const bookingDetails = {
    propertyName: 'Alex Homes',
    address: '10th avenue, Calgary, AB',
    checkIn: 'October 04, 2025',
    checkOut: 'November 03, 2025',
    nights: 30,
    pricePerNight: 650,
    guests: '05 Person',
  };

  const calculateTotal = () => {
    const amount = bookingDetails.nights * bookingDetails.pricePerNight;
    const tax = amount * 0.08;
    const total = amount + tax;
    return {
      amount: amount.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
    };
  };

  const totals = calculateTotal();

  const handleConfirmPayment = () => {
    if (paymentMethod === 'credit_card') {
      if (!cardDetails.cardNumber || !cardDetails.cardHolder ||
        !cardDetails.expiryDate || !cardDetails.cvv) {
        alert('Please fill in all card details');
        return;
      }
    }

    router.push('/booking/success');
  };

  return (
    <View style={styles.container}>
      <StatusBar />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.content}>
          <View style={styles.summaryCard}>
            <Text style={styles.sectionTitle}>Booking Summary</Text>

            <View style={styles.propertyInfo}>
              <View style={styles.propertyTitleRow}>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>20% Off</Text>
                </View>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color={Colors.rating} />
                  <Text style={styles.ratingText}>4.5 (365)</Text>
                </View>
              </View>
              <Text style={styles.propertyName}>{bookingDetails.propertyName}</Text>
              <Text style={styles.propertyAddress}>{bookingDetails.address}</Text>
            </View>

            <View style={styles.bookingDetails}>
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
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Nights</Text>
                <Text style={styles.detailValue}>{bookingDetails.nights} nights</Text>
              </View>
            </View>

            <View style={styles.priceBreakdown}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>
                  ${bookingDetails.pricePerNight} × {bookingDetails.nights} nights
                </Text>
                <Text style={styles.priceValue}>${totals.amount}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Tax & Fees (8%)</Text>
                <Text style={styles.priceValue}>${totals.tax}</Text>
              </View>
              <View style={styles.priceDivider} />
              <View style={styles.priceRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${totals.total}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Payment Method</Text>

          <View style={styles.paymentMethods}>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === 'credit_card' && styles.paymentMethodSelected,
              ]}
              onPress={() => setPaymentMethod('credit_card')}
            >
              <Ionicons name="card" size={24} color={Colors.text} />
              <Text style={styles.paymentMethodText}>Credit & Debit Card</Text>
              {paymentMethod === 'credit_card' && (
                <Ionicons name="checkmark-circle" size={20} color={Colors.primary} style={styles.checkIcon} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === 'paypal' && styles.paymentMethodSelected,
              ]}
              onPress={() => setPaymentMethod('paypal')}
            >
              <Ionicons name="logo-paypal" size={24} color={Colors.text} />
              <Text style={styles.paymentMethodText}>Paypal</Text>
              {paymentMethod === 'paypal' && (
                <Ionicons name="checkmark-circle" size={20} color={Colors.primary} style={styles.checkIcon} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === 'apple_pay' && styles.paymentMethodSelected,
              ]}
              onPress={() => setPaymentMethod('apple_pay')}
            >
              <Ionicons name="logo-apple" size={24} color={Colors.text} />
              <Text style={styles.paymentMethodText}>Apple Pay</Text>
              {paymentMethod === 'apple_pay' && (
                <Ionicons name="checkmark-circle" size={20} color={Colors.primary} style={styles.checkIcon} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === 'google_pay' && styles.paymentMethodSelected,
              ]}
              onPress={() => setPaymentMethod('google_pay')}
            >
              <Ionicons name="logo-google" size={24} color={Colors.text} />
              <Text style={styles.paymentMethodText}>Google Pay</Text>
              {paymentMethod === 'google_pay' && (
                <Ionicons name="checkmark-circle" size={20} color={Colors.primary} style={styles.checkIcon} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === 'wallet' && styles.paymentMethodSelected,
              ]}
              onPress={() => setPaymentMethod('wallet')}
            >
              <Ionicons name="wallet" size={24} color={Colors.text} />
              <Text style={styles.paymentMethodText}>Wallet</Text>
              {paymentMethod === 'wallet' && (
                <Ionicons name="checkmark-circle" size={20} color={Colors.primary} style={styles.checkIcon} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === 'cash' && styles.paymentMethodSelected,
              ]}
              onPress={() => setPaymentMethod('cash')}
            >
              <Ionicons name="cash" size={24} color={Colors.text} />
              <Text style={styles.paymentMethodText}>Cash</Text>
              {paymentMethod === 'cash' && (
                <Ionicons name="checkmark-circle" size={20} color={Colors.primary} style={styles.checkIcon} />
              )}
            </TouchableOpacity>
          </View>

          {paymentMethod === 'credit_card' && (
            <View style={styles.cardDetails}>
              <Text style={styles.cardTitle}>Card Details</Text>

              <View style={styles.cardInputGroup}>
                <Text style={styles.cardLabel}>Card Holder Name</Text>
                <TextInput
                  style={styles.cardInput}
                  placeholder="Enter card holder name"
                  placeholderTextColor={Colors.placeholder}
                  value={cardDetails.cardHolder}
                  onChangeText={(text) => setCardDetails({ ...cardDetails, cardHolder: text })}
                />
              </View>

              <View style={styles.cardInputGroup}>
                <Text style={styles.cardLabel}>Card Number</Text>
                <TextInput
                  style={styles.cardInput}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor={Colors.placeholder}
                  value={cardDetails.cardNumber}
                  onChangeText={(text) => setCardDetails({ ...cardDetails, cardNumber: text })}
                  keyboardType="number-pad"
                  maxLength={19}
                />
              </View>

              <View style={styles.cardRow}>
                <View style={[styles.cardInputGroup, { flex: 1, marginRight: 12 }]}>
                  <Text style={styles.cardLabel}>Expiry Date</Text>
                  <TextInput
                    style={styles.cardInput}
                    placeholder="MM/YY"
                    placeholderTextColor={Colors.placeholder}
                    value={cardDetails.expiryDate}
                    onChangeText={(text) => setCardDetails({ ...cardDetails, expiryDate: text })}
                    keyboardType="number-pad"
                    maxLength={5}
                  />
                </View>

                <View style={[styles.cardInputGroup, { flex: 1 }]}>
                  <Text style={styles.cardLabel}>CVV</Text>
                  <TextInput
                    style={styles.cardInput}
                    placeholder="123"
                    placeholderTextColor={Colors.placeholder}
                    value={cardDetails.cvv}
                    onChangeText={(text) => setCardDetails({ ...cardDetails, cvv: text })}
                    keyboardType="number-pad"
                    secureTextEntry
                    maxLength={4}
                  />
                </View>
              </View>
            </View>
          )}

          <View style={styles.termsContainer}>
            <Ionicons name="information-circle" size={20} color={Colors.textSecondary} />
            <Text style={styles.termsText}>
              By confirming payment, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>

          <Button
            title={`Confirm Payment - $${totals.total}`}
            onPress={handleConfirmPayment}
            style={styles.confirmButton}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  propertyInfo: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
    backgroundColor: Colors.background,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
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
  },
  bookingDetails: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
  priceBreakdown: {
    marginTop: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  priceValue: {
    fontSize: 14,
    color: Colors.text,
  },
  priceDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  paymentMethods: {
    marginBottom: 30,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  paymentMethodSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  paymentMethodText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  checkIcon: {
    marginLeft: 8,
  },
  cardDetails: {
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  cardInputGroup: {
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  cardInput: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
  },
  cardRow: {
    flexDirection: 'row',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.card,
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 8,
    lineHeight: 18,
  },
  confirmButton: {
    marginBottom: 30,
  },
});