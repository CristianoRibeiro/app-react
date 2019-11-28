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
    try {
      let response = await api.post('/api/cards/exchange', {card_id: item.id});
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }

      Alert.alert(null, response.data.message);
      //setNotifications(response.data);
      _getData();
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
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

              <Link key={index} onPress={() => _handleItem(item)}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Image
                    source={require('~/assets/icons/thumbs-up.png')}
                    style={{
                      height: 50,
                      width: 50,
                    }}
                    resizeMode="contain"
                  />
                </View>
              </Link>

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
            </View>
          </CardItem>
        )}
      />
    </Content>
  );
}
