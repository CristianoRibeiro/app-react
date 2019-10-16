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

import {EventTitle, EventDate, EventLink, Header, TextTitle, Card, Link, CardImage, Points, Info} from './styles';


export default function Main(props) {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {

  }, []);

  return (
    <Content>
      <Header style={{alignItems: 'center'}}>
        <TextTitle>EXTRATO DE INTERAÇÕES</TextTitle>
      </Header>
      <ScrollView>
        <Card>
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
            <EventTitle>ACESSAR A PLATAFORMA DE REDE DO CONHECIMENTO PELA PRIMEIRA VEZ</EventTitle>
          </Info>
          <Points style={{ flex: 1 }}>
            <EventLink>10</EventLink>
          </Points>
        </Card>

        <Card>
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
            <EventTitle>MATRICULAR EM UM CURSO</EventTitle>
          </Info>
          <Points style={{ flex: 1 }}>
            <EventLink>10</EventLink>
          </Points>
        </Card>

        <Card>
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
            <EventTitle>CONCLUIR CURSO</EventTitle>
          </Info>
          <Points style={{ flex: 1 }}>
            <EventLink>10</EventLink>
          </Points>
        </Card>

        <Card>
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
            <EventTitle>CONCLUIR PÍLULA</EventTitle>
          </Info>
          <Points style={{ flex: 1 }}>
            <EventLink>10</EventLink>
          </Points>
        </Card>

        <Card>
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
            <EventTitle>CONCLUIR PODCAST</EventTitle>
          </Info>
          <Points style={{ flex: 1 }}>
            <EventLink>10</EventLink>
          </Points>
        </Card>

        <Card>
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
            <EventTitle>CONCLUIR INFOGRÁFICO</EventTitle>
          </Info>
          <Points style={{ flex: 1 }}>
            <EventLink>10</EventLink>
          </Points>
        </Card>

        <Card>
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
            <EventTitle>CONCLUIR VÍDEO ESPECIAIS</EventTitle>
          </Info>
          <Points style={{ flex: 1 }}>
            <EventLink>10</EventLink>
          </Points>
        </Card>
      </ScrollView>
    </Content>
  );
}
