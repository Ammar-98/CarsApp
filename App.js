
import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppContext from './App/Components/AppContext';
import { useState } from 'react';
import SignUp from './App/Screens/SignUp';
import Login from './App/Screens/Login'
import Dashboard from './App/Screens/Dashboard';
import AddCarScreen from './App/Screens/AddCarScreen';
import UpdateScreen from './App/Screens/UpdatScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  const [Url, setUrl] = useState('https://422b-39-41-171-19.eu.ngrok.io')
  const [UserName, setUserName] = useState('')
  return (
    <AppContext.Provider
      value={{ Url, setUrl,UserName,setUserName}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="AddCarScreen" component={AddCarScreen} />
          <Stack.Screen name="UpdateScreen" component={UpdateScreen} />
  
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  )
}