import React from 'react'
import { Text, useTheme } from '@ui-kitten/components'
import { Image, TouchableOpacity, View } from 'react-native'

const CardNews = ({ title, description, image, route }) => {
    const theme = useTheme();
    return (
        <TouchableOpacity onPress={route}>
            <View
                style={{
                    marginTop: 20,
                    borderRadius: 20,
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderRadius: 20
                }}
            >
                <Image
                    source={image}
                    style={{ borderTopLeftRadius: 10, borderBottomLeftRadius: 10, width: '30%', height: 100 }}
                />
                <View style={{ padding: 15, backgroundColor: 'white', width: '70%' }}>
                    <Text category='h2' style={{ fontSize: 16, marginBottom: 5 }}>{title}</Text>
                    <Text numberOfLines={2} style={{ width: '100%', color: 'grey' }}>{description}</Text>
                    {/* <Button onPress={route} style={{ width: 200, marginTop: 10, backgroundColor: theme['color-primary-default'] }}>Baca Selengkapnya</Button> */}
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CardNews