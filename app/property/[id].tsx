// app/host/edit-property/[id].tsx
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import StatusBar from '../../components/common/StatusBar';
import Button from '../../components/common/Button';
import { Colors } from '../../constants/Colors';

export default function EditPropertyScreen() {
  const { id } = useLocalSearchParams();
  const [formData, setFormData] = useState({
    propertyName: '',
    address: '',
    city: '',
    country: '',
    bathrooms: '',
    bedrooms: '',
    amenities: '',
    description: '',
    price: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load property data based on ID
    const mockProperty = {
      propertyName: 'Tung Homes',
      address: 'Southwest Legacy AB',
      city: 'Calgary',
      country: 'Canada',
      bathrooms: '3',
      bedrooms: '3',
      amenities: 'WiFi, Parking, Pool, Kitchen',
      description: 'Beautiful home in Calgary with all amenities',
      price: '650',
    };
    
    setFormData(mockProperty);
  }, [id]);

  const handleSubmit = async () => {
    if (!formData.propertyName.trim()) {
      Alert.alert('Error', 'Please enter property name');
      return;
    }
    if (!formData.address.trim()) {
      Alert.alert('Error', 'Please enter address');
      return;
    }
    if (!formData.city.trim()) {
      Alert.alert('Error', 'Please enter city');
      return;
    }
    if (!formData.price.trim()) {
      Alert.alert('Error', 'Please enter price');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      Alert.alert('Success', 'Property updated successfully');
      router.back();
    } catch (error) {
      Alert.alert('Update Failed', 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Property</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Property Details</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Property Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter property name"
            placeholderTextColor={Colors.placeholder}
            value={formData.propertyName}
            onChangeText={(text) => setFormData({ ...formData, propertyName: text })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter full address"
            placeholderTextColor={Colors.placeholder}
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="City"
              placeholderTextColor={Colors.placeholder}
              value={formData.city}
              onChangeText={(text) => setFormData({ ...formData, city: text })}
            />
          </View>
          
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Country</Text>
            <TextInput
              style={styles.input}
              placeholder="Country"
              placeholderTextColor={Colors.placeholder}
              value={formData.country}
              onChangeText={(text) => setFormData({ ...formData, country: text })}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
            <Text style={styles.label}>Bathrooms</Text>
            <TextInput
              style={styles.input}
              placeholder="Number"
              placeholderTextColor={Colors.placeholder}
              keyboardType="number-pad"
              value={formData.bathrooms}
              onChangeText={(text) => setFormData({ ...formData, bathrooms: text })}
            />
          </View>
          
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>Bedrooms</Text>
            <TextInput
              style={styles.input}
              placeholder="Number"
              placeholderTextColor={Colors.placeholder}
              keyboardType="number-pad"
              value={formData.bedrooms}
              onChangeText={(text) => setFormData({ ...formData, bedrooms: text })}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amenities</Text>
          <TextInput
            style={[styles.input, { minHeight: 80 }]}
            placeholder="List amenities (comma separated)"
            placeholderTextColor={Colors.placeholder}
            value={formData.amenities}
            onChangeText={(text) => setFormData({ ...formData, amenities: text })}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, { minHeight: 120 }]}
            placeholder="Describe your property in detail"
            placeholderTextColor={Colors.placeholder}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Price per Night ($)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter price"
            placeholderTextColor={Colors.placeholder}
            keyboardType="decimal-pad"
            value={formData.price}
            onChangeText={(text) => setFormData({ ...formData, price: text })}
          />
        </View>

        {/* Submit Button */}
        <Button
          title={loading ? 'Updating...' : 'Update Property'}
          onPress={handleSubmit}
          disabled={loading}
          style={styles.submitButton}
        />

        {/* Delete Button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            Alert.alert(
              'Delete Property',
              'Are you sure you want to delete this property?',
              [
                { text: 'Cancel', style: 'cancel' },
                { 
                  text: 'Delete', 
                  style: 'destructive',
                  onPress: () => {
                    router.back();
                  }
                }
              ]
            );
          }}
        >
          <Ionicons name="trash" size={20} color={Colors.danger} />
          <Text style={styles.deleteButtonText}>Delete Property</Text>
        </TouchableOpacity>
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
  form: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.text,
  },
  row: {
    flexDirection: 'row',
  },
  submitButton: {
    marginBottom: 16,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.danger + '20',
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  deleteButtonText: {
    color: Colors.danger,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});