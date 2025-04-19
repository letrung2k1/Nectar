import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  TextInput,
  SafeAreaView,
  ImageBackground,
  Keyboard 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NumberPad from '../components/NumberPad';

const OTPVerificationScreen = () => {
  const [otpCode, setOtpCode] = useState('');
  const [isNumberPadVisible, setIsNumberPadVisible] = useState(false);
  const navigation = useNavigation();

  const handleNumberPress = (number) => {
    if (otpCode.length < 4) {
      setOtpCode(prev => prev + number);
    }
  };

  const handleDeletePress = () => {
    setOtpCode(prev => prev.slice(0, -1));
  };

  const handleInputFocus = () => {
    setIsNumberPadVisible(true);
    Keyboard.dismiss();
  };

  const handleContinue = () => {
    if (otpCode.length === 4) {
      navigation.navigate('Home');
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/Mask Group.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
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
          <Text style={styles.title}>Enter your 4-digit code</Text>
          
          <View style={styles.otpContainer}>
            {[0, 1, 2, 3].map((index) => (
              <View 
                key={index} 
                style={[
                  styles.otpBox, 
                  otpCode.length > index ? styles.filledOtpBox : {}
                ]}
              >
                <Text style={styles.otpText}>
                  {otpCode.length > index ? otpCode[index] : ''}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.resendCodeContainer}>
            <Text style={styles.resendCodeText}>Resend Code</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.continueButton, 
              otpCode.length === 4 ? styles.activeButton : styles.inactiveButton
            ]}
            onPress={handleContinue}
            disabled={otpCode.length !== 4}
          >
            <Image 
              source={require('../../assets/Continue.png')} 
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>

        {isNumberPadVisible && (
          <NumberPad 
            onNumberPress={handleNumberPress}
            onDeletePress={handleDeletePress}
          />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
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
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  filledOtpBox: {
    backgroundColor: '#46A758',
    borderColor: '#46A758',
  },
  otpText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  resendCodeContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  resendCodeText: {
    color: '#46A758',
    fontWeight: 'bold',
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
});

export default OTPVerificationScreen;