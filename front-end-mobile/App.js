import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import { colors } from './src/constants/colors';
import ChoresScreen from './src/screens/ChoresScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import GroceriesScreen from './src/screens/GroceriesScreen';
import LoginScreen from './src/screens/LoginScreen';
import PaymentsScreen from './src/screens/PaymentsScreen';
import HouseSetupScreen from './src/screens/HouseSetupScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main Tab Navigator Screen
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'Groceries') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Chores') {
            iconName = 'assignment';
          } else if (route.name === 'Payments') {
            iconName = 'credit-card';
          }
          
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.gray[200],
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: -4,
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <Tab.Screen 
        name="Groceries" 
        component={GroceriesScreen}
        options={{ title: 'Groceries' }}
      />
      <Tab.Screen 
        name="Chores" 
        component={ChoresScreen}
        options={{ title: 'Chores' }}
      />
      <Tab.Screen 
        name="Payments" 
        component={PaymentsScreen}
        options={{ title: 'Payments' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator 
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="HouseSetup" 
            component={HouseSetupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="MainTabs" 
            component={MainTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}