import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Linking,
} from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import Hyperlink from 'react-native-hyperlink';
const distance = require('./icons8-distance-48.png')
const hand = require('./icons8-hand-washing-64.png')
const people = require('./icons8-people-58.png')
function Home({ navigation }) {
  const [selectedValue, setSelectedValue] = useState({
    val: '',
  });
  const callNow = () => {
    let phoneNumber = '';

    if (selectedValue.val === 'ZA') {
      phoneNumber = 'tel:${0861322322}';
    } else {
      phoneNumber = 'telprompt:${0832878500}';
    }
    Linking.openURL(phoneNumber);
  };
  const sendSMS = () => {
    let phoneNumber = '';

    if (selectedValue.val === 'ZA') {
      phoneNumber = 'sms:${0861322322}';
    } else {
      phoneNumber = 'smsprompt:${0832878500}';
    }
    Linking.openURL(phoneNumber);
  };
  return (
    <View style={styles.container}>
      <View style={styles.upperContent}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('statistics');
          }}>
          <Text style={styles.menu}>
            <Feather name="bar-chart-2" size={24} color="white" />
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', backgroundColor: '' }}>
          <Text style={styles.covid}>COVID-19</Text>

          <Picker
            selectedValue={selectedValue.val}
            style={{
              width: '27%',
              height: '26%',
              marginLeft: '33%',
              marginTop: '23%',
              borderRadius: 12,
              paddingLeft: '3%',
            }}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedValue({ val: itemValue });
              console.log(selectedValue.val);
            }}>
            <Picker.Item label="ZA" value="ZA"></Picker.Item>
            <Picker.Item label="USA" value="USA" />
          </Picker>
        </View>
        <Text style={styles.question}>Are you feeling sick?</Text>
        <Text style={styles.forhelp}>
          If you feel sick with any of covid-19 symptoms please call or SMS us
          immediately for help.
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.button} onPress={() => callNow()}>
            <Text style={{ color: 'white' }}>Call Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1} onPress={() => sendSMS()}>
            <Text style={{ color: 'white' }}>Send SMS</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: '13%', marginLeft: '8%' }}>
        <Text style={{ fontSize: 21, fontWeight: 'bold' }}>Prevention</Text>
      </View>
      <Text style={styles.preventionStyle}>
        <Image source={distance} style={styles.prevention} />
        <Image source={hand} style={styles.prevention} />
        <Image source={people} style={styles.prevention} />
      </Text>
      <View style={styles.mainText}>
        <Text style={styles.preText}>Avoid close contact</Text>
        <Text style={styles.preText}>Clean your hands often</Text>
        <Text style={styles.preText}>Wear a facemask</Text>
      </View>
    </View>
  );
}
export default Home;
const styles = StyleSheet.create({



container: {
    flex: 1,
    backgroundColor: '#ccc',
    height: '300%',
  },
  upperContent: {
    backgroundColor: '#34247c',
    height: 'auto',
    borderRadius: 29,
    marginTop:40
  },
   menu: {
      marginLeft: '8%',
      marginTop: '3%',
    },
    covid: {
      width: '25%',
      height: '58%',
      color: 'white',
      marginTop: '22%',
      marginLeft: '8%',
      fontSize: 16.2,
      fontWeight: 'bold',
    },
    question: {
      color: 'white',
      marginTop: '12%',
      marginLeft: '8%',
      fontSize: 19,
    },

  forhelp: {
    color: 'white',
    fontSize: 10,
    marginLeft: '8%',
    marginRight: '8%',
    marginTop: '8%',
  },
  button: {
    flexDirection: 'row',
    padding: '1%',
    marginTop: '10%',
    width: '40%',
    height: '65%',
    marginLeft: '8%',
    borderRadius: 17,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
    button1: {
      flexDirection: 'row',
      padding: '1%',
      marginTop: '10%',
      width: '40%',
      height: '65%',
      justifyContent: 'center',
      marginLeft: '3%',
      borderRadius: 17,
      backgroundColor: '#3e58fb',
      alignItems: 'center',
    },
    preventionStyle: {
        marginTop: '5%',
      },
       mainText: {
          marginTop: '23%',
          flexDirection: 'row',
        },
        preText: {
          marginLeft: '7%',
          alignItems: 'center',
          justifyContent: 'center',
        },
  
  prevention: {
    backgroundColor: 'pink',
    height: '365%',
    width: '20%',
    borderRadius: 100,
    marginLeft: '12%',
  },
  mainText: {
    marginTop: '23%',
    flexDirection: 'row',
  },
  preText: {
    marginLeft: '7%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  /*test: {
    marginTop: '12%',
    width: '90%',
    height: '10%',
    backgroundColor: '#34247c',
    alignSelf: 'center',
    marginRight: '2%',
    marginLeft: '2%',
    borderRadius: 12,
  },*/
});
