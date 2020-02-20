import React, {useState, useEffect, Component} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  View,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  RefreshControl,
  Alert,
  TouchableOpacity,
  Linking
} from 'react-native';
import {WebView} from 'react-native-webview';

import { useFocusEffect } from '@react-navigation/native';

import api from '~/services/api';

import {Container, Content, Send} from '~/style';
import QRCodeScanner from "react-native-qrcode-scanner";
import {Btn, TextLight} from "~/pages/Event/Donation/styles";
import Modal from "react-native-modal";

import { AsyncStorage } from "react-native";

export default function Main(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState();
  const [modal, setModal] = useState(true);

  const [played, setPlayed] = useState(false);

  // const [modal, setModal] = useState(true);

  useEffect(() => {

    const didBlur = () => {
      // props.navigation.navigate('Home');
      setModal(false);
    };
    const didFocus = () => {
      _retrieveData().done((value) => {
        if (value == 'true') {
          _storeData('false').done(() => {
            setModal(false);
            props.navigation.navigate('Home');
          });
        } else {
          setModal(true);
        }
      });
    };

    const blurSubscription = props.navigation.addListener('didBlur', didBlur);
    const focusSubscription = props.navigation.addListener('didFocus', didFocus);

    return () => {
      blurSubscription.remove();
      focusSubscription.remove();
    };
  }, []);

  async function _storeData(stats) {
    try {
      await AsyncStorage.setItem('played', stats);
    } catch (error) {
      // Error saving data
    }
  }

  async function _retrieveData() {
    try {
      const value = await AsyncStorage.getItem('played');
      if (value !== null) {
        return value;
      }

      return false;
    } catch (error) {
      // Error retrieving data
    }
  }

  async function _scanner(value) {
    setModal(false);
    setLoading(true);

    _retrieveData().done((value) => {
      if (value == 'true') {
        _storeData('false').done(() => {
          setModal(false);
          props.navigation.navigate('Home');
        });
      }
    });

    try {
      let response = await api.post('/api/games/toten', {event_id: 1, code: value, user_id: user.id});

      if (response.data.active) {
        _storeData('true').then(() => {
          props.navigation.navigate('Games', {item: response.data});
        });

      } else {
        props.navigation.navigate('Home');
      }

    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }

    setLoading(false);
  }

  return (
    <Content>
      <Modal isVisible={modal} style={{margin: 0}}>
        <QRCodeScanner
          onRead={e => _scanner(e.data)}
          showMarker={true}
          reactivate={false}
          bottomContent={
            <Btn onPress={() => {
              // props.navigation.navigate('Home');
              _scanner(5);
            }}>
              <TextLight>CANCELAR</TextLight>
            </Btn>
          }
        />
      </Modal>
    </Content>
  );
}
