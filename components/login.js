import 'react-native-gesture-handler';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import React,{Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ImageBackground,Keyboard,Platform,Alert,StyleSheet,StatusBar, Button,Text,TextInput, View ,TouchableOpacity,Image,KeyboardAvoidingView} from 'react-native';
import {createStackNavigator, Assets} from '@react-navigation/stack';


 class Login extends Component {  
  constructor(props) { 
    super(props);  
    this.state = { 
        username:'', 
        password: '',  
        isPasswordVisible: true,  
        toggleText: 'Show', 
        keyboardOffset:0, 
    }; 
  }

    handleToggle = () => {  
      const { isPasswordVisible } = this.state;  
      if (isPasswordVisible) {  
          this.setState({ isPasswordVisible: false });  
          this.setState({ toggleText: 'Hide' });  
      } else {  
          this.setState({ isPasswordVisible: true });  
          this.setState({ toggleText: 'Show' });  
      }  
  };  
  componentWillUnmount=()=>{
    if(Platform.OS=='ios')
    {
        Keyboard.dismiss();
    }
  }
  submitForm =()=>{ 
    const {username,password}=this.state;
    if(this.state.username==''||this.state.password=='')
    {
      Alert.alert("Please enter the username or password");
    }else
    {
    var auth = {
      username: username,
      password: password
    };
      if(auth.username=="user"&&auth.password=="123")
        {
          Alert.alert("Login successful");
          this.props.navigation.navigate('Search');
          
        }
        else if(auth.username=="sidharth"&&auth.password=="120899")
        {
          Alert.alert("Login Successful");
          this.props.navigation.navigate("Search")
        }
        else if(auth.username=="madhaj"&&auth.password=="hello")
        {
          Alert.alert("Login Successful");
          this.props.navigation.navigate("Search")
        }
        else{
          Alert.alert("Login unsuccessful Please try again");
        }
    }
  }

  render() {
    
    return(
 
      <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.Os == "ios" ? "padding" : "padding"} style={styles.container1}>
      <View style={{flexDirection:'row'}}>
      <View style={{alignItems:'flex-start',justifyContent:'flex-start'}}>
      <Text style={{marginLeft:'auto',fontSize:22}}>Username:
      </Text>
      </View>
      <View style={{alignItems:'flex-end'}}>
      <TextInput  
                    style={{height: 30, fontSize: 20,width:300,borderColor: "#000000",
                    borderBottomWidth: 1,}}  
                    placeholder="Enter UserName"  
                    onChangeText={username => this.setState({username})}
                   
                />
                </View>
                </View>
                
                <View style={{flexDirection:'row',marginLeft:'auto'}}>
                  <Text style={{marginLeft:'auto',fontSize:22}}>Password:</Text>
            

      <TextInput  secureTextEntry={this.state.isPasswordVisible}
                    style={{height: 30,borderColor: "#000000",
                    borderBottomWidth: 1, fontSize: 20,width:300}}  
                    placeholder="Enter Password" 
                    ref={ref => (this.passwordInput = ref)} 
                    onChangeText={password => this.setState({password})}
                    onSubmitEditing={this.submitForm} 
                />
                </View>
                
                <View>
                 <TouchableOpacity onPress={this.handleToggle}>  
                 <Text  style={{fontSize: 20}}>{this.state.toggleText}</Text>  
                 </TouchableOpacity>
                 </View>
      <Button  
                        onPress={this.submitForm}  
                        style={{padding:50,width:70}}
                        title="Login"  
                    />  
    
     </KeyboardAvoidingView>
     </View>

  );

    }
    }
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 export default Login;