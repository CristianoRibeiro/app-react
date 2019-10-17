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
  Title,
  SubTitle,
  Header,
  TextDark,
  Card,
  Link,
  TextDate,
} from './styles';

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
          <Card style={{flexDirection: 'row'}}>
            <Image
              resizeMode="cover"
              style={{width: 60, height: 60, borderRadius: 30}}
              defaultSource={require('~/assets/avatar/avatar.png')}
              source={{
                uri: 'https://tanabi.sp.gov.br/media/capas/20170109131607.jpg',
              }}
            />

            <View style={{flex: 1, justifyContent: 'center', marginLeft: 15}}>
              <Title style={{color: '#333'}}>Evento</Title>
              <SubTitle style={{color: '#333'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                lacinia felis mi, sit amet porta nibh porttitor a...{' '}
              </SubTitle>
              <TextDate>faltam 2 dias</TextDate>
            </View>
          </Card>
        </Link>

        <Link onPress={() => props.navigation.navigate('VoucherItem')}>
          <Card style={{flexDirection: 'row'}}>
            <Image
              resizeMode="cover"
              style={{width: 60, height: 60, borderRadius: 30}}
              defaultSource={require('~/assets/avatar/avatar.png')}
              source={{
                uri: 'https://tanabi.sp.gov.br/media/capas/20170109131607.jpg',
              }}
            />

            <View style={{flex: 1, justifyContent: 'center', marginLeft: 15}}>
              <Title style={{color: '#333'}}>Evento</Title>
              <SubTitle style={{color: '#333'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                lacinia felis mi, sit amet porta nibh porttitor a...{' '}
              </SubTitle>
              <TextDate>faltam 2 dias</TextDate>
            </View>
          </Card>
        </Link>

        <Link onPress={() => props.navigation.navigate('VoucherItem')}>
          <Card style={{flexDirection: 'row'}}>
            <Image
              resizeMode="cover"
              style={{width: 60, height: 60, borderRadius: 30}}
              defaultSource={require('~/assets/avatar/avatar.png')}
              source={{
                uri: 'https://tanabi.sp.gov.br/media/capas/20170109131607.jpg',
              }}
            />

            <View style={{flex: 1, justifyContent: 'center', marginLeft: 15}}>
              <Title style={{color: '#333'}}>Evento</Title>
              <SubTitle style={{color: '#333'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                lacinia felis mi, sit amet porta nibh porttitor a...{' '}
              </SubTitle>
              <TextDate>faltam 2 dias</TextDate>
            </View>
          </Card>
        </Link>
      </ScrollView>
    </Content>
  );
}
