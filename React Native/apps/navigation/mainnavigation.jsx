import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screen/login';
import Register from '../screen/registrasi';
import Home from '../screen/home';
import { Image } from 'react-native';
import { IcBeranda, IcBerandaActive, IcHospital, IcHospitalActive, IcNews, IcNewsActive, IcQueue, IcQueueActive } from '../resource'

import { useTheme } from '@ui-kitten/components/theme';
import DetailBook from '../screen/detailBook';
import PengembalianBook from '../screen/pengembalianBook';

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <HomeStack.Screen name="DetailBook" component={DetailBook} options={{ headerTitle: 'Antopologi', headerStyle: { backgroundColor: 'blue' }, headerTintColor: 'white' }} />
            <HomeStack.Screen name="PengembalianBook" component={PengembalianBook} options={{ headerTitle: 'Pengembalian Buku', headerStyle: { backgroundColor: 'blue' }, headerTintColor: 'white' }} />

        </HomeStack.Navigator>
    );
}

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    // redux check authentication
    const [isLogin] = useState(true)
    return (
        <NavigationContainer>
            <Stack.Navigator >
                {/* {isLogin == false ? (
                    <Stack.Screen name="auth" component={AuthStackScreen} options={{ headerShown: false }} />
                ) : ( */}
                <Stack.Screen
                    name="Beranda"
                    component={HomeStackScreen}
                    options={{ headerShown: false }}
                />
                {/* <Drawer.Navigator>
                <Drawer.Screen name="Beranda" component={HomeStackScreen} /> */}
                {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
                {/* </Drawer.Navigator> */}
                {/* )
                } */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation