import React, {useState, useEffect, Component} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  View,
  StatusBar,
} from 'react-native';
import {Drawer} from 'react-native-paper';

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

export default function Main(props) {
  useEffect(() => {
    //alert(JSON.stringify(props));
  }, []);

  return (
    <DrawerItem
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: props.focused ? '#3F51B5' : 'transparent',
      }}>
      <View
        style={{
          width: 3,
          backgroundColor: props.focused ? '#ff8206' : 'transparent',
          minHeight: 50,
        }}></View>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 10,
        }}>
        <Image
          source={props.icon}
          style={{
            height: 24,
            width: 24,
          }}
          resizeMode="contain"
        />
      </View>

      <View style={{flex: 1, justifyContent: 'center'}}>
        <TextLight>{props.title}</TextLight>
      </View>
    </DrawerItem>
  );
}
