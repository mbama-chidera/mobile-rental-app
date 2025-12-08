// app/booking/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateSelector from '../../components/booking/DateSelector';
import GuestSelector from '../../components/booking/GuestSelector';
import Button from '../../components/common/Button';
import StatusBar from '../../components/common/StatusBar';
import { Colors } from '../../constants/Colors';

import { getAuth } from '@react-native-firebase/auth';
import { getFirestore } from '@react-native-firebase/firestore';

import { Alert } from 'react-native';

import * as SplashScreen from 'expo-splash-screen';

export default function BookingScreen() {
  const auth = getAuth();

  const [activeStep, setActiveStep] = useState(1);
  const [checkInDate, setCheckInDate] = useState('2025-10-04');
  const [checkOutDate, setCheckOutDate] = useState('2025-11-03');
  const [noteToOwner, setNoteToOwner] = useState('');
  
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const [userInfo, setUserInfo] = useState({
    name: 'Tiring Tin Bui',
    email: 'example@gmail.com',
    gender: 'Male',
    phoneNumber: '+1 (123) 456-7890',
    country: 'Canada',
  });

  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4716 9627 1635 8047',
    cardHolder: 'Sylvia Kite',
    expiryDate: '02/30',
    cvv: '000',
  });

  const checkInDates = [
    { day: 'Mon', date: '5 Oct', value: '2025-10-05' },
    { day: 'Tue', date: '6 Oct', value: '2025-10-06' },
    { day: 'Wed', date: '7 Oct', value: '2025-10-07' },
  ];

  const checkOutDates = [
    { day: 'Mon', date: '4 Nov', value: '2025-11-04' },
    { day: 'Tue', date: '5 Nov', value: '2025-11-05' },
    { day: 'Wed', date: '6 Nov', value: '2025-11-06' },
  ];

  const createBooking = async () => {
    const guestId = auth.currentUser?.uid;

    console.log('Confirming booking...');

    SplashScreen.preventAutoHideAsync();

    const response = await fetch('http://<BACKEND_URL_HERE>/property/hd1Zha77cpIpf5sehM4V/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await auth.currentUser?.getIdToken()}`,
      },
      body: JSON.stringify({
        guestBookingId: guestId,
        timeOfBookingStart: checkInDate,
        timeOfBookingEnd: checkOutDate
      })
    })
    .catch((error) => {
      console.error('Error during booking:', error);
      Alert.alert('Booking Failed', 'An error occurred while processing your booking. Please try again later.');
    })
    .finally(() => {
      SplashScreen.hideAsync();
    });

    if(response)
      if (response.ok) {
        router.push('/booking/success');
        SplashScreen.hideAsync();
      } else {
        console.log(response);
        Alert.alert('Booking Failed', 'Unable to complete the booking. Please try again later.');
      }
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      const user = auth.currentUser;
      if (user) {
        await getFirestore().doc(`guests/${user.uid}`).get().then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            setUserInfo({
              name: data?.firstName + ' ' + data?.lastName || 'Tiring Tin Bui',
              email: data?.email || 'example@gmail.com',
              gender: data?.gender || 'Male',
              phoneNumber: data?.phoneNumber || '+1 (123) 456-7890',
              country: data?.country || 'Canada',
            });
          }
        });
      }
    };

    fetchUserInfo();
  }, []);

  const renderStep1 = () => (
    <>
      <View style={styles.propertyHeader}>
        <View style={styles.propertyTitleRow}>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>20% Off</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={14} color={Colors.rating} />
            <Text style={styles.ratingText}>4.5 (365)</Text>
          </View>
        </View>
        
        <Text style={styles.propertyName}>Alex Homes</Text>
        <Text style={styles.propertyAddress}>10th avenue, Calgary, AB</Text>
      </View>

      <DateSelector
        title="Check In"
        dates={checkInDates}
        selectedDate={checkInDate}
        onSelectDate={setCheckInDate}
      />

      <DateSelector
        title="Check Out"
        dates={checkOutDates}
        selectedDate={checkOutDate}
        onSelectDate={setCheckOutDate}
      />

      <View style={styles.noteContainer}>
        <Text style={styles.noteTitle}>Note to Owner</Text>
        <TextInput
          style={styles.noteInput}
          placeholder="Enter here"
          placeholderTextColor={Colors.placeholder}
          value={noteToOwner}
          onChangeText={setNoteToOwner}
          multiline
        />
      </View>

      <Button
        title="Continue"
        onPress={() => setActiveStep(2)}
        style={styles.continueButton}
      />
    </>
  );

  const renderStep2 = () => (
    <>
      <Text style={styles.stepTitle}>Select Guest</Text>
      <GuestSelector
        guests={guests}
        onChange={setGuests}
      />
      <Button
        title="Continue"
        onPress={() => setActiveStep(3)}
        style={styles.continueButton}
      />
    </>
  );

  const renderStep3 = () => (
    <>
      <Text style={styles.stepTitle}>Your Info</Text>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>{userInfo.name}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{userInfo.email}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Gender</Text>
          <Text style={styles.infoValue}>{userInfo.gender}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone Number</Text>
          <Text style={styles.infoValue}>{userInfo.phoneNumber}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Country</Text>
          <Text style={styles.infoValue}>{userInfo.country}</Text>
        </View>
      </View>

      <Button
        title="Continue"
        onPress={() => setActiveStep(4)}
        style={styles.continueButton}
      />
    </>
  );

  const renderStep4 = () => (
    <>
      <Text style={styles.stepTitle}>Payment Methods</Text>
      
      <View style={styles.paymentMethods}>
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
        
        <Text style={styles.moreOptionsText}>More Payment Options</Text>
        
        <View style={styles.otherMethods}>
          <TouchableOpacity style={styles.otherMethod}>
            <Text style={styles.otherMethodText}>Paypal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.otherMethod}>
            <Text style={styles.otherMethodText}>Apple Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.otherMethod}>
            <Text style={styles.otherMethodText}>Google Pay</Text>
          </TouchableOpacity>
        </View>
      </View>

      {paymentMethod === 'credit_card' && (
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>Card Details</Text>
          
          <View style={styles.cardInputGroup}>
            <Text style={styles.cardLabel}>Card Holder Name</Text>
            <TextInput
              style={styles.cardInput}
              value={cardDetails.cardHolder}
              onChangeText={(text) => setCardDetails({ ...cardDetails, cardHolder: text })}
            />
          </View>
          
          <View style={styles.cardInputGroup}>
            <Text style={styles.cardLabel}>Card Number</Text>
            <TextInput
              style={styles.cardInput}
              value={cardDetails.cardNumber}
              onChangeText={(text) => setCardDetails({ ...cardDetails, cardNumber: text })}
              keyboardType="number-pad"
            />
          </View>
          
          <View style={styles.cardRow}>
            <View style={[styles.cardInputGroup, { flex: 1, marginRight: 12 }]}>
              <Text style={styles.cardLabel}>Expiry Date</Text>
              <TextInput
                style={styles.cardInput}
                value={cardDetails.expiryDate}
                onChangeText={(text) => setCardDetails({ ...cardDetails, expiryDate: text })}
                placeholder="MM/YY"
              />
            </View>
            
            <View style={[styles.cardInputGroup, { flex: 1 }]}>
              <Text style={styles.cardLabel}>CVV</Text>
              <TextInput
                style={styles.cardInput}
                value={cardDetails.cvv}
                onChangeText={(text) => setCardDetails({ ...cardDetails, cvv: text })}
                keyboardType="number-pad"
                secureTextEntry
              />
            </View>
          </View>
        </View>
      )}

      <Button
        title="Confirm Payment"
        onPress={() => createBooking()}
        style={styles.confirmButton}
      />
    </>
  );

  const getStepContent = () => {
    switch (activeStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  const getStepTitle = () => {
    switch (activeStep) {
      case 1:
        return 'Book Property';
      case 2:
        return 'Select Guest';
      case 3:
        return 'Your Info';
      case 4:
        return 'Payment Methods';
      default:
        return 'Book Property';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => activeStep > 1 ? setActiveStep(activeStep - 1) : router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{getStepTitle()}</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Progress Steps */}
        <View style={styles.progressSteps}>
          {[1, 2, 3, 4].map((step) => (
            <View key={step} style={styles.stepContainer}>
              <View
                style={[
                  styles.stepCircle,
                  activeStep >= step && styles.stepCircleActive,
                ]}
              >
                <Text
                  style={[
                    styles.stepNumber,
                    activeStep >= step && styles.stepNumberActive,
                  ]}
                >
                  {step}
                </Text>
              </View>
              {step < 4 && (
                <View
                  style={[
                    styles.stepLine,
                    activeStep > step && styles.stepLineActive,
                  ]}
                />
              )}
            </View>
          ))}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {getStepContent()}
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
  progressSteps: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.gray3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: Colors.primary,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  stepNumberActive: {
    color: Colors.white,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: Colors.gray3,
    marginHorizontal: 4,
  },
  stepLineActive: {
    backgroundColor: Colors.primary,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  propertyHeader: {
    marginBottom: 30,
  },
  propertyTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  discountBadge: {
    backgroundColor: Colors.danger,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
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
    backgroundColor: Colors.card,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  propertyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  propertyAddress: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  noteContainer: {
    marginBottom: 30,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  noteInput: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  continueButton: {
    marginTop: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
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
  moreOptionsText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 20,
    marginBottom: 12,
  },
  otherMethods: {
    flexDirection: 'row',
    gap: 12,
  },
  otherMethod: {
    flex: 1,
    backgroundColor: Colors.card,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  otherMethodText: {
    fontSize: 14,
    color: Colors.text,
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
  confirmButton: {
    marginTop: 20,
  },
});