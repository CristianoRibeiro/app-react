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
  const [code, setCode] = useState(props.navigation.state.params.code);

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
    const sound = new Sound('https://viva-fenae.strongtecnologia.com.br/mp3/palmas2.mp3', null, (error) => {
      sound.play();
    });
  }, []);


  return (
    <Content>

    </Content>
  );
}
