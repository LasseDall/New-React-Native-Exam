import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { styles } from '../styles.js'; 
import { db } from '../firebase.js';
import { collection, addDoc } from 'firebase/firestore';

const Explore = ({ navigation, route }) => {
    const [albums, setAlbums] = useState([]);
    const uid = route.params?.uid;
  
    const fetchData = async () => {
      try {
        const response = await fetch(`http://172.20.10.4:8080/api/albums`);
  
        if (!response.ok) {
          const result = await response.json();
          console.log(result.data);
        } else {
          const result = await response.json();
          setAlbums(result.data.albums);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const renderItem = ({ item }) => (
      <View style={styles.exploreAlbum}>
        <Text style={styles.exploreText}>{item.title}</Text>
        <Text style={styles.exploreText}>{item.artist}</Text>
        <TouchableOpacity style={styles.button} onPress={() => addToCollection(item)}>
          <Text style={styles.buttonText}>Add to collection</Text>
        </TouchableOpacity>
      </View>
    );
  
    const addToCollection = async (album) => {
      try {
        await addDoc(collection(db, "users", uid, "collection"), {
          title: album.title,
          artist: album.artist,
          country: "UK",
          year: album.year,
          value: "10",
        });
        navigation.goBack();
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Albums</Text>
        <FlatList
          data={albums}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  };
  
  export default Explore;