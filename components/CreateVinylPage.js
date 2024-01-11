import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { styles } from '../styles.js'; 
import { db } from '../firebase.js';
import { collection, addDoc } from 'firebase/firestore';

const CreateVinylPage = ({ navigation, route }) => {

    const email = route.params?.email;
    const uid = route.params?.uid;
    const [newTitle, setNewTitle] = useState('');
    const [newArtist, setNewArtist] = useState('');
    const [newCountry, setNewCountry] = useState('');
    const [newYear, setNewYear] = useState('');
    const [newValue, setNewValue] = useState('');
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>New vinyl</Text>
        <TextInput
          style={ styles.textInput }
          onChangeText={(txt) => setNewTitle(txt)}
          placeholder='Title'
          value={newTitle}
        />
        <TextInput
          style={ styles.textInput }
          onChangeText={(txt) => setNewArtist(txt)}
          placeholder='Artist'
          value={newArtist}
        />
        <TextInput
          style={ styles.textInput }
          onChangeText={(txt) => setNewCountry(txt)}
          placeholder='Country'
          value={newCountry}
        />
        <TextInput
          style={ styles.textInput }
          onChangeText={(txt) => setNewYear(txt)}
          placeholder='Year'
          value={newYear}
        />
        <TextInput
          style={ styles.textInput }
          onChangeText={(txt) => setNewValue(txt)}
          placeholder='Value ($)'
          value={newValue}
        />
        <TouchableOpacity
          style={ styles.button }
          title='Add new vinyl'
          onPress={ async () => {
              try {
                await addDoc(collection(db, "users", uid, "collection"), { title: newTitle, artist: newArtist, country: newCountry, year: newYear, value: newValue });
                navigation.goBack();
              } catch(err) {
                console.log(err);
              }
            Keyboard.dismiss();
          }}
        >
        <Text style={styles.buttonText}>ADD VINYL TO COLLECTION</Text>
        </TouchableOpacity>
      </View>
    );
  }

  export default CreateVinylPage;