import { StyleSheet, Text, TouchableOpacity, View, ToastAndroid } from 'react-native'
import React from 'react'
import { useState, useContext,useEffect } from 'react'
import AppContext from '../Components/AppContext'
import { WindowHeight, WindowWidth } from '../utils/AppDimensions'
import TextInputComp from '../Components/TextInputComp'
import axios from 'axios'
export default function UpdateScreen(props) {
    useEffect(() => {
     console.log('PRPS',props.route.params.item)
     setName(props.route.params.item.name)
     setColor(props.route.params.item.color)
     setModel(props.route.params.item.model)
     setMake(props.route.params.item.make)
     setRegNo(props.route.params.item.regno)
    }, [])
    
    const { Url } = useContext(AppContext)
    const [name, setName] = useState('')
    const [Color, setColor] = useState('')
    const [Model, setModel] = useState('')
    const [Make, setMake] = useState('')
    const [RegNo, setRegNo] = useState('')
    const handleRegisterButton = async () => {
        if (name != '' && Color != '' && Model != '' && Make != '' && RegNo != '') {
            const FormData = {
                "name": name,
                "color": Color,
                "model": Model,
                "make": Make,
                "regno": RegNo,
            }
                const res = await axios.put(Url + "/cars/"+props.route.params.item.id, FormData)
                console.log('res', res)
                props.navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] })
                ToastAndroid.show('Update Successful', ToastAndroid.SHORT);

            
           
        }
        else {
            ToastAndroid.show('Please Fill all fields', ToastAndroid.LONG);
        }
    }
    return (
        <View style={styles.AllArea}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Update car data
                </Text>
            </View>
            <View style={styles.MainScreen}>
                <View style={styles.InputFieldsView}>
                    <TextInputComp placeholder='Name' value={name} setValue={setName} />
                    <TextInputComp placeholder='Color' value={Color} setValue={setColor} />
                    <TextInputComp placeholder='Model' value={Model} setValue={setModel} />
                    <TextInputComp placeholder='Make' value={Make} setValue={setMake} />
                    <TextInputComp placeholder='Reg-no' value={RegNo} setValue={setRegNo} keyboardType={'number-pad'} />

                </View>
                <TouchableOpacity onPress={() => handleRegisterButton()}>
                    <View style={styles.Button}>
                        <Text style={styles.ButtonText}>Update</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    AllArea: { flex: 1 },
    MainScreen: { height: WindowHeight * 0.89, paddingHorizontal: WindowWidth * 0.01 },

    header: {
        height: WindowHeight * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'gray',
        marginBottom: WindowHeight * 0.01
    },
    headerText: {
        fontSize: 25,
        marginLeft: 15,
        color: 'white'
    },
    TextH1: {
        fontSize: 25,
        color: 'black'
    },
    InputFieldsView:
    {
        paddingVertical: WindowHeight * 0.1,
        width: WindowWidth * 0.98,
        // backgroundColor:'red'
    },
    Button: { width: WindowWidth * 0.5, height: WindowHeight * 0.1, borderRadius: 10, alignSelf: 'center', backgroundColor: '#CFD2CF', justifyContent: 'center', alignItems: 'center' },
    ButtonText: { color: 'black', fontSize: 20 }
})