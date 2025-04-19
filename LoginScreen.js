import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Kiểm tra xem người dùng đã đăng nhập chưa khi màn hình được tải
  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        // Nếu đã đăng nhập, chuyển thẳng đến Home
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };

  const handleLogin = async () => {
    // Kiểm tra định dạng email
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập email và mật khẩu');
      return;
    }

    try {
      // Lấy dữ liệu người dùng từ AsyncStorage
      const usersData = await AsyncStorage.getItem('users');
      let users = usersData ? JSON.parse(usersData) : [];
      
      // Tìm người dùng với email đã nhập
      const user = users.find(user => user.email === email);
      
      if (user && user.password === password) {
        // Đăng nhập thành công, lưu token và chuyển đến Home
        await AsyncStorage.setItem('userToken', 'logged-in');
        await AsyncStorage.setItem('currentUser', JSON.stringify(user));
        navigation.navigate('Home');
      } else {
        // Đăng nhập thất bại
        Alert.alert('Lỗi', 'Email hoặc mật khẩu không đúng');
      }
    } catch (error) {
      console.log('Login error:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi đăng nhập');
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/carot.jpg')} 
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>Loging</Text>
        <Text style={styles.subtitle}>Enter your emails and password</Text>

        <View style={styles.formContainer}>
          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="example@email.com"
          />

          <Text style={[styles.fieldLabel, {marginTop: 15}]}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Your password"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#999" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPasswordLink}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.signupPrompt}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={navigateToSignUp}>
              <Text style={styles.singupLink}>Singup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.progressDots}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.activeDot]} />
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
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginTop: 15,
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#666',
  },
  loginButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signupPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#666',
  },
  singupLink: {
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

export default LoginScreen;