import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { styles } from '../styles.js';

const API_KEY = "AIzaSyDMRNaAdpZ4qpu_wKgG2UBBGDb5Qj8wScg";
const AUTH_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";

const Login = ({ navigation, route }) => {

    async function login(email, password) {
      console.log(email, password)
      try {
        const response = await axios.post(AUTH_URL + API_KEY, {
          email: email,
          password: password,
          returnSecureToken: true,
        });
        const uid = response.data.localId;
        navigation.navigate("Home", { email: email, uid: uid });
      } catch (error) {
        alert("Wrong password or username");
      }
    }
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Login</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(txt) => setUsername(txt)}
          placeholder='Username'
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(txt) => setPassword(txt)}
          placeholder='Password'
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => { login(username, password) }}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={ styles.button } 
          title='createAccount' 
          onPress={ () => {
            navigation.navigate("Signup");
        }}>
          <Text style={styles.buttonText}>CREATE NEW ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    );
  };

  export default Login;