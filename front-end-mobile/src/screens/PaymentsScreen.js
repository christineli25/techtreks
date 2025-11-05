import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, Input, Overlay, ListItem } from '@rneui/themed';

const PaymentsScreen = () => {
  const [payments, setPayments] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [newPayment, setNewPayment] = useState({
    paidBy: '',
    paidFor: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const toggleOverlay = () => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      setNewPayment({
        paidBy: '',
        paidFor: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const handleAddPayment = () => {
    if (newPayment.paidBy && newPayment.paidFor && newPayment.amount) {
      setPayments([...payments, { ...newPayment, id: Date.now() }]);
      toggleOverlay();
    } else {
      alert('Please fill in all required fields');
    }
  };

  const calculateBalances = () => {
    const balances = {};
    payments.forEach(payment => {
      const { paidBy, paidFor, amount } = payment;
      if (!balances[paidBy]) balances[paidBy] = 0;
      if (!balances[paidFor]) balances[paidFor] = 0;
      balances[paidBy] += parseFloat(amount);
      balances[paidFor] -= parseFloat(amount);
    });
    return balances;
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>Current Balances</Card.Title>
        <Card.Divider />
        {Object.entries(calculateBalances()).map(([person, balance]) => (
          <Text key={person} style={styles.balanceText}>
            {person}: {balance > 0 ? 'Owed $' + balance.toFixed(2) : 'Owes $' + (-balance).toFixed(2)}
          </Text>
        ))}
      </Card>

      <Button
        title="Add New Payment"
        onPress={toggleOverlay}
        containerStyle={styles.addButton}
      />

      <ScrollView>
        {payments.map((payment) => (
          <ListItem key={payment.id} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>
                {payment.paidBy} paid ${payment.amount}
              </ListItem.Title>
              <ListItem.Subtitle>
                For: {payment.description}
                {'\n'}
                {payment.paidFor} owes ${payment.amount} • {payment.date}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>

      <Overlay isVisible={isVisible} onBackdropPress={toggleOverlay}>
        <View style={styles.overlay}>
          <Text h4>Add New Payment</Text>
          <Input
            placeholder="Paid By"
            value={newPayment.paidBy}
            onChangeText={(text) => setNewPayment({ ...newPayment, paidBy: text })}
          />
          <Input
            placeholder="Paid For"
            value={newPayment.paidFor}
            onChangeText={(text) => setNewPayment({ ...newPayment, paidFor: text })}
          />
          <Input
            placeholder="Amount"
            value={newPayment.amount}
            onChangeText={(text) => setNewPayment({ ...newPayment, amount: text })}
            keyboardType="numeric"
          />
          <Input
            placeholder="Description"
            value={newPayment.description}
            onChangeText={(text) => setNewPayment({ ...newPayment, description: text })}
          />
          <Button title="Add Payment" onPress={handleAddPayment} />
          <Button
            title="Cancel"
            type="clear"
            onPress={toggleOverlay}
            containerStyle={styles.cancelButton}
          />
        </View>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    margin: 15,
  },
  overlay: {
    width: 300,
    padding: 20,
  },
  cancelButton: {
    marginTop: 10,
  },
  balanceText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default PaymentsScreen;