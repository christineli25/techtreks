import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';

const ProfileCreationScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    profilePicture: null
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, profilePicture: result.assets[0].uri });
    }
  };

  const handleCreateProfile = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // TODO: Implement profile creation logic
    navigation.replace('Dashboard');
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Create Profile</Text>
      
      <View style={styles.imageContainer}>
        <Image
          source={formData.profilePicture ? { uri: formData.profilePicture } : require('../assets/default-avatar.png')}
          style={styles.profileImage}
        />
        <Button
          title="Choose Photo"
          onPress={pickImage}
          type="outline"
          containerStyle={styles.photoButton}
        />
      </View>

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
      <Input
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
        secureTextEntry
      />
      
      <Button
        title="Create Profile"
        onPress={handleCreateProfile}
        containerStyle={styles.buttonContainer}
      />
      <Button
        title="Back to Login"
        type="clear"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginVertical: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    backgroundColor: '#e1e1e1',
  },
  photoButton: {
    width: 150,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default ProfileCreationScreen;