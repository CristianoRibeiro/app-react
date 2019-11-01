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
  const [card, setCard] = useState([]);
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

  async function _handleItem(item) {
    if (__DEV__) {
      console.tron.log(item);
    }
    await dispatch({type: 'MATCHITEM', payload: item});

    props.navigation.navigate('MatchItem');
  }

  return (
    <Content>
      <FlatList
        data={matchs}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <EmptyList text="Você não tem figurinhas repetidas!" />
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }
        renderItem={({item, index}) => (
          <Link
            key={index}
            onPress={() => _handleItem(item)}>
            <CardItem>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode="cover"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 5,
                    margin: 2,
                  }}
                  defaultSource={require('~/assets/avatar/avatar.png')}
                  source={{uri: user.avatar}}
                />

                <Image
                  source={require('~/assets/icons/ico_trocas.png')}
                  style={{
                    height: 40,
                    width: 40,
                  }}
                  resizeMode="contain"
                />

                <Image
                  resizeMode="cover"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 5,
                    margin: 2,
                  }}
                  defaultSource={require('~/assets/avatar/avatar.png')}
                  source={{uri: item.url}}
                />
              </View>
            </CardItem>
          </Link>
        )}
      />
    </Content>
  );
}
