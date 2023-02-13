import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, ScrollView } from 'react-native';
import { Layout, Text, useStyleSheet, Input, Icon, Avatar, Popover, Button, Modal, Card, Select, SelectItem, IndexPath, RadioGroup, Radio, TabBar, Tab } from '@ui-kitten/components'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { mutate } from 'swr';

const CustomTable = ({ title, subTitle }) => {
    return (
        <View style={{ alignSelf: 'stretch', flexDirection: 'row', minWidth: '100%', marginBottom: 8 }}>
            <View style={{ flex: 1, alignSelf: 'stretch', marginRight: 2 }}><Text>{title}</Text></View>
            <View style={{ flex: 1, alignSelf: 'stretch', minWidth: '20%' }}><Text>{subTitle}</Text></View>
        </View>
    )
}

const DetailBook = ({ route, navigation }) => {
    const user = useSelector((state) => state.user);
    const styles = useStyleSheet(themedStyles);
    const [books, setBooks] = useState('')
    const [loading, setLoading] = useState(false)
    const { id } = route.params

    const getDetailBook = async () => {
        fetch(`http://35.175.65.185:3000/api/v1/book-page/${id}`)
            .then(response => response.json())
            .then(data => {
                setBooks(data)
                // console.log('sdfdsf' + JSON.parse(data));
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        getDetailBook()
    }, [id])

    const onSaveLoanBook = async () => {
        if (user.isAuth) {
            if (user.value.role === 'publik') {
                alert('Anda Bukan Member, Silahkan Hubungi Admin')
            }
            setLoading(true)
            const today = moment(new Date());
            const nextWeek = moment(today).add(7, 'days');
            axios.post('http://35.175.65.185:3000/api/v1/loan-book',
                {
                    dateLoan: today.format('YYYY-MM-DD'),
                    dateReturn: nextWeek.format('YYYY-MM-DD'),
                    officerId: '63ceed9b4113a66c63cc3696',
                    booksId: books?.results?._id,
                    jumlah: books?.results?.jumlah
                },
                {
                    headers: {
                        Authorization: "Bearer " + await AsyncStorage.getItem('xtoken')
                    }
                }).then(() => {
                    alert('Anda berhasil meminjam buku ' + books?.results?.title)
                    setLoading(false)
                    mutate('http://35.175.65.185:3000/api/v1/loan-book')

                    // console.log('sdfdsf' + JSON.parse(data));
                }).catch(error => {
                    setLoading(false)
                    console.error(error);
                });


        } else {
            navigation.navigate('login')
        }

    }

    return (
        <Layout style={styles.root}>
            <ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: `http://35.175.65.185:3000/${books?.results?.image}` }} resizeMode='cover' style={{ height: 260, maxWidth: '50%', flex: 1, marginRight: 10 }} />
                    <View style={{ maxWidth: '45%' }}>
                        <Text category='h2' style={{ fontSize: 16, marginBottom: 10 }}>Informasi</Text>
                        <CustomTable
                            title='Penerbit'
                            subTitle={books?.results?.penerbit}
                        />
                        {/* <CustomTable
                            title='Penulis'
                            subTitle='Slamet Triyono'
                        /> */}
                        <CustomTable
                            title='Waktu Peminjaman'
                            subTitle='Maks. 1 minggu'
                        />
                        <Button disabled={loading === true} onPress={onSaveLoanBook} style={{ backgroundColor: '#0D4C92' }}>PINJAM</Button>
                    </View>
                </View>
                <View >
                    <Text category='h2' style={{ fontSize: 16, marginBottom: 10, marginTop: 20 }}>{books?.results?.title}</Text>
                    <Text style={{ width: '100%', textAlign: 'justify' }}>{books?.results?.category}</Text>
                </View>
            </ScrollView>
        </Layout >
    );
};

const themedStyles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    container: {
        margin: 15,
    },
    list: {
        alignItems: 'center',
        width: 100,
    },
    imageList: {
        backgroundColor: 'color-primary-200',
        padding: 10,
        borderRadius: 999
    },
    avatar: {
        backgroundColor: 'orange',
        margin: 8,
    },
    listAccount: {
        maxHeight: 192,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default DetailBook;
