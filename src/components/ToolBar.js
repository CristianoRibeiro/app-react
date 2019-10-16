import React, {useState, useEffect, Component} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  View,
  StatusBar,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import {Drawer} from 'react-native-paper';
import {DrawerActions} from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  Content,
  Title,
  Form,
  Input,
  Submit,
  List,
  TextLight,
  DrawerItem,
  TextDark,
  Link,
  Send,
  SubTitle,
} from './styles';

import logo from '~/assets/logo.png';

export default function ToolBar(props) {
  useEffect(() => {
    alert(JSON.stringify(props));
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />

      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{width: 50, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() =>
                props.navigation.navigate('DrawerOpen')
            }>
            <MaterialCommunityIcons name="menu" size={24} color={'#fff'} />
          </TouchableOpacity>
        </View>
        <Image style={{width: 70, height: 35}} source={logo} />
        <View style={{width: 50}}></View>
      </View>
    </SafeAreaView>
  );
}
