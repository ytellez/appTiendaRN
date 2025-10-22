import { StyleSheet, Text, View, Image } from 'react-native'
import { useState, useEffect } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Producto({ url, precio, nombreP, horas }) {

    const [color, setColor] = useState("#fff");

    useEffect(() => {
        setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }, []);

    return (
        <View style={styles.container}>
            <View style={[styles.containerFoto, { backgroundColor: color }]}>
                <Image style={styles.foto} source={{ uri: url }} />
            </View>
            <View style={styles.containerDescrip}>
                <View style={styles.containerPrecio}>
                    <Text style={styles.precio}>{precio}</Text>
                    <FontAwesome name="heart-o" size={24} color="gray" />
                </View>
                <View style={styles.containernombreProduct}>
                    <Text style={styles.nombreProd}>{nombreP}</Text>
                    <Text style={styles.HorasVistoProd}>{horas}  hours ago</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 260,
        width: 185,
        margin: 10,
    },
    containerFoto: {
        flex: 3,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',

        //Sombra superior y los lados
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -5,
        },
        shadowOpacity: 0.10,
        shadowRadius: 1,
        elevation: 3,
    },
    containerDescrip: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#fff',
        //Sombra inferior y los lados
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.10,
        shadowRadius: 1,
        elevation: 3,
    },
    foto: {
        height: 140,
        width: 150,
        marginTop: 15,
    },
    containerPrecio: {
        height: '40%',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
    },
    containernombreProduct: {
        height: '60%',
        width: '100%',
        justifyContent: 'flex-start',
        paddingHorizontal: 12,
    },
    precio: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    nombreProd: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    HorasVistoProd: {
        fontSize: 12,
        color: 'gray',
    }

})