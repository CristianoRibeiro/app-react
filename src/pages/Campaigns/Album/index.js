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

import {Title, TextDark, CardItem, Link, CardImage, SubTitle} from './styles';

import {Header, TextLight} from '~/pages/Campaigns/Quiz/styles';

export default function Main(props) {
  const data = useSelector(state => state.cards);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [key, setIndex] = useState(4);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState('');
  const [cards, setCards] = useState(data);
  const [error, setError] = useState(false);

  useEffect(() => {
    return () => {
      _getData();
    };
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = await api.get('/api/cards');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'CARDS', payload: response.data});
      if (response.data.time) {
        const firstDate = parseISO(response.data.time);
        const formattedDate = format(firstDate, "dd/MM/YYY', às ' HH:mm'h'");
        setDate(formattedDate);
      }
      setCards(response.data);
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
        style={{flex: 1, minHeight: 100}}
        key={i}
        onPress={() => _handleModal(i)}>
        <CardItem style={{flex: 1}}>
          <CardImage style={{flex: 1}}>
            <FitImage
              style={{flex: 1}}
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
    <Content style={{flex: 1}}>
      <Header>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Entypo name="stopwatch" size={20} color={'#fff'} />

          <TextLight>próximo quiz</TextLight>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextLight style={{fontSize: 22, fontWeight: '800'}}>
            {date}
          </TextLight>
        </View>
      </Header>
      <View style={{margimBottom: 50}}>
        <FlatList
          data={data.cards}
          initialNumToRender={1}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<EmptyList text="Nenhum álbum encontrado!" />}
          renderItem={({item, index}) => _renderItem(item, index)}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
          }
        />
      </View>

      <Modal
        visible={modalVisible}
        style={{marginHorizontal: 0, marginBottom: 0}}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}>
        <ImageViewer
          imageUrls={cards.cards}
          index={key}
          onSwipeDown={() => {
            console.log('onSwipeDown');
          }}
          onClick={() => setModalVisible(false)}
          onMove={data => console.log(data)}
          enableSwipeDown={true}
          onSwipeDown={() => setModalVisible(false)}
        />
      </Modal>
    </Content>
  );
}
