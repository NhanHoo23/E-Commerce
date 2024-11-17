import { FlatList, Image, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { COLORS } from '../AppContants'
import Header from '../components/Header'
import AppManager from '../utils/AppManager'
import { useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('')
  const [searchHistory, setSearchHistory] = useState([]);
  const products = useSelector(state => state.listProductStore.listProduct)

  useFocusEffect(
    useCallback(() => {
      const fetchSearchHistory = async () => {
        const history = await AppManager.shared.getSearchHistory(); 
        console.log(history); 
        setSearchHistory(history);
      };

      fetchSearchHistory();
      

      return () => {
        setSearchText('');
      };
    }, [])
  );

  const handleSearchSubmit = async () => {
    try {
      if (searchText.trim().length === 0) return

      const historyArray = Array.isArray(searchHistory) ? searchHistory : [];
      const updatedHistory = [searchText, ...historyArray.filter(item => item !== searchText)];
      setSearchHistory(updatedHistory);

      await AppManager.shared.saveSearchHistory(updatedHistory);

      Keyboard.dismiss();
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const selectItem = async (item) => {
    try {
      const historyArray = Array.isArray(searchHistory) ? searchHistory : [];
      const updatedHistory = [item.productName, ...historyArray.filter(ele => ele !== item.productName)];
      setSearchHistory(updatedHistory);

      await AppManager.shared.saveSearchHistory(updatedHistory);

      Keyboard.dismiss();

      setSearchText('');

      navigation.navigate('ProductDetail', { product: item });
    } catch (error) {
      console.log('Error:', error);
    }
  }

  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <View style={styles.container}>
      <Header title='Tìm kiếm' />

      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 1, alignItems: 'center' }}>
          <TextInput value={searchText} onChangeText={setSearchText} onSubmitEditing={handleSearchSubmit} placeholder='Tìm kiếm' style={{ flex: 1, fontSize: 16, paddingVertical: 8 }} placeholderTextColor={'gray'} />
          <Image source={require('../assets/ic_search.png')} style={{ width: 24, height: 24 }} />
        </View>

        {searchText.length === 0 && searchHistory.length > 0 &&
          <View>
            <Text style={{ color: COLORS.textColor, fontSize: 16, fontWeight: '500', marginTop: 20 }}>Tìm kiếm gần đây</Text>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={searchHistory}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                  <Image source={require('../assets/ic_clock.png')} style={{ width: 24, height: 24 }} />
                  <Pressable onPress={() => setSearchText(item)} style={{ flex: 1 }}>
                    <Text style={{ color: COLORS.textColor, fontSize: 16, flex: 1, marginLeft: 8 }}>{item}</Text>
                  </Pressable>
                  <Pressable onPress={() => {
                    const updatedHistory = searchHistory.filter(history => history !== item);
                    setSearchHistory(updatedHistory);
                    AppManager.shared.saveSearchHistory(updatedHistory);
                  }}>
                    <Image source={require('../assets/ic_remove.png')} style={{ width: 24, height: 24 }} />
                  </Pressable>
                </View>
              )}
            />
          </View>
        }

        {searchText.length > 0 &&
          <View>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              data={products.filter(product => product.productName.toLowerCase().includes(searchText.toLowerCase()))}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <Pressable onPress={() => selectItem(item)}>
                  <View style={{ flexDirection: 'row', paddingVertical: 10, alignItems: 'center' }}>
                    <Image source={{ uri: item.images[0] }} style={{ width: 80, height: 80, borderRadius: 8 }} />
                    <View style={{ marginLeft: 16, flex: 1 }}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={{ fontSize: 16, fontWeight: '500', color: COLORS.textColor }}
                      >
                        {item.productName} | {item.plantType ? item.plantType.name : item.category.name}
                      </Text>
                      <Text style={{ fontSize: 14, color: COLORS.textColor }}>{formatPrice(item.price)}</Text>
                      <Text style={{ fontSize: 14, color: COLORS.textColor }}>Còn {item.quantity} sp</Text>
                    </View>
                  </View>
                </Pressable>
              )}
            />
          </View>
        }

      </View>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  }
})