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
} from './styles';

export default function Main(props) {
  const user = useSelector(state => state.user);
  const matchs = useSelector(state => state.matchs);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
    // if (__DEV__) {
    //   console.tron.log(props.navigation.state.params.item);
    // }
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
      console.tron.log(item);
    }
    try {
      let response = await api.post('/api/cards/exchange', {
        card_id: item.id,
      });
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }

      Alert.alert(null, response.data.message);
      //setNotifications(response.data);
      //_getData();
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setModal(false);
  }

  async function _handleItem(item) {
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
        {text: 'OK', onPress: () => _send(item)},
      ],
      {cancelable: false},
    );
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
    <Content>
      <FlatList
        data={matchs}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <EmptyList text="Aqui você pode trocar figurinhas com os seus amigos." />
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
              }}>
              <View style={{alignItems: 'center', flex: 1}}>
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
              </View>

              <Link key={index} onPress={() => _handModal(item)}>
                {item.exchange ? (
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
                        source={{uri: item.exchange.image}}
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
                    <FontAwesome name="image" size={45} color={'#999'} />
                  </CardItem>
                    <TextDark style={{fontSize: 12, textAlign: 'center'}}>
                        A enviar
                      </TextDark>
                  </View>
                  
                )}
              </Link>

              <View style={{alignItems: 'center', flex: 1}}>
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
              </View>
            </View>
          </CardItem>
        )}
      />

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
    </Content>
  );
}
