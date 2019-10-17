import React, {useState, useEffect, Component} from 'react';

import {
  AsyncStorage,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import api from '~/services/api';

import {
  Container,
  Content
} from '~/style/index';

export default function Main(props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    _bootstrapAsync();
  }, []);

  async function _bootstrapAsync () {
    //alert('teste');
    const userToken = await AsyncStorage.getItem('token');
    //const userToken = true;

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    props.navigation.navigate(false ? 'MainNavigator' : 'Login');
  }
  return (
    <Content>
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={"transparent"}
          translucent={true}
          barStyle="light-content"
        />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          {/*<ActivityIndicator size={'large'} animating={true}/>*/}
        </View>
      </View>
    </Content>
  );
}
