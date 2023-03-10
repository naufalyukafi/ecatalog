import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    StyleSheet, TouchableWithoutFeedback, View, TouchableOpacity
} from 'react-native';
import { Layout, Input, Icon, Button, useStyleSheet, Text } from '@ui-kitten/components'
// import SyncStorage from 'sync-storage';
import { Logo } from '../resource';
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from '../config/auth';
import { login } from '../redux/userslice';

const Login = ({ navigation }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const styles = useStyleSheet(themedStyles);
    const [nisn, setNISN] = useState('')
    const [password, setPassword] = useState('')
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );


    const clickLogin = () => {
        authLogin({
            nisn,
            password
        }).then(result => {
            if (result.status == 200) {
                dispatch(login(result.data.payload))
                navigation.navigate('Home');
            } else {
                alert(result.error)
            }
        }).catch(err => {
            alert(err)
            console.error(err);
        });
    }

    if (user.isAuth) {
        navigation.navigate('Home')
    }

    return (
        <Layout style={styles.root} >

            <View style={{ marginBottom: 35, justifyContent: 'center', alignItems: 'center' }}>
                <Image width={39} height={39} source={Logo} />
            </View>
            <View style={{ width: '80%' }}>
                <Input
                    status='primary'
                    placeholder='NISN'
                    style={styles.input}
                    value={nisn}
                    size='large'
                    keyboardType='number-pad'
                    onChangeText={(e) => setNISN(e)}
                />
                <Input
                    secureTextEntry={secureTextEntry}
                    status='primary'
                    placeholder='Password'
                    style={styles.input}
                    value={password}
                    size='large'
                    onChangeText={(e) => setPassword(e)}
                    accessoryRight={renderIcon}
                />
                <TouchableOpacity onPress={() => navigation.navigate('forgot')}>
                    <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline', textAlign: 'right' }}>Lupa Password ?</Text>
                </TouchableOpacity>
                <Button style={styles.button} size='large' onPress={clickLogin}>Login</Button>
                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>Belum Punya Akun?</Text>
                    <TouchableOpacity onPress={() => navigation
                        .navigate('register')}><Text style={{ fontWeight: 'bold' }}>Daftar</Text></TouchableOpacity>
                </View>
            </View>
        </Layout>
    );
};

const themedStyles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#a0e4cb',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff'
    },
    input: {
        marginTop: 12,
        marginBottom: 12,
        color: '#0D4C92'
    },
    button: {
        marginTop: 12,
        backgroundColor: '#0D4C92'
    }
});

export default Login;
