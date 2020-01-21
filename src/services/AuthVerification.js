import React, {useState, useEffect, Component} from 'react';
import {useSelector, useDispatch} from 'react-redux';
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
import OneSignal from 'react-native-onesignal'; // Import package from node modules

import api from '~/services/api';

import {Container, Content} from '~/style/index';

export default function Main(props) {
  const dispatch = useDispatch();

  function onReceived(notification) {
    if (__DEV__) {
      console.tron.log('Notification received: ', notification);
    }
  }

  function onOpened(openResult) {
    if (__DEV__) {
      console.tron.log('Message: ', openResult.notification.payload.body);
      console.tron.log(
        'Data: ',
        openResult.notification.payload.additionalData,
      );
      console.tron.log('isActive: ', openResult.notification.isAppInFocus);
      console.tron.log('openResult: ', openResult);
    }
  }

  function onIds(device) {
    if (__DEV__) {
      console.tron.log('Device info: ', device);
    }
  }

  useEffect(() => {
    _bootstrapAsync();

    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    };
  }, []);

  async function _bootstrapAsync() {
    //alert('teste');
    const userToken = await AsyncStorage.getItem('token');
    //const userToken = true;

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    props.navigation.navigate(userToken ? 'MainNavigator' : 'Login');

    try {
      let response = await api.get('/api/auth/user');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'USER', payload: response.data});

      if (!response.data.updated) {
        props.navigation.navigate('ProfileE');
      }

      const user = response.data;

      OneSignal.init('fe78dad3-8bec-4eaa-a926-b087abff0739');
      //Api teste
      //OneSignal.init("c041a070-4834-4609-84f1-3af810fab71d");

      OneSignal.addEventListener('received', onReceived);
      OneSignal.addEventListener('opened', onOpened);
      OneSignal.addEventListener('ids', onIds);

      if (user) {
        OneSignal.sendTags({
          user_id: user.id,
          email: user.email,
        })
          .then(data => {
            if (__DEV__) {
              console.tron.log('Tag!');
            }
          })
          .catch(function (error) {
            if (__DEV__) {
              console.tron.log('Erro enviar tags!' + error.message);
            }
          });
      }

      //setNotifications(response.data);
    } catch (error) {
      if (error.message === 'Request failed with status code 401' || error.message === 'Request failed with status code 500') {
        props.navigation.navigate('Login');
        AsyncStorage.removeItem(
          'token'
        );
        AsyncStorage.removeItem(
          'user'
        );
        AsyncStorage.removeItem(
          'event'
        );
      }
    }
  }

  return (
    <Content>
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor={'transparent'}
          translucent={true}
          barStyle="light-content"
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {/* <ActivityIndicator size={'large'} animating={true}/> */}
        </View>
      </View>
    </Content>
  );
}
