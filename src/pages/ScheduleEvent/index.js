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
import {TextItem} from "~/pages/ScheduleEvent/styles";


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
          <CardImage>
            <TextItem>
              14h às 20h
            </TextItem>
          </CardImage>
          <Info style={{ flex: 3 }}>
            <EventTitle>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a</EventTitle>
            <EventLink>Retirado</EventLink>
          </Info>
        </Card>

        <Card>
          <CardImage>
            <TextItem>
              20h às 24h
            </TextItem>
          </CardImage>
          <Info style={{ flex: 3 }}>
            <EventTitle>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a</EventTitle>
            <EventLink>Eduardo Oliveira</EventLink>
          </Info>
        </Card>

      </ScrollView>
    </Content>
  );
}
