// constants/AppConstants.ts
export const APP_NAME = 'RentalApp';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.rentalapp.com/v1',
  TIMEOUT: 30000,
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Storage Keys
export const STORAGE_KEYS = {
  USER_TOKEN: '@RentalApp:userToken',
  USER_DATA: '@RentalApp:userData',
  BOOKING_DATA: '@RentalApp:bookingData',
  FAVORITES: '@RentalApp:favorites',
  SETTINGS: '@RentalApp:settings',
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY_DATE: 'MMM DD, YYYY',
  DISPLAY_DATE_TIME: 'MMM DD, YYYY • hh:mm A',
  API_DATE: 'YYYY-MM-DD',
  API_DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
};

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,
};

// App Routes
export const ROUTES = {
  AUTH: {
    SIGN_UP: '/(auth)/sign-up',
    SIGN_IN: '/(auth)/sign-in',
    VERIFY_CODE: '/(auth)/verify-code',
  },
  MAIN: {
    HOME: '/(tabs)',
    EXPLORE: '/(tabs)/explore',
    WISHLIST: '/(tabs)/wishlist',
    CHAT: '/(tabs)/chat',
    PROFILE: '/(tabs)/profile',
  },
  PROPERTY: {
    DETAIL: '/property/[id]',
    WRITE_REVIEW: '/property/write-review',
  },
  BOOKING: {
    INDEX: '/booking',
    PAYMENT: '/booking/payment',
    SUCCESS: '/booking/success',
  },
  HOST: {
    BECOME_HOST: '/host/become-host',
    ADD_PROPERTY: '/host/add-property',
    LISTING_SUCCESS: '/host/listing-success',
  },
  PROFILE: {
    MY_LISTINGS: '/profile/my-listings',
    EDIT_PROFILE: '/profile/edit-profile',
    PAYMENT_METHODS: '/profile/payment-methods',
  },
};