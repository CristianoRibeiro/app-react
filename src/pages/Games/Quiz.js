import React, {useState, useEffect, Component} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Image,
  View,
} from 'react-native';

import api from '~/services/api';

import {Container, Content} from '~/style';

import Sound from 'react-native-sound';

import {
  Btn,
  TextDark,
  TextLight,
} from './styles';

import QRCodeScanner from "react-native-qrcode-scanner";
import Modal from "react-native-modal";

import { AsyncStorage } from "react-native";

export default function Main(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState();

  const [canPlay, setCanPlay] = useState(false);
  const [audio, setAudio] = useState();
  const [audio2, setAudio2] = useState();
  const [code, setCode] = useState(props.navigation.state.params.code);
  const [endGame, setEndGame] =  useState(false);

  useEffect(() => {

    const didBlur = () => {};

    const didFocus = () => {};

    const blurSubscription = props.navigation.addListener('didBlur', didBlur);
    const focusSubscription = props.navigation.addListener('didFocus', didFocus);

    return () => {
      blurSubscription.remove();
      focusSubscription.remove();
    };
  }, []);

  useEffect(() => {
    const sound = new Sound('https://viva-fenae.strongtecnologia.com.br/mp3/perdeu.mp3', null, (error) => {});
    const sound2 = new Sound('https://viva-fenae.strongtecnologia.com.br/mp3/palmas2.mp3', null, (error) => {});

    setAudio(sound);
    setAudio2(sound2);
  }, []);

  function _wrong()
  {
      audio.play();
  }

  async function _correct()
  {
    audio2.play();

    try {
      let response = await api.post('api/game_quiz/save', {code: code});

      if (response.data.success) {
        // props.navigation.navigate('End', {code: code});
        setEndGame(true);
      }

    } catch (error) {
      console.tron.log(error);
    }
  }

  return (
    <Content>
      {!endGame? (
        <View
          style={{
            backgroundColor: '#fff',
            margin: 10,
            borderRadius: 15
          }}
        >
          <TextDark
            style={{
              padding: 25,
              fontSize: 22,
              textAlign: 'center'
            }}
          >
            {'Vem aí um novo projeto da Fenae e das Apcefs que vai te dar acesso a descontos em mais de 10 mil estabelecimentos espalhados por todo o Brasil. Trata-se:'}
          </TextDark>

          <View style={{ marginTop: 20, marginBottom: 5 }}>
            <Btn onPress={() => _wrong()}>
              <TextLight>da Rede do Conhecimento;</TextLight>
            </Btn>

            <Btn onPress={() => _correct()}>
              <TextLight>do Convênios;</TextLight>
            </Btn>

            <Btn onPress={() => _wrong()}>
              <TextLight>do Movimento Solidário.</TextLight>
            </Btn>
          </View>

        </View>
      ):(
        <View
          style={{
            backgroundColor: '#fff',
            margin: 10,
            borderRadius: 15
          }}
        >
          <View style={{ textAlign: 'center' }}>
            <Image
              style={{ width: 200, height: 200, marginLeft: 'auto', marginRight: 'auto' }}
              source={{uri: 'https://viva-fenae.strongtecnologia.com.br/games/ganhou.gif'}}
            />
          </View>

          <TextDark
            style={{
              padding: 25,
              fontSize: 22,
              textAlign: 'center'
            }}
          >
            {'Parabéns!'}
          </TextDark>

          <Btn onPress={() => props.navigation.navigate('Home')}>
            <TextLight>Voltar</TextLight>
          </Btn>
        </View>
      )}
    </Content>
  );


}
