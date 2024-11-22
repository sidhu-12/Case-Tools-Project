import 'react-native-gesture-handler';
import React,{Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/login.js'
import Home from './components/home.js'
import Register from './components/register.js'
import Search from './components/search.js'
import Cart from './components/cart.js'
import Confirm from './components/confirm.js'

import {createStackNavigator} from '@react-navigation/stack';
import LocationMap from './components/location.js';

const Stack = createStackNavigator();
export default class  App extends Component {
  render(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="Cart" component={Cart}/>
        
        <Stack.Screen name="Confirmation" component={Confirm}/>
        <Stack.Screen name="Location" component={LocationMap}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
  }