import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Layout, Text, useStyleSheet, Input, Icon, Avatar, Popover, Button, Modal, Card, Select, SelectItem, IndexPath, RadioGroup, Radio, TabBar, Tab, Drawer, DrawerItem, } from '@ui-kitten/components'
import { FlatGrid } from 'react-native-super-grid';
import { LogoRs, news, AvatarImage } from '../resource'
import CardNews from '../components/cardnews';
import AsyncStorage from '@react-native-async-storage/async-storage';
import urlApi from '../config/urlApi';

const listPoli = [
    'Poli Gigi',
    'Poli Mata',
    'Poli Telinga',
];

const Home = ({ navigation }) => {
    const styles = useStyleSheet(themedStyles);
    const [visible, setVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [books, setBooks] = useState([])
    const getAllBook = async () => {
        fetch('http://192.168.1.7:3000/api/v1/book-page')
            .then(response => response.json())
            .then(data => {
                setBooks(data)
                // console.log('sdfdsf' + JSON.parse(data));
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => getAllBook(), [])

    // let dataKu = JSON.parse(books)
    console.log(books)
    const renderIconSearch = (props) => (
        <Icon {...props} name='search' />
    );
    const LogoutIcon = (props) => (
        <Icon {...props} name='log-out' />
    );

    const renderToggleButton = () => (
        <TouchableOpacity onPress={() => setVisible(true)}>
            <Avatar style={styles.avatar} size='large' source={AvatarImage} />
        </TouchableOpacity>
    );

    const displayValue = listPoli[selectedIndex.row];
    const renderOption = (title) => (
        <SelectItem title={title} />
    );

    let clickLogout = (e) => {
        e.preventDefault();
        AsyncStorage.getItem("@token").then((token) => {
            let data = new FormData();
            data.append('Authorization', "Bearer " + token);
            fetch(urlApi + "/logout", {
                method: "POST",
                body: data,
            }).then((response) => {
                const statusCode = response.status;
                const data = response.json();
                return Promise.all([statusCode, data]);
            }).then((result) => {
                if (result[0] === 200) {
                    console.log(result[1].message);
                    AsyncStorage.removeItem("@token");
                } else {
                    console.log(result[1].message);
                }
            });
        });

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
                    backgroundColor: 'blue',
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
                            <TouchableOpacity onPress={getAllBook} style={{ marginRight: 15 }}><Icon name='search' fill='white' style={{ width: 32, height: 32, color: 'white' }} /></TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 5 }} onPress={() => setVisible(prev => !prev)}><Icon name={visible === true ? 'close' : 'menu'} fill='black' style={{ width: 32, height: 32, color: 'white' }} /></TouchableOpacity>
                        </View>
                    </View>

                </View>
                <Drawer
                    style={{ position: 'relative', minWidth: '50%', minHeight: '100%', display: visible === true ? null : 'none' }}

                // selectedIndex={selectedIndex}
                // onSelect={index => setSelectedIndex(index)}
                >
                    <DrawerItem accessoryLeft={PersonIcon} title='Yukafi' />
                    <DrawerItem onPress={() => navigation.navigate('PengembalianBook')} title='Pengembalian' />
                    <DrawerItem title='Log Out' />
                </Drawer>
                <View >
                    <TabBar

                        style={{ backgroundColor: 'blue', paddingTop: 15, paddingBottom: 15 }}
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
                                data={books?.book?.map(el => el)}
                                renderItem={({ item }) => (

                                    <Card onPress={() => navigation.navigate('DetailBook')}>
                                        {/* <CardItem cardBody> */}

                                        <Image source={{ uri: `http://localhost:3000/${item.image}` }} resizeMode='cover' style={{ height: 200, width: 'auto', flex: 1 }} />
                                        <Text style={{ fontWeight: 'bold', marginTop: 10, textAlign: 'center' }}>{item.title} </Text>
                                    </Card>
                                )}
                            />
                            {/* ))} */}
                        </>

                    ) : (
                        <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontWeight: 'bold', marginRight: 30 }}>Buku</Text>
                                <Text style={{
                                    fontWeight: 'bold',
                                    maxWidth: '30%'
                                }}>Tanggal Peminjaman</Text>
                                < Text style={{ fontWeight: 'bold' }}>Tanggal Pembelian</Text>
                            </View>

                            <View style={[styles.card, styles.elevation]}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center', minWidth: '100%', marginBottom: 8, marginTop: 20 }}>
                                    <View style={{ flex: 1, alignSelf: 'stretch', marginRight: 2 }}>
                                        <Image source={{ uri: 'http://localhost:3000/images/1672803073460.png' }} resizeMode='cover' style={{ height: 100, flex: 1, marginRight: 10 }} />
                                    </View>
                                    <View style={{ flex: 1, alignSelf: 'stretch', minWidth: '10%', marginTop: '10%' }}><Text>20-11-2022</Text></View>
                                    <View style={{ flex: 1, alignSelf: 'stretch', minWidth: '10%', marginTop: '10%' }}><Text>20-11-2022</Text></View>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignContent: 'center', minWidth: '100%', marginBottom: 8, marginTop: 20 }}>
                                    <View style={{ flex: 1, alignSelf: 'stretch', marginRight: 2 }}>
                                        <Image source={{ uri: 'http://localhost:3000/images/1672803073460.png' }} resizeMode='cover' style={{ height: 100, flex: 1, marginRight: 10 }} />
                                    </View>
                                    <View style={{ flex: 1, alignSelf: 'stretch', minWidth: '10%', marginTop: '10%' }}><Text>20-11-2022</Text></View>
                                    <View style={{ flex: 1, alignSelf: 'stretch', minWidth: '10%', marginTop: '10%' }}><Text>20-11-2022</Text></View>
                                </View>
                            </View>

                            <View style={[styles.card, styles.elevation]}>
                                <Text>Noted:</Text>
                                <Text style={{ marginTop: 10 }}>
                                    Jika lewat dari batas waktu peminjaman, akan dikenakan sanksi
                                    atau denda perharinya 10.000.
                                </Text>
                                <Text style={{ marginTop: 20, textAlign: 'center' }}>Terima Kasih dan Selamat Membaca!!</Text>
                            </View>
                        </View>
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
