import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Header from './components/Header';
import ListItem from './components/ListItem';
import AddItem from './components/AddItem';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { seed } from "./utils/uuidSeed";
import axios from 'axios';

const App = () => {
  // const [items, setItems] = useState([
  //   { id: uuidv4({ random: seed() }), text: 'Mac' },
  //   { id: uuidv4({ random: seed() }), text: 'Mac' },
  //   { id: uuidv4({ random: seed() }), text: 'iPad' },
  //   { id: uuidv4({ random: seed() }), text: 'iPhone' },
  // ]);

  const targetUrl = 'https://facebook.github.io/react-native/movies.json';

  //* Hooks の導入
  const [movies, setMovies] = useState([]);
  // * useEffect 導入 コンポーネントのマウント時に発火させるアクションを宣言
  useEffect(() => {
    fetchMovies();
  }, []);

  // * Axios getMethods
  const fetchMovies = async () => {
    try {
      const response = await axios.get(targetUrl)
        .then(response => setMovies(response.data.movies));
    } catch (error) {
      console.error(error);
    }
  }
  const deleteItem = (id) => {
    setMovies(prevItems => {
      return prevItems.filter(item => item.id != id);
    });
  }

  const addItem = (text) => {
    setMovies(prevItems => {
      return [{ id: uuidv4({ random: seed() }), title: text }, ...prevItems]
    });
  }

  return (
    <View style={styles.container}>
      <Header />
      <AddItem addItem={addItem} />
      <FlatList
        data={movies}
        renderItem={({ item }) => <ListItem item={item}
          deleteItem={deleteItem} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
});

export default App;
