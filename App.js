import * as React from 'react';
import {useState,Component} from 'react';
import { View, Text,Button,TextInput,StyleSheet,Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableHighlight } from 'react-native-gesture-handler';
import GetLocation from 'react-native-get-location';



function DetailsScreen({route,navigation}) {
   /* 2. Get the param */
   const { itemId } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
      <Text style={{fontSize:15,margin:10,fontWeight:'bold'}}>Welcome {(itemId)}! This is your Running Helper</Text>

     <Button
     title="Locate Me"
     onPress={()=>{
       navigation.navigate('located')
     }}
     ></Button>
    </View>
  );
}


 class getLocation extends Component {

  state={
    latitude:null,
    longitude:null,
    endLatitude:null,
    endLongitude:null,
    distanceTravelled:0
  }

  startTrackingHandle = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge:1000
  })
  .then(location => {
     // Alert.alert(location.latitude+' '+location.longitude);
     this.setState({
       latitude:location.latitude,
       longitude:location.longitude
     })
  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  })
  }

  endTrackingHandle = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge:1000
  })
  .then(location => {
     // Alert.alert(location.latitude+' '+location.longitude);
     this.setState({
       endLatitude:location.latitude,
       endLongitude:location.longitude
     })
  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  })
  }
  
  calculateDistance = () => {
   var lat1 = this.state.latitude;
    var lon1 = this.state.longitude;
    var lat2 = this.state.endLatitude;
    var lon2 = this.state.endLongitude;

    //calculating distance using lat and long.....(Haversine Formullae)

    var R = 6371; // Radius of the earth in km
  var dLat = (lat2-lat1)* (Math.PI/180);  // deg2rad below
  var dLon = (lon2-lon1)* (Math.PI/180); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos((lat1)* (Math.PI/180)) * Math.cos((lat2)* (Math.PI/180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  //trimming till 3 decimal values
  d = d.toFixed(3);
  this.setState({
    distanceTravelled:d
  })
  }


  render() {
   return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Button
          title='Start Tracking!'
          onPress={() => {
              this.startTrackingHandle(); 
           }}                                 
          />
          <Text style={{margin:10}}>Initial Latitude:- {this.state.latitude}</Text>
          <Text style={{margin:10}}>Initial Longitude:- {this.state.longitude}</Text>
          <Button
          title='End Tracking!'
          onPress={() => {
              this.endTrackingHandle(); 
           }}                                 
          />
          <Text style={{margin:10}}>Final Latitude:- {this.state.endLatitude}</Text>
          <Text style={{margin:10}}>Final Longitude:- {this.state.endLongitude}</Text>
          <Button
          title='Calculate Distance!'  
          onPress={()=>{
            this.calculateDistance();
          }}                              
          />
          <Text style={{margin:10,fontWeight:'bold'}}>You Ran for {this.state.distanceTravelled} Kms!</Text>
    </View>
    )};
          }


function HomeScreen({navigation}) {
  const [text, setText] = useState('');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:'white' }}>
      <Text>Home Screen</Text>
      <TextInput
      style={{height: 40,width:200, borderColor: 'green', borderWidth: 1,margin:10}}
      placeholder="Enter your name!"
      onChangeText={text => setText(text)}
      defaultValue={text}
      secureTextEntry={false}
    />
      <Button
      title="Go to Details"
      onPress={() => {
        navigation.navigate('Details',{
          itemId:text,
        })
      }}
    />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen}  options={{
         title: 'FITNESS APP',
         headerStyle:{
          backgroundColor:'#f4511e',
         },
         headerTintColor:'#fff',
         headerTitleStyle:{
           fontWeight:'bold'
         }
         }} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="located" component={getLocation} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;