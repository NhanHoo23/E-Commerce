import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header';
import { COLORS } from '../AppContants';
import Swiper from 'react-native-swiper';
import LinearButton from '../components/LinearButton';

const ProductDetail = ({ route, navigation }) => {
    const { product } = route.params;
    const [count, setcount] = useState(0)

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN') + 'đ';
    };

    return (
        <View style={styles.container}>
            <Header title={product.productName} iconRight={require('../assets/ic_cart.png')} onBackPress={() => { navigation.goBack() }} />

            <View style={{ flex: 1 }}>
                <ScrollView>
                    <Swiper
                        style={{ height: 270 }}
                        showsButtons
                        loop={true}
                        nextButton={<Image source={require('../assets/bt_next.png')} />}
                        prevButton={<Image source={require('../assets/bt_prev.png')} />}
                        activeDotColor='black'
                    >
                        {product.images.map((image, index) => (
                            <View key={index} style={styles.imageContainer}>
                                <Image source={{ uri: image }} style={styles.image} />
                            </View>
                        ))}
                    </Swiper>

                    <View style={{ paddingHorizontal: 48 }}>
                        <View style={{ flexDirection: 'row', paddingVertical: 15 }}>
                            <View style={{ borderRadius: 4, paddingVertical: 4, paddingHorizontal: 8, backgroundColor: '#009245', marginRight: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: '400', color: 'white' }}>{product.category.name}</Text>
                            </View>
                            {product.plantType &&
                                <View style={{ borderRadius: 4, paddingVertical: 4, paddingHorizontal: 8, backgroundColor: '#009245' }}>
                                    <Text style={{ fontSize: 14, fontWeight: '400', color: 'white' }}>{product.plantType.name}</Text>
                                </View>}
                        </View>

                        <Text style={{ fontSize: 24, fontWeight: '500', marginTop: 8, color: '#007537' }}>{formatPrice(product.price)}</Text>
                        <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 8, color: COLORS.textColor }}>Chi tiết sản phẩm</Text>
                        <View style={{ height: 1, backgroundColor: COLORS.textColor, marginTop: 5 }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: COLORS.textColor }}>Xuất xứ</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: COLORS.textColor }}>{product.origin}</Text>
                        </View>
                        <View style={{ height: 0.5, backgroundColor: COLORS.textColor, marginTop: 5 }} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: COLORS.textColor }}>Tình trạng</Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: COLORS.textColor }}>Còn {product.quantity} sp</Text>
                        </View>
                        <View style={{ height: 0.5, backgroundColor: COLORS.textColor, marginTop: 5 }} />
                    </View>
                </ScrollView>
            </View>

            <View style={{ paddingHorizontal: 24, paddingVertical: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#7D7B7B' }}>Đã chọn {count} sản phẩm</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: 'space-between' }}>
                            <Pressable onPress={() => {
                                
                                if (count > 0) { setcount(count - 1) }
                            }}>
                                <Image source={count > 0 ? require('../assets/ic_minus_black.png') : require('../assets/ic_minus.png')} style={{ width: 24, height: 24 }} />
                            </Pressable>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: COLORS.textColor, marginHorizontal: 8 }}>{count}</Text>
                            <Pressable onPress={() => {
                                if (count < product.quantity) {setcount(count + 1)}
                            }}>
                                <Image source={require('../assets/ic_plus.png')} style={{ width: 24, height: 24 }} />
                            </Pressable>
                        </View>
                    </View>

                    <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 14, fontWeight: '400', color: '#7D7B7B' }}>Tạm tính</Text>
                        <Text style={{ fontSize: 24, fontWeight: '500', color: COLORS.textColor }}>{formatPrice(product.price * count)}</Text>
                    </View>
                </View>

                <LinearButton colors={count > 0 ? ['#007537', '#007537'] : ['#ABABAB', '#ABABAB']} title={'Chọn mua'} onPress={null} style={{ height: 50, with: '100%', marginBottom: 15 }} />
            </View>

        </View>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 270,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
})