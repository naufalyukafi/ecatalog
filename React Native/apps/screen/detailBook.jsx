import React, { useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, ScrollView } from 'react-native';
import { Layout, Text, useStyleSheet, Input, Icon, Avatar, Popover, Button, Modal, Card, Select, SelectItem, IndexPath, RadioGroup, Radio, TabBar, Tab } from '@ui-kitten/components'

const CustomTable = ({ title, subTitle }) => {
    return (
        <View style={{ alignSelf: 'stretch', flexDirection: 'row', minWidth: '100%', marginBottom: 8 }}>
            <View style={{ flex: 1, alignSelf: 'stretch', marginRight: 2 }}><Text>{title}</Text></View>
            <View style={{ flex: 1, alignSelf: 'stretch', minWidth: '20%' }}><Text>{subTitle}</Text></View>
        </View>
    )
}

const DetailBook = ({ navigation }) => {
    const styles = useStyleSheet(themedStyles);
    const [visible, setVisible] = useState(false);
    const [listVisible, setListVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const [selectedIndexBpjs, setSelectedIndexBpjs] = React.useState(0);

    return (
        <Layout style={styles.root}>
            <ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: 'http://localhost:3000/images/1672803073460.png' }} resizeMode='cover' style={{ height: 260, maxWidth: '50%', flex: 1, marginRight: 10 }} />
                    <View style={{ maxWidth: '45%' }}>
                        <Text category='h2' style={{ fontSize: 16, marginBottom: 10 }}>Informasi</Text>
                        <CustomTable
                            title='Penerbit'
                            subTitle='Yrama Widya'
                        />
                        <CustomTable
                            title='Penulis'
                            subTitle='Slamet Triyono'
                        />
                        <CustomTable
                            title='Waktu Peminjaman'
                            subTitle='Maks. 1 minggu'
                        />
                        <Button style={{ backgroundColor: 'blue' }}>PINJAM</Button>
                    </View>
                </View>
                <View >
                    <Text category='h2' style={{ fontSize: 16, marginBottom: 10, marginTop: 20 }}>Tanam setidaknya satu pohon!</Text>
                    <Text style={{ width: '100%', textAlign: 'justify' }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
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
