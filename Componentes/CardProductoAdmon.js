// components/ProductoCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProductoCard({ foto, nombreP, precio, horas, onEliminar, onEditar }) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: foto }}
        style={styles.imagen}
        resizeMode="cover"
        onError={() => console.log('Error al cargar imagen')}
      />

      <View style={styles.info}>
        <Text style={styles.nombre}>{nombreP}</Text>
        <Text style={styles.precio}>{precio}</Text>
        <Text style={styles.horas}>{horas} horas</Text>

        <View style={styles.botones}>
          <TouchableOpacity style={styles.botonEditar} onPress={onEditar}>
            <Text style={styles.textoBoton}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonEliminar} onPress={onEliminar}>
            <Text style={styles.textoBoton}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  imagen: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  precio: {
    fontSize: 16,
    color: '#7C7CFF',
    marginVertical: 4,
  },
  horas: {
    fontSize: 14,
    color: '#555',
  },
  botones: {
    flexDirection: 'row',
    marginTop: 8,
  },
  botonEditar: {
    backgroundColor: '#7C7CFF',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  botonEliminar: {
    backgroundColor: '#FF6B6B',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
