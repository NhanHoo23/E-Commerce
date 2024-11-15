import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { API_URL, COLORS } from '../AppContants'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, increaseQuantity } from '../redux/reducers/cartReducer'
import AppManager from '../utils/AppManager'

const CartScreen = ({ navigation }) => {
  const carts = useSelector(state => state.listCartStore.listCart)

  const dispatch = useDispatch()

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const updateCart = async (carts) => {
    try {
      const res = await fetch(`${API_URL}/carts/update-cart/${AppManager.shared.getCurrentUser()._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carts
        })
      })

      if (res.ok) {
        const result = await res.json()
        console.log('Update cart successfully', result)
      } else {
        console.log('Update cart failed')
      }
    } catch (error) {
      console.log('Update cart failed ', error);
    }
  }

  const renderCartItem = (item) => {
    return (
      <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' }}>
        <Pressable style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/ic_unselected.png')} style={{ width: 20, height: 20 }} />
        </Pressable>
        <Image source={{ uri: item.product.images[0] }} style={{ width: 80, height: 80, borderRadius: 8, marginLeft: 16 }} />
        <View style={{ flex: 2, marginLeft: 16 }}>
          <Text style={{ fontSize: 14, color: COLORS.textColor, fontWeight: '500' }}>{item.product.productName} |
            <Text style={{ fontSize: 14, color: '#7b7b7b', fontWeight: '400' }}> {item.product.plantType.name}</Text>
          </Text>

          <Text style={{ fontSize: 16, color: '#007537', fontWeight: '500', marginTop: 8 }}>{formatPrice(item.product.price)}</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }}>
              <Pressable onPress={() => {
                if (item.quantity > 1) {
                  dispatch(decreaseQuantity(item))
                  updateCart(carts)
                }
              }}>
                <Image source={require('../assets/ic_minus_black.png')} style={{ width: 24, height: 24 }} />
              </Pressable>
              <Text style={{ fontSize: 16, fontWeight: '500', color: COLORS.textColor, marginHorizontal: 8 }}>{item.quantity}</Text>
              <Pressable onPress={() => {
                if (item.quantity < item.product.quantity) {
                  dispatch(increaseQuantity(item))
                  updateCart(carts)
                }
              }}>
                <Image source={require('../assets/ic_plus.png')} style={{ width: 24, height: 24 }} />
              </Pressable>
            </View>

            <Text style={{ fontSize: 16, color: COLORS.textColor, fontWeight: '500', textDecorationLine: 'underline' }}>Xóa</Text>
          </View>
        </View>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <Header title={'GIỎ HÀNG'} iconRight={carts.length > 0 ? require('../assets/ic_trash.png') : null} onBackPress={() => { navigation.goBack() }} />

      {carts.length === 0 &&
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 14, color: COLORS.textColor, width: '100%', textAlign: 'center' }}>Giỏ hàng của bạn hiện đang trống</Text>
        </View>
      }

      {carts.length > 0 &&
        <FlatList
          data={carts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => renderCartItem(item)} />
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