import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Input, Button, Text, Card } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../constants/colors';

const GroceriesScreen = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemOwner, setItemOwner] = useState('You');

  const addItem = () => {
    if (!itemName || !itemPrice) {
      alert('Please fill in all fields');
      return;
    }
    setItems([...items, { id: Date.now(), name: itemName, price: parseFloat(itemPrice), owner: itemOwner, completed: false }]);
    setItemName('');
    setItemPrice('');
  };

  const toggleItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const yourTotal = items.filter(item => item.owner === 'You').reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Stats */}
        <View style={styles.statsHeader}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Spent</Text>
            <Text style={styles.statValue}>${totalPrice.toFixed(2)}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Your Share</Text>
            <Text style={styles.statValue}>${yourTotal.toFixed(2)}</Text>
          </View>
        </View>

        {/* Add Item Form */}
        <View style={styles.formContainer}>
          <Text h4 style={styles.sectionTitle}>Add Item</Text>
          <Input
            placeholder="Item name"
            value={itemName}
            onChangeText={setItemName}
            leftIcon={<MaterialIcons name="shopping-cart" size={20} color={colors.primary} />}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.rowInputs}>
            <Input
              placeholder="$0.00"
              value={itemPrice}
              onChangeText={setItemPrice}
              keyboardType="decimal-pad"
              containerStyle={styles.halfInput}
            />
            <View style={styles.halfInput}>
              <Input
                placeholder="Owner"
                value={itemOwner}
                onChangeText={setItemOwner}
                containerStyle={styles.inputContainer}
              />
            </View>
          </View>
          <Button
            title="Add to List"
            onPress={addItem}
            buttonStyle={styles.addButton}
            icon={<MaterialIcons name="add" size={20} color={colors.white} />}
          />
        </View>

        {/* Items List */}
        {items.length > 0 && (
          <View style={styles.listContainer}>
            <Text h4 style={styles.sectionTitle}>Items ({items.length})</Text>
            {items.map((item) => (
              <Card key={item.id} containerStyle={styles.itemCard}>
                <View style={styles.itemRow}>
                  <TouchableOpacity onPress={() => toggleItem(item.id)} style={styles.checkbox}>
                    <MaterialIcons
                      name={item.completed ? 'check-circle' : 'radio-button-unchecked'}
                      size={24}
                      color={item.completed ? colors.success : colors.gray[300]}
                    />
                  </TouchableOpacity>
                  <View style={styles.itemInfo}>
                    <Text style={[styles.itemName, item.completed && styles.completedText]}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemOwner}>{item.owner}</Text>
                  </View>
                  <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  <TouchableOpacity onPress={() => deleteItem(item.id)}>
                    <MaterialIcons name="delete" size={24} color={colors.danger} />
                  </TouchableOpacity>
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
  statsHeader: { flexDirection: 'row', marginVertical: spacing.lg, gap: spacing.md },
  statBox: { flex: 1, backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, alignItems: 'center' },
  statLabel: { color: colors.gray[600], fontSize: 12 },
  statValue: { color: colors.primary, fontSize: 22, fontWeight: '700', marginTop: spacing.sm },
  formContainer: { backgroundColor: colors.white, borderRadius: borderRadius.lg, padding: spacing.lg, marginBottom: spacing.lg },
  sectionTitle: { color: colors.text, marginBottom: spacing.md, fontWeight: '700' },
  inputContainer: { marginBottom: spacing.md },
  rowInputs: { flexDirection: 'row', gap: spacing.md },
  halfInput: { flex: 1 },
  addButton: { backgroundColor: colors.primary, borderRadius: borderRadius.lg, paddingVertical: spacing.md },
  listContainer: { marginBottom: spacing.lg },
  itemCard: { borderRadius: borderRadius.lg, marginBottom: spacing.md, padding: spacing.md },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  checkbox: { padding: spacing.sm },
  itemInfo: { flex: 1 },
  itemName: { color: colors.text, fontSize: 14, fontWeight: '600' },
  itemOwner: { color: colors.gray[500], fontSize: 12, marginTop: spacing.xs },
  completedText: { textDecorationLine: 'line-through', color: colors.gray[400] },
  itemPrice: { color: colors.primary, fontWeight: '700', fontSize: 14 },
});

export default GroceriesScreen;
