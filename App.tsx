import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Footer from './components/Footer';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';
import CustomChoresTab from './components/CustomChoresTab';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';
import Home from './pages/Home';
import Bills from './pages/Bills';
import HomeHeader from './components/CustomHomeHeader';

import { Provider } from 'react-redux';
import store from './store/store'; // Import your store

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

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
      <Provider store={store}>
        {isLoading ?
          (
            <ActivityIndicator />
          ) :
          <NavigationContainer theme={MyTheme} >
            {user ?
              <Tab.Navigator screenOptions={{
                headerStyle: {
                  backgroundColor: '#ffffff'
                }, headerShown: true
              }} tabBar={(props) => <Footer {...props} />}>
                <Tab.Screen name="Home" options={{
                  headerTitle: () => <HomeHeader title='hi' user={user} household={household} />, headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                    backgroundColor: '#ECF0EB'
                  }
                }}>
                  {(props) => <Home user={user} />}
                </Tab.Screen>
                <Tab.Screen name="Chores" options={{
                  headerTitle: () => <View />, headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                    height: 55,
                    backgroundColor: '#ffffff'
                  }
                }} children={(props) => <CustomChoresTab {...props} user={user} />} />
                <Tab.Screen name="Bills" children={(props) => <Bills {...props} user={user} household={household} />} />
                <Tab.Screen name="Log Out" children={(props) => <SignOut {...props} refetch={retrieveUser} />} />
              </Tab.Navigator>
              : <Stack.Navigator>
                <Stack.Screen name="Sign In" children={(props) => <SignIn {...props} refetch={retrieveUser} />} />
              </Stack.Navigator>}
          </NavigationContainer>
        }
      </Provider>
    </SafeAreaProvider >
  );
};

export default App;