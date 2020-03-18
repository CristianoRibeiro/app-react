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

import {useFocusEffect} from '@react-navigation/native';

import api from '~/services/api';

import {Container, Content, Send} from '~/style';
import QRCodeScanner from "react-native-qrcode-scanner";
import {Btn, TextLight} from "~/pages/Event/Donation/styles";
import Modal from "react-native-modal";

import {AsyncStorage} from "react-native";

export default function Main(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState();
  const [modal, setModal] = useState(true);

  const [played, setPlayed] = useState(false);

  // const [modal, setModal] = useState(true);

  useEffect(() => {

    const didBlur = () => {
    };
    const didFocus = () => {
      setModal(true);
    };

    const blurSubscription = props.navigation.addListener('didBlur', didBlur);
    const focusSubscription = props.navigation.addListener('didFocus', didFocus);

    return () => {
      blurSubscription.remove();
      focusSubscription.remove();
    };
  }, []);

  async function _scanner(value) {
    setLoading(true);

    try {
      let response = await api.post('/api/game_quiz/check', {code: value});

      if (response.data.success) {
        setModal(false);
        props.navigation.navigate('QuizGame', {code: value});
      } else {
        Alert.alert(
          'Não foi possível realizar a ação',
           response.data.msg,
          [
            {
              text: 'OK', onPress: () => {
                props.navigation.navigate('Home');
                setModal(false);
              }
            }
          ],
          {cancelable: false},
        );
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
              props.navigation.navigate('Home');
              setModal(false);
            }}>
              <TextLight>CANCELAR</TextLight>
            </Btn>
          }
        />
      </Modal>
    </Content>
  );
}
