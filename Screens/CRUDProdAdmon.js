// components/MostrarProductos.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Modal } from 'react-native';
import { collection, getDocs, deleteDoc, doc, getFirestore } from 'firebase/firestore';
import appFirebase from '../BasedeDatos/Firebase';
import { Ionicons } from '@expo/vector-icons';
import ProductoCard from '../Componentes/CardProductoAdmon';
import AgregarProducto from './AgregarProducto';

const db = getFirestore(appFirebase);

export default function MostrarProductos() {
    const [productos, setProductos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'Productos'));
            const lista = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProductos(lista);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            Alert.alert('Error', 'No se pudieron cargar los productos');
        }
    };


    const eliminarProducto = async (id) => {
        try {
            await deleteDoc(doc(db, 'Productos', id));
            setProductos(productos.filter(p => p.id !== id));
            Alert.alert('Eliminado', 'Producto eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar:', error);
            Alert.alert('Error', 'No se pudo eliminar el producto');
        }
    };

    return (
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>Lista de Productos</Text>

          
            <TouchableOpacity
                style={styles.botonAgregar}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons name="add-circle" size={65} color="#7C7CFF" />
            </TouchableOpacity>

            <FlatList
                data={productos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ProductoCard
                        foto={item.foto}
                        nombreP={item.nombreP}
                        precio={item.precio}
                        horas={item.horas}
                        onEliminar={() => eliminarProducto(item.id)}
                        onEditar={() => Alert.alert('Editar', `Editar producto: ${item.nombreP}`)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.vacio}>No hay productos registrados</Text>}
                contentContainerStyle={productos.length === 0 && { flex: 1, justifyContent: 'center' }}
            />

            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <AgregarProducto
                    onCancelar={() => setModalVisible(false)}
                />
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: '#f7f7ff',
        padding: 35,
    },
    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#7C7CFF',
        textAlign: 'center',
        marginBottom: 50,
    },
    vacio: {
        textAlign: 'center',
        color: '#999',
        fontStyle: 'italic',
    },
});
