import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Footer from './components/Footer';
import {
  SafeAreaProvider,
  useSafeAreaInsets
} from 'react-native-safe-area-context';
import CustomChoresTab from './components/CustomChoresTab';
import HomeIcon from './icons/home.svg';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import Home from './pages/Home';
import Bills from './pages/Bills';
import { View } from 'react-native';
import HomeHeader from './components/CustomHomeHeader';
import { User } from './types/backend';

const ChoresTab = createMaterialTopTabNavigator();

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
const ChoresStack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ECF0EB'
  },
};

const App = () => {
  const [user, setUser] = useState<string | undefined>();
  const [household, setHousehold] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  const retrieveUser = async () => {
    setIsLoading(true);
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // We have data!!
        setUser(value);
      } else {
        setUser(undefined);
      }
      const householdId = await AsyncStorage.getItem('household');
      if (householdId !== null) {
        // We have data!!
        setHousehold(householdId);
      } else {
        setHousehold(undefined);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    retrieveUser();
  }, []);
  return (
    <SafeAreaProvider>
      {isLoading ?
        (
          <ActivityIndicator />
        ) :
        <NavigationContainer theme={MyTheme} >
          {user ?
            <Tab.Navigator screenOptions={{
              headerStyle: {
                backgroundColor: '#ECF0EB',
              }, headerShown: true
            }} tabBar={(props) => <Footer {...props} />}>
              <Tab.Screen name="Home" component={Home} options={{
                headerTitle: () => <HomeHeader title='hi' user={user} />, headerStyle: {
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 0,
                  backgroundColor: '#ECF0EB'
                }
              }} />
              <Tab.Screen name="Chores" children={(props) => <CustomChoresTab {...props} user={user} />} />
              <Tab.Screen name="Bills" children={(props) => <Bills {...props} user={user} household={household} />} />
              <Tab.Screen name="Log Out" children={(props) => <SignOut {...props} refetch={retrieveUser} />} />
            </Tab.Navigator>
            : <Stack.Navigator>
              <Stack.Screen name="Sign In" children={(props) => <SignIn {...props} refetch={retrieveUser} />} />
            </Stack.Navigator>}
        </NavigationContainer>
      }
    </SafeAreaProvider>
  );
};

export default App;