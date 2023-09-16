import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';

const HomeStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={Home} />
    </HomeStack.Navigator>
  );
}
const Tab = createBottomTabNavigator();

const App = () => {
  const [user, setUser] = useState(false);
  const retrieveUser = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!
        setUser(true);
      } else {
        setUser(false);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  useEffect(() => {
  retrieveUser();
}, []);
  return (
    <NavigationContainer>
      {user ? 
      <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Log Out" children={(props) => <SignOut {...props} refetch={retrieveUser}/>}/>

      </Tab.Navigator>
      : <Stack.Navigator>
        <Stack.Screen name="Sign In"  children={(props) => <SignIn {...props} refetch={retrieveUser}/>}/>
        </Stack.Navigator>}
    </NavigationContainer>
  );
};

export default App;