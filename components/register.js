import React, { Component } from 'react'
import { ScrollView,Platform, Picker,Alert,StyleSheet, Button,Text,TextInput, View ,TouchableOpacity,Switch,Image} from 'react-native';

export default class Register extends Component{
   constructor(props)
   {
       super(props);
       this.state={
           name:'',
           mob_no:'',
           aadhar_no:'',
           mail:'',
           city:'',
           password:'',
           gst:'',

       }
   }
    submitForm=()=>{
        Alert.alert("Successfully Done !!!!","Name: "+this.state.name+"\nMobile Number: "+this.state.mob_no+"\nAadhar Number: "+this.state.aadhar_no+"\nE-mail id: "+this.state.mail+"\nCity: "+this.state.city);
    
       this.props.navigation.pop();
       }
       
        
   
    render(){
    return (
      <View style={styles.container}>
      <ScrollView>
          <Text style={{fontSize:20}}>Name</Text>
           <TextInput  
                    style={{height: 40,backgroundColor: 'azure', fontSize: 20 ,margin:10}}  
                    placeholder="Eg:Raj"  
                    onChangeText={name => this.setState({name})}
                    keyboardType="numeric"
                />
                <Text style={{fontSize:20}}>Mobile Number</Text>

                
                <TextInput  
                    style={{height: 40,backgroundColor: 'azure', fontSize: 20,margin:10}}  
                    placeholder="Eg:9876543210"  
                    onChangeText={mob_no => this.setState({mob_no})}
                    keyboardType="numeric"
                />  
                <Text style={{fontSize:20}}>Aadhar Number</Text>
                <TextInput  
                    style={{height: 40,backgroundColor: 'azure', fontSize: 20 ,margin:10}}  
                    placeholder="Eg:123456789012"  
                    onChangeText={truck_no => this.setState({truck_no})}
                />
      <Text style={{fontSize:20}}>E-mail id</Text>
                <TextInput  
                    style={{height: 40,backgroundColor: 'azure', fontSize: 20 ,margin:10}}  
                    placeholder="Eg:mail@gmail.com"  
                    onChangeText={mail => this.setState({mail})}
                />
       <Text style={{fontSize:20}}>City</Text>
                <TextInput  
                    style={{height: 40,backgroundColor: 'azure', fontSize: 20 ,margin:10}}  
                    placeholder="Eg:Area Name"  
                    onChangeText={address => this.setState({address})}
                />
                 <Text style={{fontSize:20}}>Set Password</Text>
                <TextInput  
                secureTextEntry={true}
                    style={{height: 40,backgroundColor: 'azure', fontSize: 20 ,margin:10}}  
                    placeholder="Enter Password"  
                    onChangeText={password => this.setState({password})}
                />

          <View style={{alignItems:'center'}}>
                  <Button  color='#77b5fe'

                        onPress={this.submitForm}  
                        title="Submit"  
                    />  
                    
             </View>
     </ScrollView>
     </View>
   );
    }
}
const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: 'white',
   },
 });
