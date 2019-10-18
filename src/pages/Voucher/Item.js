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
  Header,
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
  const user = useSelector(state => state.user);
  //const dispatch = useDispatch();

  const [data, setData] = useState(props.navigation.state.params.item);
  const [error, setError] = useState(false);

  useEffect(() => {
    //console.tron.log(props.navigation.state.params.item);
  }, []);

  const iconSize = 32;
  return (
    <Content source={require('~/assets/bg-login.jpg')} resizeMode="cover">
      <ScrollView style={{flex: 1}} keyboardDismissMode="interactive">
        <View style={{marginBottom: 75}}>
          <View style={{backgroundColor: '#efefef'}}>
            <Header style={{flexDirection: 'row', margin: 15}}>
              <Image
                resizeMode="cover"
                style={{width: 40, height: 40, borderRadius: 20}}
                defaultSource={require('~/assets/avatar/avatar.png')}
                source={{
                  uri: data.event.banner,
                }}
              />

              <View style={{flex: 1, justifyContent: 'center'}}>
                <TextLight numberOfLines={1}>{data.event.name}</TextLight>
                <TextDate style={{textAlign: 'left', paddingLeft: 20}}>{data.event.local}</TextDate>
              </View>

              
            </Header>

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
                  source={{
                    uri: user.avatar,
                  }}
                />
              </View>

              <TextLight style={{fontWeight: '700'}}>{data.name}</TextLight>

              <TextLight>Matrícula: {user.matricula}</TextLight>
            </View>
          </View>

          <Card style={{alignItems: 'center'}}>
            <View style={{overflow: 'hidden'}}>
              <QRCode
                value={data.code}
                size={200}
                bgColor="#000"
                fgColor="white"
              />
            </View>
            <TextDark style={{color: '#666'}}>{data.code}</TextDark>
          </Card>
          <Card>
            <ListItem
              title="CPF"
              text={data.doc}
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
              text={data.email}
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
              text={data.phone}
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
        </View>
      </ScrollView>
    </Content>
  );
}
