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
    <DrawerItem>
      <TextDark>{props.title}</TextDark>
    </DrawerItem>
  );
}
