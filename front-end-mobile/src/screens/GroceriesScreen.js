import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text as RNText } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../constants/colors';

const GroceriesScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedPerson, setSelectedPerson] = useState('You');
  const [showDropdown, setShowDropdown] = useState(false);

  const roommates = ['You', 'Sarah', 'Mike', 'Jessica'];

  const addItem = () => {
    if (!itemName.trim() || !price.trim()) {
      alert('Please fill in all fields');
      return;
    }
    setItems([
      ...items,
      {
        id: Date.now(),
        name: itemName,
        price: parseFloat(price),
        addedBy: selectedPerson,
        completed: false,
      },
    ]);
    setItemName('');
    setPrice('');
    setSelectedPerson('You');
  };

  const toggleItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const yourItems = items.filter(item => item.addedBy === 'You');
  const yourTotal = yourItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      {/* Header with Title */}
      <View style={styles.headerSection}>
        <Text h4 style={styles.headerTitle}>This Week's Grocery List:</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* List Section - Handwritten Look */}
        <View style={styles.listCard}>
          <Text h5 style={styles.listTitle}>To Buy:</Text>

          {items.length === 0 ? (
            <Text style={styles.emptyText}>No items yet. Add one below!</Text>
          ) : (
            <View style={styles.itemsList}>
              {items.map((item, index) => (
                <View key={item.id} style={styles.itemRow}>
                  <TouchableOpacity
                    onPress={() => toggleItem(item.id)}
                    style={styles.checkbox}
                  >
                    <MaterialIcons
                      name={item.completed ? 'check-box' : 'check-box-outline-blank'}
                      size={24}
                      color={item.completed ? colors.success : colors.gray[400]}
                    />
                  </TouchableOpacity>

                  <View style={styles.itemInfo}>
                    <Text style={[styles.itemName, item.completed && styles.completedText]}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemBy}>{item.addedBy}</Text>
                  </View>

                  <View style={styles.itemPrice}>
                    <Text style={[styles.price, item.completed && styles.completedText]}>
                      ${item.price.toFixed(2)}
                    </Text>
                    <TouchableOpacity onPress={() => deleteItem(item.id)}>
                      <MaterialIcons name="close" size={18} color={colors.gray[400]} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}

          <View style={styles.divider} />

          {/* Totals */}
          <View style={styles.totalsSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Tax: $1.80</Text>
              <Text style={styles.totalValue}>$1.80</Text>
            </View>
            <View style={[styles.totalRow, styles.grandTotal]}>
              <Text style={styles.grandTotalLabel}>Total:</Text>
              <Text style={styles.grandTotalValue}>${(totalPrice + 1.8).toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Button to Go to Payments */}
        <Button
          title="Proceed to Payments"
          onPress={() => navigation.navigate('Payments')}
          buttonStyle={styles.paymentsButton}
          icon={<MaterialIcons name="arrow-forward" size={20} color={colors.white} />}
          containerStyle={styles.buttonContainer}
        />

        {/* Add Item Section */}
        <View style={styles.formCard}>
          <Text h5 style={styles.formTitle}>Add Item</Text>

          <Input
            placeholder="Item name"
            value={itemName}
            onChangeText={setItemName}
            leftIcon={<MaterialIcons name="shopping-cart" size={20} color={colors.primary} />}
            containerStyle={styles.inputContainer}
          />

          <Input
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            leftIcon={<MaterialIcons name="local-offer" size={20} color={colors.primary} />}
            containerStyle={styles.inputContainer}
          />

          {/* Dropdown for Person */}
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <MaterialIcons name="person" size={20} color={colors.primary} />
              <Text style={styles.dropdownText}>{selectedPerson}</Text>
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
                      selectedPerson === person && styles.dropdownItemActive,
                    ]}
                    onPress={() => {
                      setSelectedPerson(person);
                      setShowDropdown(false);
                    }}
                  >
                    <Text style={[
                      styles.dropdownItemText,
                      selectedPerson === person && styles.dropdownItemTextActive,
                    ]}>
                      {person}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <Button
            title="Add to List"
            onPress={addItem}
            buttonStyle={styles.addButton}
            icon={<MaterialIcons name="add" size={20} color={colors.white} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryLight,
  },
  headerSection: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  headerTitle: {
    color: colors.white,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  listCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.gray[200],
  },
  listTitle: {
    color: colors.text,
    fontWeight: '700',
    marginBottom: spacing.md,
    fontSize: 18,
  },
  emptyText: {
    color: colors.gray[500],
    fontStyle: 'italic',
    marginBottom: spacing.lg,
  },
  itemsList: {
    marginBottom: spacing.lg,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  checkbox: {
    marginRight: spacing.md,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 14,
  },
  itemBy: {
    color: colors.gray[500],
    fontSize: 12,
    marginTop: spacing.xs,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.gray[400],
  },
  itemPrice: {
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  price: {
    fontWeight: '700',
    color: colors.primary,
    fontSize: 14,
  },
  divider: {
    height: 2,
    backgroundColor: colors.gray[200],
    marginVertical: spacing.lg,
  },
  totalsSection: {
    paddingVertical: spacing.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  totalLabel: {
    color: colors.gray[600],
    fontSize: 14,
  },
  totalValue: {
    color: colors.gray[600],
    fontWeight: '600',
    fontSize: 14,
  },
  grandTotal: {
    borderTopWidth: 2,
    borderTopColor: colors.gray[200],
    marginTop: spacing.sm,
    paddingTop: spacing.md,
  },
  grandTotalLabel: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.text,
  },
  grandTotalValue: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.primary,
  },
  paymentsButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
  },
  buttonContainer: {
    marginHorizontal: 0,
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
});

export default GroceriesScreen;
