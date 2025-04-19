import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  // Xác thực định dạng email
  const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setEmailValid(false);
      setEmail(text);
      return false;
    } else {
      setEmailValid(true);
      setEmail(text);
      return true;
    }
  };

  const handleSignUp = async () => {
    // Kiểm tra dữ liệu nhập vào
    if (!username || !email || !password) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (!emailValid) {
      Alert.alert('Lỗi', 'Email không hợp lệ');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    try {
      // Kiểm tra xem email đã tồn tại chưa
      const usersData = await AsyncStorage.getItem('users');
      let users = usersData ? JSON.parse(usersData) : [];
      
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        Alert.alert('Lỗi', 'Email này đã được đăng ký');
        return;
      }
      
      // Thêm người dùng mới vào danh sách
      const newUser = {
        id: Date.now().toString(),
        username,
        email,
        password,
        location: await AsyncStorage.getItem('userLocation') || null,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      
      // Lưu danh sách người dùng mới vào AsyncStorage
      await AsyncStorage.setItem('users', JSON.stringify(users));
      
      // Đăng nhập luôn bằng cách lưu token và thông tin người dùng hiện tại
      await AsyncStorage.setItem('userToken', 'logged-in');
      await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
      
      Alert.alert('Thành công', 'Đăng ký tài khoản thành công', [
        { text: 'OK', onPress: () => navigation.navigate('Home') }
      ]);
    } catch (error) {
      console.log('Sign up error:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra trong quá trình đăng ký');
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.timeText}>9:41</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="cellular" size={16} color="black" />
          <Ionicons name="wifi" size={16} color="black" />
          <Ionicons name="battery-full" size={16} color="black" />
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/carot.jpg')} 
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Enter your credentials to continue</Text>

        <View style={styles.formContainer}>
          <Text style={styles.fieldLabel}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your name"
          />

          <Text style={[styles.fieldLabel, {marginTop: 15}]}>Email</Text>
          <View style={styles.validatedInputContainer}>
            <TextInput
              style={styles.validatedInput}
              value={email}
              onChangeText={(text) => validateEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="example@email.com"
            />
            {emailValid && email !== '' && (
              <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
            )}
          </View>

          <Text style={[styles.fieldLabel, {marginTop: 15}]}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Create password (min. 6 characters)"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#999" />
            </TouchableOpacity>
          </View>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sing Up</Text>
          </TouchableOpacity>

          <View style={styles.loginPrompt}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.loginLink}>Singup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.progressDots}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
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
  timeText: {
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    width: 70,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  carrotLogo: {
    backgroundColor: '#FFF3E0',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
  },
  fieldLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  validatedInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  validatedInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  termsContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
  termsText: {
    color: '#666',
    fontSize: 14,
  },
  termsLink: {
    color: '#4CAF50',
    fontWeight: '500',
  },
  signUpButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#666',
  },
  loginLink: {
    color: '#4CAF50',
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

export default SignupScreen;