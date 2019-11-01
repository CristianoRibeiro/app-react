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

import {Container, Content} from '~/style';

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
  const matchitem = useSelector(state => state.matchitem);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalUser, setModalUser] = useState(false);
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
    try {
      await setCard(matchitem);
      let u = await api.post('/api/cards/exchange/users', {
        number: matchitem.number,
      });
      setUsers(u.data);
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(u.data);
      }

      //setNotifications(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  async function _setData() {
    setModal(false);
    try {
      let response = await api.post('/api/cards/from/user', {
        card_id: card.id,
        user_id: selected.id,
      });
      if (__DEV__) {
        console.tron.log(response.data);
      }

      Alert.alert(null, response.data.message);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  function _handleCard(item) {
    if (__DEV__) {
      console.tron.log(item);
    }
    setModal(false);
    setSelected(item);
  }

  function _renderItem(item, i) {
    return (
      <Link onPress={() => _handleCard(item)} key={i}>
        <CardItem
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 1}}>
            <Image
              style={{aspectRatio: 1}}
              source={{uri: item.avatar}}
              resizeMode="contain"
            />
          </View>

          <View
            style={{
              flex: 4,
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginHorizontal: 10,
            }}>
            <TextDark>{item.name}</TextDark>
          </View>
        </CardItem>
      </Link>
    );
  }

  function _renderUser() {
    return (
      <View style={{alignItems: 'center'}}>
        <Image
          resizeMode="cover"
          style={{
            width: 100,
            height: 100,
            borderRadius: 5,
          }}
          defaultSource={require('~/assets/avatar/avatar.png')}
          source={{uri: selected ? selected.avatar : ''}}
        />

        {selected ? (
          <TextDark style={{fontWeight: '800', fontSize: 12, marginTop: 10}}>
            {selected.name}
          </TextDark>
        ) : (
          <TextDark
            style={{fontWeight: '800', fontSize: 12, marginTop: 10}}></TextDark>
        )}
      </View>
    );
  }

  return (
    <Content>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }>
        <Header style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="ticket-outline"
              size={20}
              color={'#fff'}
            />

            <TextLight style={{fontSize: 18, fontWeight: '800'}}>
              Deu Match!
            </TextLight>
          </View>
          <TextLight>Vamos trocar?</TextLight>
        </Header>

        <Card>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                resizeMode="cover"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 5,
                }}
                defaultSource={require('~/assets/avatar/avatar.png')}
                source={{uri: card.image}}
              />

              <TextDark
                style={{fontWeight: '800', fontSize: 12, marginTop: 10}}>
                {/* {user.name} */}
              </TextDark>
            </View>

            <Image
              source={require('~/assets/icons/ico_trocas.png')}
              style={{
                height: 40,
                width: 40,
              }}
              resizeMode="contain"
            />

            {_renderUser()}
          </View>

          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: '#ddd',
              marginTop: 15,
            }}></View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <TextDark style={{textAlign: 'center'}}>
              Clique no ícone abaixo para adicionar as figurinhas que deseja
              trocar
            </TextDark>
          </View>

          {selected ? (
            <Send
              style={{marginBottom: 15, marginTop: 10}}
              onPress={() => _setData()}>
              <TextLight>OK</TextLight>
            </Send>
          ) : null}
        </Card>

        <View style={{alignItems: 'center', marginTop: 25}}>
          <Submit onPress={() => setModal(true)}>
            <MaterialIcons name="add" size={40} color={'#fff'} />
          </Submit>
        </View>

        <Modal
          visible={modal}
          style={{marginHorizontal: 0, marginBottom: 0}}
          transparent={true}
          onRequestClose={() => setModal(false)}
          onBackdropPress={() => setModal(false)}>
          <View style={{flex: 1, marginTop: 80, backgroundColor: '#fff'}}>
            <FlatList
              data={users}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={
                <EmptyList text="Nenhum usuário encontrado!" />
              }
              renderItem={({item, index}) => _renderItem(item, index)}
            />
            <Send
              onPress={() => setModal(false)}
              style={{marginBottom: 15, marginTop: 10}}>
              <TextLight>OK</TextLight>
            </Send>
          </View>
        </Modal>
      </ScrollView>
    </Content>
  );
}
