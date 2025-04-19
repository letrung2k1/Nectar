import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SigninScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const handleContinueWithGoogle = () => {
    // Xử lý đăng nhập Google
    console.log('Đăng nhập Google');
    navigation.navigate('MobileNumber');
  };

  const handleContinueWithFacebook = () => {
    // Xử lý đăng nhập Facebook
    console.log('Đăng nhập Facebook');
    navigation.navigate('MobileNumber');

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../../assets/Mask Group.png')} 
          style={styles.backgroundImage}
          resizeMode="cover"
        />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Get your groceries with Nectar</Text>
        
        <View style={styles.phoneInputContainer}>
          <View style={styles.flagContainer}>
            <Image 
              source={require('../../assets/Group 6798.png')} 
              style={styles.flagImage}
            />
            <Text>+84</Text>
          </View>
          <TextInput 
            style={styles.phoneInput}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity 
          style={styles.googleButton}
          onPress={handleContinueWithGoogle}
        >
          <Image 
            source={require('../../assets/google.png')} 
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.facebookButton}
          onPress={handleContinueWithFacebook}
        >
          <Image 
            source={require('../../assets/facebook.png')} 
            style={styles.socialIcon}
          />
          <Text style={styles.socialButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: '100%',
    height: '50%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  phoneInput: {
    flex: 1,
    height: 40,
  },
  googleButton: {
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  facebookButton: {
    backgroundColor: '#4267B2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default SigninScreen;