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

import {
  Title,
  TextDark,
  CardItem,
  Link,
  CardImage,
  SubTitle,
  Send,
} from './styles';

import {Header, TextLight} from '~/pages/Campaigns/Quiz/styles';

export default function Main(props) {
  const data = useSelector(state => state.cards);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [key, setIndex] = useState(4);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState('');
  const [card, setCard] = useState([]);
  const [cards, setCards] = useState(data);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
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

  async function _handleModal(item, i) {
    await setIndex(i);
    await setCard(item);
    setModalVisible(true);

    if (__DEV__) {
      console.tron.log(item);
    }
  }

  function _renderItem(item, i) {
    return (
      <Link
        style={{flex: 1, minHeight: 100}}
        key={i}
        onPress={() => _handleModal(item, i)}>
        <CardItem style={{flex: 1}}>
          <CardImage style={{flex: 1}}>
            <ImageBackground
              style={{flex: 1, minHeight: 125}}
              source={{uri: item.url}}>
                {item.count > 1 ? 
              <View style={{alignItems: 'flex-end'}}>
                <View
                  style={{
                    backgroundColor: 'green',
                    height: 20,
                    width: 20,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: '#fff', fontWeight: '700'}}>
                    {item.count}
                  </Text>
                </View>
              </View>
              : null}
            </ImageBackground>
          </CardImage>
        </CardItem>
      </Link>
    );
  }

  function _setExchange() {
    setModalVisible(false);
    props.navigation.navigate('Exchange', {item: card});
  }

  return (
    <Content style={{flex: 1}}>
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
        style={{marginHorizontal: 0, marginBottom: 0, backgroundColor: '#000'}}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}>
        <ImageViewer
          style={{padding: 0}}
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
        {!card.have ? (
          <View style={{marginBottom: 20}}>
            <Send onPress={() => _setExchange()}>
              <TextLight>TROCAR</TextLight>
            </Send>
          </View>
        ) : null}
      </Modal>
    </Content>
  );
}
