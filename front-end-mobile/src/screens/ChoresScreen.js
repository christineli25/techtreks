import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Input, Button, Text, Card } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../constants/colors';

const ChoresScreen = () => {
  const [chores, setChores] = useState([]);
  const [choreName, setChoreName] = useState('');
  const [assignee, setAssignee] = useState('You');
  const [dueDate, setDueDate] = useState('');

  const addChore = () => {
    if (!choreName || !dueDate) {
      alert('Please fill in all fields');
      return;
    }
    setChores([...chores, { id: Date.now(), name: choreName, assignee, dueDate, completed: false }]);
    setChoreName('');
    setAssignee('You');
    setDueDate('');
  };

  const toggleChore = (id) => {
    setChores(chores.map(chore => chore.id === id ? { ...chore, completed: !chore.completed } : chore));
  };

  const deleteChore = (id) => {
    setChores(chores.filter(chore => chore.id !== id));
  };

  const myChores = chores.filter(c => c.assignee === 'You');
  const othersChores = chores.filter(c => c.assignee !== 'You');
  const pendingChores = chores.filter(c => !c.completed).length;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <MaterialIcons name="assignment" size={24} color={colors.warning} />
            <Text style={styles.statValue}>{pendingChores}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statBox}>
            <MaterialIcons name="person" size={24} color={colors.primary} />
            <Text style={styles.statValue}>{myChores.length}</Text>
            <Text style={styles.statLabel}>Your Chores</Text>
          </View>
          <View style={styles.statBox}>
            <MaterialIcons name="people" size={24} color={colors.secondary} />
            <Text style={styles.statValue}>{othersChores.length}</Text>
            <Text style={styles.statLabel}>Roommates'</Text>
          </View>
        </View>

        {/* Add Chore Form */}
        <View style={styles.formContainer}>
          <Text h4 style={styles.sectionTitle}>Add Chore</Text>
          <Input placeholder="Chore name" value={choreName} onChangeText={setChoreName} leftIcon={<MaterialIcons name="add-task" size={20} color={colors.primary} />} containerStyle={styles.inputContainer} />
          <Input placeholder="Assignee" value={assignee} onChangeText={setAssignee} containerStyle={styles.inputContainer} />
          <Input placeholder="Due date (MM/DD)" value={dueDate} onChangeText={setDueDate} containerStyle={styles.inputContainer} />
          <Button title="Add Chore" onPress={addChore} buttonStyle={styles.addButton} icon={<MaterialIcons name="add" size={20} color={colors.white} />} />
        </View>

        {/* Your Chores */}
        {myChores.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text h4 style={styles.sectionTitle}>My Chores</Text>
            {myChores.map(chore => (
              <Card key={chore.id} containerStyle={styles.choreCard}>
                <View style={styles.choreRow}>
                  <TouchableOpacity onPress={() => toggleChore(chore.id)}>
                    <MaterialIcons name={chore.completed ? 'check-circle' : 'radio-button-unchecked'} size={24} color={chore.completed ? colors.success : colors.gray[300]} />
                  </TouchableOpacity>
                  <View style={styles.choreInfo}>
                    <Text style={[styles.choreName, chore.completed && styles.completedText]}>{chore.name}</Text>
                    <Text style={styles.choreDate}>{chore.dueDate}</Text>
                  </View>
                  <TouchableOpacity onPress={() => deleteChore(chore.id)}>
                    <MaterialIcons name="delete" size={24} color={colors.danger} />
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </View>
        )}

        {/* Roommates' Chores */}
        {othersChores.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text h4 style={styles.sectionTitle}>Roommates' Chores</Text>
            {othersChores.map(chore => (
              <Card key={chore.id} containerStyle={styles.choreCard}>
                <View style={styles.choreRow}>
                  <MaterialIcons name={chore.completed ? 'check-circle' : 'pending-actions'} size={24} color={chore.completed ? colors.success : colors.warning} />
                  <View style={styles.choreInfo}>
                    <Text style={[styles.choreName, chore.completed && styles.completedText]}>{chore.name}</Text>
                    <Text style={styles.choreAssignee}>{chore.assignee} • {chore.dueDate}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primaryLight },
  scrollView: { flex: 1, paddingHorizontal: spacing.lg },
  statsContainer: { flexDirection: 'row', marginVertical: spacing.lg, gap: spacing.md },
  statBox: { flex: 1, backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.md, alignItems: 'center' },
  statValue: { color: colors.primary, fontSize: 20, fontWeight: '700', marginVertical: spacing.xs },
  statLabel: { color: colors.gray[600], fontSize: 11 },
  formContainer: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.lg },
  sectionTitle: { color: colors.text, marginBottom: spacing.md, fontWeight: '700' },
  inputContainer: { marginBottom: spacing.md },
  addButton: { backgroundColor: colors.primary, borderRadius: borderRadius.lg, paddingVertical: spacing.md },
  sectionContainer: { marginBottom: spacing.lg },
  choreCard: { borderRadius: borderRadius.lg, marginBottom: spacing.md, padding: spacing.md },
  choreRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  choreInfo: { flex: 1 },
  choreName: { color: colors.text, fontSize: 14, fontWeight: '600' },
  choreDate: { color: colors.gray[500], fontSize: 12, marginTop: spacing.xs },
  choreAssignee: { color: colors.gray[500], fontSize: 12, marginTop: spacing.xs },
  completedText: { textDecorationLine: 'line-through', color: colors.gray[400] },
});

export default ChoresScreen;
