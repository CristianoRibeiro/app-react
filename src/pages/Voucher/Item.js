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
  TouchableOpacity,
} from 'react-native';
import {Avatar, FAB} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import QRCode from 'react-native-qrcode-svg';

import api from '~/services/api';

//Components
import ListItem from '~/components/ListItem';

import {
  Title,
  Form,
  Input,
  Submit,
  List,
  TextLight,
  Card,
  TextDark,
  Link,
  Send,
  SubTitle,
  TextDate,
} from './styles';

import {Container, Content} from '../../style';

export default function Profile(props) {
  const [image, setImage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {}, []);

  const iconSize = 32;
  return (
    <Content source={require('~/assets/bg-login.jpg')} resizeMode="cover">
      <ScrollView style={{flex: 1}} keyboardDismissMode="interactive">
        <View style={{backgroundColor: '#1d39cb'}}>
          <View style={{flexDirection: 'row', margin: 15}}>
            <Image
              resizeMode="cover"
              style={{width: 40, height: 40, borderRadius: 20}}
              defaultSource={require('~/assets/avatar/avatar.png')}
              source={{
                uri: 'https://tanabi.sp.gov.br/media/capas/20170109131607.jpg',
              }}
            />

            <View style={{flex: 1, justifyContent: 'center'}}>
              <TextLight>Evento</TextLight>
            </View>

            <View style={{justifyContent: 'center'}}>
              <TextDate style={{color: 'white'}}>faltam 2 dias</TextDate>
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              padding: 15,
            }}>
            <View style={{alignItems: 'flex-end', flex: 1, marginBottom: 20}}>
              <Image
                resizeMode="cover"
                style={{width: 180, height: 180, borderRadius: 90}}
                defaultSource={require('~/assets/avatar/avatar.png')}
                source={image}
              />
            </View>

            <TextLight style={{fontWeight: '700'}}>
              FRANCISCO ALVES PEREIRA
            </TextLight>

            <TextLight>Matrícula: 9992333-21</TextLight>
          </View>
        </View>

        <Card style={{alignItems: 'center'}}>
          <View style={{overflow: 'hidden'}}>
            <QRCode value={'teste'} size={200} bgColor="#000" fgColor="white" />
          </View>
        </Card>
        <Card>
          <ListItem
            title="CPF"
            text="034.443.334.11"
            color="#444"
            icon={
              <MaterialCommunityIcons
                name="account-card-details-outline"
                size={iconSize}
                color={'#444'}
              />
            }
          />

          <ListItem
            title="E-MAIL"
            text="franciscoalves@gmail.com"
            color="#444"
            icon={
              <MaterialCommunityIcons
                name="email-outline"
                size={iconSize}
                color={'#444'}
              />
            }
          />

          <ListItem
            title="TELEFONE"
            text="9 95949-9394"
            color="#444"
            icon={
              <MaterialCommunityIcons
                name="cellphone-android"
                size={iconSize}
                color={'#444'}
              />
            }
          />
        </Card>
      </ScrollView>
    </Content>
  );
}
