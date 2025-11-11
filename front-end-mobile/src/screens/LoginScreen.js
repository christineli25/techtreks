import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, borderRadius } from '../constants/colors';

const LoginScreen = ({ navigation }) => {
  const [mode, setMode] = useState('login'); // 'login', 'signup'
  const [profilePicture, setProfilePicture] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Admin account credentials
    if (formData.email === 'admin@techtreks.com' && formData.password === 'admin123') {
      navigation.replace('HouseSetup', { isNewUser: true });
    } else {
      Alert.alert('Error', 'Invalid credentials.\n\nTry admin@techtreks.com / admin123');
    }
  };

  const handleSignUp = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    navigation.replace('HouseSetup', { isNewUser: true });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Logo/Header */}
        <View style={styles.header}>
          <MaterialIcons name="home" size={64} color={colors.primary} />
          <Text h2 style={styles.title}>RoomShare</Text>
          <Text style={styles.subtitle}>Manage your living space together</Text>
        </View>

        {mode === 'login' && (
          <View style={styles.formContainer}>
            <Text h4 style={styles.formTitle}>Login</Text>
            
            <Input
              placeholder="Email"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              leftIcon={<MaterialIcons name="email" size={20} color={colors.primary} />}
              containerStyle={styles.inputContainer}
              keyboardType="email-address"
            />
            
            <Input
              placeholder="Password"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry
              leftIcon={<MaterialIcons name="lock" size={20} color={colors.primary} />}
              containerStyle={styles.inputContainer}
            />

            <Button
              title="Login"
              onPress={handleLogin}
              buttonStyle={styles.primaryButton}
              icon={<MaterialIcons name="login" size={20} color={colors.white} />}
            />

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.line} />
            </View>

            <Button
              title="Create Account"
              onPress={() => setMode('signup')}
              buttonStyle={styles.secondaryButton}
              titleStyle={{ color: colors.primary }}
            />

            <View style={styles.demoBox}>
              <Text style={styles.demoTitle}>Demo Credentials:</Text>
              <Text style={styles.demoText}>📧 admin@techtreks.com</Text>
              <Text style={styles.demoText}>🔑 admin123</Text>
            </View>
          </View>
        )}

        {mode === 'signup' && (
          <View style={styles.formContainer}>
            <Text h4 style={styles.formTitle}>Create Account</Text>
            
            {/* Profile Picture */}
            <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
              {profilePicture ? (
                <Image source={{ uri: profilePicture }} style={styles.profileImage} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <MaterialIcons name="camera-alt" size={40} color={colors.primary} />
                  <Text style={styles.photoText}>Add Photo</Text>
                </View>
              )}
            </TouchableOpacity>

            <Input
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              leftIcon={<MaterialIcons name="person" size={20} color={colors.primary} />}
              containerStyle={styles.inputContainer}
            />

            <Input
              placeholder="Email"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              leftIcon={<MaterialIcons name="email" size={20} color={colors.primary} />}
              containerStyle={styles.inputContainer}
              keyboardType="email-address"
            />

            <Input
              placeholder="Phone Number"
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              leftIcon={<MaterialIcons name="phone" size={20} color={colors.primary} />}
              containerStyle={styles.inputContainer}
              keyboardType="phone-pad"
            />

            <Input
              placeholder="Password"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry
              leftIcon={<MaterialIcons name="lock" size={20} color={colors.primary} />}
              containerStyle={styles.inputContainer}
            />

            <Input
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              secureTextEntry
              leftIcon={<MaterialIcons name="lock" size={20} color={colors.primary} />}
              containerStyle={styles.inputContainer}
            />

            <Button
              title="Next: Set Up House"
              onPress={handleSignUp}
              buttonStyle={styles.primaryButton}
              icon={<MaterialIcons name="arrow-forward" size={20} color={colors.white} />}
            />

            <Button
              title="Back to Login"
              onPress={() => setMode('login')}
              buttonStyle={styles.secondaryButton}
              titleStyle={{ color: colors.primary }}
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
    marginTop: spacing.xl,
  },
  title: {
    color: colors.text,
    fontWeight: '700',
    marginTop: spacing.md,
  },
  subtitle: {
    color: colors.gray[600],
    fontSize: 14,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  formTitle: {
    color: colors.text,
    fontWeight: '700',
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primaryLight,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray[200],
  },
  dividerText: {
    marginHorizontal: spacing.md,
    color: colors.gray[400],
    fontWeight: '600',
  },
  demoBox: {
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  demoTitle: {
    color: colors.primary,
    fontWeight: '700',
    marginBottom: spacing.sm,
    fontSize: 12,
  },
  demoText: {
    color: colors.text,
    fontSize: 13,
    marginBottom: spacing.xs,
    fontFamily: 'monospace',
  },
});

export default LoginScreen;
