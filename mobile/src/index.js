import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import api from './services/api';
import Position from './Components/Positions/Show/Position';

export default function App() {
  const [positions, setPositions] = useState([]);
  
  useEffect (() => {
    api.get('/positions').then(response => {
      setPositions(response.data);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={positions}
        keyExtractor={(item, index) => index.toString}
        renderItem={({item: position}) => (
          <Position position={position} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  list: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});