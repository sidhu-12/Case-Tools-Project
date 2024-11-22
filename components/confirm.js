import React, { Component } from 'react'
import {   Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Button,
  Image,StyleSheet, Alert} from 'react-native';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
class Confirm extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
     actualDate:'',
     actualTime:'',
      show:false,
      mode:'date',
      display:'default',
    };
    this.actualDate="";
    this.actualTime="";
    this.expoToken={};
   // this.onChange=this.onChange.bind(this);
   
  }
  componentDidMount(){
    this.notificationListener = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    this.responseListener = Notifications.addNotificationResponseReceivedListener(response => {
    
    console.log("Vanakam bha "+JSON.stringify(response));
    });
    var date=new Date();
    date.setDate(date.getDate()+1);
    var year = date.getFullYear();
   var  month = date.getMonth()+1;
       var   dt = date.getDate();

        if (dt < 10) {
           dt = '0' + dt;
           }
           if (month < 10) {
           month = '0' + month;
           }
        var del_date=dt+"-"+month+"-"+year;
        this.actualDate=del_date
        this.actualTime="11:00:00";
        this.registerForPushNotificationsAsync();
        this.sendPushNotification();

        
  }

    componentWillUnmount=()=>{
      Notifications.removeNotificationSubscription(this.notificationListener);
      Notifications.removeNotificationSubscription(this.responseListener);
    
    }
  
    registerForPushNotificationsAsync=async()=> {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        Alert.alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        enableLights:true,
        showBadge:true,
      });
    }
  
    this.expoToken=token;
  }
    sendPushNotification=async()=> {
    const message = {
      to: this.expoToken,
      sound: 'default',
      title: 'ORDER CONFIRMED',
      body: "Your order has been confirmed and will reach the location given",
      data: { data: 'Thala' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
  render(){
    return (
       <View style={styles.container1}>
           <Text style={{fontSize:30,fontWeight:"bold",textAlign:"center"}}> 
               Your Order is Confirmed!!
           </Text>
        <Text style={{fontSize:20}}>
            Your order will be delivered on<Text style={{fontSize:20,fontWeight:'bold'}}> {this.actualDate} {this.actualTime}  </Text>
          at this
          </Text>
          <TouchableOpacity onPress={()=>{
            this.props.navigation.navigate("Location");
          }}
          >
            <Text style={{fontSize: 20,color:'blue',fontWeight:"100",textDecorationLine:'underline'}}>
            location
            </Text>
          </TouchableOpacity>
          
        <View style={{marginBottom:10}}>
        <Button onPress={()=>{
          this.props.navigation.popToTop();
        }} title="Ok"/>
        </View>
      
      
      </View>
    );
 }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
   backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container1: {
    flex: 1,
   backgroundColor: 'white',
   alignItems:'center',
    justifyContent: 'center',
  },
 });
 export default Confirm
