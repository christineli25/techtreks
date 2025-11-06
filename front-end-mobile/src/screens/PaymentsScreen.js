import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Input, Button, Text, Card } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../constants/colors';

const PaymentsScreen = () => {
  const [payments, setPayments] = useState([]);
  const [itemName, setItemName] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('You');
  const [splitWith, setSplitWith] = useState('Everyone');

  const addPayment = () => {
    if (!itemName || !amount) {
      alert('Please fill in all fields');
      return;
    }
    setPayments([...payments, { id: Date.now(), itemName, amount: parseFloat(amount), paidBy, splitWith, settled: false }]);
    setItemName('');
    setAmount('');
    setPaidBy('You');
    setSplitWith('Everyone');
  };

  const toggleSettled = (id) => {
    setPayments(payments.map(p => p.id === id ? { ...p, settled: !p.settled } : p));
  };

  const deletePayment = (id) => {
    setPayments(payments.filter(p => p.id !== id));
  };

  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
  const youOwe = payments.filter(p => p.paidBy !== 'You' && !p.settled).reduce((sum, p) => sum + (p.amount / 2), 0);
  const oweYou = payments.filter(p => p.paidBy === 'You' && !p.settled).reduce((sum, p) => sum + (p.amount / 2), 0);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <Card containerStyle={styles.summaryCard}>
            <View style={styles.summaryContent}>
              <MaterialIcons name="trending-down" size={32} color={colors.danger} />
              <View style={styles.summaryText}>
                <Text style={styles.summaryLabel}>You Owe</Text>
                <Text style={styles.summaryValue}>${youOwe.toFixed(2)}</Text>
              </View>
            </View>
          </Card>
          <Card containerStyle={styles.summaryCard}>
            <View style={styles.summaryContent}>
              <MaterialIcons name="trending-up" size={32} color={colors.success} />
              <View style={styles.summaryText}>
                <Text style={styles.summaryLabel}>Owed to You</Text>
                <Text style={styles.summaryValue}>${oweYou.toFixed(2)}</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Add Payment Form */}
        <View style={styles.formContainer}>
          <Text h4 style={styles.sectionTitle}>Log Payment</Text>
          <Input placeholder="Item/Description" value={itemName} onChangeText={setItemName} leftIcon={<MaterialIcons name="receipt" size={20} color={colors.primary} />} containerStyle={styles.inputContainer} />
          <Input placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="decimal-pad" containerStyle={styles.inputContainer} />
          <Input placeholder="Paid by" value={paidBy} onChangeText={setPaidBy} containerStyle={styles.inputContainer} />
          <Input placeholder="Split with" value={splitWith} onChangeText={setSplitWith} containerStyle={styles.inputContainer} />
          <Button title="Add Payment" onPress={addPayment} buttonStyle={styles.addButton} icon={<MaterialIcons name="add" size={20} color={colors.white} />} />
        </View>

        {/* Payments List */}
        {payments.length > 0 && (
          <View style={styles.listContainer}>
            <Text h4 style={styles.sectionTitle}>Transactions ({payments.length})</Text>
            {payments.map(payment => (
              <Card key={payment.id} containerStyle={styles.paymentCard}>
                <View style={styles.paymentRow}>
                  <TouchableOpacity onPress={() => toggleSettled(payment.id)}>
                    <MaterialIcons name={payment.settled ? 'check-circle' : 'radio-button-unchecked'} size={24} color={payment.settled ? colors.success : colors.warning} />
                  </TouchableOpacity>
                  <View style={styles.paymentInfo}>
                    <Text style={[styles.paymentItem, payment.settled && styles.settledText]}>{payment.itemName}</Text>
                    <Text style={styles.paymentDetail}>{payment.paidBy} paid • Split with {payment.splitWith}</Text>
                  </View>
                  <View style={styles.paymentAmount}>
                    <Text style={styles.amount}>${payment.amount.toFixed(2)}</Text>
                    <TouchableOpacity onPress={() => deletePayment(payment.id)}>
                      <MaterialIcons name="close" size={20} color={colors.gray[400]} />
                    </TouchableOpacity>
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
  summaryContainer: { marginVertical: spacing.lg, gap: spacing.md },
  summaryCard: { borderRadius: borderRadius.lg, padding: spacing.lg },
  summaryContent: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  summaryText: { flex: 1 },
  summaryLabel: { color: colors.gray[600], fontSize: 12 },
  summaryValue: { color: colors.text, fontSize: 20, fontWeight: '700', marginTop: spacing.xs },
  formContainer: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.lg },
  sectionTitle: { color: colors.text, marginBottom: spacing.md, fontWeight: '700' },
  inputContainer: { marginBottom: spacing.md },
  addButton: { backgroundColor: colors.primary, borderRadius: borderRadius.lg, paddingVertical: spacing.md },
  listContainer: { marginBottom: spacing.lg },
  paymentCard: { borderRadius: borderRadius.lg, marginBottom: spacing.md, padding: spacing.md },
  paymentRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  paymentInfo: { flex: 1 },
  paymentItem: { color: colors.text, fontSize: 14, fontWeight: '600' },
  paymentDetail: { color: colors.gray[500], fontSize: 12, marginTop: spacing.xs },
  settledText: { textDecorationLine: 'line-through', color: colors.gray[400] },
  paymentAmount: { alignItems: 'flex-end', gap: spacing.sm },
  amount: { color: colors.primary, fontWeight: '700', fontSize: 14 },
});

export default PaymentsScreen;
