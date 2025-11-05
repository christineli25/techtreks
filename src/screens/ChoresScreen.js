import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, Input, Overlay, ListItem } from '@rneui/themed';

const ChoresScreen = () => {
  const [chores, setChores] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [newChore, setNewChore] = useState({
    title: '',
    assignedTo: '',
    dueDate: new Date().toISOString().split('T')[0],
  });

  const toggleOverlay = () => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      setNewChore({
        title: '',
        assignedTo: '',
        dueDate: new Date().toISOString().split('T')[0],
      });
    }
  };

  const handleAddChore = () => {
    if (newChore.title && newChore.assignedTo && newChore.dueDate) {
      setChores([...chores, { ...newChore, id: Date.now() }]);
      toggleOverlay();
    } else {
      alert('Please fill in all fields');
    }
  };

  const getRemainingTime = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days >= 0 ? `${days} days left` : 'Overdue';
  };

  const handleDeleteChore = (id) => {
    setChores(chores.filter(chore => chore.id !== id));
  };

  return (
    <View style={styles.container}>
      <Button
        title="Add New Chore"
        onPress={toggleOverlay}
        containerStyle={styles.addButton}
      />

      <ScrollView>
        {chores.map((chore) => (
          <ListItem.Swipeable
            key={chore.id}
            rightContent={() => (
              <Button
                title="Delete"
                onPress={() => handleDeleteChore(chore.id)}
                buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
              />
            )}
          >
            <ListItem.Content>
              <ListItem.Title>{chore.title}</ListItem.Title>
              <ListItem.Subtitle>
                Assigned to: {chore.assignedTo} • {getRemainingTime(chore.dueDate)}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem.Swipeable>
        ))}
      </ScrollView>

      <Overlay isVisible={isVisible} onBackdropPress={toggleOverlay}>
        <View style={styles.overlay}>
          <Text h4>Add New Chore</Text>
          <Input
            placeholder="Chore Title"
            value={newChore.title}
            onChangeText={(text) => setNewChore({ ...newChore, title: text })}
          />
          <Input
            placeholder="Assigned To"
            value={newChore.assignedTo}
            onChangeText={(text) => setNewChore({ ...newChore, assignedTo: text })}
          />
          <Input
            placeholder="Due Date"
            value={newChore.dueDate}
            onChangeText={(text) => setNewChore({ ...newChore, dueDate: text })}
          />
          <Button title="Add Chore" onPress={handleAddChore} />
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
});

export default ChoresScreen;