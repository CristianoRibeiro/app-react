import React, {useState, useEffect, Component} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  View,
  StatusBar,
} from 'react-native';
import {Drawer, Card} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
    <View style={{margin: 5, padding: 20}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <MaterialCommunityIcons name="alert-circle-outline" size={50} color={props.color ? props.color : '#444'} />
        <TextDark style={{marginTop: 15, textAlign: 'center'}}>
            {props.text}
        </TextDark>
      </View>

    </View>
  );
}
