// components/booking/GuestSelector.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

interface GuestType {
  label: string;
  subLabel: string;
  value: number;
  min: number;
  max: number;
  key: 'adults' | 'children' | 'infants';
}

interface GuestSelectorProps {
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
  onChange: (guests: { adults: number; children: number; infants: number }) => void;
}

const GuestSelector: React.FC<GuestSelectorProps> = ({ guests, onChange }) => {
  const guestTypes: GuestType[] = [
    {
      label: 'Adults',
      subLabel: 'Ages 18 or Above',
      value: guests.adults,
      min: 1,
      max: 10,
      key: 'adults',
    },
    {
      label: 'Children',
      subLabel: 'Ages 2-17',
      value: guests.children,
      min: 0,
      max: 10,
      key: 'children',
    },
    {
      label: 'Infants',
      subLabel: 'Under Ages 2',
      value: guests.infants,
      min: 0,
      max: 5,
      key: 'infants',
    },
  ];

  const updateGuestCount = (type: GuestType['key'], increment: boolean) => {
    const newValue = increment ? guests[type] + 1 : guests[type] - 1;
    
    if (
      newValue >= guestTypes.find(g => g.key === type)!.min &&
      newValue <= guestTypes.find(g => g.key === type)!.max
    ) {
      onChange({
        ...guests,
        [type]: newValue,
      });
    }
  };

  return (
    <View style={styles.container}>
      {guestTypes.map((guestType) => (
        <View key={guestType.key} style={styles.guestRow}>
          <View style={styles.guestInfo}>
            <Text style={styles.guestLabel}>{guestType.label}</Text>
            <Text style={styles.guestSubLabel}>{guestType.subLabel}</Text>
          </View>
          
          <View style={styles.counter}>
            <TouchableOpacity
              style={[
                styles.counterButton,
                guestType.value <= guestType.min && styles.counterButtonDisabled,
              ]}
              onPress={() => updateGuestCount(guestType.key, false)}
              disabled={guestType.value <= guestType.min}
            >
              <Ionicons
                name="remove"
                size={20}
                color={
                  guestType.value <= guestType.min
                    ? Colors.gray3
                    : Colors.text
                }
              />
            </TouchableOpacity>
            
            <Text style={styles.counterValue}>{guestType.value}</Text>
            
            <TouchableOpacity
              style={[
                styles.counterButton,
                guestType.value >= guestType.max && styles.counterButtonDisabled,
              ]}
              onPress={() => updateGuestCount(guestType.key, true)}
              disabled={guestType.value >= guestType.max}
            >
              <Ionicons
                name="add"
                size={20}
                color={
                  guestType.value >= guestType.max
                    ? Colors.gray3
                    : Colors.text
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
  },
  guestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  guestInfo: {
    flex: 1,
  },
  guestLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  guestSubLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  counterButtonDisabled: {
    opacity: 0.5,
  },
  counterValue: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginHorizontal: 20,
    minWidth: 20,
    textAlign: 'center',
  },
});

export default GuestSelector;