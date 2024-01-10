import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, FlatList, View, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { db, storage } from '../firebase.js';
import { ref, getDownloadURL } from 'firebase/storage';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, deleteDoc } from 'firebase/firestore'
import { styles } from '../styles.js';

const Home = ({ navigation, route }) => {
    const email = route.params?.email;
    const uid = route.params?.uid;
    const [values, loading, error] = useCollection(collection(db, "users", uid, "collection"));
    const [data, setData] = useState([]);
    const [imagePaths, setImagePaths] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [totalValue, setTotalValue] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      fetchData();
    }, [values, route.params, searchTerm]);
  
    const fetchData = async () => {
      if (values) {
        const newData = values.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const filteredData = searchTerm
          ? newData.filter(
            (item) =>
              item.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
              item.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          : newData;
        setData(filteredData);
        const newTotalValue = calculateTotalValue(newData);
        setTotalValue(newTotalValue);
        downloadImages(newData);
      }
  
      if (route.params && route.params.imageChanged) {
        const updatedId = route.params.id;
        const updatedImagePath = await downloadImage(updatedId);
  
        setImagePaths((prevPaths) => ({
          ...prevPaths,
          [updatedId]: updatedImagePath,
        }));
      }
    };
  
    const downloadImage = async (id) => {
      try {
        const url = await getDownloadURL(ref(storage, uid + id + ".jpg"));
        return url;
      } catch (error) {
        console.error("Error downloading image:", error);
        return null;
      }
    };
  
    const genericVinylImage = async () => {
      try {
        const url = await getDownloadURL(ref(storage, 'gericvinyl.png.png'));
        return url;
      } catch (error) {
        console.error("Error downloading generic image:", error);
        return null;
      }
    };
  
    const downloadImages = async (data) => {
      const paths = {};
      await Promise.all(
        data.map(async (item) => {
            const imagePath = await downloadImage(item.id);
            if(imagePath) {
              paths[item.id] = imagePath;
            } else {
              paths[item.id] = await genericVinylImage(); 
            }
        })
      );
      setImagePaths(paths);
    };
  
    const deleteDocument = async (id) => {
      await deleteDoc(doc(db, "users", uid, "collection", id));
    };
  
    const updateVinyl = (id, newVinyl) => {
      setNotes((prevVinyl) => ({
        ...prevVinyl,
        [id]: newVinyl,
      }));
    };
  
    const calculateTotalValue = (list) => {
      let totalValue = 0;
      list.forEach((item) => {
        totalValue += Number(item.value) || 0;
      });
      return totalValue;
    };
  
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate("VinylPage", { id: item.id, title: item.title, uid: uid, email: email, updateVinyl: updateVinyl });
        }}
      >
        <View>
          {imagePaths[item.id] !== null ? (
            <Image style={{ width: 200, height: 200 }} source={{ uri: imagePaths[item.id] }} />       
             ) : (
            <Text style={{ width: 200, height: 200 }}>Add image</Text>
          )}
          <Text style={styles.itemText}>{item.title}</Text>
          <Text style={styles.itemText}>{item.artist}</Text>
          <Text style={styles.itemText}>{item.country} {item.year}</Text>
          <Text style={styles.itemText}>{item.value}</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteDocument(item.id)}>
          <View style={styles.deleteView}>
            <Text style={styles.deleteButtonText}>x</Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  
    const sortByValue = (order) => {
      const sortedData = [...data];
      sortedData.sort((a, b) => {
        const valueA = Number(a.value) || 0;
        const valueB = Number(b.value) || 0;
        return order === 'asc' ? valueA - valueB : valueB - valueA;
      });
      return sortedData;
    };
  
    const sortByYear = (order) => {
      const sortedData = [...data];
      sortedData.sort((a, b) => {
        const yearA = Number(a.year) || 0;
        const yearB = Number(b.year) || 0;
        return order === 'asc' ? yearA - yearB : yearB - yearA;
      });
      return sortedData;
    };
  
    const handleSort = (value) => {
      let sortedData;
      if (value === 'asc' || value === 'desc') {
        sortedData = sortByValue(value);
      } else if (value === 'yearAsc' || value === 'yearDesc') {
        const order = value === 'yearAsc' ? 'asc' : 'desc';
        sortedData = sortByYear(order);
      }
      setData(sortedData);
      setSortOrder(value);
    };
  
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>My Collection</Text>
        <Text>Total value: {totalValue} $</Text>
        <RNPickerSelect
          placeholder={{ label: 'Sort by', value: null }}
          onValueChange={(value) => handleSort(value)}
          items={[
            { label: 'Value (Lowest to Highest)', value: 'asc' },
            { label: 'Value (Highest to Lowest)', value: 'desc' },
            { label: 'Year (Oldest to Newest)', value: 'yearAsc' },
            { label: 'Year (Newest to Oldest)', value: 'yearDesc' },
          ]}
      value={sortOrder}
    />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />
        <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id} />
        <TouchableOpacity
          style={styles.button}
          title='New vinyl'
          onPress={() => {
            navigation.navigate("CreateVinylPage", { email: email, uid: uid });
          }}
        ><Text style={styles.buttonText}>New vinyl</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          title='Explore'
          onPress={() => {
            navigation.navigate("Explore", { uid: uid });
          }}
        ><Text style={styles.buttonText}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          title='Logout'
          onPress={() => {
            navigation.navigate("Login");
          }}
        ><Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  };

  export default Home;