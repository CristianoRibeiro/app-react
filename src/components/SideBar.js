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
import {ScrollView} from 'react-native-gesture-handler';

export default function Main(props) {
  useEffect(() => {
    //alert(JSON.stringify(props));
  }, []);

  return (
    <Container>
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', paddingVertical: 20}}>
          <Image
            source={require('~/assets/avatar_evento.png')}
            style={{
              height: 150,
              width: 150,
              borderRadius: 50,
            }}
            resizeMode="contain"
          />

          <SubTitle style={{marginTop: 10}}>nome</SubTitle>
          <TextLight>email</TextLight>
        </View>

        <DrawerNavigatorItems {...props} activeTintColor={'#051538'} />
      </ScrollView>
    </Container>
  );
}
