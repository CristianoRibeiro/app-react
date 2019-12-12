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
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import EmptyList from '~/components/EmptyList';

import api from '~/services/api';

import {Container, Content} from '../../../style';

import {
  Title,
  NotificationDate,
  NotificationLink,
  Header,
  TextTitle,
  Card,
  CardItem,
  CardImage,
  Link,
  TextDark,
  ItemQuestion,
  NotificationText,
  Submit,
  Send,
  TextLight,
  Confirm,
  Cancel,
} from './styles';

export default function Main(props) {
  const user = useSelector(state => state.user);
  const matchs = useSelector(state => state.matchs);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = await api.get('/api/cards/match');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'MATCHS', payload: response.data});

      //setNotifications(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  async function _send(item) {
    if (__DEV__) {
      console.tron.log(item);
    }
    try {
      let response = await api.post('/api/cards/cancel', {
        card_id: item.id,
      });
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }

      Alert.alert(null, response.data.message);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    //Props do metodo _getData() - CardRealize.js
    _getData();
  }

  async function _confirm(item) {
    //setModal(false);
    Alert.alert(
      '',
      'Deseja Cancelar?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('cancel'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            _send(item);
          },
        },
      ],
      {cancelable: false},
    );
  }

  return (
    <Content>
      <FlatList
        contentContainerStyle={{paddingBottom: 75}}
        data={matchs}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <EmptyList text="Não existem trocas pendentes." />
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }
        renderItem={({item, index}) => (
          <CardItem>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
              }}>
              {item.exchange_image.gray ? (
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    flex: 1,
                  }}>
                  <View>
                    <Image
                      resizeMode="cover"
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 5,
                        margin: 2,
                      }}
                      defaultSource={require('~/assets/avatar/avatar.png')}
                      source={{uri: item.exchange_image.gray}}
                    />
                    <TextDark style={{fontSize: 12, textAlign: 'center'}}>
                      A receber
                    </TextDark>
                  </View>
                </View>
              ) : (
                <View style={{alignItems: 'center', flex: 1}}>
                  <CardItem
                    style={{
                      borderColor: '#ccc',
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 100,
                      height: 100,
                      flex: 1,
                    }}>
                    <MaterialCommunityIcons
                      name="plus"
                      size={45}
                      color={'#999'}
                    />
                  </CardItem>
                  <TextDark style={{fontSize: 12, textAlign: 'center'}}>
                    A enviar
                  </TextDark>
                </View>
              )}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                  marginBottom: 20,
                }}>
                <FontAwesome name="exchange" size={36} color={'#4caf50'} />
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  resizeMode="cover"
                  style={{
                    width: 100,
                    height: 100,
                  }}
                  defaultSource={require('~/assets/avatar/avatar.png')}
                  source={require('~/assets/icons/picture.png')}
                />
                <TextDark
                  style={{fontSize: 12, textAlign: 'center', marginTop: 12}}>
                  A enviar
                </TextDark>
              </View>

              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Cancel
                  onPress={() => _confirm(item)}
                  style={{marginBottom: 20}}>
                  <TextLight style={{fontSize: 12}}>CANCELAR</TextLight>
                </Cancel>
              </View>
            </View>
          </CardItem>
        )}
      />
    </Content>
  );
}
