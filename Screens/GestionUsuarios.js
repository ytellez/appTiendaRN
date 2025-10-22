import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

export default function GestionUsuarios({navigation}) {
    const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // 👈 vuelve al login
    });
  };
  return (
    <View style={styles.container} >
         <Text style={styles.title}>Pantalla de Administrador</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
        alignItems: 'center',
        justifyContent: 'center',
    },
      title: {
    fontSize: 22,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#e84118',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})