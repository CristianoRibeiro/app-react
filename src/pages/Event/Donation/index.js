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
  TouchableOpacity
} from 'react-native';
import {FAB} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import EmptyList from '~/components/EmptyList';
import Modal from "react-native-modal";
import QRCodeScanner from 'react-native-qrcode-scanner';

import api from '~/services/api';

import {Container, Content, Send} from '~/style';

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
  NotificationText,
  Submit,
  TextLight, Btn,
} from './styles';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#0D4274',
  },
});

export default function Main(props) {
  const data = useSelector(state => state.products);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalMsg, setModalMsg] = useState(false);

  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = await api.get('/api/ms/produtos');
      let response_user = await api.get('/api/auth/user');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'PRODUCTS', payload: response.data});
      await dispatch({type: 'USER', payload: response_user.data});

      //setNotifications(response.data);
    } catch (error) {
      await dispatch({type: 'PRODUCTS', payload: []});
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  async function _getCheck() {
    setModal(false);
    setLoading(true);
    try {
      let response = await api.get('/api/ms/doar/check/time');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }

      if (response.data.success) {
        setModal(true);
      } else {
        setMessage(response.data.msg);
        setTitle(response.data.title);
        setModalMsg(true);
      }

    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }

    setLoading(false);
  }

  async function _getProduct(value) {
    setModal(false);
    setLoading(true);
    try {
      let response = await api.post('/api/ms/produto', {sku: value});
      let response_user = await api.get('/api/auth/user');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }

      if (response.data) {
        await dispatch({type: 'ITEM', payload: response.data});
        await dispatch({type: 'USER', payload: response_user.data});
        props.navigation.navigate('DonationItem');
      } else {
        Alert.alert(null, 'Item não encontrado.');
      }

    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }

    setLoading(false);
  }

  function _renderItem() {
    if (user.participant_id) {
      return (
        <Content>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={() => _getData()}/>
            }>
            <Header>

              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  resizeMode="cover"
                  style={{
                    width: 100,
                    height: 85,
                    marginBottom: 15
                  }}
                  source={require('~/assets/Movimento-Solidario.png')}
                />
              </View>

            </Header>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                backgroundColor: '#999',
                paddingVertical: 10
              }}>

              <TextLight style={{fontSize: 16, fontWeight: '500'}}>
                Saldo de pontos no Mundo Caixa:
              </TextLight>

              <TextLight style={{fontSize: 16, fontWeight: '700'}}>
                {user.coins}
              </TextLight>
            </View>

            <FlatList
              contentContainerStyle={{paddingBottom: 75}}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={<EmptyList text="Que pena, você ainda não realizou nenhuma doação pelo APP!"/>}
              renderItem={({item, index}) => (
                <Card>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 8,
                    }}>
                    <View style={{alignItems: 'center', justifyContent: 'center', paddingRight: 10}}>

                      <FontAwesome5
                        name="coins"
                        size={20}
                        color={'#999'}
                      />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <TextDark style={{fontWeight: '500', fontSize: 13}}>
                        {item ? item.name : ''}
                      </TextDark>

                      <TextDark
                        style={{fontSize: 16, marginTop: 5, fontWeight: '700', color: 'red'}}>
                        - {item ? item.append_price : ''}
                      </TextDark>
                    </View>

                    <View style={{alignItems: 'center'}}>
                      <TextDark style={{fontSize: 11, fontWeight: '700', color: '#888'}}>
                        {item ? item.append_date : ''}
                      </TextDark>

                      <TextDark style={{fontSize: 16, marginTop: 5, fontWeight: '700'}}>
                        {item ? item.append_cupom : ''}
                      </TextDark>
                    </View>
                  </View>
                </Card>
              )}
            />
          </ScrollView>

          <Modal isVisible={modal} style={{margin: 0}}>
            <QRCodeScanner
              onRead={e => _getProduct(e.data)}
              showMarker={true}
              reactivate={false}
              bottomContent={
                <Btn onPress={() => setModal(!modal)}>
                  <TextLight>CANCELAR</TextLight>
                </Btn>
              }
            />
          </Modal>

          <Modal
            isVisible={modalMsg}
            style={{backgroundColor: '#fff', margin: 0}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10}}>
              <Title style={{marginBottom: 10, fontSize: 30, marginBottom: 50}}>{title}</Title>
              <TextDark style={{textAlign: 'center', fontSize: 20}}>
                {message}
              </TextDark>

            </View>

            <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 20}}>
              <Btn onPress={() => setModalMsg(false)}>
                <TextLight>OK</TextLight>
              </Btn>
            </View>
          </Modal>

          <FAB
            style={styles.fab}
            icon="add"
            onPress={() => _getCheck()}
          />
        </Content>
      );
    } else {
      return (
        <Content>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={() => _getData()}/>
            }>
            <View style={{margin: 5, padding: 20}}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <MaterialCommunityIcons name="alert-circle-outline" size={50} color={'#444'}/>
                <TextDark style={{marginTop: 15, textAlign: 'center'}}>
                  Usuário não identificado.
                </TextDark>
              </View>
            </View>
          </ScrollView>
        </Content>
      );
    }
  }

  return _renderItem();
}
