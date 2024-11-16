import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const Header = ({ title, iconRight, onBackPress, onRightButtonPress }) => {
    const carts = useSelector(state => state.listCartStore.listCart)

    return (
        <View style={styles.container}>
            <Pressable onPress={onBackPress}>
                <Image source={onBackPress ? require('../assets/ic_back.png') : null} style={{ width: 24, height: 24 }} />
            </Pressable>

            <Text style={{ fontWeight: '500', fontSize: 16 }}>{title}</Text>

            <Pressable onPress={iconRight === null ? null : onRightButtonPress}>
                <View>
                    <Image source={iconRight} style={{ width: 24, height: 24 }} />
                    {carts.length > 0 && iconRight === require('../assets/ic_cart.png') &&
                        <View style={{ backgroundColor: 'red', paddingHorizontal: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 10, position: 'absolute', right: -8, top: -8 }}>
                            <Text style={{ color: 'white', fontSize: 12 }}>{carts.length}</Text>
                        </View>
                    }
                </View>
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