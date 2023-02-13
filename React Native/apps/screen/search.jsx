import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Layout, Text, useStyleSheet, Input, Icon, Avatar, Popover, Button, Modal, Card, Select, SelectItem, IndexPath, RadioGroup, Radio, TabBar, Tab, Drawer, DrawerItem, } from '@ui-kitten/components'
import { FlatGrid } from 'react-native-super-grid';
import SyncStorage from 'sync-storage';


const Search = ({ navigation }) => {
    const styles = useStyleSheet(themedStyles);
    const [users, setUsers] = useState('')
    const [visible, setVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [query, setQuery] = useState('')
    const [books, setBooks] = useState([])
    const [searchInput, setSearchInput] = useState('')
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

    const getData = async () => {
        try {
            const value = await SyncStorage.get('username')
            setUsers(value)
        } catch (e) {
            console.error(e)
            // error reading value
        }
    }

    useEffect(() => {
        getAllBook()
        getData()
    }, [])

    return (
        <Layout style={styles.root}>
            <ScrollView>
                <View style={{
                    padding: 20,
                    // height: 200,
                    // marginBottom: 25,
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
                        <Input
                            status='primary'
                            placeholder='Cari Buku'
                            style={{ minWidth: '100%' }}
                            value={query}
                            size='large'
                            onChangeText={(e) => setQuery(e)}
                        />
                    </View>

                </View>

                <FlatGrid
                    itemDimension={130}
                    keyExtractor={item => item}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.1}
                    data={books?.book?.filter(el => el.title.toLowerCase().includes(query.toLowerCase()))}
                    renderItem={({ item }) => (

                        <Card onPress={() => navigation.navigate('DetailBook', {
                            id: item._id
                        })}>
                            {/* <CardItem cardBody> */}

                            <Image source={{ uri: `http://35.175.65.185:3000/${item.image}` }} resizeMode='cover' style={{ height: 200, width: 'auto', flex: 1 }} />
                            <Text style={{ fontWeight: 'bold', marginTop: 10, textAlign: 'center' }}>{item.title} </Text>
                        </Card>
                    )}
                />


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

export default Search;
