// app/host/become-host.tsx
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import StatusBar from '../../components/common/StatusBar';
import Button from '../../components/common/Button';
import { Colors } from '../../constants/Colors';

export default function BecomeHostScreen() {
  const benefits = [
    {
      title: 'Quick verification progress',
      description: 'Just enter your property details and rental price and our team will check the information that you have entered in a few days.',
      icon: 'checkmark-circle',
    },
    {
      title: 'Safety list your property',
      description: 'We have a dedicated channel for you to contact the renters as well as the important information of the guest to help you discuss with them.',
      icon: 'shield-checkmark',
    },
    {
      title: 'Simple posting progress',
      description: 'Just simply enter the property address, details and condition of the property. Set a price and everyone will see your property.',
      icon: 'home',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Become a host</Text>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>
          List your property and earn a passive income while you are away
        </Text>
        <View style={styles.heroImage} />
      </View>

      {/* Benefits */}
      <View style={styles.benefitsSection}>
        {benefits.map((benefit, index) => (
          <View key={index} style={styles.benefitCard}>
            <View style={styles.benefitIcon}>
              <Ionicons name={benefit.icon as any} size={32} color={Colors.primary} />
            </View>
            <View style={styles.benefitContent}>
              <Text style={styles.benefitTitle}>{benefit.title}</Text>
              <Text style={styles.benefitDescription}>{benefit.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Stats */}
      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>10,000+</Text>
          <Text style={styles.statLabel}>Active Hosts</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>$5M+</Text>
          <Text style={styles.statLabel}>Paid to Hosts</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Average Rating</Text>
        </View>
      </View>

      {/* Requirements */}
      <View style={styles.requirementsSection}>
        <Text style={styles.sectionTitle}>What you need to get started</Text>
        
        <View style={styles.requirementItem}>
          <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
          <Text style={styles.requirementText}>Valid government ID</Text>
        </View>
        
        <View style={styles.requirementItem}>
          <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
          <Text style={styles.requirementText}>Property ownership proof</Text>
        </View>
        
        <View style={styles.requirementItem}>
          <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
          <Text style={styles.requirementText}>Property photos</Text>
        </View>
        
        <View style={styles.requirementItem}>
          <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
          <Text style={styles.requirementText}>Bank account for payouts</Text>
        </View>
      </View>

      {/* CTA Button */}
      <View style={styles.ctaSection}>
        <Button
          title="List your property now!"
          onPress={() => router.push('/host/add-property')}
          style={styles.ctaButton}
        />
      </View>

      {/* Footer Note */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By proceeding, you agree to our Terms of Service and confirm that you will follow our Community Guidelines.
        </Text>
      </View>
    </ScrollView>
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
  heroSection: {
    padding: 20,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 32,
  },
  heroImage: {
    width: '100%',
    height: 200,
    backgroundColor: Colors.gray4,
    borderRadius: 12,
  },
  benefitsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  benefitCard: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  benefitIcon: {
    marginRight: 16,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  benefitDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  requirementsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  requirementText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  ctaSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  ctaButton: {
    paddingVertical: 18,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});