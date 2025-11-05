import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '@rneui/themed';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ProfileCreationScreen from './src/screens/ProfileCreationScreen';
import ChoresScreen from './src/screens/ChoresScreen';
import PaymentsScreen from './src/screens/PaymentsScreen';
import GroceriesScreen from './src/screens/GroceriesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              headerLeft: () => null,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="ProfileCreation"
            component={ProfileCreationScreen}
            options={{ title: 'Create Profile' }}
          />
          <Stack.Screen
            name="Chores"
            component={ChoresScreen}
            options={{ title: 'Chores' }}
          />
          <Stack.Screen
            name="Payments"
            component={PaymentsScreen}
            options={{ title: 'Payments' }}
          />
          <Stack.Screen
            name="Groceries"
            component={GroceriesScreen}
            options={{ title: 'Grocery List' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}