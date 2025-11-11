import { MaterialIcons } from '@expo/vector-icons';
import { Button, CheckBox, Input, Text } from '@rneui/themed';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { borderRadius, colors, spacing } from '../constants/colors';

const LoginScreen = ({ navigation }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    if (!formData.username || !formData.password) {
      alert('Please fill in all fields');
      return;
    }
    // Navigate to Dashboard
    navigation.replace('Dashboard');
  };

  const handleSignUp = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Navigate to Profile Creation
    navigation.navigate('ProfileCreation');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <MaterialIcons name="home-group" size={60} color={colors.primary} />
          <Text h2 style={styles.title}>RoomShare</Text>
          <Text style={styles.subtitle}>
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Input
            placeholder="Username"
            value={formData.username}
            onChangeText={(value) => handleInputChange('username', value)}
            leftIcon={<MaterialIcons name="person" size={20} color={colors.primary} />}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            placeholderTextColor={colors.gray[400]}
          />

          {isSignUp && (
            <Input
              placeholder="Email"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              leftIcon={<MaterialIcons name="email" size={20} color={colors.primary} />}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              placeholderTextColor={colors.gray[400]}
            />
          )}

          <Input
            placeholder="Password"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry
            leftIcon={<MaterialIcons name="lock" size={20} color={colors.primary} />}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            placeholderTextColor={colors.gray[400]}
          />

          {isSignUp && (
            <Input
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              secureTextEntry
              leftIcon={<MaterialIcons name="lock" size={20} color={colors.primary} />}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              placeholderTextColor={colors.gray[400]}
            />
          )}

          {!isSignUp && (
            <CheckBox
              title="Remember me"
              checked={rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
              containerStyle={styles.checkbox}
              textStyle={styles.checkboxText}
            />
          )}

          <Button
            title={isSignUp ? 'Create Account' : 'Login'}
            onPress={isSignUp ? handleSignUp : handleLogin}
            buttonStyle={styles.primaryButton}
            titleStyle={styles.buttonTitle}
          />

          <Button
            title={isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}
            onPress={() => setIsSignUp(!isSignUp)}
            type="clear"
            titleStyle={styles.secondaryButtonTitle}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    color: colors.primary,
    marginTop: spacing.md,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.gray[600],
    marginTop: spacing.sm,
    fontSize: 14,
  },
  formContainer: {
    marginTop: spacing.xxl,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  input: {
    color: colors.text,
    fontSize: 16,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingLeft: 0,
    marginBottom: spacing.lg,
  },
  checkboxText: {
    color: colors.text,
    fontWeight: '400',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonTitle: {
    color: colors.primary,
    fontSize: 14,
  },
});

export default LoginScreen;