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
} from '../Exchange/styles';

export default function Main(props) {
  const user = useSelector(state => state.user);
  const matchitem = useSelector(state => state.matchitem);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [card, setCard] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
    if (__DEV__) {
      console.tron.log(matchitem);
    }
  }, []);

  async function _getData() {
    if (__DEV__) {
      console.tron.log(matchitem);
    }
    try {
      await setCard(matchitem);
      let u = await api.post('/api/cards/exchange/users', {
        number: matchitem.number,
      });
      setUsers(u.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  async function _setData() {
    setModal(false);
    if (__DEV__) {
      console.tron.log({
        card_id: card.id,
        user_id: selected.id,
      });
    }
    try {
      let response = await api.post('/api/cards/from/user', {
        number: card.number,
        user_id: selected.id,
      });
      if (__DEV__) {
        console.tron.log(response.data);
      }

      Alert.alert(null, response.data.message);
      props.navigation.navigate('TabsExchange');
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
              source={{uri: item.append_avatar}}
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
    if (selected) {
      return (
        <Link onPress={() => setModal(true)}>
          <View style={{alignItems: 'center'}}>
            <Image
              resizeMode="cover"
              style={{
                width: 120,
                height: 120,
                borderRadius: 5,
              }}
              defaultSource={require('~/assets/avatar/avatar.png')}
              source={{uri: selected ? selected.append_avatar : null}}
            />

            <TextDark
              style={{
                fontWeight: '800',
                fontSize: 11,
                marginTop: 10,
                textAlign: 'center',
              }}>
              {selected.name}
            </TextDark>
          </View>
        </Link>
      );
    } else {
      return (
        <Link onPress={() => setModal(true)}>
          <View style={{alignItems: 'center'}}>
            <Image
              resizeMode="cover"
              style={{
                width: 120,
                height: 120,
                borderRadius: 5,
              }}
              source={require('~/assets/avatar/avatar.png')}
            />
          </View>
        </Link>
      );
    }
  }

  return (
    <Content>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }>
        <Card style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{alignItems: 'center', flex: 1}}>
              <Image
                resizeMode="cover"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 5,
                }}
                defaultSource={require('~/assets/avatar/avatar.png')}
                source={{uri: card.gray ? card.gray : null}}
              />

              <TextDark
                style={{fontWeight: '800', fontSize: 12, marginTop: 10}}>
                {/* {user.name} */}
              </TextDark>
            </View>

            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('~/assets/icons/ico_trocas.png')}
                style={{
                  height: 40,
                  width: 40,
                }}
                resizeMode="contain"
              />
            </View>

            <View style={{flex: 1}}>{_renderUser()}</View>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            {selected ? (
              <Send
                loading={loading}
                style={{marginBottom: 15, marginTop: 10}}
                onPress={() => _setData()}>
                <TextLight>OK</TextLight>
              </Send>
            ) : null}
          </View>
        </Card>

        <Modal
          visible={modal}
          style={{marginHorizontal: 0, marginBottom: 0}}
          transparent={false}
          onRequestClose={() => setModal(false)}
          onBackdropPress={() => setModal(false)}>
          <View style={{flex: 1, marginTop: 80, backgroundColor: '#fff'}}>
            <FlatList
              data={users}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={
                <EmptyList text="Nenhum usuário encontrado!" />
              }
              renderItem={({item, index}) => _renderItem(item, index)}
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15,
              }}>
              <Send
                onPress={() => setModal(false)}
                style={{marginBottom: 15, marginTop: 10}}>
                <TextLight>CANCELAR</TextLight>
              </Send>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </Content>
  );
}
