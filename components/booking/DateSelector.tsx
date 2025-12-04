// components/booking/DateSelector.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Colors } from '../../constants/Colors';

interface DateOption {
  day: string;
  date: string;
  value: string;
}

interface DateSelectorProps {
  title: string;
  dates: DateOption[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  title,
  dates,
  selectedDate,
  onSelectDate,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {dates.map((date) => (
          <TouchableOpacity
            key={date.value}
            style={[
              styles.dateOption,
              selectedDate === date.value && styles.dateOptionSelected,
            ]}
            onPress={() => onSelectDate(date.value)}
          >
            <Text
              style={[
                styles.dateDay,
                selectedDate === date.value && styles.dateDaySelected,
              ]}
            >
              {date.day}
            </Text>
            <Text
              style={[
                styles.dateDate,
                selectedDate === date.value && styles.dateDateSelected,
              ]}
            >
              {date.date}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  scrollContent: {
    paddingRight: 20,
  },
  dateOption: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.card,
    borderRadius: 8,
    marginRight: 8,
    minWidth: 70,
  },
  dateOptionSelected: {
    backgroundColor: Colors.primary,
  },
  dateDay: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  dateDaySelected: {
    color: Colors.white,
  },
  dateDate: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  dateDateSelected: {
    color: Colors.white,
  },
});

export default DateSelector;