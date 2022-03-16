import React, {useEffect, useState} from 'react';

import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  Dimensions,
  ToastAndroid,
  FlatList,
} from 'react-native';
import { Tost } from '../util/Tost';

const Home = ({navigation, route}) => {
  let data = ['apple', 'banana', 'blackberry', 'Coconut', 'greps'];
  const redirect = (item) => {
    if (route.params.login) {
      navigation.navigate('Profile',{'data':item})
    }else {
      navigation.replace("Login");
      Tost("Log out Successfully!")
    }
  }
  const Item = ({ item, index }) => {
    return (
      <TouchableOpacity key={index}
        onPress={() =>redirect(item)}>
        <Text>
         {item}
        </Text>
      </TouchableOpacity>
    )
  }
return (
  <View>
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={Item}/>
  </View>
  )
}
export default Home;
