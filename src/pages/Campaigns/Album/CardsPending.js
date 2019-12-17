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
import Item from './ItemPending';

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
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState('');
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
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  async function _confirm(item) {
    setSelected(item);
    //setModal(false);
  }

  async function _sendCancel(item) {
    try {
      let response = await api.post('/api/cards/cancel', {
        card_id: item.id,
        user_id: item.user_id,
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

  async function _cancel(item) {
    //setModal(false);
    Alert.alert(
      '',
      'Deseja cancelar?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('cancel'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            _sendCancel(item);
          },
        },
      ],
      {cancelable: false},
    );
  }

  async function _handModal(item) {
    if (__DEV__) {
      console.tron.log(item);
    }
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

  async function _handleItem(item) {
    setSelected(item);
    //setModal(false);
    setCard(item.image);
    setModal(false);
  }

  return (
    <Content>
      <FlatList
        contentContainerStyle={{paddingBottom: 75}}
        data={matchs}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList text="Não existem trocas pendentes." />}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }
        renderItem={({item, index}) => (
          <CardItem>
            <View>
              {item.user_id === user.id ? (
                <Item item={item} />
              ) : (
                <CardItem>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View>
                      <View style={{alignItems: 'flex-end'}}>
                        <Image
                          resizeMode="cover"
                          style={{
                            width: 100,
                            height: 100,
                            borderRadius: 5,
                            margin: 2,
                          }}
                          defaultSource={require('~/assets/avatar/avatar.png')}
                          source={{uri: item.card_image.gray}}
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
                            uri: item.from_user
                              ? item.from_user.append_avatar
                              : null,
                          }}
                          defaultSource={require('~/assets/avatar/avatar.png')}
                        />
                      </View>
                      <TextDark style={{fontSize: 12, textAlign: 'center'}}>
                        A receber
                      </TextDark>
                    </View>

                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                      }}>
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

                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View style={{alignItems: 'flex-end'}}>
                        <Image
                          resizeMode="cover"
                          style={{
                            width: 100,
                            height: 100,
                          }}
                          defaultSource={require('~/assets/avatar/avatar.png')}
                          source={require('~/assets/icons/picture.png')}
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
                            uri: item.user ? item.user.append_avatar : null,
                          }}
                          defaultSource={require('~/assets/avatar/avatar.png')}
                        />
                      </View>
                      <TextDark
                        style={{
                          fontSize: 12,
                          textAlign: 'center',
                          marginTop: 12,
                        }}>
                        A enviar
                      </TextDark>
                    </View>

                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 20,
                      }}>
                      <Submit
                        style={{
                          height: 50,
                          width: 50,
                          borderRadius: 25,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: 20,
                          backgroundColor: '#d32f2f',
                        }}
                        onPress={() => _cancel(item)}>
                        <AntDesign name={'dislike2'} color="#fff" size={20} />
                      </Submit>
                    </View>
                  </View>
                </CardItem>
              )}
            </View>
          </CardItem>
        )}
      />
    </Content>
  );
}
