import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import AgregarCategoria from './Screens/AgregarCategoria';
import MostrarProductos from './Screens/MostrarProductos';
import CRUDProdAdmon from './Screens/CRUDProdAdmon';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';
import AgregarProducto2 from './Screens/AgregarProducto2';
import GestionUsuarios from './Screens/GestionUsuarios';
import Login from './Screens/Login';

const Tab = createBottomTabNavigator();
const StackNav = createNativeStackNavigator();

function MyTabsCliente() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Comprar"
                component={MostrarProductos}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bag-add" color={"#7C7CFF"} size={size} />
                    ),
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="GestionUsuarios"
                component={GestionUsuarios}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="pricetags-outline" color={"#7C7CFF"} size={size} />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    )
}

function MyTabsAdmon() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Productos"
                component={CRUDProdAdmon}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle-sharp" color={"#7C7CFF"} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="AgregarProductos"
                component={AgregarProducto2}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle-sharp" color={"#7C7CFF"} size={size} />
                    ),
                    headerShown: false,
                }}
            />
               <Tab.Screen
                name="GestionUsuarios"
                component={GestionUsuarios}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="pricetags-outline" color={"#7C7CFF"} size={size} />
                    ),
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="AñadirCategoría"
                component={AgregarCategoria}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="pricetags-outline" color={"#7C7CFF"} size={size} />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    )
}

function StackLogin() {
    return (
        <StackNav.Navigator initialRouteName="Login" 
            screenOptions={{ headerShown: false }}>
            <StackNav.Screen name="Login" component={Login} />
            <StackNav.Screen name="MyTabsCliente" component={MyTabsCliente} />
            <StackNav.Screen name="MyTabsAdmon" component={MyTabsAdmon} />
        </StackNav.Navigator>
    )
}

/*function DrawerNavigate() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="MostrarProductos">
                    <Drawer.Screen name="Listar Productos" component={MostrarProductos} />
                    <Drawer.Screen name="Categorias" component={AgregarCategoria} />
                </Drawer.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>

    );

}*/

export default function Navegacion() {
    return (
        <NavigationContainer>
            <StackLogin />
        </NavigationContainer>
    )
}