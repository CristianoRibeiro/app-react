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
} from '~/style';

import {Title, Card} from './styles';


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
          
          <Title>Conheça o espaço Viva na sede Apcef/PA e participe!</Title>
        </Card>


      </ScrollView>
    </Content>
  );
}
