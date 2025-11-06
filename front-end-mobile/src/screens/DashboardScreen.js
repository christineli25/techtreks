import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../constants/colors';

const DashboardScreen = ({ navigation }) => {
  const dashboardItems = [
    { id: 'groceries', title: 'Groceries', icon: 'shopping-cart', color: '#10B981', description: 'Track shared items & splits', screen: 'Groceries' },
    { id: 'chores', title: 'Chores', icon: 'assignment', color: '#F59E0B', description: 'Manage tasks & deadlines', screen: 'Chores' },
    { id: 'payments', title: 'Payments', icon: 'account-balance-wallet', color: '#8B5CF6', description: 'Track expenses & settle debts', screen: 'Payments' },
  ];

  const stats = [
    { label: 'You owe', value: '$45.50', icon: 'trending-up', color: colors.danger },
    { label: 'You are owed', value: '$22.00', icon: 'trending-down', color: colors.success },
    { label: 'Pending chores', value: '3', icon: 'pending-actions', color: colors.warning },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View>
          <Text h4 style={styles.greeting}>Welcome back!</Text>
          <Text style={styles.subgreeting}>Laura</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <MaterialIcons name="account-circle" size={40} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <MaterialIcons name={stat.icon} size={24} color={stat.color} />
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.itemsContainer}>
        <Text h4 style={styles.sectionTitle}>Manage</Text>
        {dashboardItems.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => navigation.navigate(item.screen)} style={styles.dashboardItem}>
            <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
              <MaterialIcons name={item.icon} size={32} color={item.color} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={colors.gray[400]} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.actionsContainer}>
        <Text h4 style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Groceries')}>
            <MaterialIcons name="add-circle-outline" size={28} color={colors.primary} />
            <Text style={styles.actionText}>Add Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Chores')}>
            <MaterialIcons name="add-task" size={28} color={colors.primary} />
            <Text style={styles.actionText}>New Chore</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Payments')}>
            <MaterialIcons name="request-money" size={28} color={colors.primary} />
            <Text style={styles.actionText}>Log Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Login')}>
            <MaterialIcons name="logout" size={28} color={colors.danger} />
            <Text style={[styles.actionText, { color: colors.danger }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: colors.primaryLight, paddingBottom: spacing.xxl },
  header: { backgroundColor: colors.primary, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, paddingTop: spacing.xl },
  greeting: { color: colors.white, fontWeight: '600' },
  subgreeting: { color: colors.white, fontSize: 16, marginTop: spacing.sm },
  profileButton: { padding: spacing.sm },
  statsContainer: { flexDirection: 'row', paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, gap: spacing.md },
  statCard: { flex: 1, backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.md, alignItems: 'center', shadowColor: colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  statLabel: { color: colors.gray[600], fontSize: 12, marginTop: spacing.sm },
  statValue: { color: colors.text, fontSize: 16, fontWeight: '700', marginTop: spacing.xs },
  itemsContainer: { paddingHorizontal: spacing.lg, marginBottom: spacing.lg },
  sectionTitle: { color: colors.text, marginBottom: spacing.md, fontWeight: '700' },
  dashboardItem: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.md, flexDirection: 'row', alignItems: 'center', shadowColor: colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  iconContainer: { width: 60, height: 60, borderRadius: borderRadius.lg, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  itemContent: { flex: 1 },
  itemTitle: { color: colors.text, fontSize: 16, fontWeight: '600', marginBottom: spacing.xs },
  itemDescription: { color: colors.gray[500], fontSize: 12 },
  actionsContainer: { paddingHorizontal: spacing.lg },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  actionButton: { width: '48%', backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, alignItems: 'center', justifyContent: 'center', shadowColor: colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  actionText: { color: colors.primary, fontSize: 12, fontWeight: '600', marginTop: spacing.sm, textAlign: 'center' },
});

export default DashboardScreen;
