import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectLocationScreen = ({ navigation }) => {
  const [zone, setZone] = useState('Banasree');
  const [area, setArea] = useState('');
  const [zoneDropdownOpen, setZoneDropdownOpen] = useState(false);
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      // Lưu thông tin vị trí vào AsyncStorage
      const locationData = {
        zone: zone,
        area: area || 'Not specified'
      };
      
      await AsyncStorage.setItem('userLocation', JSON.stringify(locationData));
      
      // Chuyển đến màn hình Login sau khi người dùng chọn vị trí
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error saving location:', error);
      // Vẫn chuyển hướng ngay cả khi có lỗi lưu
      navigation.navigate('Login');
    }
  };

  const selectZone = (selectedZone) => {
    setZone(selectedZone);
    setZoneDropdownOpen(false);
  };

  const selectArea = (selectedArea) => {
    setArea(selectedArea);
    setAreaDropdownOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>
        <View style={styles.mapIconContainer}>
          <Image 
            source={require('../../assets/Map.png')} 
            style={styles.mapIcon}
          />
        </View>

        <Text style={styles.title}>Select Your Location</Text>
        <Text style={styles.subtitle}>
          Switch on your location to stay in tune with what's happening in your area
        </Text>

        <View style={styles.formContainer}>
          <Text style={styles.fieldLabel}>Your Zone</Text>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => setZoneDropdownOpen(!zoneDropdownOpen)}
          >
            <Text>{zone}</Text>
            <Ionicons name={zoneDropdownOpen ? "chevron-up" : "chevron-down"} size={20} color="#333" />
          </TouchableOpacity>

          {zoneDropdownOpen && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => selectZone('Banasree')}>
                <Text>Banasree</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => selectZone('Gulshan')}>
                <Text>Gulshan</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => selectZone('Dhanmondi')}>
                <Text>Dhanmondi</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={[styles.fieldLabel, {marginTop: 20}]}>Your Area</Text>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => setAreaDropdownOpen(!areaDropdownOpen)}
          >
            <Text style={area ? styles.selectedText : styles.placeholderText}>
              {area || 'Types of your area'}
            </Text>
            <Ionicons name={areaDropdownOpen ? "chevron-up" : "chevron-down"} size={20} color="#333" />
          </TouchableOpacity>

          {areaDropdownOpen && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => selectArea('Block A')}>
                <Text>Block A</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => selectArea('Block B')}>
                <Text>Block B</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => selectArea('Block C')}>
                <Text>Block C</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.progressDots}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backButton: {
    padding: 5,
  },
  timeText: {
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  mapIconContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  mapIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  mapMarker: {
    backgroundColor: '#E8F0FE',
    borderRadius: 60,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  formContainer: {
    width: '100%',
    paddingTop: 10,
  },
  fieldLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '500',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  placeholderText: {
    color: '#999',
  },
  selectedText: {
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 40,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  progressDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DDD',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
    width: 24,
  },
});

export default SelectLocationScreen;