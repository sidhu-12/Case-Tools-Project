import React, { Component } from 'react'
import { PermissionsAndroid,ScrollView,ActivityIndicator,Alert,StyleSheet, Button,Text,TextInput, View ,TouchableOpacity,Switch,Image,Dimensions, BackHandler} from 'react-native';
import MapView, {Marker,PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
const LATITUDE_DELTA=0.00001;
const LONGITUDE_DELTA=0.00025;
export default class LocationMap extends Component{
    constructor(props){
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
        }
       
       }
       componentDidMount=()=>{
         this.setLocation();
       }
       setLocation=async()=>
       {  
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert("Please give the access to the location to continue");
        }
        else
        {
        let location = await  Location.getCurrentPositionAsync({});
          this.setState({
            latitude:location.coords.latitude,
            longitude:location.coords.longitude,
          })
         
        }
          
       }

       render()
       {
           return(
            <View style={styles.container}>
         <MapView
               
               provider={PROVIDER_GOOGLE}
               region={{
                 latitude:this.state.latitude,
                 longitude:this.state.longitude,
                 latitudeDelta:LATITUDE_DELTA,
                 longitudeDelta:LONGITUDE_DELTA,
               }
               }
               style={{ ...StyleSheet.absoluteFillObject }}
             >
              
    <Marker
      coordinate={{latitude:this.state.latitude,longitude:this.state.longitude}}
      title={"Customer Location"}
    />
  </MapView>
         </View>
           )
       }
    }
    const { width: WIDTH } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  }, 
  input: {
    width: WIDTH - 60,
    height: 45,
    borderRadius: 25,
    fontSize: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
    paddingLeft: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  btnLogin: {
    width: WIDTH - 60,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#00c0e2",
    justifyContent: "center",
    paddingLeft: 20,
    marginTop: 10,
    marginLeft: 10,
    marginTop: 40,
  },
});
