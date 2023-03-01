import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import axios from 'axios';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WindowHeight, WindowWidth} from '../utils/AppDimensions';
import Modal from 'react-native-modal';
import AppContext from '../Components/AppContext';
import {useContext, useState, useEffect} from 'react';

export default function Dashboard(props) {

  const [numberOfCars, setnumberOfCars] = useState('');
  const [CarsData, setCarsData] = useState();
  const {UserName, Url} = useContext(AppContext);

  const GetCarsData = async () => {  //function to get cars data
    const Cars = await axios.get(Url + '/cars');
    setCarsData(Cars.data);                 //Set Data
    setnumberOfCars(Cars.data.length);          //SetLength of array as number of cars
  };

  useEffect(() => {
    GetCarsData(); //First function to be called
  }, []);

  const DropdownDetails = item => {  //The Function returns the Dropdown menu
    item = item.item;
    return (
      <View style={styles.DropdownStyle}>
        <Text style={styles.DropDownText}>
          color: {item.color}
          {'\n'}
          model: {item.model} {'\n'}
          make: {item.make} {'\n'}
          reg-no: {item.regno} {'\n'}
        </Text>
      </View>
    );
  }; 

  const handleLogOut = async () => {  //LogOut function, clears the async and navigates to Login page
    try {
      await AsyncStorage.setItem('Password', ' ');
      await AsyncStorage.setItem('Name', ' ');
      await AsyncStorage.setItem('Email', ' ');
      props.navigation.reset({index: 0, routes: [{name: 'Login'}]});
    } catch (error) {}
  };

  const CardView = item => {                //The CardView is called from the flatlist, it shows the data of each car
    item = item.item;
    const [DropDownBool, setDropDownBool] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const DeleteCar = async () => {
      const res = axios.delete(Url + '/cars/' + item.id);
      console.log('reesssss', res);
      GetCarsData();
      setModalVisible(false);
    };

    return (
      <View>
        <View style={styles.CardFull}>
          <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>  
            <SimpleLineIcons                                                  //Shows a modal that has options to delete and update 
              name="options"
              size={25}
              color={'white'}
              style={{paddingLeft: 2}}
            />
          </TouchableOpacity>
          <View style={styles.Card}>
            <Text style={styles.CardText}>{item.name}</Text>
          </View>
          <TouchableOpacity onPress={() => setDropDownBool(!DropDownBool)}>
            <MaterialIcons
              color={'white'}
              size={25}
              name={DropDownBool ? 'arrow-drop-up' : 'arrow-drop-down'} //If menu is open the arrow point upwards 
            />
          </TouchableOpacity>
        </View>

        {DropDownBool ? <DropdownDetails item={item} /> : null}
        <Modal isVisible={isModalVisible}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={styles.modal}>
              <TouchableOpacity onPress={() => DeleteCar()}>  
                <View style={styles.ModalButton}>
                  <Text style={styles.ModalText}>Delete</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('UpdateScreen', {item: item}) //navigates to Update car screen and passes the current objects data
                }> 
                <View style={styles.ModalButton}>
                  <Text style={styles.ModalText}>Edit</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal}>
                <View style={styles.ModalButton}>
                  <Text style={styles.ModalText}>Cancel</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View style={styles.Screen}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
        <TouchableOpacity onPress={() => handleLogOut()}>
          <View style={styles.LogOutbutton}>
            <Text style={styles.buttonText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: WindowWidth,
            paddingRight: 5,
            backgroundColor: 'gray',
          }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              Total Number of Cars: {numberOfCars}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('AddCarScreen')}>
            <View style={styles.AddCarButton}>
              <Text style={styles.AddCarButtonText}>Add +</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={CarsData}
          keyExtractor={({item}) => item}
          contentContainerStyle={{paddingBottom: WindowHeight * 0.1}}
          renderItem={({item}) => {
            return <CardView item={item} />;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Screen: {
    flex: 1,
  },
  header: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
  container: {
    flex: 0.9,
    alignItems: 'center',
  },
  AddCarButton: {
    width: WindowWidth * 0.25,
    height: WindowHeight * 0.07,
    backgroundColor: '#CFD2CF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  AddCarButtonText: {
    fontSize: 25,
    color: 'black',
  },
  LogOutbutton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    margin: 10,
  },
  button: {
    width: WindowWidth * 0.7,
    height: WindowHeight * 0.1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    paddingLeft: 5,
    borderBottomRightRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  DropDownText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  Card: {
    height: WindowHeight * 0.1,
    width: WindowWidth * 0.6,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: WindowWidth * 0.04,
  },
  CardFull: {
    height: WindowHeight * 0.1,
    flexDirection: 'row',
    width: WindowWidth * 0.8,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: WindowWidth * 0.04,
    marginTop: 10,
  },

  CardText: {
    fontSize: 25,
    color: 'black',
  },
  DropdownStyle: {
    height: WindowHeight * 0.15,
    width: WindowWidth * 0.8,
    backgroundColor: 'white',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    marginLeft: 15,
    color: 'white',
  },
  modal: {
    paddingVertical: WindowHeight * 0.05,
    width: WindowWidth * 0.8,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  ModalText: {
    fontSize: 20,
    color: 'white',
  },
  ModalButton: {
    width: '80%',
    backgroundColor: 'black',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
});
