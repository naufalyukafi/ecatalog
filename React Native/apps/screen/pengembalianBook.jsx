import React, { useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Layout, Text, useStyleSheet, Input, Icon, Avatar, Popover, Button, Modal, Card, Select, SelectItem, IndexPath, RadioGroup, Radio, TabBar, Tab, Drawer, DrawerItem, } from '@ui-kitten/components'
import AsyncStorage from '@react-native-async-storage/async-storage';
import urlApi from '../config/urlApi';
import { useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const PengembalianBook = ({ navigation }) => {
    const [returnBooks, setReturnBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const styles = useStyleSheet(themedStyles);

    const getReturnBook = async () => {
        axios('http://35.175.65.185:3000/api/v1/loan-book', {
            headers: {
                Authorization: "Bearer " + await AsyncStorage.getItem('xtoken')
            }
        }).then(data => {
            setReturnBooks(data.data)
            // console.log('sdfdsf' + JSON.parse(data));
        }).catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        getReturnBook()
    }, [])

    const onSaveReturnBook = async (data) => {

        setLoading(true)
        var today = moment(new Date());

        axios.post('http://35.175.65.185:3000/api/v1/return-book',
            {
                dateReturn: today.format('YYYY-MM-DD'),
                booksId: data.booksId,
                idLoanBook: data.idLoanBook,
                jumlah: data.jumlah
            },
            {
                headers: {
                    Authorization: "Bearer " + await AsyncStorage.getItem('xtoken')
                }
            }).then(() => {
                alert('Anda berhasil mengembalikan buku ' + data.title)
                setLoading(false)
                getReturnBook()
                // console.log('sdfdsf' + JSON.parse(data));
            }).catch(error => {
                setLoading(false)
                console.error(error);
            });
    }

    const onSaveExtensionBook = async (data) => {
        setLoading(true)
        var today = moment(new Date());
        var nextWeek = moment(today).add(7, 'days');
        axios.put('http://35.175.65.185:3000/api/v1/extension-book',
            {
                idLoanBook: data.idLoanBook,
                dataReturn: nextWeek.format('YYYY-MM-DD'),
            },
            {
                headers: {
                    Authorization: "Bearer " + await AsyncStorage.getItem('xtoken')
                }
            }).then(() => {
                alert('Anda berhasil Memperpanjang buku sampai tanggal ' + moment(nextWeek).format('DD-MM-YYYY'))
                setLoading(false)
                getReturnBook()
                // console.log('sdfdsf' + JSON.parse(data));
            }).catch(error => {
                setLoading(false)
                console.error(error);
            });
    }

    return (
        <Layout style={styles.root}>
            <ScrollView>
                <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
                    <View style={[styles.card, styles.elevation]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Text style={{ fontWeight: 'bold', marginRight: 30 }}>Buku</Text>
                            < Text style={{ fontWeight: 'bold' }}>Aksi</Text>
                        </View>
                        {returnBooks?.data?.length < 1 && <Text style={{ textAlign: 'center', margin: 50 }}>Belum Ada Pengembalian Buku</Text>}
                        {
                            returnBooks?.data?.map((el) => (
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1, marginBottom: 8, marginTop: 20 }}>
                                    <View style={{ flex: 1, marginRight: 2, maxWidth: '70%' }}>
                                        <Image source={{ uri: `http://35.175.65.185:3000/${el.image}` }} resizeMode='cover' style={{ height: 200, maxWidth: 140, flex: 1, marginRight: 10 }} />
                                    </View>
                                    {console.log(el.status)}
                                    <View>
                                        {el?.status === 'returned' ? (
                                            <Card style={{ padding: 2, width: 150 }} status='primary'>
                                                <Text style={{ textAlign: 'center' }}>Selesai</Text>
                                                {/* <Text style={{ textAlign: 'center' }}>Terima Kasih</Text> */}
                                            </Card>

                                        ) : (
                                            <View>
                                                <Button disabled={loading === true} onPress={() => onSaveReturnBook(el)} style={{ marginBottom: 10, backgroundColor: '#0D4C92' }}>Pengembalian</Button>
                                                <Button disabled={loading === true} onPress={() => onSaveExtensionBook(el)} >Perpanjangan</Button>
                                            </View>
                                        )}

                                    </View>
                                </View>
                            ))
                        }


                    </View>
                </View>
            </ScrollView>
        </Layout >
    );
};

const themedStyles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff'
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
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 10,
        width: '100%',
        marginVertical: 10,
    },
    elevation: {
        elevation: 10,
        shadowColor: '#000',
    },
});

export default PengembalianBook;
