import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../AppContants'
import Header from '../components/Header'

const ProductByCateScreen = ({category}) => {
  return (
    <View style={styles.container}>
        <Header title={category.name} />
    </View>
  )
}

export default ProductByCateScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
    }
})