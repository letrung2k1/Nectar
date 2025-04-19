import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  TextInput,
  SafeAreaView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MobileNumberScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const handleContinue = () => {
    // Xử lý số điện thoại và chuyển màn
    if (phoneNumber.length > 0) {
      navigation.navigate('OTPVerificationScreen');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Image 
          source={require('../../assets/back.png')} 
          style={styles.backIcon}
        />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Enter your mobile number</Text>
        
        <View style={styles.phoneInputContainer}>
          <View style={styles.flagContainer}>
            <Image 
              source={require('../../assets/Group 6798.png')} 
              style={styles.flagImage}
            />
            <Text style={styles.countryCode}>+880</Text>
          </View>
          <TextInput 
            style={styles.phoneInput}
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={10}
          />
        </View>

        <TouchableOpacity 
          style={[
            styles.continueButton, 
            phoneNumber.length > 0 ? styles.activeButton : styles.inactiveButton
          ]}
          onPress={handleContinue}
          disabled={phoneNumber.length === 0}
        >
          <Image 
            source={require('../../assets/Continue.png')} 
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.numberPad}>
        {[
          {number: '1', letters: ''}, 
          {number: '2', letters: 'ABC'}, 
          {number: '3', letters: 'DEF'},
          {number: '4', letters: 'GHI'}, 
          {number: '5', letters: 'JKL'}, 
          {number: '6', letters: 'MNO'},
          {number: '7', letters: 'PQRS'}, 
          {number: '8', letters: 'TUV'}, 
          {number: '9', letters: 'WXYZ'},
          {number: '*', letters: ''}, 
          {number: '0', letters: '+'}, 
          {number: '#', letters: ''}
        ].map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.numberButton}
            onPress={() => {
              if (item.number !== '*' && item.number !== '#') {
                setPhoneNumber(prev => prev + item.number);
              }
            }}
          >
            <Text style={styles.numberText}>{item.number}</Text>
            {item.letters ? <Text style={styles.letterText}>{item.letters}</Text> : null}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButton: {
    padding: 15,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 20,
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  flagImage: {
    width: 30,
    height: 20,
    marginRight: 5,
  },
  countryCode: {
    fontSize: 16,
  },
  phoneInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  continueButton: {
    alignSelf: 'flex-end',
    padding: 15,
    borderRadius: 30,
  },
  activeButton: {
    backgroundColor: '#46A758',
  },
  inactiveButton: {
    backgroundColor: '#E0E0E0',
  },
  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  numberPad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  numberButton: {
    width: '33.3%',
    alignItems: 'center',
    paddingVertical: 15,
  },
  numberText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  letterText: {
    fontSize: 10,
    color: 'gray',
  }
});

export default MobileNumberScreen;