import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, borderRadius } from '../constants/colors';

const ProfileCreationScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    dateOfBirth: '',
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
    if (!formData.name || !formData.phoneNumber || !formData.dateOfBirth) {
      alert('Please fill in all fields');
      return;
    }
    navigation.replace('Dashboard');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text h2 style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>Let your roommates get to know you</Text>
        </View>

        <View style={styles.imageContainer}>
          {formData.profilePicture ? (
            <Image source={{ uri: formData.profilePicture }} style={styles.profileImage} />
          ) : (
            <View style={[styles.profileImage, styles.placeholderImage]}>
              <MaterialIcons name="person" size={50} color={colors.gray[300]} />
            </View>
          )}
          <Button
            title="Choose Photo"
            onPress={pickImage}
            type="outline"
            buttonStyle={styles.photoButton}
            titleStyle={styles.photoButtonTitle}
            icon={<MaterialIcons name="photo-camera" size={16} color={colors.primary} />}
          />
        </View>

        <View style={styles.formContainer}>
          <Input
            placeholder="Full Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            leftIcon={<MaterialIcons name="person" size={20} color={colors.primary} />}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            placeholderTextColor={colors.gray[400]}
          />

          <Input
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
            keyboardType="phone-pad"
            leftIcon={<MaterialIcons name="phone" size={20} color={colors.primary} />}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            placeholderTextColor={colors.gray[400]}
          />

          <Input
            placeholder="Date of Birth (MM/DD/YYYY)"
            value={formData.dateOfBirth}
            onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
            leftIcon={<MaterialIcons name="calendar-today" size={20} color={colors.primary} />}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            placeholderTextColor={colors.gray[400]}
          />

          <Button
            title="Complete Profile"
            onPress={handleCreateProfile}
            buttonStyle={styles.primaryButton}
            titleStyle={styles.buttonTitle}
          />

          <Button
            title="Skip for now"
            type="clear"
            onPress={() => navigation.replace('Dashboard')}
            titleStyle={styles.skipButtonTitle}
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
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
    marginTop: spacing.lg,
  },
  title: {
    color: colors.primary,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.gray[600],
    marginTop: spacing.sm,
    fontSize: 14,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: spacing.lg,
    backgroundColor: colors.primaryLight,
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  photoButton: {
    borderColor: colors.primary,
    borderRadius: borderRadius.lg,
  },
  photoButtonTitle: {
    color: colors.primary,
    marginLeft: spacing.sm,
  },
  formContainer: {
    marginBottom: spacing.xxl,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  input: {
    color: colors.text,
    fontSize: 16,
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
  skipButtonTitle: {
    color: colors.gray[500],
    fontSize: 14,
  },
});

export default ProfileCreationScreen;
