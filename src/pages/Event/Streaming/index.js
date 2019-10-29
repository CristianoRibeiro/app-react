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
} from '../../../style';

import {EventTitle, EventDate, EventLink, Header, TextTitle, Card, Link, CardImage, Points, Info} from './styles';


export default function Main(props) {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {

  }, []);

  return (
    <Content>
      <ScrollView>

        <Card>
          <Image
            source={require('~/assets/icons/alert.png')}
            style={{
              height: 50,
              width: 50,
            }}
            resizeMode="contain"
          />
          <EventTitle>NÃO DISPONÍVEL</EventTitle>
        </Card>


      </ScrollView>
    </Content>
  );
}
