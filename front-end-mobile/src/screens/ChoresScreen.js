import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../constants/colors';

const ChoresScreen = ({ navigation }) => {
  const [chores, setChores] = useState([]);
  const [choreName, setChoreName] = useState('');
  const [assignee, setAssignee] = useState('You');
  const [dueDate, setDueDate] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const roommates = ['You', 'Sarah', 'Mike', 'Jessica'];

  const addChore = () => {
    if (!choreName.trim() || !dueDate.trim()) {
      alert('Please fill in all fields');
      return;
    }
    setChores([
      ...chores,
      {
        id: Date.now(),
        name: choreName,
        assignee,
        dueDate,
        completed: false,
      },
    ]);
    setChoreName('');
    setDueDate('');
    setAssignee('You');
  };

  const toggleChore = (id) => {
    setChores(chores.map(c => c.id === id ? { ...c, completed: !c.completed } : c));
  };

  const deleteChore = (id) => {
    setChores(chores.filter(c => c.id !== id));
  };

  const nudgeRoommate = (choreName, assignee) => {
    Alert.alert(
      '🔔 Nudge Sent!',
      `You nudged ${assignee} about "${choreName}"`,
      [{ text: 'OK' }]
    );
  };

  const myChores = chores.filter(c => c.assignee === 'You');
  const othersChores = chores.filter(c => c.assignee !== 'You');
  const pendingCount = chores.filter(c => !c.completed).length;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialIcons name="pending-actions" size={28} color={colors.warning} />
            <Text style={styles.statLabel}>Pending</Text>
            <Text style={styles.statValue}>{pendingCount}</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="assignment" size={28} color={colors.primary} />
            <Text style={styles.statLabel}>My Chores</Text>
            <Text style={styles.statValue}>{myChores.length}</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="group" size={28} color={colors.success} />
            <Text style={styles.statLabel}>Roommates'</Text>
            <Text style={styles.statValue}>{othersChores.length}</Text>
          </View>
        </View>

        {/* My Chores Section */}
        {myChores.length > 0 && (
          <View style={styles.section}>
            <Text h5 style={styles.sectionTitle}>My Chores</Text>
            <View style={styles.choreGrid}>
              {myChores.map(chore => (
                <View key={chore.id} style={styles.choreCard}>
                  <TouchableOpacity
                    style={styles.choreCheckbox}
                    onPress={() => toggleChore(chore.id)}
                  >
                    <MaterialIcons
                      name={chore.completed ? 'check-circle' : 'radio-button-unchecked'}
                      size={28}
                      color={chore.completed ? colors.success : colors.gray[400]}
                    />
                  </TouchableOpacity>

                  <Text style={[styles.choreName, chore.completed && styles.completedText]}>
                    {chore.name}
                  </Text>

                  <Text style={styles.dueDate}>{chore.dueDate} Days til Due</Text>

                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => deleteChore(chore.id)}
                  >
                    <MaterialIcons name="delete" size={20} color={colors.danger} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Roommates' Chores Section */}
        {othersChores.length > 0 && (
          <View style={styles.section}>
            <Text h5 style={styles.sectionTitle}>Roommates' Chores</Text>
            {othersChores.map(chore => (
              <View key={chore.id} style={styles.roommateChoreCard}>
                <View style={styles.roommateChoreInfo}>
                  <View style={styles.roommateChoreHeader}>
                    <Text style={styles.roommateChoreTitle}>{chore.assignee}</Text>
                    <Text style={styles.roommateChoreStatus}>
                      {chore.completed ? '✓ Done' : `📅 ${chore.dueDate}d`}
                    </Text>
                  </View>
                  <Text style={styles.roommateChoreText}>{chore.name}</Text>
                </View>

                {!chore.completed && (
                  <TouchableOpacity
                    style={styles.nudgeButton}
                    onPress={() => nudgeRoommate(chore.name, chore.assignee)}
                  >
                    <MaterialIcons name="notifications-active" size={20} color={colors.white} />
                    <Text style={styles.nudgeText}>Nudge?</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Add Chore Form */}
        <View style={styles.formCard}>
          <Text h5 style={styles.formTitle}>Add Chore</Text>

          <Input
            placeholder="Chore name"
            value={choreName}
            onChangeText={setChoreName}
            leftIcon={<MaterialIcons name="add-task" size={20} color={colors.primary} />}
            containerStyle={styles.inputContainer}
          />

          {/* Assignee Dropdown */}
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <MaterialIcons name="person" size={20} color={colors.primary} />
              <Text style={styles.dropdownText}>{assignee}</Text>
              <MaterialIcons
                name={showDropdown ? 'expand-less' : 'expand-more'}
                size={20}
                color={colors.primary}
              />
            </TouchableOpacity>

            {showDropdown && (
              <View style={styles.dropdownMenu}>
                {roommates.map(person => (
                  <TouchableOpacity
                    key={person}
                    style={[
                      styles.dropdownItem,
                      assignee === person && styles.dropdownItemActive,
                    ]}
                    onPress={() => {
                      setAssignee(person);
                      setShowDropdown(false);
                    }}
                  >
                    <Text style={[
                      styles.dropdownItemText,
                      assignee === person && styles.dropdownItemTextActive,
                    ]}>
                      {person}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <Input
            placeholder="Days until due (e.g., 3)"
            value={dueDate}
            onChangeText={setDueDate}
            keyboardType="numeric"
            leftIcon={<MaterialIcons name="calendar-today" size={20} color={colors.primary} />}
            containerStyle={styles.inputContainer}
          />

          <Button
            title="Add Chore"
            onPress={addChore}
            buttonStyle={styles.addButton}
            icon={<MaterialIcons name="add" size={20} color={colors.white} />}
          />
        </View>

        {chores.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialIcons name="task-alt" size={64} color={colors.gray[300]} />
            <Text style={styles.emptyStateText}>No chores yet. Add one to get started!</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryLight,
  },
  scrollView: {
    flex: 1,
    padding: spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  statLabel: {
    color: colors.gray[600],
    fontSize: 12,
    marginTop: spacing.sm,
  },
  statValue: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
    marginTop: spacing.xs,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  choreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  choreCard: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.gray[200],
  },
  choreCheckbox: {
    marginBottom: spacing.md,
  },
  choreName: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.gray[400],
  },
  dueDate: {
    color: colors.gray[500],
    fontSize: 12,
    marginBottom: spacing.md,
  },
  deleteBtn: {
    marginTop: spacing.sm,
  },
  roommateChoreCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
  },
  roommateChoreInfo: {
    flex: 1,
  },
  roommateChoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  roommateChoreTitle: {
    fontWeight: '700',
    color: colors.text,
  },
  roommateChoreStatus: {
    color: colors.gray[600],
    fontSize: 12,
  },
  roommateChoreText: {
    color: colors.gray[700],
    fontSize: 14,
  },
  nudgeButton: {
    backgroundColor: colors.warning,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  nudgeText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 12,
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  formTitle: {
    color: colors.text,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  dropdownContainer: {
    marginBottom: spacing.lg,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    gap: spacing.md,
  },
  dropdownText: {
    flex: 1,
    color: colors.text,
    fontWeight: '600',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gray[300],
    marginTop: spacing.xs,
    zIndex: 1000,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  dropdownItemActive: {
    backgroundColor: colors.primaryLight,
  },
  dropdownItemText: {
    color: colors.text,
    fontWeight: '500',
  },
  dropdownItemTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyStateText: {
    color: colors.gray[500],
    marginTop: spacing.lg,
    fontSize: 14,
  },
});

export default ChoresScreen;
