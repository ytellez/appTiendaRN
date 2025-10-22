import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, FlatList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Categoria from '../Componentes/Categoria'
import Producto from '../Componentes/Producto';
import { useEffect, useState } from 'react';

import { collection, getFirestore, getDocs } from 'firebase/firestore'
import appFirebase from '../BasedeDatos/Firebase';
const db = getFirestore(appFirebase)

export default function MostrarProductos() {
  const [Categorias, setCategorias] = useState([]);
  const [Productos, setProductos] = useState([]);

  useEffect(() => {
    recibirDatos();
    leerProductos();
  }, [Categorias], [Productos]);

  const recibirDatos = async () => {
    const q = collection(db, 'Categorias');
    const querySnapshot = await getDocs(q);
    const d = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setCategorias(d);
  }

  const leerProductos = async () => {
    const q = collection(db, 'Productos');
    const querySnapshot = await getDocs(q);
    const d = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setProductos(d);
  }

  return (
    <View style={styles.container}>

      <View style={styles.buscador}>
        <FontAwesome name="search" size={20} color="#7C7CFF" />
        <TextInput
          style={styles.textoBuscador}
          placeholder="Search"
          placeholderTextColor="#7C7CFF"></TextInput>
      </View>

      <View style={styles.contenedorCategorias}>

        <ScrollView horizontal>
          {Categorias.map((i) => (
            <Categoria key={i.id} nombre={i.nombre} texto={i.texto}></Categoria>
          ))}
        </ScrollView>
      </View>
      <Text style={styles.texto}>News</Text>
      <FlatList
        data={Productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Producto url={item.foto} nombreP={item.nombreP} precio={item.precio} horas={item.horas} />
        )}
        numColumns={2}
      />
      {/*
         <Producto foto={require('./Imagenes/zapatos.png')}
           nombreP='Blue Shoes'
           precio='$ 54'
           horas='6'
         ></Producto>
 
         <Producto foto={require('./Imagenes/mouse.png')}
           nombreP='Black Mouse'
           precio='$ 18'
           horas='5'
         ></Producto>
 
         <Producto foto={require('./Imagenes/monitor.png')}
           nombreP='Monitor 25"'
           precio='$ 180'
           horas='7'
         ></Producto>
 
         <Producto foto={require('./Imagenes/dd.png')}
           nombreP='Portable HD'
           precio='$ 12'
           horas='12'
         ></Producto>
 
         <Producto foto={require('./Imagenes/dd.png')}
           nombreP='Portable HD'
           precio='$ 12'
           horas='12'
         ></Producto>*/}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buscador: {
    width: '90%',
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7ff",
    marginTop: 60,
    padding: 15,
    borderRadius: 10,
  },
  textoBuscador: {
    flex: 1,
    height: 45,
    color: "#7C7CFF",
    fontSize: 15,
    paddingLeft: 15,
  },
  contenedorCategorias: {
    height: 80,
    width: '95%',
    marginVertical: 15,
  },
  contenedorProductos: {
    flex: 1,
  },
  texto: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'baseline',
    marginLeft: 30,
  }
});
