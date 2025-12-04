// utils/helpers.ts
import { Platform } from 'react-native';

// Format currency
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date
export const formatDate = (date: Date | string, format: string = 'MMM DD, YYYY'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  return dateObj.toLocaleDateString('en-US', options);
};

// Calculate total nights
export const calculateNights = (checkIn: Date, checkOut: Date): number => {
  const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Calculate total price
export const calculateTotalPrice = (
  pricePerNight: number,
  nights: number,
  discount: number = 0,
  taxRate: number = 0.1,
  serviceFee: number = 50
): {
  subtotal: number;
  discountAmount: number;
  tax: number;
  serviceFee: number;
  total: number;
} => {
  const subtotal = pricePerNight * nights;
  const discountAmount = (subtotal * discount) / 100;
  const discountedSubtotal = subtotal - discountAmount;
  const tax = discountedSubtotal * taxRate;
  const total = discountedSubtotal + tax + serviceFee;
  
  return {
    subtotal,
    discountAmount,
    tax,
    serviceFee,
    total,
  };
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Generate random ID
export const generateId = (): string => {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Check if iOS
export const isIOS = Platform.OS === 'ios';

// Check if Android
export const isAndroid = Platform.OS === 'android';