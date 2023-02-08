import React from 'react'
import { Text, Button, Avatar } from '@ui-kitten/components'
import { View } from 'react-native'
import { useTheme } from '@ui-kitten/components/theme';

const CardHospitals = ({ title, address, image, route }) => {
    const theme = useTheme();
    return (
        <View style={{ backgroundColor: '#fff', borderRadius: 10, padding: 20, marginTop: 10, marginBottom: 10 }}>
            <View style={{ marginTop: 20, width: '100%', flexDirection: 'row', alignItems: 'center', }}>
                <View style={{ width: '80%' }}>
                    <Text category='h2' style={{ fontSize: 16, marginBottom: 10, marginTop: 10, }}>{title}</Text>
                    <Text numberOfLines={2} style={{ maxWidth: '90%', color: 'grey' }}>{address}</Text>
                </View>
                <Avatar style={{ margin: 8 }} size='large' source={image} />
            </View>
            <Button onPress={route} style={{ width: 80, marginTop: 10, backgroundColor: theme['color-primary-200'], width: "100%" }} status='control'>Pilih</Button>

        </View>
    )
}

export default CardHospitals