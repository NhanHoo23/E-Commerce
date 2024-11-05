import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { COLORS } from '../AppContants'
import TextField from '../components/TextField'
import LinearGradient from 'react-native-linear-gradient'

const LoginScreen = ({navigation}) => {
    const [emailOrPhone, setemailOrPhone] = useState('')
    const [password, setPassword] = useState('')
    const [rememberAcc, setrememberAcc] = useState(false)

    const [errorLabel, seterrorLabel] = useState('')

    const emailInputRef = useRef(null); 
    const passwordInputRef = useRef(null);

    const handleSubmit = () => {
        seterrorLabel('');

        if (emailInputRef.current) {
            emailInputRef.current.blur();
        }
        if (passwordInputRef.current) {
            passwordInputRef.current.blur();
        }

        //validate
        if (emailOrPhone === '' || password === '') {
            seterrorLabel('Invalid email or password. Try again!');
            return;
        }
        //submit
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/img_header.png')} style={styles.imgHeader} resizeMode='cover' />

            <Text style={styles.title1}>Chào mừng bạn</Text>
            <Text style={styles.title2}>Đăng nhập tài khoản</Text>

            <TextField placeholder={'Nhập email hoặc số điện thoại'} style={styles.textField} onChangeText={setemailOrPhone} inputRef={emailInputRef}/>
            <TextField placeholder={'Mật khẩu'} isPassword={true} style={[styles.textField, { marginTop: 10 }]} onChangeText={setPassword} inputRef={passwordInputRef}/>
            {errorLabel && <Text style={{ color: '#CE0000', fontSize: 11, fontWeight: '600',width: '100%', paddingHorizontal: 25, marginTop: 5  }}>{errorLabel}</Text>}

            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginTop: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Pressable style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={rememberAcc ? require('../assets/ic_checked.png') : require('../assets/ic_check.png')} style={{ width: 20, height: 20 }} resizeMode='contain' />
                    </Pressable>
                    <Text style={{ fontWeight: '500', fontSize: 11, color: '#949090' }}>Nhớ tài khoản</Text>
                </View>

                <Pressable>
                    <Text style={{ fontWeight: '500', fontSize: 11, color: '#007537' }}>Quên mật khẩu?</Text>
                </Pressable>
            </View>

            <TouchableOpacity style={{ paddingHorizontal: 16, width: '100%' }} onPress={handleSubmit}>
                <LinearGradient
                    colors={['#007537', '#4CAF50']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.btnSubmit}>
                    <Text style={styles.btnSubmitText}>Đăng nhập</Text>
                </LinearGradient>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginTop: 16 }}>
                <View style={{ height: 1, flex: 3, backgroundColor: '#4CAF50' }}></View>
                <Text style={{ fontWeight: '500', fontSize: 12, color: COLORS.textColor, flex: 1, textAlign: 'center' }}>Hoặc</Text>
                <View style={{ height: 1, flex: 3, backgroundColor: '#4CAF50' }}></View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginTop: 32 }}>
                <Pressable style={{ marginEnd: 8 }}>
                    <Image source={require('../assets/ic_google.png')} style={{ width: 32, height: 32 }} resizeMode='contain' />
                </Pressable>

                <Pressable style={{ marginStart: 8 }}>
                    <Image source={require('../assets/ic_facebook.png')} style={{ width: 32, height: 32 }} resizeMode='contain' />
                </Pressable>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 16, marginTop: 32 }}>
                <Text style={{ fontWeight: '400', fontSize: 12, color: COLORS.textColor }}>Bạn không có tài khoản? </Text>

                <Pressable onTouchEnd={() => {navigation.navigate('Register')}}>
                    <Text style={{ fontWeight: '400', fontSize: 12, color: '#009245' }}>Tạo tài khoản</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    imgHeader: {
        position: 'absolute',
        width: 482.31,
        height: 487.09,
        top: -150,
    },
    title1: {
        fontSize: 30,
        fontWeight: '700',
        color: COLORS.textColor,
        marginTop: 337.09,
    },
    title2: {
        fontSize: 18,
        fontWeight: '400',
        color: COLORS.textColor,
        marginTop: 5,
    },
    textField: {
        marginTop: 20,
        marginHorizontal: 16
    },
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