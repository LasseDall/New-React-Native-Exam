import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db, app } from '../firebase.js';
import { collection, doc, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { styles } from '../styles.js';

const Signup = ({ navigation, route }) => {
  
    const auth = getAuth(app);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    let [showErrorBox, setShowErrorBox] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    async function signup(email, password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        await setDoc(doc(db, "users", uid), {});
        await collection(db, "users", uid, "collection");
        navigation.navigate("Home", { email: email, uid: uid });
      } catch (error) {
        showErrorBoxFunction(error);
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