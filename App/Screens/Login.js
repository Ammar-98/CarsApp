import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import AppContext from '../Components/AppContext';
import TextInputComp from '../Components/TextInputComp';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Login(props) {
  var asyncEmail = ''
  var asyncPassword = ''
  var asyncName=''
 
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('Email')
      console.log('hre')
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
      const value = await AsyncStorage.getItem('Password')
      if (value !== null) {
        asyncPassword = value
        
        // value previously stored
      }
      AutoLogin()
    } catch (e) {
      // error reading value
    }
  }
  const AutoLogin = async () => {

    try {
      console.log(asyncEmail, 'Email')
      console.log(asyncPassword, 'pass')
      const res = await axios.get(Url + "/users?email=" + asyncEmail + '&password=' + asyncPassword);
      console.log('res', res.data.length)
      if (res.data.length != 0) {
        setloading(false)
        props.navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })
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
    getData()



  }, [])

  const [loading, setloading] = useState(true)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { Url,UserName,setUserName } = useContext(AppContext)
  const storeEmail = async (value) => {
    try {
      await AsyncStorage.setItem('Email', String(value))
    } catch (e) {
      console.log(e)
    }
  }
  const storePassword = async (value) => {
    try {
      await AsyncStorage.setItem('Password', String(value))
    } catch (e) {
      console.log(e)
    }
  }
  const StoreName = async (value) => {
    try {
      setUserName(value)
      await AsyncStorage.setItem('Name', String(value))
    } catch (e) {
      console.log(e)
    }
  }

  const handleLogin = async () => {
    try {
      const res = await axios.get(Url + "/users?email=" + email+'&password='+password);
      if (res.data.length != 0) {
        console.log(res.data[0].name)
        StoreName(res.data[0].name)
        storeEmail(email)
        storePassword(password)
        props.navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })
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
