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
import { login } from '../redux/userslice';
import { authForgotPassword } from '../config/auth';

const ForgotPassword = ({ navigation }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
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


    const clickForgotPassword = () => {
        authForgotPassword({
            nisn: NISN,
            password
        }).then(result => {
            if (result.data.code === 501) {
                alert(result.data.message)
            } else {
                alert(result.data.message)
                navigation.navigate('login')
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

            <View style={{ marginBottom: 35, justifyContent: 'center', alignItems: 'center', width: '80%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 29, textAlign: 'center' }}>Lupa Password</Text>
            </View>
            <View style={{ width: '80%' }}>
                <Input
                    status='primary'
                    placeholder='NISN'
                    style={styles.input}
                    value={NISN}
                    keyboardType='number-pad'

                    size='large'
                    onChangeText={(e) => setNISN(e)}
                />
                <Input
                    secureTextEntry={secureTextEntry}
                    status='primary'
                    placeholder='Password Baru'
                    style={styles.input}
                    value={password}
                    size='large'
                    onChangeText={(e) => setPassword(e)}
                    accessoryRight={renderIcon}
                />
                <Button style={styles.button} size='large' onPress={clickForgotPassword}>Reset Password</Button>
                <TouchableOpacity onPress={() => navigation
                    .navigate('login')}><Text style={{ textAlign: 'center', color: 'grey', fontSize: 16, marginTop: 10 }}>Kembali</Text></TouchableOpacity>
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

export default ForgotPassword;
