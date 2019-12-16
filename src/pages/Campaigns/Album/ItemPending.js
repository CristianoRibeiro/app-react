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
import {Avatar} from 'react-native-paper';

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
  const [modal, setModal] = useState(false);
  const [render, setRender] = useState(true);
  const [selected, setSelected] = useState(null);
  const [exchange, setExchange] = useState(
    props.item.exchange_image ? props.item.exchange_image.image : null,
  );
  const [card, setCard] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {}, []);

  async function _getData() {
    try {
      let response = await api.get('/api/cards/match');
      await dispatch({type: 'MATCHS', payload: []});
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'MATCHS', payload: response.data});
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  async function _send(item) {
    const values = {
      user_id: props.item.from,
      id_figurinha_solicitada: card.card_id,
      id_figurinha_para_troca: props.item.id,
    };
    if (__DEV__) {
      console.tron.log(values);
      //console.tron.log(props.item);
    }
    try {
      setCards('');
      let response = await api.post('/api/cards/exchange', values);
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      _getData();
      Alert.alert(null, response.data.message);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error);
      }
    }
  }

  async function _cancel(item) {
    if (__DEV__) {
      console.tron.log(props.item);
    }
    try {
      let response = await api.post('/api/cards/cancel', {
        card_id: props.item.id,
        user_id: props.item.from
      });
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      Alert.alert(null, response.data.message);
      _getData();
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error);
      }
    }
    setModal(false);
  }

  async function _handModal(item) {
    setModal(true);

    setLoading(true);
    try {
      let response = await api.post('/api/cards/from/user/repeated', {
        user_id: props.item.from,
      });
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }

      setCards(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  async function _handleItem(item) {
    if (__DEV__) {
      console.tron.log(item);
    }
    setSelected(item);
    //setModal(false);
    setCard(item);
    setModal(false);
  }

  async function _confirm(item) {
    setSelected(item);
    //setModal(false);
    Alert.alert(
      '',
      'Confirmar troca?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
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

  function _renderItem(item, i) {
    return (
      <Link onPress={() => _handleItem(item)} key={i}>
        <CardItem
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <CardImage>
            <Image
              style={{aspectRatio: 1}}
              source={{uri: item.image}}
              resizeMode="contain"
            />
          </CardImage>
        </CardItem>
      </Link>
    );
  }

  return (
    <View>
      <CardItem>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{alignItems: 'flex-end'}}>
              <Image
                resizeMode="cover"
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 5,
                  margin: 2,
                }}
                defaultSource={require('~/assets/avatar/avatar.png')}
                source={{
                  uri: props.item.card_image
                    ? props.item.card_image.image
                    : null,
                }}
              />
              <Image
                resizeMode="cover"
                style={{
                  marginTop: -20,
                  marginRight: -20,
                  marginBottom: -5,
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  margin: 2,
                }}
                source={{
                  uri: props.item.user ? props.item.user.append_avatar : null,
                }}
                defaultSource={require('~/assets/avatar/avatar.png')}
              />
            </View>

            <TextDark style={{fontSize: 12, textAlign: 'center'}}>
              A enviar
            </TextDark>
          </View>

          <View style={{alignItems: 'center', justifyContent: 'center',flex:1}}>
            <Image
              source={require('~/assets/icons/ico_trocas.png')}
              style={{
                height: 40,
                width: 40,
                marginHorizontal: 5,
                marginBottom: 25,
              }}
              resizeMode="contain"
            />
          </View>

          <View style={{flex: 1}}>
            <Link key={props.index} onPress={() => _handModal(props.item)}>
              {card ? (
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    flex: 1,
                  }}>
                  <View>
                    <View style={{alignItems: 'flex-end'}}>
                      <Image
                        resizeMode="cover"
                        style={{
                          width: 90,
                          height: 90,
                          borderRadius: 5,
                          margin: 2,
                        }}
                        defaultSource={require('~/assets/avatar/avatar.png')}
                        source={{uri: card.image}}
                      />
                      <Image
                        resizeMode="cover"
                        style={{
                          marginTop: -20,
                          marginRight: -20,
                          marginBottom: -5,
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          margin: 2,
                        }}
                        source={{
                          uri: props.item.from_user
                            ? props.item.from_user.append_avatar
                            : null,
                        }}
                        defaultSource={require('~/assets/avatar/avatar.png')}
                      />
                    </View>
                    <TextDark style={{fontSize: 12, textAlign: 'center'}}>
                      A receber
                    </TextDark>
                  </View>
                </View>
              ) : (
                <View style={{alignItems: 'center'}}>
                  <View style={{alignItems: 'flex-end'}}>
                    <CardItem
                      style={{
                        borderColor: '#ccc',
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 90,
                        maxHeight: 90,
                        flex: 1,
                      }}>
                      <MaterialCommunityIcons
                        name="plus"
                        size={45}
                        color={'#999'}
                      />
                    </CardItem>
                    <Image
                      resizeMode="cover"
                      style={{
                        marginTop: -20,
                        marginRight: -20,
                        marginBottom: -5,
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        margin: 2,
                      }}
                      source={{
                        uri: props.item.from_user
                          ? props.item.from_user.append_avatar
                          : null,
                      }}
                      defaultSource={require('~/assets/avatar/avatar.png')}
                    />
                  </View>
                  <TextDark style={{fontSize: 12, textAlign: 'center'}}>
                    A receber
                  </TextDark>
                </View>
              )}
            </Link>
          </View>

          <View
            style={{justifyContent: 'center', alignItems: 'center',marginLeft: 20}}>
            <Submit
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 5,
                backgroundColor: '#4caf50',
              }}
              disabled={card ? false : true}
              onPress={() => _confirm()}>
              <AntDesign name={'like2'} color="#fff" size={20} />
            </Submit>

            <Submit
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
                backgroundColor: '#d32f2f',
              }}
              onPress={() => _cancel()}>
              <AntDesign name={'dislike2'} color="#fff" size={20} />
            </Submit>
          </View>
        </View>
      </CardItem>

      <Modal
        visible={modal}
        style={{marginHorizontal: 0, marginBottom: 0}}
        transparent={true}
        onRequestClose={() => setModal(false)}
        onBackdropPress={() => setModal(false)}>
        <View style={{flex: 1, marginTop: 80, backgroundColor: '#fff'}}>
          <Header style={{alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TextDark style={{fontSize: 14, fontWeight: '600'}}>
                Selecione a figurinha que deseja trocar.
              </TextDark>
            </View>
          </Header>
          <FlatList
            data={cards}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <EmptyList text="Nenhuma figurinha encontrada!" />
            }
            renderItem={({item, index}) => _renderItem(item, index)}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => _getData()}
              />
            }
          />
          <Send
            onPress={() => setModal(false)}
            style={{marginBottom: 15, marginTop: 10}}>
            <TextLight>CANCELAR</TextLight>
          </Send>
        </View>
      </Modal>
    </View>
  );
}
