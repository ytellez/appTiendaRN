import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import appFirebase from '../BasedeDatos/Firebase';

const db = getFirestore(appFirebase);

export default function AgregarProducto2() {
  const [foto, setFoto] = useState(''); // aquí guardaremos el Base64
  const [nombreP, setNombreP] = useState('');
  const [precio, setPrecio] = useState('');
  const [horas, setHoras] = useState('');

  // Función para seleccionar imagen y convertirla a Base64
  const seleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a tus fotos.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.5, // reducir tamaño
    });

    if (!resultado.canceled) {
      setFoto(`data:image/jpeg;base64,${resultado.assets[0].base64}`);
    }
  };

  const guardarProducto = async () => {
    if (!foto || !nombreP.trim() || !precio.trim() || !horas.trim()) {
      Alert.alert('Campos vacíos', 'Por favor completa todos los campos.');
      return;
    }

    try {
      await addDoc(collection(db, 'Productos'), {
        foto,
        nombreP,
        precio,
        horas,
        fechaCreacion: new Date(),
      });
      Alert.alert('Éxito', 'Producto agregado correctamente 🎉');
      setFoto('');
      setNombreP('');
      setPrecio('');
      setHoras('');
    } catch (error) {
      console.error('Error al guardar producto: ', error);
      Alert.alert('Error', 'No se pudo guardar el producto.');
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Agregar Producto V2</Text>

      <TouchableOpacity style={styles.botonSeleccionar} onPress={seleccionarImagen}>
        <Text style={styles.textoBoton}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      {foto ? (
        <Image
          source={{ uri: foto }}
          style={styles.preview}
          resizeMode="contain"
        />
      ) : (
        <Text style={styles.mensajePreview}>La imagen se mostrará aquí</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Nombre del Producto"
        placeholderTextColor="#999"
        value={nombreP}
        onChangeText={setNombreP}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />

      <TextInput
        style={styles.input}
        placeholder="Horas"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={horas}
        onChangeText={setHoras}
      />

      <TouchableOpacity style={styles.boton} onPress={guardarProducto}>
        <Text style={styles.textoBoton}>Guardar Producto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f7f7ff',
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#7C7CFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#7C7CFF',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  boton: {
    backgroundColor: '#7C7CFF',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  botonSeleccionar: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  preview: {
    width: '80%',
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
    alignSelf: 'center',
    backgroundColor: '#e8e8ff',
  },
  mensajePreview: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 15,
    fontStyle: 'italic',
  },
});
