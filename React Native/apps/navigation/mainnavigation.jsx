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
import Registrasi from '../screen/registrasi';
import Search from '../screen/search';
import ForgotPassword from '../screen/forgotpassword';
import { useSelector } from 'react-redux';

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <HomeStack.Screen
                name="DetailBook"
                component={DetailBook}
                options={({ route }) => ({ headerTitle: route.params.title, headerStyle: { backgroundColor: '#0D4C92' }, headerTintColor: 'white' })}
            />
            <HomeStack.Screen name="PengembalianBook" component={PengembalianBook} options={{ headerTitle: 'Pengembalian Buku', headerStyle: { backgroundColor: '#0D4C92' }, headerTintColor: 'white' }} />
            <HomeStack.Screen name="SearchBook" component={Search} options={{ headerShown: false }} />

        </HomeStack.Navigator>
    );
}

const AuthStack = createNativeStackNavigator();
const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator initialRouteName={"login"}>
            <AuthStack.Screen name="login" component={Login} options={{ headerShown: false }} />
            <AuthStack.Screen name="register" component={Registrasi} options={{ headerShown: false }} />
            <AuthStack.Screen name="forgot" component={ForgotPassword} options={{ headerShown: false }} />
        </AuthStack.Navigator>
    );
}

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    const user = useSelector((state) => state.user);
    return (
        <NavigationContainer>
            <Stack.Navigator >
                {
                    user.isAuth ? (
                        <Stack.Screen
                            name="Beranda"
                            component={HomeStackScreen}
                            options={{ headerShown: false }}
                        />
                    ) : (
                        <Stack.Screen name="login" component={AuthStackScreen} options={{ headerShown: false }} />
                    )
                }


            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation