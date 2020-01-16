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
  Alert, Linking,
} from 'react-native';
import {Surface} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import EmptyList from '~/components/EmptyList';
import Modal from "react-native-modal";

import api from '~/services/api';

import {Container, Content} from '~/style';

import {
  Title,
  NotificationDate,
  NotificationLink,
  Header,
  TextTitle,
  Card,
  Link,
  TextDark,
  ItemQuestion,
  Btn,
  BtnConfirm,
  BtnCancel,
  TextLight,
} from './styles';

import Product from '~/model/Product';

export default function Main(props) {
  const user = useSelector(state => state.user);
  const eventitem = useSelector(state => state.eventitem);
  const item = useSelector(state => state.item);
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  const [product, setProduct] = useState(Product);

  const [disableComfirm, setDisableConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();

    if (__DEV__) {
      console.tron.log(item);
    }
  }, []);


  async function _getData() {
    setLoading(true);

    if (user.coins < product.price) {
      setDisableConfirm(true);
    } else {
      setDisableConfirm(false);
    }

    try {
      let response = await api.post('/api/ms/produto', {id: item});
      let response_user = await api.get('/api/auth/user');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }

      setProduct(response.data);
      await dispatch({type: 'USER', payload: response_user.data});
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }


    setLoading(false);
  }

  async function _sendDonate() {
    setLoading(true);
    try {
      let response = await api.post('/api/ms/doar', {product_id: item, event_id: eventitem.id});
      let response_user = await api.get('/api/auth/user');
      let response_produtos = await api.get('/api/ms/produtos');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'USER', payload: response_user.data});
      await dispatch({type: 'PRODUCTS', payload: response_produtos.data});
      if (__DEV__) {
        console.tron.log(response.data);
      }
      //Alert.alert(null, response.data.msg);

      setMessage(response.data.msg);
      setModal(true);

    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  function _confirm() {
    setModal(false);
    props.navigation.navigate('Extract');
  }

  return (
    <Content>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => _getData()}
          />
        }>
        <Card>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Title>{product.name}</Title>

            <Image
              resizeMode="cover"
              style={{
                width: 200,
                height: 200,
                marginBottom: 5,
                marginTop: 10,
              }}
              source={{uri: product.append_image}}
            />

          </View>
        </Card>

        <Card>

          {user.coins < product.price ?
            <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: 20}}>
              <TextDark style={{fontSize: 18, color: '#bf360c'}}>Saldo insuficiente</TextDark>
              <TextDark style={{fontSize: 18, fontWeight: '700', color: '#bf360c'}}>{user.coins} pontos</TextDark>
            </View>

            :

            <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: 20}}>
              <TextDark style={{fontSize: 18}}>Saldo</TextDark>
              <TextDark style={{fontSize: 18, fontWeight: '700'}}>{user.coins} pontos</TextDark>
            </View>
          }

          <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: 20}}>
            <TextDark style={{fontSize: 18}}>Doação</TextDark>
            <TextDark style={{fontSize: 18, fontWeight: '700'}}>{product.price} pontos</TextDark>
          </View>

          <Card
            style={{
              marginTop: 5,
              marginBottom: 15,
              padding: 10,
              borderRadius: 5,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#ccc',
              borderStyle: 'dashed'
            }}>
            <TextDark>Você receberá 3 cupons!</TextDark>
          </Card>

          {user.id ?
            <View style={{flexDirection: 'row'}}>
              <BtnCancel onPress={() => props.navigation.navigate('Extract')}>
                <TextLight>CANCELAR</TextLight>
              </BtnCancel>

              <BtnConfirm disabled={disableComfirm} onPress={() => _sendDonate()}>
                <TextLight>CONFIRMAR</TextLight>
              </BtnConfirm>
            </View>
            : null}
        </Card>
      </ScrollView>

      <Modal
        isVisible={modal}
        style={{backgroundColor: '#fff', margin: 0}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10}}>
          <Title style={{marginBottom: 10, fontSize: 30, marginBottom: 50}}>Obrigado!</Title>
          <TextDark style={{textAlign: 'center', fontSize: 20}}>
            {message}
          </TextDark>

        </View>

        <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
          <Btn onPress={() => _confirm()}>
            <TextLight>OK</TextLight>
          </Btn>
        </View>
      </Modal>

    </Content>
  );
}
