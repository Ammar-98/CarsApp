import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react'

export default function TextInputComp(props) {
  useEffect(() => {
    console.log('props: ', props)
  }, [])
  const handleTextChange = (inputText) => {
    const newText = inputText.replace(/\s/g, ''); // replace all spaces with empty string
    props.setValue(newText);
  }
  return (

    <TextInput
      style={styles.input}
      placeholderTextColor={'grey'}
      placeholder={props.placeholder}
      value={props.value}
      onChangeText={handleTextChange}
      secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
      autoCapitalize={props.autoCapitalize ? props.autoCapitalize : 'none'}
      keyboardType={props.keyboardType ? props.keyboardType : 'default'}
    />

  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black'
  }
})