import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles.js';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase.js';

const auth = getAuth(app);

const Login = ({ navigation, route }) => {
    
    async function login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
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