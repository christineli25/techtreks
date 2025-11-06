import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
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
        <StatusBar style="auto" />
        <Stack.Navigator 
          initialRouteName="Groceries"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Groceries" 
            component={GroceriesScreen}
            options={{
              title: 'My Grocery List'
            }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              title: 'Dashboard',
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
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}