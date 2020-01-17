import React, {useState, useEffect, Component} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { Appbar, Avatar, withTheme, DefaultTheme } from "react-native-paper";
import { DrawerActions } from "react-navigation-drawer";

import {Container, Content, Card, Send, TextLight} from '~/style';
import {useSelector} from "react-redux";

export default function Main({navigation}) {

  const user = useSelector(state => state.user);

  function _goMenu () {navigation.dispatch(DrawerActions.toggleDrawer())};
  function  _goNotification() {user.id ? navigation.navigate('Notification') : navigation.navigate('Login')};

  return (
    <SafeAreaView style={{flex: 1}}>

      <StatusBar
        backgroundColor="#FF6666"
        barStyle="light-content"
      />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 50,
          flexDirection: "row",
          elevation: 4
        }}
      >
        <TouchableOpacity
          onPress={_goMenu}
          style={{
            width: 60,
            height: 50,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Appbar.Action
            icon="menu"
            onPress={_goMenu}
            color={'#fff'}
          />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            resizeMode="contain"
            style={{ height: 35, maxWidth: 150 }}
            source={require("../assets/logo_cinza.png")}
          />
        </View>

        {/*<View style={{ width: 60 }} />*/}
        <TouchableOpacity
          onPress={_goNotification}
          style={{
            width: 60,
            height: 50,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Appbar.Action
            icon="notifications"
            onPress={_goNotification}
            color={'#fff'}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
