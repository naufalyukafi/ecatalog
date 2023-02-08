import React, { useState } from 'react';
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

const PengembalianBook = ({ navigation }) => {
    const styles = useStyleSheet(themedStyles);
    const [visible, setVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
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


    return (
        <Layout style={styles.root}>
            <ScrollView>

                <View style={{ paddingLeft: 20, paddingRight: 20, marginTop: 20 }}>


                    <View style={[styles.card, styles.elevation]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Text style={{ fontWeight: 'bold', marginRight: 30 }}>Buku</Text>
                            < Text style={{ fontWeight: 'bold' }}>Aksi</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1, marginBottom: 8, marginTop: 20 }}>
                            <View style={{ flex: 1, marginRight: 2, maxWidth: '70%' }}>
                                <Image source={{ uri: 'http://localhost:3000/images/1672803073460.png' }} resizeMode='cover' style={{ height: 100, flex: 1, marginRight: 10 }} />
                            </View>
                            <View >
                                <Button style={{ marginBottom: 10, backgroundColor: 'blue' }}>Pengembalian</Button>
                                <Button>Perpanjangan</Button>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1, marginBottom: 8, marginTop: 20 }}>
                            <View style={{ flex: 1, marginRight: 2, maxWidth: '70%' }}>
                                <Image source={{ uri: 'http://localhost:3000/images/1672803073460.png' }} resizeMode='cover' style={{ height: 100, flex: 1, marginRight: 10 }} />
                            </View>
                            <View >
                                <Button style={{ marginBottom: 10, backgroundColor: 'blue' }}>Pengembalian</Button>
                                <Button>Perpanjangan</Button>
                            </View>
                        </View>


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
