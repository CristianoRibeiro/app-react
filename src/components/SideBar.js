import React, {useState, useEffect, Component} from 'react';
import { useSelector, useDispatch } from "react-redux";
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


export default function SiderBar(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    //alert(JSON.stringify(user));
  }, []);

  return (
    <Container>
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', paddingVertical: 20}}>
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Image
              source={{uri: user.avatar}}
              style={{
                height: 150,
                width: 150,
                borderRadius: 75,
              }}
              resizeMode="contain"
            />
          </View>

          <SubTitle style={{marginTop: 10}}>{user.name}</SubTitle>
          <TextLight>{user.email}</TextLight>
        </View>

        <DrawerNavigatorItems {...props} activeTintColor={'#3F51B5'} />
      </ScrollView>
    </Container>
  );
}
