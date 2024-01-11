import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { styles } from '../styles.js'; 
import { db } from '../firebase.js';
import { collection, addDoc } from 'firebase/firestore';

const Explore = ({ navigation, route }) => {
    const [albums, setAlbums] = useState([]);
    const uid = route.params?.uid;
    const [page, setPage] = useState(1);
    const [totalAlbums, setTotalAlbums] = useState(10);
  
    const fetchData = async () => {
      try {
        const response = await fetch(`http://172.20.10.6:8080/api/albums?page=${page}`);
  
        if (!response.ok) {
          const result = await response.json();
          console.log(result.data);
        } else {
          const result = await response.json();
          setAlbums(result.data.albums);
          setTotalAlbums(result.data.totalAlbums);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);

    useEffect(() => {
        fetchData();
      }, [page]);
  
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

    function handlePageShift(shift) {
        if (shift === "pre") {
            if (page > 1) {
                setPage(Number(page) - 1);
            }
        } else {
            const totalPages = Number(totalAlbums)/10;
            if (page < totalPages) {
                const nextPage = Number(page) + 1;
                setPage(nextPage);
            }
        }
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Albums</Text>
        <FlatList
          data={albums}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <View style={styles.buttonContainer}>
            <TouchableOpacity 
                style={styles.pageButton}
                onPress={async () => await handlePageShift("pre")}>
                <Text style={styles.buttonText}>Privious page</Text>
            </TouchableOpacity>
            <Text style={styles.page}>{page}</Text>
            <TouchableOpacity 
                style={styles.pageButton}
                onPress={async () => await handlePageShift("next")}>
                <Text style={styles.buttonText}>Next page</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default Explore;