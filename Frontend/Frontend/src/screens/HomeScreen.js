import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../AppContants'
import { Pressable } from 'react-native-gesture-handler'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        <Image source={require('../assets/img_banner.png')} style={styles.bannerImage} />
        <View style={styles.bannerText}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <Text style={{ fontSize: 24, fontWeight: '500', width: '60%' }}>Planta - toả sáng không gian nhà bạn</Text>
            <Pressable style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../assets/ic_cart.png')} />
            </Pressable>
          </View>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16, }} >
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#007537' }}>Xem hàng mới về</Text>
            <Image source={require('../assets/ic_rightArrow.png')} style={{ marginLeft: 5 }} />
          </Pressable>
        </View>
      </View>

      <View >

      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor
  },
  bannerContainer: {
    backgroundColor: '#F6F6F6'
  },
  bannerImage: {
    width: '100%',
    marginTop: 100
  },
  bannerText: {
    position: 'absolute', 
    padding: 20, 
    paddingTop: 60
  }
})