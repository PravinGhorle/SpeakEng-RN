import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Login from './screens/Login';
const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name = "Login" component = {Login} />
        <Stack.Screen name="Home" component={Home}
          />
        <Stack.Screen name="Profile" component={Profile}
          options={{title:"Details"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;