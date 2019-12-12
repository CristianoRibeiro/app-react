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
import Item from './Item';

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
        renderItem={({item, index}) => <Item item={item} index={index} />}
      />
    </Content>
  );
}
