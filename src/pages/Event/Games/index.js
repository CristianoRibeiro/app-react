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
} from 'react-native';

import api from '~/services/api';

import {Container, Content} from '~/style';

import {Title, Card} from './styles';

export default function Main(props) {
  const eventitem = useSelector(state => state.eventitem);

  const [cpf, setCpf] = useState('');
  const [item, setItem] = useState(
    eventitem.app_functions ? JSON.parse(eventitem.app_functions) : [],
  );
  const [error, setError] = useState(false);

  useEffect(() => {}, []);

  return (
    <Content>
      <ScrollView>
        <Card>
          <Title>{item.games_text}</Title>
        </Card>
      </ScrollView>
    </Content>
  );
}
