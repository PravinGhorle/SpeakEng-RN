import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, Text, Button} from 'react-native'
import { Tost } from "../util/Tost";

const Login = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 
  const setSocialLogin = (mail, pass) => {
    setEmail('google');
    setPassword('Google')
    submit()
  }
  const submit = () => {
    if (!email || !password) {
      Tost('Please fill all details!')
      return
    }else
    navigation.navigate("Home",{'login':true})
  }
  return (
    <View style = {{margin:10}}>
      <TextInput
        placeholder="Email"
        onChangeText={(val) => setEmail(val)}
        keyboardType="email-address"
        style={{borderRadius:20, borderWidth:1, marginVertical:10}}/>
      <TextInput
        placeholder="Password"
        onChangeText={(val) => setPassword(val)}
        secureTextEntry={true}
        style={{borderRadius:20, borderWidth:1, marginVertical:10}}
      />
      
      <View
      style = {{flexDirection:'row', justifyContent:'space-between', marginVertical:10}}>
        <Button
        title = "Google"
          onPress={() => setSocialLogin('google','Google')}
        
      
      /><Button
      title = "Submit"
      onPress={() => setSocialLogin('facebook','Facebook')}
      
    
    />
      </View>
      <Button
        title = "Submit"
        onPress={() => submit()}
        color="green"
      
      />
      <View
        style={ {paddingVertical:20}}/>
      <Button
        title = "Skip"
        onPress={() => navigation.replace("Home", {'login':false})}/>
    </View>
  )
}
export default Login