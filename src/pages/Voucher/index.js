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

import {Title, SubTitle, Header, TextDark, Card, Link} from './styles';

import {Container, Content} from '../../style';

export default function Main(props) {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {}, []);

  return (
    <Content>
      <ScrollView>
        <Link onPress={() => props.navigation.navigate('VoucherItem')}>
          <Card>
            <Title style={{color: '#333'}}>teste</Title>
            <SubTitle style={{color: '#333'}}>teste</SubTitle>
          </Card>
        </Link>
      </ScrollView>
    </Content>
  );
}
