import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  SafeAreaView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AccountScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    // Xử lý đăng xuất và quay về màn hình đăng nhập
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={require('../../assets/carot.jpg')} 
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.profileName}>Trung Le Viet</Text>
        <Text style={styles.profileDescription}>
          I am student in Electric Power University
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.signOutButton}
        onPress={handleSignOut}
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileHeader: {
    backgroundColor: '#46A758', // Matching app's theme color
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'white',
    overflow: 'hidden',
    marginBottom: 15,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileDescription: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  signOutButton: {
    backgroundColor: '#FF4444', // Bright red for sign out
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  signOutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default AccountScreen;