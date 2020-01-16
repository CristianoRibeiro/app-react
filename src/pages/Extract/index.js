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
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = await api.get('/api/ms/produtos');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'PRODUCTS', payload: response.data});

      //setNotifications(response.data);
    } catch (error) {
      await dispatch({type: 'PRODUCTS', payload: []});
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  function _getProduct(value) {
    setModal(false);
    props.navigation.navigate('ExtractItem', {itemId: value});
  }

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
            flex:1,
            backgroundColor: '#999',
            paddingVertical: 10
          }}>

          <TextLight style={{fontSize: 18, fontWeight: '500'}}>
            Saldo atual:
          </TextLight>

          <TextLight style={{fontSize: 18, fontWeight: '800'}}>
            125 pontos
          </TextLight>
        </View>

        <FlatList
          contentContainerStyle={{paddingBottom: 20}}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<EmptyList text="Que pena, você ainda não realizou nenhuma doação!"/>}
          renderItem={(item, index) => (
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
                    {item.item.name}
                  </TextDark>

                  <TextDark
                    style={{fontSize: 16, marginTop: 5, fontWeight: '700', color: item.item.doacao ? 'red' : 'green'}}>
                    {item.item.price} pontos
                  </TextDark>
                </View>

                <View style={{alignItems: 'center'}}>
                  <TextDark style={{fontSize: 11, fontWeight: '700', color: '#888'}}>
                    14/01/2020 12:16:27
                  </TextDark>

                  <TextDark style={{fontSize: 16, marginTop: 5, fontWeight: '700'}}>
                    +3 cupons
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

      <FAB
        style={styles.fab}
        icon="add"
        onPress={() =>  _getProduct(1)}
      />
    </Content>
  );
}
