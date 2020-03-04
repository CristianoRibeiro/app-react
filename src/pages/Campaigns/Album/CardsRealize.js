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
  const [cards, setCards] = useState([]);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = await api.post('/api/cards/history');
      setCards(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  function _renderUserSource(item) {
    if (item) {
      if (item.user_source) {
        if (item.user_source.append_avatar) {
          return (
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
              source={{uri: item.user_source.append_avatar}}
              defaultSource={require('~/assets/avatar/avatar.png')}
            />
          );
        }
      }
    }
  }

  function _renderImageSource(item) {
    if (item) {
      if (item.card_source) {
        if (item.card_source.card_image) {
          if (item.card_source.card_image.image) {
            return (
              <View style={{alignItems: 'flex-end'}}>
                <Image
                  resizeMode="cover"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 5,
                    margin: 2,
                  }}
                  source={{uri: item.card_source.card_image.image}}
                />

                {_renderUserSource(item)}
              </View>
            );
          }
        }
      }
    }
  }

  function _renderUserTarget(item) {
    if (item) {
      if (item.user_target) {
        if (item.user_target.append_avatar) {
          return (
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
              source={{uri: item.user_target.append_avatar}}
              defaultSource={require('~/assets/avatar/avatar.png')}
            />
          );
        }
      }
    }
  }

  function _renderImageTarget(item) {
    if (item) {
      if (item.card_target) {
        if (item.card_target.card_image) {
          if (item.card_target.card_image.image) {
            return (
              <View style={{alignItems: 'flex-end'}}>
                <Image
                  resizeMode="cover"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 5,
                    margin: 2,
                  }}
                  source={{uri: item.card_target.card_image.image}}
                />

                {_renderUserTarget(item)}
              </View>
            );
          }
        }
      }
    }
  }

  return (
    <Content>
      <FlatList
        contentContainerStyle={{paddingBottom: 75}}
        data={cards}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList text="Não existem trocas realizadas." />}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }
        renderItem={({item, index}) => (
          <CardItem>
            <View
              style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  flex: 1,
                }}>
                <View>
                  {_renderImageSource(item)}

                  {item.target_user_id === user.id ? (
                    <TextDark style={{fontSize: 12, textAlign: 'center'}}>
                      Enviada
                    </TextDark>
                  ) : (
                    <TextDark
                      style={{
                        fontSize: 12,
                        textAlign: 'center',
                        marginTop: 12,
                      }}>
                      Recebida
                    </TextDark>
                  )}
                </View>
              </View>

              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={require('~/assets/icons/ico_trocas.png')}
                  style={{
                    height: 40,
                    width: 40,
                    marginBottom: 20,
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
                {_renderImageTarget(item)}

                {item.target_user_id === user.id ? (
                  <TextDark style={{fontSize: 12, textAlign: 'center'}}>
                    Recebida
                  </TextDark>
                ) : (
                  <TextDark
                    style={{
                      fontSize: 12,
                      textAlign: 'center',
                      marginTop: 12,
                    }}>
                    Enviada
                  </TextDark>
                )}
              </View>
            </View>
          </CardItem>
        )}
      />
    </Content>
  );
}
