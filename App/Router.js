import { StyleSheet} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AppContext from './Components/AppContext'
import { useState } from 'react'
import SignUp from './Screens/SignUp'
import Login from './Screens/Login'
import Dashboard from './Screens/Dashboard'
import AddCarScreen from './Screens/AddCarScreen'
import UpdateScreen from './Screens/UpdatScreen'
const Stack = createNativeStackNavigator()

export default function Router() {
    const [Url, setUrl] = useState('https://422b-39-41-171-19.eu.ngrok.io') //As http was not working on my device I had to use ngrok to generate an https link
    const [UserName, setUserName] = useState('')
    return (
        <AppContext.Provider  //these variales can be accessed globally
            value={{ Url, setUrl, UserName, setUserName }}> 
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

const styles = StyleSheet.create({})