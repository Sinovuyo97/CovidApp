import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Picker,
  Image,
  TouchableOpacity,
  ImageBackground,
  Linking,
  Platform,
  Dimensions,
} from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import { Feather, Entypo } from '@expo/vector-icons';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

const stat = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = useState({
    selected: 0,
  });

  const [covidDataSA, setCovidData] = useState('');
  const [casess, setCases] = useState({
    death: 0,
    recov: 0,
    serious: 0,
    act: 0,
    cases: 0,
  });

  let active1 = (casess.act / casess.cases) * 1;
  let recovered1 = (casess.recov / casess.cases) * 1;
  let deaths1 = (casess.death / casess.cases) * 1;

  let cases1 = (casess.cases / casess.cases) * 1;

  let critical1 = (casess.serious / casess.act) * 10;
  const glob = 'https://coronavirus-19-api.herokuapp.com/countries/world';
  const ZA =
    'https://coronavirus-19-api.herokuapp.com/countries/south%20africa';

  if (selectedIndex.selected == 0) {
    useEffect(() => {
      fetch(ZA)
        .then((data) => data.json())
        .then((data) => {
          covidDataF(data);
        });
    });
  }

  if (selectedIndex.selected == 1) {
    useEffect(() => {
      fetch(glob)
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          covidDataF(data);

          setCases({
            cases: data.cases,
            death: data.deaths,
            recov: data.recovered,
            act: data.active,
            serious: data.critical,
          });
        });
    }, []);
  }

  const covidDataF = (data) => {
    let {
      country,
      cases,
      todayCases,
      deaths,
      todayDeaths,
      recovered,
      active,
      critical,
      casesPerOneMillion,
      deathsPerOneMillion,
      totalTests,
      testsPerOneMillion,
    } = data;
    setCases({
      death: deaths,
      recov: recovered,
      serious: critical,
      act: active,
      cases: cases,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('home');
        }}>
        <Text style={styles.menu}>
          <Feather name="bar-chart-2" size={24} color="white" />
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          marginLeft: '8%',
          marginTop: '12%',
        }}>
        Statistics
      </Text>

      <SegmentedControl
        style={styles.segment}
        values={['My Country', 'Global']}
        selectedIndex={selectedIndex.selected}
        onChange={(event) => {
          setSelectedIndex({
            selected: event.nativeEvent.selectedSegmentIndex,
          });
        }}
      />
      {/*first...*/}

      <View style={styles.first}>
        <View style={styles.firs}>
          <Text style={{ color: 'white' }}>Cases</Text>
          <Text>{''}</Text>
        </View>
        <View style={styles.firss}>
          <Text style={{ color: 'white' }}>Death</Text>
          <Text>{casess.death}</Text>
        </View>
      </View>

      {/*second*/}
      <View style={styles.second}>
        <View style={styles.third}>
          <Text style={{ color: 'white' }}>Recovered</Text>
          <Text>{casess.recov}</Text>
        </View>
        <View style={styles.forth}>
          <Text style={{ color: 'white' }}>Active</Text>
          <Text>{casess.act}</Text>
        </View>

        <View style={styles.fifth}>
          <Text style={{ color: 'white' }}>Critical</Text>
          <Text>{casess.serious}</Text>
        </View>
      </View>


      <ProgressChart
        data={{
          barColors: ['red', 'blue', 'yellow','pink','orange'],
          data:[deaths1,critical1,recovered1,active1,cases1],
          
          }}
        width={Dimensions.get('window').width - 16}
        height={210}
        chartConfig={{
          backgroundColor: '',
          backgroundGradientFrom: '#5d4f95',
          backgroundGradientTo: '#5d4f95',
          decimalPlaces: 2,
          //255, 9, 0, 1
          color: (opacity = 1) => `rgba(98 ,0,0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />

      
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: '15%',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('home');
          }}>
          <Text style={styles.menu2}>
            <Entypo name="home" size={24} color="white" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('statistics');
          }}>
          <Text style={styles.menu2}>
            <Feather name="bar-chart-2" size={24} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default stat;

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: '#34247c',
  },
  menu: {
    marginLeft: '8%',
    marginTop: '3%',
  },

  menu2: {
    marginLeft: '8%',
    marginTop: '9%',
  },


  segment: {
    color: 'white',
    height: '6%',
    marginTop: '7%',
    marginLeft: '8%',
    marginRight: '8%',
    borderRadius: 11,
    backgroundColor: '#5d4f95',
  },

  first: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    marginTop: '18%',
  },
  
  second: {
    flexDirection: 'row',
    paddingLeft: '12%',
    marginTop: '6%',
  },
  firs: {
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    height: '14vh',
    width: '45%',
    backgroundColor: 'orange',
    marginLeft: '3%',
  },
  firss: {
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    height: '14vh',
    width: '45%',
    backgroundColor: 'red',
    marginLeft: '5%',
  },
  third: {
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    height: '12vh',
    width: '27%',
    backgroundColor: '#58cc64',
  },
  forth: {
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    height: '12vh',
    width: '27%',
    backgroundColor: '#509cfc',
    marginLeft: '3%',
  },

  fifth: {
    textAlign: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    height: '12vh',
    width: '27%',
    backgroundColor: '#783cfc',
    marginLeft: '3%',
  },
});
