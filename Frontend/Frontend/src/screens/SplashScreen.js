import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchUsers } from '../api/userApi';
import { fetchCategories } from '../api/productApi';
import DataManager from '../utils/DataManager';
import { COLORS } from '../AppContants';


const SplashScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [initialTimeout, setInitialTimeout] = useState(true);
    const [loadingText, setLoadingText] = useState('Loading...');

    useEffect(() => {
        const intervalId = setInterval(() => {
            setLoadingText(prev => {
                switch (prev) {
                    case 'Loading':
                        return 'Loading.';
                    case 'Loading.':
                        return 'Loading..';
                    case 'Loading..':
                        return 'Loading...';
                    default:
                        return 'Loading';
                }
            });
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchApiData = async () => {
            try {
                // const users = await fetchUsers();
                // DataManager.shared.setUsers(users);
                // console.log('Users:', users);

                // const categories = await fetchCategories()
                // DataManager.shared.setCategories(categories)

                

                

                navigation.replace('Login');
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            setInitialTimeout(false);
            setLoading(true);
            fetchApiData();
        }, 2000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} resizeMode='contain' style={styles.logo} />
            <Text style={styles.text}>Mã sinh viên: PH47395</Text>
            <Text style={styles.text}>Họ và tên: Hồ Hữu Nhân</Text>
            {!initialTimeout && loading && (
                <View >
                    <Text style={styles.text}>{loadingText}</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: COLORS.textColor,
        fontSize: 16,
        fontWeight: 'bold'
    },
    logo: {
        width: '50%',
        height: undefined,
        aspectRatio: 1,
    },
})

export default SplashScreen

