// app/host/listing-success.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import StatusBar from '../../components/common/StatusBar';
import Button from '../../components/common/Button';
import { Colors } from '../../constants/Colors';

export default function ListingSuccessScreen() {
  const nextSteps = [
    'We will start reviewing the details that you have provided for us',
    'You\'ll receive an email or a notification when your property is officially live',
    'You can change your property name, descriptions, price anytime through the listings page',
    'Need support? Visit our help center page',
  ];

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
          We have received your property details
        </Text>

        {/* Next Steps */}
        <View style={styles.nextSteps}>
          <Text style={styles.nextStepsTitle}>What&apos;s Next:</Text>
          
          {nextSteps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <Text style={styles.stepNumber}>{index + 1}.</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Estimated Time */}
        <View style={styles.timeEstimate}>
          <Ionicons name="time" size={24} color={Colors.primary} />
          <Text style={styles.timeText}>
            Estimated review time: <Text style={styles.timeBold}>2-3 business days</Text>
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            title="Return Home"
            onPress={() => router.replace('/(tabs)')}
            variant="outline"
            style={styles.actionButton}
          />
          <Button
            title="View My Listings"
            onPress={() => router.push('/profile/my-listings')}
            style={styles.actionButton}
          />
        </View>

        {/* Additional Info */}
        <View style={styles.additionalInfo}>
          <TouchableOpacity style={styles.infoLink}>
            <Ionicons name="help-circle" size={20} color={Colors.primary} />
            <Text style={styles.infoLinkText}>Host FAQ & Support</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.infoLink}>
            <Ionicons name="book" size={20} color={Colors.primary} />
            <Text style={styles.infoLinkText}>Hosting Guidelines</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.infoLink}>
            <Ionicons name="cash" size={20} color={Colors.primary} />
            <Text style={styles.infoLinkText}>Payout Information</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 40,
  },
  nextSteps: {
    width: '100%',
    marginBottom: 30,
  },
  nextStepsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
    marginRight: 8,
    minWidth: 20,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  timeEstimate: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary + '10',
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
  },
  timeText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    marginLeft: 12,
  },
  timeBold: {
    fontWeight: '600',
    color: Colors.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 40,
  },
  actionButton: {
    flex: 1,
  },
  additionalInfo: {
    width: '100%',
  },
  infoLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  infoLinkText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
});