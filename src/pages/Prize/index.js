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
  br
} from 'react-native';

import api from '~/services/api';

import {
  Container,
  Content
} from '../../style';

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

        <Card style={{borderColor:'green',borderBottomWidth:3,borderTopWidth:3}}>
          <CardImage>
            <Image
              source={require('~/assets/icons/premios.png')}
              style={{
                height: 40,
                width: 40,
              }}
              resizeMode="contain"
            />
          </CardImage>
          <Info style={{ flex: 3 }}>
            <EventTitle>MOCHILA TOM GRILL</EventTitle>
            <EventLink>Retirado</EventLink>
          </Info>
        </Card>

        <Card style={{borderColor:'blue',borderBottomWidth:3,borderTopWidth:3}}>
          <CardImage>
            <Image
              source={require('~/assets/icons/premios.png')}
              style={{
                height: 40,
                width: 40,
              }}
              resizeMode="contain"
            />
          </CardImage>
          <Info style={{ flex: 3 }}>
            <EventTitle>RELÓGIO GARMIN</EventTitle>
            <EventLink>Não retirado</EventLink>
          </Info>
        </Card>

      </ScrollView>
    </Content>
  );
}
