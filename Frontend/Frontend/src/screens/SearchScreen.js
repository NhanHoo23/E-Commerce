import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../AppContants'
import Header from '../components/Header'

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Header title='Tìm kiếm' />
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor
  }
})