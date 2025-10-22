import { StyleSheet, Text, View } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Categoria({nombre, texto}) {
  return (
    <View style={styles.container}>
      <FontAwesome5 name={nombre} size={35} color="#7C7CFF" />
      <Text style={styles.text}>{texto}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height:80,
    width:100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
     },
  text:{
    fontWeight:'bold',
    color:"#7C7CFF"
  }
})