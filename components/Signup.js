import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db } from '../firebase.js';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import axios from 'axios';
import { styles } from '../styles.js';

const Signup = ({ navigation, route }) => {
  
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    let [showErrorBox, setShowErrorBox] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const API_KEY = "AIzaSyDMRNaAdpZ4qpu_wKgG2UBBGDb5Qj8wScg";
    const SIGNUP_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="

    async function signup(email, password) {
      try {
        const response = await axios.post(SIGNUP_URL + API_KEY, {
          email: email,
          password: password,
          returnSecureToken: true
        });
        const uid = response.data.localId;
        const result = await setDoc(doc(db, "users", uid), {});
        await collection(db, "users", uid, "collection");
        navigation.navigate("Home", { email: email, uid: uid });
      } catch(error) {
        showErrorBoxFunction(error.response.data.error.message);
      }
    }
  
    const showErrorBoxFunction = (errorMessage) => {
      setShowErrorBox(true);
      setErrorMessage(errorMessage);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>New user</Text>
        <TextInput
          style={ styles.textInput }
          onChangeText={(txt) => setNewUsername(txt)}
          placeholder='Username'
          value={newUsername}
        />
        <TextInput
          style={ styles.textInput }
          onChangeText={(txt) => setNewPassword(txt)}
          placeholder='Password'
          value={newPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={ styles.button}
          title='createAccount'
          onPress={() => {signup(newUsername, newPassword)}}
        >
          <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
        {showErrorBox && (
          <View style={{ padding: 10 }}>
            <Text id='errorMessage' style={{ color: 'red' }}>{errorMessage}</Text>
          </View>
        )}
  
      </View>
  )};

  export default Signup;