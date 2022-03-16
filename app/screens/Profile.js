import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const Profile = () => {
  const [text, settext] = useState('');
  const [chat, setChat] = useState([]);
  return (
    <View style={{ padding: 20, flex: 1 }}>
      <ScrollView style={{ flex: 1 }} >
        {console.log(chat)}
        {chat?.map((item, index) => {
          return (<View key={index} >
            <Text  style={{ color: 'black' }}>{item.text}</Text>
            <Text  style={{ color: 'red' }}>from{item.user}</Text>
            </View>)
        })}
      </ScrollView>
      <View style={{ flexDirection: 'row', borderWidth: 1 }}>
        <TouchableOpacity
        onPress={() => {
          let temp = chat;
          //console.log(temp.push(sender));
          temp.push({"user":"reciver","text":text});
          setChat(temp);
        }}>
        <Text style = {{color:'black'}}>
            reciver
          </Text>
        </TouchableOpacity>
      <TextInput
          style={{
            bottom: 0,
            color:'black',
            height: 100,
            width: '70%'
          }}
          onChangeText={ (val)=>settext(val)}/>
        <TouchableOpacity onPress={() => {
          let temp = chat;
          console.log(temp.push(text));
          temp.push({"user":"sender","text":text});
          setChat(temp);
        }}>
          <Text style = {{color:'black'}}>
            send
          </Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}
export default Profile;