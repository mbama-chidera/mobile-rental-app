// components/common/StatusBar.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

interface StatusBarProps {
  time?: string;
  backgroundColor?: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ 
  time = '9:41', 
  backgroundColor = Colors.background 
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  time: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
});

export default StatusBar;