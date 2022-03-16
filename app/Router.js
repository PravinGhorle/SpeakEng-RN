import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home";
import Profile from "./screens/Profile";
const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}
          options={{
            title: "SpeakEng",
            headerTitleAlign:'center'            
          }} />
        <Stack.Screen name = "Profile" component = {Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;