import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import appFirebase from '../BasedeDatos/Firebase';

const db = getFirestore(appFirebase);

export default function AgregarProducto() {
  const [foto, setFoto] = useState('');
  const [nombreP, setNombreP] = useState('');
  const [precio, setPrecio] = useState('');
  const [horas, setHoras] = useState('');

  const guardarProducto = async () => {
    if (!foto.trim() || !nombreP.trim() || !precio.trim() || !horas.trim()) {
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
      <Text style={styles.titulo}>Agregar Producto</Text>

      <Text style={styles.label}>Foto (URL o nombre del archivo)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. https://miimagen.com/foto.png"
        placeholderTextColor="#999"
        value={foto}
        onChangeText={setFoto}
      />

        {foto ? (
        <Image
          source={{ uri: foto }}
          style={styles.preview}
          resizeMode="contain"
          onError={() => Alert.alert('Error', 'No se pudo cargar la imagen')}
        />
      ) : (
        <Text style={styles.mensajePreview}>La imagen se mostrará aquí</Text>
      )}

      <Text style={styles.label}>Nombre del Producto</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Cámara - Videos"
        placeholderTextColor="#999"
        value={nombreP}
        onChangeText={setNombreP}
      />

      <Text style={styles.label}>Precio</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. $450"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />

      <Text style={styles.label}>Horas</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 4"
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
  label: {
    color: '#7C7CFF',
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600',
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
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    marginTop: 10,
  },
  textoBoton: {
    color: '#f7f7ff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
   preview: {
    width: '80%',
    height: 100,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#e8e8ff',
  },
  mensajePreview: {
    textAlign: 'center',
    color: '#999',
    marginBottom: 15,
    fontStyle: 'italic',
  },
});
