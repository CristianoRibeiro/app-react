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
        contentContainerStyle={{paddingBottom: 75}}
        data={matchs}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <EmptyList text="Não existem trocas realizadas." />
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }
        renderItem={({item, index}) => <Item item={item} />}
      />
    </Content>
  );
}
