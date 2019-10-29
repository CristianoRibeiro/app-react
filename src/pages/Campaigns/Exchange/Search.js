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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Searchbar} from 'react-native-paper';
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
  //const cards = useSelector(state => state.cards);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState();
  const [cards, setCarts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = await api.get('/api/cards/repeated');
      //alert(JSON.stringify(response.data));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      setCarts(response.data);
      //setNotifications(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  function _renderItem(item, i) {
    return (
      <Link key={i} onPress={() => props.navigation.navigate('Exchange', {item})}>
        <CardItem>
          <CardImage>
            <Image
              style={{aspectRatio: 1}}
              source={{uri: item.url}}
              resizeMode="contain"
            />
          </CardImage>
          {/* <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10}}>
            <TextDark>{item.title}</TextDark>
          </View> */}
        </CardItem>
      </Link>
    );
  }

  return (
    <Content>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }>
        {/* <Header style={{alignItems: 'center', paddingHorizontal: 5}}>
          <Searchbar
            placeholder="Pesquisar figurinha"
            onChangeText={query => setSearch(query)}
            onIconPress={() => _getData()}
            value={search}
          />
        </Header> */}

        {/* <Header>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons name="md-images" size={24} color={'#fff'} />

            <TextLight style={{fontSize: 18, fontWeight: '800'}}>
              Figurinhas repetidas
            </TextLight>
          </View>
        </Header> */}

        <View style={{margimBottom: 50}}>
          <FlatList
            data={cards}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<EmptyList text="Você não tem figurinhas repetidas!" />}
            renderItem={({item, index}) => _renderItem(item, index)}
          />
        </View>
      </ScrollView>
    </Content>
  );
}
