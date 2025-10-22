import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

import appFirebase from '../BasedeDatos/Firebase';
const db = getFirestore(appFirebase)

export default function AgregarCategoria() {
  const [nombre, setNombre] = useState('');
  const [texto, setTexto] = useState('');

  const guardarCategoria = async () => {
    if (!nombre.trim() || !texto.trim()) {
      Alert.alert('Campos vacíos', 'Por favor completa todos los campos.');
      return;
    }

    try {
      await addDoc(collection(db, 'Categorias'), {
        nombre,
        texto,
       // fechaCreacion: new Date(),
      });
      Alert.alert('Éxito', 'Categoría agregada correctamente 🎉');
      setNombre('');
      setTexto('');
    } catch (error) {
      console.error('Error al guardar categoría: ', error);
      Alert.alert('Error', 'No se pudo guardar la categoría.');
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Agregar Categoría</Text>

      <Text style={styles.label}>Nombre del Ícono</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 🍹fruit"
        placeholderTextColor="#999"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Nombre de la categoría"
        placeholderTextColor="#999"
        value={texto}
        onChangeText={setTexto}
      />

      <TouchableOpacity style={styles.boton} onPress={guardarCategoria}>
        <Text style={styles.textoBoton}>Guardar Categoría</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f7f7ff', // Fondo claro
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
});