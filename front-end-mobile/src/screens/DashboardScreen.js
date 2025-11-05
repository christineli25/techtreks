import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button } from '@rneui/themed';

const DashboardScreen = ({ navigation }) => {
  // Mock data
  const upcomingChores = [
    { id: 1, title: 'Clean kitchen', dueDate: '2025-10-30' },
    { id: 2, title: 'Take out trash', dueDate: '2025-10-28' },
  ];

  const pendingPayments = [
    { id: 1, amount: 25.50, to: 'Alex', for: 'Groceries' },
    { id: 2, amount: 15.00, to: 'Sam', for: 'Internet' },
  ];

  const neededGroceries = [
    { id: 1, item: 'Milk' },
    { id: 2, item: 'Bread' },
  ];

  const DashboardCard = ({ title, data, buttonText, onPress }) => (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
      {data.map((item) => (
        <Text key={item.id} style={styles.itemText}>
          {title === 'Upcoming Chores' ? `${item.title} - Due: ${item.dueDate}` :
           title === 'Pending Payments' ? `Owe ${item.to} $${item.amount} for ${item.for}` :
           item.item}
        </Text>
      ))}
      <Button
        title={buttonText}
        onPress={onPress}
        size="sm"
        style={styles.cardButton}
      />
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <Text h4 style={styles.header}>Dashboard</Text>
      <DashboardCard
        title="Upcoming Chores"
        data={upcomingChores}
        buttonText="View All Chores"
        onPress={() => navigation.navigate('Chores')}
      />
      <DashboardCard
        title="Pending Payments"
        data={pendingPayments}
        buttonText="View All Payments"
        onPress={() => navigation.navigate('Payments')}
      />
      <DashboardCard
        title="Needed Groceries"
        data={neededGroceries}
        buttonText="View Grocery List"
        onPress={() => navigation.navigate('Groceries')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    textAlign: 'center',
  },
  itemText: {
    marginBottom: 10,
  },
  cardButton: {
    marginTop: 10,
  },
});

export default DashboardScreen;