import React, { useEffect, useState } from 'react';
import MainNavigation from './mainnavigation';
import { Layout, Text, useTheme } from '@ui-kitten/components'
import { Image } from 'react-native';
import { Logo } from '../resource';

export const AppNavigator = () => {
    const theme = useTheme();
    const [isSplash, setSplash] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setSplash(false)
        }, 3000);
    }, []);

    return (
        <>
            {isSplash ? (
                <Layout style={{ flex: 1, backgroundColor: theme['color-primary-default'], justifyContent: 'center', alignItems: 'center' }}>
                    <Image width={39} height={39} source={Logo} />
                    <Text category='h1' style={{ fontWeight: 'bold', marginTop: 28 }}>E-Library 20</Text>
                </Layout>
            ) : <MainNavigation />}
        </>
    );
};