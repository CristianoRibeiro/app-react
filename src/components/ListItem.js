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
import {DrawerNavigatorItems} from 'react-navigation-drawer';

import {
  Container,
  Content,
  TitleList,
  Form,
  Input,
  Submit,
  List,
  TextLight,
  DrawerItem,
  TextDark,
  TextList,
  Link,
  Send,
  SubTitle,
} from './styles';
import {ScrollView} from 'react-native-gesture-handler';

export default function Main(props) {
  useEffect(() => {
    //alert(JSON.stringify(props));
  }, []);

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
      {props.icon}
      <View style={{marginHorizontal: 10}}>
        <TitleList>{props.title}</TitleList>
        <TextList>{props.text}</TextList>
      </View>
    </View>
  );
}
