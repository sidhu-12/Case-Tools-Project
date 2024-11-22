import React, { Component } from 'react'
import Modal, { ModalFooter, ModalButton, ModalContent ,SlideAnimation} from 'react-native-modals';
import {  Image,FlatList,ScrollView, Alert,StyleSheet, Button,Text,TextInput, View ,TouchableOpacity,Switch} from 'react-native';
var food=require("./food-data.json")
export default class Search extends Component{
   constructor(props)
   {
       super(props);
       this.state={
        op:food,
        key:-1,
        visible:false,

       };
       this.acceptForm=this.acceptForm.bind(this);
       this.rejectForm=this.rejectForm.bind(this);
       this.total=0;
       this.cart=[];
   }
    acceptForm=(i)=>{
      //console.log(i);
      Alert.alert(this.state.op[i].name+" is added to the cart");
      //console.log(this.state.op[i])
      this.total+=this.state.op[i].value;
      this.cart.push(this.state.op[i]);
      console.log(this.total+this.cart);
      console.log(this.cart)
       
       
       }
   rejectForm=(i)=>{
    const index = this.cart.indexOf(this.state.op[i]);
if (index > -1) {
  this.cart.splice(index, 1);
  Alert.alert(this.state.op[i].name+" is removed from the cart")
console.log(this.cart)
this.total-=this.state.op[i].value;
if(this.total<=0)
{
  this.total=0;
}
else
{
  Alert.alert("Selected product is not added to cart already");
}
}
   }
    //this.props.navigation.navigate('Consign Notification',{uname:this.props.route.params.uname});

        


   
    render(){
        var output=[]; 
        for(let i=0;i<this.state.op.length;i++){
            output.push(<View style={{flexDirection:'row',borderBottomWidth:1,borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1}}key={i}>
                 <View style={{justifyContent:'flex-start'}}>
                 <Text style={{fontSize:16}}>Product name:{this.state.op[i].name}</Text>
                 <Text style={{fontSize:16}}>Price:{this.state.op[i].price}</Text>
                 <Text style={{fontSize:16}}>Quantity:{this.state.op[i].label}</Text>
                 </View>
                 <View style={{justifyContent:'space-between',alignSelf:'flex-end',marginLeft:'auto'}}>
                 <View style={{marginBottom:5}}>
                          </View>
                          <View style={{marginBottom:5}}>
                  <Button color='green'
                              onPress={()=>this.acceptForm(i)}  
                              title="Add"
                              
                          />  
                          </View>
                          <View style={{marginBottom:5}}>
                  <Button color='red'
                              onPress={()=>this.rejectForm(i)}  
                              title="Remove"
                              
                          />  
                          </View>
                          </View>
                          </View>);}
     
       
    return (
        <View style={styles.container}>
      <ScrollView style={styles.container} >
          {output}
        </ScrollView>
        <Button title="Finished"
        onPress={()=>{this.props.navigation.navigate("Cart",{cart:this.cart,total:this.total})}}/>
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
