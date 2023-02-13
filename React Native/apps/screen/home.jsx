import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Layout, Text, useStyleSheet, Icon, Card, TabBar, Tab, Drawer, DrawerItem, } from '@ui-kitten/components'
import { FlatGrid } from 'react-native-super-grid';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';;
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userslice';
import moment from 'moment/moment';
import useSWR, { mutate } from "swr";

const Home = ({ navigation }) => {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const styles = useStyleSheet(themedStyles);
    const [visible, setVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [books, setBooks] = useState([])
    // const [loanBooks, setLoanBooks] = useState([])
    const getAllBook = async () => {
        fetch('http://35.175.65.185:3000/api/v1/book-page')
            .then(response => response.json())
            .then(data => {
                setBooks(data)
                // console.log('sdfdsf' + JSON.parse(data));
            })
            .catch(error => {
                console.error(error);
            });
    }

    // const { data: loanBooks } = useSWR('http://35.175.65.185:3000/api/v1/loan-book', async (url) => {
    //     axios(url, {
    //         headers: {
    //             Authorization: "Bearer " + await AsyncStorage.getItem('xtoken')
    //         }
    //     })
    // })

    const { data: loanBooks } = useSWR(
        'http://35.175.65.185:3000/api/v1/loan-book',
        async (url) =>
            axios(url, {
                headers: {
                    Authorization: "Bearer " + await AsyncStorage.getItem('xtoken'),
                },
            }).then((data) => {
                return data.data;
            }),

    );

    // const getLoanBook = async () => {
    // axios('http://35.175.65.185:3000/api/v1/loan-book', {
    //     headers: {
    //         Authorization: "Bearer " + await AsyncStorage.getItem('xtoken')
    //     }
    // }).then(data => {
    //     setLoanBooks(data.data)
    //     // console.log('sdfdsf' + JSON.parse(data));
    // }).catch(error => {
    //     console.error(error);
    // });
    // }

    useEffect(() => {
        getAllBook()

        if (user.isAuth) {
            navigation.navigate('login')
        }
    }, [user])


    let clickLogout = () => {
        dispatch(logout(user))
        navigation.navigate('login')
    }

    const PersonIcon = (props) => (
        <Icon {...props} name='person-outline' />
    );

    return (
        <Layout style={styles.root}>
            <ScrollView>
                <View style={{
                    padding: 20,
                    // height: 200,
                    // marginBottom: 25,
                    backgroundColor: '#0D4C92',
                    color: 'white',
                    position: 'relative'
                    // borderBottomLeftRadius: 40,
                    // borderBottomRightRadius: 20
                }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <Text category='h1' style={{ fontSize: 20, color: 'white' }}>Catalog E-Library 20 </Text>
                        <View style={{ flexDirection: 'row', }}>
                            <TouchableOpacity onPress={() => navigation.navigate('SearchBook')} style={{ marginRight: 15 }}><Icon name='search' fill='white' style={{ width: 32, height: 32, color: 'white' }} /></TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 5 }} onPress={() => setVisible(prev => !prev)}><Icon name={visible === true ? 'close' : 'menu'} fill='black' style={{ width: 32, height: 32, color: 'white' }} /></TouchableOpacity>
                        </View>
                    </View>

                </View>
                <Drawer
                    style={{ position: 'relative', minWidth: '50%', minHeight: '100%', display: visible === true ? null : 'none' }}
                >
                    {
                        user.isAuth ? (
                            <>
                                <DrawerItem onPress={() => navigation.navigate('PengembalianBook')} title='Pengembalian' />
                                <DrawerItem onPress={clickLogout} title='Log Out' />
                            </>
                        ) : (
                            <DrawerItem onPress={() => {
                                setVisible(false)
                                navigation.navigate('login')
                            }} accessoryLeft={PersonIcon} title='Masuk' />
                        )
                    }

                </Drawer>
                <View >
                    <TabBar
                        style={{ backgroundColor: '#0D4C92', paddingTop: 15, paddingBottom: 15 }}
                        selectedIndex={selectedIndex}
                        onSelect={index => setSelectedIndex(index)}>
                        <Tab style={{ color: 'white' }} title='Kategori Buku' />
                        <Tab title='Peminjaman' />
                    </TabBar>
                </View>
                {
                    selectedIndex === 0 ? (
                        <>
                            {/* {books?.book?.map(el => ( */}
                            <FlatGrid
                                itemDimension={130}
                                keyExtractor={item => item}
                                showsVerticalScrollIndicator={false}
                                onEndReachedThreshold={0.1}
                                data={books?.book?.filter(item => item.jumlah > 0)}
                                renderItem={({ item }) => (

                                    <Card onPress={() => navigation.navigate('DetailBook', {
                                        id: item._id,
                                        title: item.title
                                    })}>
                                        {/* <CardItem cardBody> */}

                                        <Image source={{ uri: `http://35.175.65.185:3000/${item.image}` }} resizeMode='cover' style={{ height: 200, width: 'auto', flex: 1 }} />
                                        <Text style={{ fontWeight: 'bold', marginTop: 10, textAlign: 'center' }}>{item.title} </Text>
                                    </Card>
                                )}
                            />
                            {/* ))} */}
                        </>

                    ) : (
                        <>
                            {user.isAuth ? (
                                <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
                                    {user.value.role === 'member' ? (
                                        <>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontWeight: 'bold', marginRight: 30 }}>Buku</Text>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    maxWidth: '30%'
                                                }}>Tanggal Peminjaman</Text>
                                                < Text style={{ fontWeight: 'bold' }}>Tanggal Pengembalian</Text>
                                            </View>

                                            <View style={[styles.card, styles.elevation]}>

                                                {
                                                    loanBooks?.data?.length > 0 ? (
                                                        <>
                                                            {loanBooks?.data?.map((item) => (
                                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center', minWidth: '100%', marginBottom: 8, marginTop: 20 }}>
                                                                    <View style={{ flex: 1, alignSelf: 'stretch', marginRight: 2 }}>
                                                                        <Image source={{ uri: `http://35.175.65.185:3000/${item.image}` }} resizeMode='cover' style={{ height: 100, flex: 1, marginRight: 10 }} />
                                                                    </View>
                                                                    <View style={{ flex: 1, alignSelf: 'stretch', minWidth: '10%', marginTop: '10%' }}><Text>{moment(item.dateLoan).format('DD-MM-YYYY')}</Text></View>
                                                                    <View style={{ flex: 1, alignSelf: 'stretch', minWidth: '10%', marginTop: '10%' }}><Text>{moment(item.dateReturn).format('DD-MM-YYYY')}</Text></View>
                                                                </View>
                                                            ))}
                                                        </>
                                                    ) : <View><Text style={{ textAlign: 'center' }}>Belum Ada Buku yang di Pinjam</Text></View>

                                                }
                                            </View>

                                            <View style={[styles.card, styles.elevation]}>
                                                <Text>Noted:</Text>
                                                <Text style={{ marginTop: 10 }}>
                                                    Jika lewat dari batas waktu peminjaman, akan dikenakan sanksi
                                                    atau denda perharinya 10.000.
                                                </Text>
                                                <Text style={{ marginTop: 20, textAlign: 'center' }}>Terima Kasih dan Selamat Membaca!!</Text>
                                            </View>
                                        </>
                                    ) : <Text>Anda Bukan Member, Silahkan hubungi admin</Text>}
                                </View>
                            ) : (<Text style={{ marginTop: 20, textAlign: 'center' }}>Anda Belum Masuk Akun</Text>)}
                        </>

                    )
                }


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

export default Home;
