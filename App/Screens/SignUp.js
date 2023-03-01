import axios from 'axios';
import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import AppContext from '../Components/AppContext';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import TextInputComp from '../Components/TextInputComp';
export default function SignUp(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { Url } = useContext(AppContext)
    const handleSignUp = async () => {
        console.log(name, password)
        try {
            const res = await axios.get(Url + "/users?email=" + email);
            console.log('res', res.data.length)
            if (res.data.length == 0) {
                const ress = await axios.post(Url + "/users", { "name": name, "email":email, "password": password })
                console.log('res', ress.data)
                props.navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
                ToastAndroid.show('SignUp Successful, Login', ToastAndroid.SHORT);
            }
            else {
                ToastAndroid.show('Email already taken', ToastAndroid.SHORT);
            }


        }
        catch (error) { console.log('errrrr', error) };
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up!</Text>
            <TextInputComp placeholder='Name' value={name} setValue={setName} />
            <TextInputComp placeholder='Email' value={email} setValue={setEmail} keyboardType={"email-address"} autoCapitalize={"none"} />
            <TextInputComp placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true} />
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        marginBottom: 20,
        color:'blue'
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


