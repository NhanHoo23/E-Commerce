import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const LinearButton = ({colors, title, style, onPress}) => {
    return (
        <TouchableOpacity style={[{ paddingHorizontal: 16, width: '100%' }, style]} onPress={onPress}>
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.btnSubmit}>
                <Text style={styles.btnSubmitText}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default LinearButton

const styles = StyleSheet.create({
    btnSubmit: {
        width: '100%',
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        backgroundColor: 'red'
    },
    btnSubmitText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 20
    }
})