import React, {useState, useEffect, Component} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  View,
  ScrollView,
  Alert,
  FlatList,
  RefreshControl,
} from 'react-native';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import Modal from 'react-native-modal';
import FitImage from 'react-native-fit-image';
import Entypo from 'react-native-vector-icons/Entypo';
import EmptyList from '~/components/EmptyList';

//Api
import api from '~/services/api';

//Styles
import {Container, Content} from '~/style';

import {Title, TextDark, CardItem, Link, Card, SubTitle} from './styles';

import {Header, TextLight} from '~/pages/Campaigns/Quiz/styles';

export default function Main(props) {
  const data = useSelector(state => state.news);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [key, setIndex] = useState(4);
  const [modalVisible, setModalVisible] = useState(false);
  const [news, setNews] = useState([]);
  const [cards, setCards] = useState(data);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = await api.get('/api/news');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'NEWS', payload: response.data});
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  async function _handleModal(i) {
    await setIndex(i);
    setModalVisible(true);
  }

  function _renderItem(item, i) {
    return (
      <Link
        style={{flex: 1, minHeight: 10}}
        key={i}
        onPress={() => props.navigation.navigate('NewsDetail', {item})}>
        <CardItem style={{flex: 1}}>
          <Image
            style={{aspectRatio: 6 / 4, flex: 1}}
            source={{uri: item.imagemIntroducao.href}}
            resizeMode="contain"
          />
          <View style={{margin: 8}}>
            <SubTitle>{item.introducao}</SubTitle>
          </View>
        </CardItem>
      </Link>
    );
  }

  return (
    <Content>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList text="Nenhuma notícia encontrada!" />}
        renderItem={({item, index}) => _renderItem(item, index)}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }
      />
    </Content>
  );
}
