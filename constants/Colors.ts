// constants/Colors.ts
export const Colors = {
  // Primary Colors
  primary: '#007AFF',
  primaryLight: '#5AC8FA',
  primaryDark: '#0056CC',
  
  // Secondary Colors
  secondary: '#5856D6',
  secondaryLight: '#7876FF',
  secondaryDark: '#3A39A3',
  
  // Status Colors
  success: '#34C759',
  successLight: '#5CD983',
  successDark: '#28A745',
  
  danger: '#FF3B30',
  dangerLight: '#FF6961',
  dangerDark: '#D70015',
  
  warning: '#FF9500',
  warningLight: '#FFB340',
  warningDark: '#CC7700',
  
  info: '#5AC8FA',
  infoLight: '#7DD3FF',
  infoDark: '#1E90FF',
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  
  gray1: '#8E8E93',
  gray2: '#C7C7CC',
  gray3: '#E5E5EA',
  gray4: '#F2F2F7',
  gray5: '#FAFAFA',
  
  // UI Colors
  background: '#FFFFFF',
  card: '#F2F2F7',
  text: '#000000',
  textSecondary: '#8E8E93',
  border: '#E5E5EA',
  placeholder: '#C7C7CC',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Special Colors
  rating: '#FFD700',
  verified: '#34C759',
  discount: '#FF3B30',
  
  // Gradient Colors
  gradientStart: '#007AFF',
  gradientEnd: '#5856D6',
};

export type ColorType = typeof Colors;
export const useTheme = () => Colors;