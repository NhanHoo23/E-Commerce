import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../AppContants'
import Header from '../components/Header'
import { useSelector } from 'react-redux'

const CartScreen = ({ navigation }) => {
  const carts = useSelector(state => state.listCartStore.listCart)

  return (
    <View style={styles.container}>
      <Header title={'GIỎ HÀNG'} iconRight={null} onBackPress={() => { navigation.goBack() }} />

      {carts.length === 0 &&
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: COLORS.textColor, width: '100%', textAlign: 'center' }}>Giỏ hàng của bạn hiện đang trống</Text>
        </View>
      }
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor
  }
})