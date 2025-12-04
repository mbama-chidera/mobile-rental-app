// app/host/add-property.tsx
import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import StatusBar from '../../components/common/StatusBar';
import Button from '../../components/common/Button';
import { Colors } from '../../constants/Colors';

export default function AddPropertyScreen() {
  const [formData, setFormData] = useState({
    propertyName: 'Tung Homes',
    address: 'Southwest Legacy AB',
    city: 'Calgary',
    country: 'Canada',
    bathrooms: '',
    bedrooms: '',
    amenities: '',
    description: '',
    price: '',
  });

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant camera roll permissions to upload photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

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
    if (images.length === 0) {
      Alert.alert('Error', 'Please upload at least one photo');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      router.push('/host/listing-success');
    } catch (error) {
      Alert.alert('Submission Failed', 'Please try again');
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
        <Text style={styles.headerTitle}>Add Property</Text>
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

        {/* Photo Upload Section */}
        <View style={styles.photoSection}>
          <Text style={styles.photoTitle}>Photos of the property</Text>
          <Text style={styles.photoSubtitle}>
            Upload all the photos about property that you need.
          </Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
            <TouchableOpacity style={styles.photoUploadButton} onPress={pickImage}>
              <Ionicons name="camera" size={32} color={Colors.textSecondary} />
              <Text style={styles.uploadText}>Add Photo</Text>
            </TouchableOpacity>
            
            {images.map((uri, index) => (
              <View key={index} style={styles.photoPreview}>
                <Image source={{ uri }} style={styles.photoImage} />
                <TouchableOpacity
                  style={styles.removePhotoButton}
                  onPress={() => {
                    const newImages = [...images];
                    newImages.splice(index, 1);
                    setImages(newImages);
                  }}
                >
                  <Ionicons name="close-circle" size={24} color={Colors.danger} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          
          <Text style={styles.photoHint}>
            Upload at least 5 photos. Include living room, bedroom, bathroom, kitchen, and exterior.
          </Text>
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

        {/* Terms */}
        <View style={styles.termsContainer}>
          <Ionicons name="information-circle" size={20} color={Colors.textSecondary} />
          <Text style={styles.termsText}>
            By listing your property, you agree to our Terms of Service and Host Agreement.
          </Text>
        </View>

        {/* Submit Button */}
        <Button
          title={loading ? 'Submitting...' : 'Continue'}
          onPress={handleSubmit}
          disabled={loading}
          style={styles.submitButton}
        />

        {/* Preview */}
        <TouchableOpacity style={styles.previewButton}>
          <Text style={styles.previewText}>Preview Listing</Text>
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
  photoSection: {
    marginBottom: 30,
  },
  photoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  photoSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  photoScroll: {
    marginBottom: 12,
  },
  photoUploadButton: {
    width: 120,
    height: 120,
    backgroundColor: Colors.gray4,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: Colors.gray3,
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  photoPreview: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 12,
    position: 'relative',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removePhotoButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.white,
    borderRadius: 12,
  },
  photoHint: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.gray4,
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 8,
    lineHeight: 16,
  },
  submitButton: {
    marginBottom: 16,
  },
  previewButton: {
    alignItems: 'center',
    padding: 12,
  },
  previewText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
});