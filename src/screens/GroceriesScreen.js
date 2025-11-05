import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Input, Button, ListItem, Icon } from '@rneui/themed';

const GroceriesScreen = () => {
  const [groceryItem, setGroceryItem] = useState('');
  const [groceryList, setGroceryList] = useState([]);

  const handleAddItem = () => {
    if (groceryItem.trim()) {
      setGroceryList([...groceryList, { name: groceryItem, id: Date.now(), completed: false }]);
      setGroceryItem('');
    }
  };

  const toggleItemCompletion = (id) => {
    setGroceryList(groceryList.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const handleDeleteItem = (id) => {
    setGroceryList(groceryList.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Add grocery item"
          value={groceryItem}
          onChangeText={setGroceryItem}
          rightIcon={
            <Button
              icon={<Icon name="add" color="white" />}
              onPress={handleAddItem}
              buttonStyle={styles.addButton}
            />
          }
          onSubmitEditing={handleAddItem}
        />
      </View>

      <ScrollView style={styles.list}>
        {groceryList.map((item) => (
          <ListItem.Swipeable
            key={item.id}
            rightContent={() => (
              <Button
                title="Delete"
                onPress={() => handleDeleteItem(item.id)}
                buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
              />
            )}
          >
            <ListItem.CheckBox
              checked={item.completed}
              onPress={() => toggleItemCompletion(item.id)}
            />
            <ListItem.Content>
              <ListItem.Title
                style={[
                  styles.itemText,
                  item.completed && styles.completedItem
                ]}
              >
                {item.name}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem.Swipeable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  addButton: {
    borderRadius: 25,
    padding: 10,
  },
  list: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
  },
  completedItem: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
});

export default GroceriesScreen;