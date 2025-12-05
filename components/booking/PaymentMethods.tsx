import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../../constants/Colors';

export type PaymentMethodType = 'card' | 'paypal' | 'apple' | 'google';

interface PaymentMethod {
  id: PaymentMethodType;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
}

interface PaymentMethodsProps {
  selectedMethod: PaymentMethodType;
  onSelectMethod: (method: PaymentMethodType) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  selectedMethod,
  onSelectMethod,
}) => {
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Credit or Debit Card',
      icon: 'card-outline',
      description: 'Visa, Mastercard, Amex',
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'logo-paypal',
      description: 'Pay with your PayPal account',
    },
    {
      id: 'apple',
      name: 'Apple Pay',
      icon: 'logo-apple',
      description: 'Pay with Apple Pay',
    },
    {
      id: 'google',
      name: 'Google Pay',
      icon: 'logo-google',
      description: 'Pay with Google Pay',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Method</Text>

      <View style={styles.methodsList}>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodCard,
              selectedMethod === method.id && styles.methodCardSelected,
            ]}
            onPress={() => onSelectMethod(method.id)}
            activeOpacity={0.7}
          >
            <View style={styles.methodIcon}>
              <Ionicons
                name={method.icon}
                size={24}
                color={
                  selectedMethod === method.id
                    ? Colors.primary
                    : Colors.text
                }
              />
            </View>

            <View style={styles.methodInfo}>
              <Text
                style={[
                  styles.methodName,
                  selectedMethod === method.id && styles.methodNameSelected,
                ]}
              >
                {method.name}
              </Text>
              <Text style={styles.methodDescription}>
                {method.description}
              </Text>
            </View>

            <View style={styles.radioButton}>
              {selectedMethod === method.id ? (
                <View style={styles.radioButtonSelected}>
                  <View style={styles.radioButtonInner} />
                </View>
              ) : (
                <View style={styles.radioButtonUnselected} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {selectedMethod === 'card' && (
        <View style={styles.cardForm}>
          <Text style={styles.formLabel}>Card details will be entered on next step</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  methodsList: {
    gap: 12,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  methodCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.card,
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  methodNameSelected: {
    color: Colors.primary,
  },
  methodDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  radioButton: {
    marginLeft: 12,
  },
  radioButtonUnselected: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  radioButtonSelected: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  cardForm: {
    marginTop: 16,
    padding: 16,
    backgroundColor: Colors.card,
    borderRadius: 12,
  },
  formLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default PaymentMethods;