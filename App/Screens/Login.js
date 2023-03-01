import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import AppContext from '../Components/AppContext';
import TextInputComp from '../Components/TextInputComp';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Login(props) {
  var asyncEmail = '' //variables to store the email and password
  var asyncPassword = ''
 
  const getData = async () => {  //First function to be called
    try {
      const value = await AsyncStorage.getItem('Email') //check value in async storage
      if (value !== null) {
        
        asyncEmail = value
        
        // value previously stored
      }
      getPass()
    } catch (e) {
      // error reading value
    }
  }
  const getPass = async () => {
    try {
      const value = await AsyncStorage.getItem('Password') //Check password in async storage
      if (value !== null) {
        asyncPassword = value
        
        // value previously stored
      }
      AutoLogin()
    } catch (e) {
      // error reading value
    }
  }
  const AutoLogin = async () => { //Try to login if password and email found in async

    try {
      const res = await axios.get(Url + "/users?email=" + asyncEmail + '&password=' + asyncPassword);
      if (res.data.length != 0) {  //if user found
        setloading(false)
        props.navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })  //Go to Dashboard and clear stack
        ToastAndroid.show('AutoLogin Successful', ToastAndroid.SHORT); 
      }
      else {
        setloading(false)
        ToastAndroid.show('AutoLogin Failed', ToastAndroid.SHORT);
      }

    }
    catch (error) { }


  }
  useEffect(() => {
    getData() //Initially this is called
  }, [])

  const [loading, setloading] = useState(true)  //Initally true as Autologin is in progress
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { Url,UserName,setUserName } = useContext(AppContext)
  const storeEmail = async (value) => {  //Store Email in Async Storage
    try {
      await AsyncStorage.setItem('Email', String(value))
    } catch (e) {
      console.log(e)
    }
  }
  const storePassword = async (value) => { //Store Password in Async Storage
    try {
      await AsyncStorage.setItem('Password', String(value))
    } catch (e) {
      console.log(e)
    }
  }
  const StoreName = async (value) => {  //Store name in async storage
    try {
      setUserName(value)
      await AsyncStorage.setItem('Name', String(value))
    } catch (e) {
      console.log(e)
    }
  }

  const handleLogin = async () => {  //used to manually login
    try {
      const res = await axios.get(Url + "/users?email=" + email+'&password='+password); //Check user
      if (res.data.length != 0) {                //If found
        StoreName(res.data[0].name)   //Retain Auth
        storeEmail(email)
        storePassword(password)
        props.navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] }) //Navigate to Dashboard
      }
      else {
        ToastAndroid.show('Credentials do not match', ToastAndroid.SHORT);
      }


    }
    catch (error) { console.log('errrrr', error) };
  };
  if (loading) {
    return (

      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={'blue'} />
      </View>
    )

  }
  else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInputComp placeholder='Email' value={email} setValue={setEmail} keyboardType={"email-address"} autoCapitalize={"none"} />
        <TextInputComp placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true} />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={{ margin: 10, alignItems: 'center' }}>
          <Text style={{ color: 'grey', fontSize: 15 }}>
            Don't have an accout?
          </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
            <Text style={{ color: 'blue', fontSize: 20 }}>Sign Up</Text>     
          </TouchableOpacity>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black'
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
