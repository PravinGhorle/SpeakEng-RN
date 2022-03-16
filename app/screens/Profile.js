import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const Profile = ({navigation, route}) => {
  const {data} = route.params
  return (
    <View>
      <Text>
        Name: {data}
      </Text>
      <Text>
        It Is a Fruit
      </Text>
    </View>
  );
}
export default Profile;