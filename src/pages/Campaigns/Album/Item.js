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
  const [modal, setModal] = useState(false);
  const [modalUser, setModalUser] = useState(false);
  const [selected, setSelected] = useState(null);
  const [exchange, setExchange] = useState(
    props.item.exchange_image ? props.item.exchange_image.image : null,
  );
  const [card, setCard] = useState(
    props.item.card_image ? props.item.card_image.image : null,
  );
  const [cards, setCards] = useState([]);

  useEffect(() => {
    _getData();
  }, []);

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
      console.tron.log(props.item);
    }
    try {
      let response = await api.post('/api/cards/exchange', {
        card_id: props.item.id,
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
    setModal(false);
  }

  async function _handModal(item) {
    setModal(true);

    setLoading(true);
    try {
      let response = await api.post('/api/cards/from/user/repeated', {
        user_id: item.user.id,
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

  //   async function _handModalUser(item) {
  //     setModalUser(true);

  //     setLoading(true);
  //     try {
  //       let response = await api.post('/api/cards/from/user/repeated', {
  //         user_id: item.user.id,
  //       });
  //       //alert(JSON.stringify(response));
  //       if (__DEV__) {
  //         console.tron.log(response.data);
  //       }

  //       setCards(response.data);
  //     } catch (error) {
  //       if (__DEV__) {
  //         console.tron.log(error);
  //       }
  //     }
  //     setLoading(false);
  //   }

  async function _handleItem(item) {
    setSelected(item);
    //setModal(false);
    setCard(item.image);
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
            _send();
          },
        },
      ],
      {cancelable: false},
    );
  }

  //   async function _handleItemUser(item) {
  //     if (__DEV__) {
  //       console.tron.log(item);
  //     }

  //     setSelected(item);
  //     //setModal(false);
  //     Alert.alert(
  //       '',
  //       'Confirmar troca?',
  //       [
  //         {
  //           text: 'Cancelar',
  //           onPress: () => console.log('Cancel Pressed'),
  //           style: 'cancel',
  //         },
  //         {text: 'OK', onPress: () => {setExchange(item.image); setModalUser(false)}},
  //       ],
  //       {cancelable: false},
  //     );
  //   }

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

  function _renderItemUser(item, i) {
    return (
      <Link onPress={() => _handleItemUser(item)} key={i}>
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
          }}>
          {exchange ? (
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
                  source={{uri: exchange}}
                />
                <TextDark style={{fontSize: 12, textAlign: 'center'}}>
                  A enviar
                </TextDark>
              </View>
            </View>
          ) : (
            <View style={{alignItems: 'center'}}>
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
                <MaterialCommunityIcons name="plus" size={45} color={'#999'} />
              </CardItem>
              <TextDark style={{fontSize: 12, textAlign: 'center'}}>
                A enviar
              </TextDark>
            </View>
          )}
          {/* <View style={{alignItems: 'center', flex: 1}}>
                <Image
                  resizeMode="cover"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 5,
                    margin: 2,
                  }}
                  defaultSource={require('~/assets/avatar/avatar.png')}
                  source={{uri: item.card_image.image}}
                />
                <TextDark style={{fontSize: 12, textAlign: 'center'}}>
                  A receber
                </TextDark>
              </View> */}

          <Link key={props.index} onPress={() => _handModal(props.item)}>
            {card ? (
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  flex: 1,
                }}>
                <FontAwesome
                  style={{marginRight: 10}}
                  name="exchange"
                  size={22}
                  color={'#4caf50'}
                />

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
                    source={{uri: card}}
                  />
                  <TextDark style={{fontSize: 12, textAlign: 'center'}}>
                    A receber
                  </TextDark>
                </View>
              </View>
            ) : (
              <View style={{alignItems: 'center'}}>
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
                  A receber
                </TextDark>
              </View>
            )}
          </Link>

          {/* <View style={{alignItems: 'center', flex: 1}}>
                <Image
                  resizeMode="cover"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 5,
                    margin: 2,
                  }}
                  defaultSource={require('~/assets/avatar/avatar.png')}
                  source={{uri: item.user.append_avatar}}
                />
                <TextDark style={{fontSize: 10, textAlign: 'center'}}>
                  {item.user.name}
                </TextDark>
              </View> */}

          <View style={{marginLeft: 10}}>
            <Confirm onPress={() => _confirm()}>
              <TextLight style={{fontSize: 12}}>CONFIRMAR</TextLight>
            </Confirm>
            <Cancel>
              <TextLight style={{fontSize: 12}}>RECUSAR</TextLight>
            </Cancel>
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
            <TextLight>OK</TextLight>
          </Send>
        </View>
      </Modal>

      {/* Modal figurinhas para trocar com outro usuario */}
      {/* <Modal
        visible={modalUser}
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
            renderItem={({item, index}) => _renderItemUser(item, index)}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => _getData()}
              />
            }
          />
          <Send
            onPress={() => setModalUser(false)}
            style={{marginBottom: 15, marginTop: 10}}>
            <TextLight>OK</TextLight>
          </Send>
        </View>
      </Modal> */}
    </View>
  );
}
