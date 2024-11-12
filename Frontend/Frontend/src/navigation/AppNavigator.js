import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NativeScreenContainer } from 'react-native-screens'
import SplashScreen from '../screens/SplashScreen'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import MainScreen from '../screens/MainScreen'
import ProductByCateScreen from '../screens/ProductByCateScreen'
import ProductDetail from '../screens/ProductDetail'
import UpdateInfo from '../screens/UpdateInfo'

const Stack = createStackNavigator()

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="ProductByCate" component={ProductByCateScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="UpdateInfo" component={UpdateInfo} />

        </Stack.Navigator>

    </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})