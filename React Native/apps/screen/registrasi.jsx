import React, { useState } from 'react';
import {
    Image,
    StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View,
} from 'react-native';
import { Layout, Text, Input, Icon, Button, useStyleSheet, Datepicker } from '@ui-kitten/components'
import urlApi from '../config/urlApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logo } from '../resource';
import { authRegister } from '../config/auth';
import moment from 'moment';

const Registrasi = ({ navigation }) => {
    const styles = useStyleSheet(themedStyles);
    const [NISN, setNISN] = useState('')
    const [nama, setNama] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [classCourse, setClassCourse] = useState('')
    const [year, setYear] = useState(new Date())
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

    const clickRegistrasi = () => {
        authRegister({
            name: nama,
            username,
            nisn: NISN,
            email,
            password,
            kelas: classCourse,
            tahun: moment(year).format('YYYY-MM-DD')
        }).then(result => {
            if (result.status == 200) {
                alert('Anda berhasil mendaftarkan akun')
                // dispatch(login(result.data.payload))
                navigation.navigate('login');
            } else {
                alert(result.error)
            }
        }).catch(err => {
            alert(err)
            console.error(err);
        });
    }
    return (
        <Layout style={styles.root} >

            <View style={{ marginBottom: 35, justifyContent: 'center', alignItems: 'center', width: '80%' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 29, textAlign: 'center' }}>Registrasi</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 29, textAlign: 'center', }}>Anggota Perpustakaan</Text>
                {/* <Image width={39} height={39} source={Logo} /> */}
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
                    status='primary'
                    placeholder='Nama Lengkap'
                    style={styles.input}
                    value={nama}
                    size='large'
                    onChangeText={(e) => setNama(e)}
                />

                <Input
                    status='primary'
                    placeholder='Username'
                    style={styles.input}
                    value={username}
                    size='large'
                    onChangeText={(e) => setUsername(e)}
                />

                <Input
                    status='primary'
                    placeholder='Alamat email'
                    style={styles.input}
                    value={email}
                    size='large'
                    onChangeText={(e) => setEmail(e)}
                />
                <Input
                    status='primary'
                    placeholder='Kelas'
                    style={styles.input}
                    value={classCourse}
                    size='large'
                    onChangeText={(e) => setClassCourse(e)}
                />
                <Datepicker
                    date={year}
                    onSelect={nextDate => setYear(nextDate)}
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
                <Button style={styles.button} size='large' onPress={clickRegistrasi}>Daftar</Button>
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
        color: '#fff',
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

export default Registrasi;
