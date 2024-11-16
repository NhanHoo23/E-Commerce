import { FlatList, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { API_URL, COLORS } from '../AppContants'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, deleteCart, increaseQuantity, toggleCartSelection } from '../redux/reducers/cartReducer'
import AppManager from '../utils/AppManager'
import LinearButton from '../components/LinearButton'

const CartScreen = ({ navigation }) => {
  const carts = useSelector(state => state.listCartStore.listCart)
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch()
  const [selectDeleteIcon, setSelectDeleteIcon] = useState(false)
  const [selectedItemToDelete, setSelectedItemToDelete] = useState(null)

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

  const totalPrice = () => {
    let total = 0
    const cartsSelected = carts.filter(item => item.selected)
    cartsSelected.forEach(item => {
      total += item.product.price * item.quantity
    })
    return total
  }

  const deleteItem = async (item) => {
    if (selectDeleteIcon) {
      const cartsSelected = carts.filter(item => item.selected)
      cartsSelected.forEach(item => {
        dispatch(deleteCart(item))
      })
    } else {
      dispatch(deleteCart(selectedItemToDelete))
    }
    setModalVisible(false)
    await updateCart(carts)
  }

  const checkItemSelected = () => {
    return carts.filter(item => item.selected).length
  }

  const renderCartItem = (item) => {
    return (
      <View style={{ flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' }}>
        <Pressable onPress={() => dispatch(toggleCartSelection(item))} style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={item.selected ? require('../assets/ic_selected.png') : require('../assets/ic_unselected.png')} style={{ width: 20, height: 20, backgroundColor: item.selected ? 'black' : 'transparent', borderRadius: item.selected ? 3 : 0 }} />
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
                }
              }}>
                <Image source={require('../assets/ic_minus_black.png')} style={{ width: 24, height: 24 }} />
              </Pressable>
              <Text style={{ fontSize: 16, fontWeight: '500', color: COLORS.textColor, marginHorizontal: 8 }}>{item.quantity}</Text>
              <Pressable onPress={() => {
                if (item.quantity < item.product.quantity) {
                  dispatch(increaseQuantity(item))
                }
              }}>
                <Image source={require('../assets/ic_plus.png')} style={{ width: 24, height: 24 }} />
              </Pressable>
            </View>

            <Pressable onPress={() => {
              setModalVisible(true)
              setSelectDeleteIcon(false)
              setSelectedItemToDelete(item)
            }}>
              <Text style={{ fontSize: 16, color: COLORS.textColor, fontWeight: '500', textDecorationLine: 'underline' }}>Xóa</Text>
            </Pressable>
          </View>
        </View>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <Header
        title={'GIỎ HÀNG'}
        iconRight={carts.length > 0 ? require('../assets/ic_trash.png') : null}
        onBackPress={() => {
          updateCart(carts)
          navigation.goBack()
        }}
        onRightButtonPress={() => {
          if (checkItemSelected() > 0) {
            setModalVisible(true)
            setSelectDeleteIcon(true)
          }
        }}
      />

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

      <View style={{ paddingHorizontal: 24, paddingVertical: 15 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 14, fontWeight: '400', color: '#7D7B7B' }}>Tạm tính</Text>
          <Text style={{ fontSize: 24, fontWeight: '500', color: COLORS.textColor }}>{formatPrice(totalPrice())}
          </Text>
        </View>

        <LinearButton colors={checkItemSelected() > 0 ? ['#007537', '#007537'] : ['#ABABAB', '#ABABAB']} title={'Thanh toán'} onPress={null} style={{ height: 50, with: '100%', marginBottom: 15 }} />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', width: '90%', padding: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: COLORS.textColor }}>Xác nhận xóa đơn hàng?</Text>
            <Text style={{ fontSize: 14, fontWeight: '400', color: '#7D7B7B', marginTop: 8 }}>Thao tác này sẽ không thể khôi phục</Text>

            <LinearButton colors={['#007537', '#007537']} title={'Đồng ý'} onPress={() => deleteItem()} style={{ height: 50, with: '100%', marginBottom: 15 }} />

            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={{ fontSize: 16, fontWeight: '500', color: COLORS.textColor, textDecorationLine: 'underline' }}>Hủy bỏ</Text>
            </Pressable>
          </View>
        </View>

      </Modal>
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