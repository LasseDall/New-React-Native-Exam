import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { db, storage } from '../firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore'
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../styles.js';

const VinylPage = ({ navigation, route }) => {
    const title = route.params?.title;
    const id = route.params?.id;
    const uid = route.params?.uid;
    const email = route.params?.email;
    const updateVinyl = route.params?.updateVinyl;
    const [newTitle, setNewTitle] = useState('');
    const [newArtist, setNewArtist] = useState('');
    const [newYear, setNewYear] = useState('');
    const [newCountry, setNewCountry] = useState('');
    const [newValue, setNewValue] = useState('');
    const [imagePath, setImagePath] = useState(null);
    const [imageChanged, setImageChanged] = useState(false);

    async function updateVinylFire(id, title, artist, year, country, value, uid, imagePath, imageChanged) {
        if(title != "") {
            await updateDoc(doc(db, "users", uid, "collection", id), {
                title: title,
                artist: artist,
                year: year,
                country: country,
                value: value
              });
        }
        if (imageChanged) {
          const uploadImage = await fetch(imagePath);
          const blob = await uploadImage.blob();
          const storageRef = await ref(storage, uid + id + ".jpg");
          uploadBytes(storageRef, blob)
          .then( (snapshot) => {
            console.log("Image uploaded!");
            return true;
          })
          .catch((error) => console.log("Image failed to upload: " + error));
        }
    }
  
    useEffect(() => {
      downloadImage();
    }, [])
  
    async function downloadImage() {
      await getDownloadURL(ref(storage, uid + id + ".jpg"))
      .then( (url) => {
        setImagePath(url);
      });
    }
  
    async function launchImagePicker() {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });
      if(!result.canceled) {
        setImageChanged(true);
        return result.assets[0].uri;
      }
    }
    
    async function launchCamera() {
      const result = await ImagePicker.requestCameraPermissionsAsync();
      if (!result) {
        alert("Camera access not provided");
        return null;
      }
    
      try {
        return ImagePicker.launchCameraAsync({
          quality: 1
        })
        .then((response) => {
          if (!response.canceled) {
            setImageChanged(true);
            return response.assets[0].uri;
          } else {
            return null;
          }
        });
      } catch (error) {
        alert("Camera failed: " + error);
        return null;
      }
    }
    
  
    return (
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>{title}</Text>
        <Image style={styles.vinylImg} source={{ uri:imagePath }}/>
        <TextInput
          style={ styles.textInput }
          onChangeText={(txt) => setNewTitle(txt)}
          placeholder='Edit title'
          value={newTitle}
        />
        <TextInput
          style={ styles.textInput }
          onChangeText={(txt) => setNewArtist(txt)}
          placeholder='Edit artist'
          value={newArtist}
        />
        <TextInput
          style={ styles.textInput }
          onChangeText={(txt) => setNewCountry(txt)}
          placeholder='Edit country'
          value={newCountry}
        />
        <TextInput
          style={ styles.textInput }
          onChangeText={(txt) => setNewYear(txt)}
          placeholder='Edit year'
          value={newYear}
        />
        <TextInput
          style={ styles.textInput }
          onChangeText={(txt) => setNewValue(txt)}
          placeholder='Edit value'
          value={newValue}
        />
        <TouchableOpacity style={ styles.button } title='pickImage'  onPress={async () => {
              const img = await launchImagePicker();
              setImagePath(img);
          }}>
          <Text>ADD IMAGE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ styles.button } title='useCamera' onPress={ async () => {
           launchCamera()
           .then((img) => {
            if(img !== null) { 
              setImagePath(img);
            }})
           .catch((error) => console.log(error));
        }}>
          <Text>TAKE PICTURE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={ styles.button }
          title='Save changes'
          onPress={ async () => {
              await updateVinylFire(id, newTitle, newArtist, newYear, newCountry, newValue, uid, imagePath, imageChanged);
              if (imageChanged === false ) {
                navigation.goBack();
              } else {
                setTimeout(() => {
                  navigation.navigate("Home", { imageChanged: true, uid: uid, id: id, email: email });
                  setImageChanged(false);
                }, 2000); 
              }
          }}
        >
          <Text>SAVE CHANGES</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    );
  };

  export default VinylPage;