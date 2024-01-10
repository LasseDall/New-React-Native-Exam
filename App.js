import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Explore from './components/Explore.js';
import CreateVinylPage from './components/CreateVinylPage.js';
import VinylPage from './components/VinylPage.js';
import Home from './components/Home.js';
import Signup from './components/Signup.js';
import Login from './components/Login.js';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name='Signup'
          component={Signup}
          options={{ title: 'Signup' }}
        />
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name='VinylPage'
          component={VinylPage}
          options={{ title: 'Vinyl' }}
        />
        <Stack.Screen
          name='CreateVinylPage'
          component={CreateVinylPage}
          options={{ title: 'New vinyl' }}
        />
        <Stack.Screen
          name='Explore'
          component={Explore}
          options={{ title: 'Explore' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


