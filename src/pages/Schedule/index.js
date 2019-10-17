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

import {EventTitle, EventDate, EventLink, Header, TextTitle, Card, Link, CardImage} from './styles';


export default function Main(props) {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {

  }, []);

  return (
    <Content>
      <Link>
        <Card>
          <CardImage>
            <Image
              source={require('~/assets/icons/calendar.png')}
              style={{
                height: 50,
                width: 50,
              }}
              resizeMode="contain"
            />
          </CardImage>
          <View style={{ flex: 3 }}>
            <EventDate>19/09/2019</EventDate>
            <EventTitle>ANIVERSÁRIO APCEF/PA</EventTitle>
            <EventLink>SAIBA MAIS</EventLink>
          </View>
        </Card>
      </Link>
    </Content>
  );
}
