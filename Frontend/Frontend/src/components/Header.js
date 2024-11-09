import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = ({ title, onBackPress, onCartPress }) => {
    return (
        <View style={styles.container}>
            <Pressable onPress={onBackPress}>
                <Image source={require('../assets/ic_back.png')} style={{ width: 24, height: 24 }} />
            </Pressable>

            <Text style={{ fontWeight: '500', fontSize: 16 }}>{title}</Text>

            <Pressable onPress={onCartPress}>
                <Image source={require('../assets/ic_cart.png')} style={{ width: 24, height: 24 }} />
            </Pressable>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 55,
        paddingHorizontal: 24,

    }
})