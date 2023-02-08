import React, { useState } from 'react';
import {
    Image,
    StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native';
import { Layout, Text, Input, Icon, Button, useStyleSheet } from '@ui-kitten/components'
import urlApi from '../config/urlApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logo } from '../resource';

const Login = ({ navigation }) => {
    const styles = useStyleSheet(themedStyles);
    const [NISN, setNISN] = useState('')
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

    const clickLogin = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('NISN', NISN);
        data.append('password', password);
        fetch(urlApi + "/login", {
            method: "POST",
            body: data,
        }).then(response => {
            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
        }).then((result) => {
            if (result[0] === 200) {
                console.log(result[1].message);
                AsyncStorage.setItem("@token", result[1].access_token);
                console.log('token : ' + result[1].access_token);
            } else {
                console.log(result[1].message);
            }
        });
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
                    value={NISN}
                    size='large'
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
        color: 'blue'
    },
    button: {
        marginTop: 12,
        backgroundColor: 'blue'
    }
});

export default Login;
