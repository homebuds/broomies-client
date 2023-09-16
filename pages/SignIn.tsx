import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    title: {
        marginBottom: 100
    },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    paddingRight: 8,
    marginBottom: 16,
    width: '80%',
    height: 40,
  },
  button: {
    width: '80%',
  }
});

interface ISignIn {
    refetch: () => void;
}

const SignIn = ({refetch}: ISignIn) => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSignIn = async () => {
    setLoading(true);
    try {
        await AsyncStorage.setItem(
        'user',
        email,
        );
        refetch();
    } catch (error) {
        console.log(error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.title}>Welcome to HomeBuds!</Text>
          <Text>To sign in, please input your email</Text>
          <TextInput
            style={styles.inputField}
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <View style={styles.button}>
            <Button title="Sign In" onPress={handleSignIn} />
          </View>
        </>
      )}
    </View>
  );
};

export default SignIn;
