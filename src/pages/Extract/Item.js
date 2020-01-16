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
  const dispatch = useDispatch();

  const [saldo, setSaldo] = useState(20);
  const [doacao, setDoacao] = useState(10);
  const [item, setItem] = useState(null);
  const [product, setProduct] = useState(Product);

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();

    if (__DEV__) {
      console.tron.log(props.navigation.state.params);
    }
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = await api.post('/api/ms/produto', {id: props.navigation.state.params.itemId});
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }

      setProduct(response.data);
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
      <ScrollView>
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

          {saldo < doacao ?
            <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: 20}}>
              <TextDark style={{fontSize: 18, color: '#bf360c'}}>Saldo insuficiente</TextDark>
              <TextDark style={{fontSize: 18, fontWeight: '700', color: '#bf360c'}}>{saldo} pontos</TextDark>
            </View>

            :

            <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: 20}}>
              <TextDark style={{fontSize: 18}}>Saldo</TextDark>
              <TextDark style={{fontSize: 18, fontWeight: '700'}}>{saldo} pontos</TextDark>
            </View>}

          <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', padding: 20}}>
            <TextDark style={{fontSize: 18}}>Doação</TextDark>
            <TextDark style={{fontSize: 18, fontWeight: '700'}}>{doacao} pontos</TextDark>
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

          <View style={{flexDirection: 'row'}}>
            <BtnCancel onPress={() => props.navigation.navigate('Extract')}>
              <TextLight>CANCELAR</TextLight>
            </BtnCancel>

            <BtnConfirm disabled={saldo < doacao ? true : false} onPress={() => setModal(!modal)}>
              <TextLight>CONFIRMAR</TextLight>
            </BtnConfirm>
          </View>
        </Card>
      </ScrollView>

      <Modal
        isVisible={modal}
        style={{backgroundColor: '#fff', margin: 0}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Title style={{marginBottom: 10}}>Obrigado!</Title>
          <TextDark>
            Sua doação foi realizada com sucesso!</TextDark>
          <TextDark>
            Identifique-se no balcão de retirada para receber o item
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
