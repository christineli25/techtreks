import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../constants/colors';

const HouseSetupScreen = ({ navigation, route }) => {
  const [houseName, setHouseName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [mode, setMode] = useState('choose'); // 'choose', 'create', 'join'

  const handleCreateHouse = () => {
    if (!houseName.trim()) {
      Alert.alert('Error', 'Please enter a house name');
      return;
    }
    // Generate a random code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    Alert.alert('Success', `House created! Share this code with roommates: ${code}`, [
      {
        text: 'Continue',
        onPress: () => navigation.replace('MainTabs'),
      },
    ]);
  };

  const handleJoinHouse = () => {
    if (!joinCode.trim()) {
      Alert.alert('Error', 'Please enter a join code');
      return;
    }
    // Validate code (in real app, would check backend)
    if (joinCode.length === 6) {
      navigation.replace('MainTabs');
    } else {
      Alert.alert('Error', 'Invalid join code format');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialIcons name="home" size={64} color={colors.primary} />
        <Text h2 style={styles.title}>Set Up Your House</Text>
        <Text style={styles.subtitle}>Complete your profile setup by choosing a house option</Text>
      </View>

      {mode === 'choose' && (
        <View style={styles.optionsContainer}>
          {/* Create New House */}
          <View style={styles.optionCard}>
            <View style={styles.optionIconContainer}>
              <MaterialIcons name="add-location-alt" size={48} color={colors.white} />
            </View>
            <Text h5 style={styles.optionTitle}>Create New House</Text>
            <Text style={styles.optionDescription}>
              Start a new living situation and invite your roommates
            </Text>
            <Button
              title="Create"
              onPress={() => setMode('create')}
              buttonStyle={styles.optionButton}
              icon={<MaterialIcons name="arrow-forward" size={20} color={colors.white} />}
            />
          </View>

          {/* Join Existing House */}
          <View style={styles.optionCard}>
            <View style={[styles.optionIconContainer, { backgroundColor: colors.success }]}>
              <MaterialIcons name="group-add" size={48} color={colors.white} />
            </View>
            <Text h5 style={styles.optionTitle}>Join Existing House</Text>
            <Text style={styles.optionDescription}>
              Join a roommate's house using their invite code
            </Text>
            <Button
              title="Join"
              onPress={() => setMode('join')}
              buttonStyle={[styles.optionButton, { backgroundColor: colors.success }]}
              icon={<MaterialIcons name="arrow-forward" size={20} color={colors.white} />}
            />
          </View>
        </View>
      )}

      {mode === 'create' && (
        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} onPress={() => setMode('choose')} />
            <Text h4 style={{ flex: 1 }}>Create House</Text>
          </View>

          <Input
            placeholder="House Name (e.g., Brooklyn Apartment)"
            value={houseName}
            onChangeText={setHouseName}
            leftIcon={<MaterialIcons name="home" size={20} color={colors.primary} />}
            containerStyle={styles.inputContainer}
          />

          <Text style={styles.helperText}>
            Give your house a nickname to help you remember it. You can change this later.
          </Text>

          <Button
            title="Create House"
            onPress={handleCreateHouse}
            buttonStyle={styles.primaryButton}
            icon={<MaterialIcons name="check" size={20} color={colors.white} />}
          />

          <Button
            title="Back"
            onPress={() => {
              setMode('choose');
              setHouseName('');
            }}
            buttonStyle={styles.secondaryButton}
            titleStyle={{ color: colors.primary }}
          />
        </View>
      )}

      {mode === 'join' && (
        <View style={styles.formContainer}>
          <View style={styles.formHeader}>
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} onPress={() => setMode('choose')} />
            <Text h4 style={{ flex: 1 }}>Join House</Text>
          </View>

          <Input
            placeholder="Enter 6-character code"
            value={joinCode}
            onChangeText={(text) => setJoinCode(text.toUpperCase())}
            leftIcon={<MaterialIcons name="vpn-key" size={20} color={colors.primary} />}
            containerStyle={styles.inputContainer}
            maxLength={6}
          />

          <Text style={styles.helperText}>
            Ask your roommate for their house code to join their living group.
          </Text>

          <Button
            title="Join House"
            onPress={handleJoinHouse}
            buttonStyle={[styles.primaryButton, { backgroundColor: colors.success }]}
            icon={<MaterialIcons name="check" size={20} color={colors.white} />}
          />

          <Button
            title="Back"
            onPress={() => {
              setMode('choose');
              setJoinCode('');
            }}
            buttonStyle={styles.secondaryButton}
            titleStyle={{ color: colors.primary }}
          />
        </View>
      )}
    </ScrollView>
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
  optionsContainer: {
    gap: spacing.lg,
  },
  optionCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  optionIconContainer: {
    backgroundColor: colors.primary,
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  optionTitle: {
    color: colors.text,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  optionDescription: {
    color: colors.gray[600],
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontSize: 14,
  },
  optionButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    width: '100%',
  },
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  helperText: {
    color: colors.gray[600],
    fontSize: 13,
    marginBottom: spacing.lg,
    fontStyle: 'italic',
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
  },
});

export default HouseSetupScreen;
