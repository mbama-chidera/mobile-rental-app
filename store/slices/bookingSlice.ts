// store/slices/bookingSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyAddress: string;
  userId: string;
  userName: string;
  userEmail: string;
  checkInDate: string;
  checkOutDate: string;
  totalNights: number;
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
  totalAmount: number;
  taxAmount: number;
  finalAmount: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  bookingStatus: 'confirmed' | 'cancelled' | 'completed' | 'pending';
  createdAt: string;
  updatedAt: string;
}

interface BookingState {
  bookings: Booking[];
  currentBooking: Booking | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
  isLoading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    fetchBookingsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchBookingsSuccess: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchBookingsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createBookingStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    createBookingSuccess: (state, action: PayloadAction<Booking>) => {
      state.bookings.unshift(action.payload);
      state.currentBooking = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    createBookingFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setCurrentBooking: (state, action: PayloadAction<Booking>) => {
      state.currentBooking = action.payload;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    updateBookingStatus: (
      state,
      action: PayloadAction<{ bookingId: string; status: Booking['bookingStatus'] }>
    ) => {
      const booking = state.bookings.find(b => b.id === action.payload.bookingId);
      if (booking) {
        booking.bookingStatus = action.payload.status;
      }
      if (state.currentBooking && state.currentBooking.id === action.payload.bookingId) {
        state.currentBooking.bookingStatus = action.payload.status;
      }
    },
    cancelBooking: (state, action: PayloadAction<string>) => {
      const booking = state.bookings.find(b => b.id === action.payload);
      if (booking) {
        booking.bookingStatus = 'cancelled';
      }
      if (state.currentBooking && state.currentBooking.id === action.payload) {
        state.currentBooking.bookingStatus = 'cancelled';
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchBookingsStart,
  fetchBookingsSuccess,
  fetchBookingsFailure,
  createBookingStart,
  createBookingSuccess,
  createBookingFailure,
  setCurrentBooking,
  clearCurrentBooking,
  updateBookingStatus,
  cancelBooking,
  setLoading,
  clearError,
} = bookingSlice.actions;

export default bookingSlice.reducer;