import React, {useState, useEffect, Component} from 'react';

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
} from 'react-native';

import api from '~/services/api';

import {
  Container,
  Content
} from '../../style';

import {NotificationTitle, NotificationDate, NotificationLink, Header, TextTitle, Card, Link, NotificationText} from './styles';


export default function Main(props) {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {

  }, []);

  return (
    <Content>
      <Link>
        <ScrollView>
          <Card>
            <View>
              <NotificationDate>Postado em: 20/09/2019</NotificationDate>
              <NotificationTitle>Informações da sua hospedagem</NotificationTitle>
              <NotificationText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut suscipit tortor ut quam bibendum, rutrum finibus mauris cursus. Quisque interdum, nunc id tristique tempor, nibh arcu vehicula lectus, quis porttitor arcu augue at turpis...</NotificationText>
            </View>
          </Card>
        </ScrollView>
      </Link>
    </Content>
  );
}
