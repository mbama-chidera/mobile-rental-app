// store/slices/propertySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  location?: string;
  description: string;
  pricePerNight: number;
  bathrooms: number;
  bedrooms: number;
  area: number;
  amenities: string[];
  photos: string[];
  hostId: string;
  hostName: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  discount: number;
  createdAt: string;
  updatedAt: string;
  maxGuests: number;
  checkInTime: string;
  checkOutTime: string;
  isAvailable: boolean;
}

export interface PropertyCardData {
  id: string;
  name: string;
  location: string;
  address: string;
  price: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  city: string;
  country: string;
}

interface PropertyState {
  properties: Property[];
  featuredProperties: Property[];
  propertyCards: PropertyCardData[];
  userProperties: Property[];
  currentProperty: Property | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
  featuredProperties: [],
  propertyCards: [],
  userProperties: [],
  currentProperty: null,
  isLoading: false,
  error: null,
};

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    // Fetch properties
    fetchPropertiesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    
    fetchPropertiesSuccess: (state, action: PayloadAction<Property[]>) => {
      state.properties = action.payload;
      
      // Create featured properties
      state.featuredProperties = action.payload
        .filter(p => p.discount > 0 || p.rating >= 4.5)
        .slice(0, 5);
      
      // Create property cards for display
      state.propertyCards = action.payload.map(property => ({
        id: property.id,
        name: property.name,
        location: property.location || `${property.city}, ${property.country}`,
        address: property.address,
        price: property.pricePerNight,
        discount: property.discount,
        rating: property.rating,
        reviewCount: property.reviewCount,
        city: property.city,
        country: property.country
      }));
      
      state.isLoading = false;
      state.error = null;
    },
    
    fetchPropertiesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Single property operations
    setCurrentProperty: (state, action: PayloadAction<Property>) => {
      state.currentProperty = action.payload;
    },
    
    clearCurrentProperty: (state) => {
      state.currentProperty = null;
    },

    // Add/Edit/Delete properties
    addProperty: (state, action: PayloadAction<Property>) => {
      state.properties.push(action.payload);
      state.userProperties.push(action.payload);
      
      // Add to property cards
      const propertyCard: PropertyCardData = {
        id: action.payload.id,
        name: action.payload.name,
        location: action.payload.location || `${action.payload.city}, ${action.payload.country}`,
        address: action.payload.address,
        price: action.payload.pricePerNight,
        discount: action.payload.discount,
        rating: action.payload.rating,
        reviewCount: action.payload.reviewCount,
        city: action.payload.city,
        country: action.payload.country
      };
      state.propertyCards.push(propertyCard);
      
      // Add to featured if eligible
      if (action.payload.discount > 0 || action.payload.rating >= 4.5) {
        state.featuredProperties.unshift(action.payload);
        if (state.featuredProperties.length > 5) {
          state.featuredProperties.pop();
        }
      }
    },
    
    updateProperty: (state, action: PayloadAction<Property>) => {
      const index = state.properties.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.properties[index] = action.payload;
      }
      
      const userIndex = state.userProperties.findIndex(p => p.id === action.payload.id);
      if (userIndex !== -1) {
        state.userProperties[userIndex] = action.payload;
      }
      
      const featuredIndex = state.featuredProperties.findIndex(p => p.id === action.payload.id);
      if (featuredIndex !== -1) {
        state.featuredProperties[featuredIndex] = action.payload;
      }
      
      // Update property cards
      const cardIndex = state.propertyCards.findIndex(p => p.id === action.payload.id);
      if (cardIndex !== -1) {
        state.propertyCards[cardIndex] = {
          id: action.payload.id,
          name: action.payload.name,
          location: action.payload.location || `${action.payload.city}, ${action.payload.country}`,
          address: action.payload.address,
          price: action.payload.pricePerNight,
          discount: action.payload.discount,
          rating: action.payload.rating,
          reviewCount: action.payload.reviewCount,
          city: action.payload.city,
          country: action.payload.country
        };
      }
    },
    
    deleteProperty: (state, action: PayloadAction<string>) => {
      state.properties = state.properties.filter(p => p.id !== action.payload);
      state.userProperties = state.userProperties.filter(p => p.id !== action.payload);
      state.featuredProperties = state.featuredProperties.filter(p => p.id !== action.payload);
      state.propertyCards = state.propertyCards.filter(p => p.id !== action.payload);
    },

    // Utility
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Export all actions
export const {
  fetchPropertiesStart,
  fetchPropertiesSuccess,
  fetchPropertiesFailure,
  setCurrentProperty,
  clearCurrentProperty,
  addProperty,
  updateProperty,
  deleteProperty,
  setLoading,
  clearError,
} = propertySlice.actions;

export default propertySlice.reducer;