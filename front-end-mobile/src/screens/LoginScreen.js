import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';

const LoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleLogin = () => {
    // Check for admin credentials
    if (formData.username === 'admin' && formData.password === 'TechTreks2025!') {
      navigation.replace('Dashboard');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Login</Text>
      <Input
        placeholder="Username"
        value={formData.username}
        onChangeText={(text) => setFormData({ ...formData, username: text })}
        autoCapitalize="none"
      />
      <Input
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={handleLogin}
        containerStyle={styles.buttonContainer}
      />
      <Button
        title="Create Account"
        type="clear"
        onPress={() => navigation.navigate('ProfileCreation')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default LoginScreen;