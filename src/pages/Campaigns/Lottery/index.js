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
  Link,
  TextDark,
  ItemQuestion,
  NotificationText,
  Submit,
  Send,
  TextLight,
} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.lottery);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = await api.get('/api/lottery');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'LOTTERY', payload: response.data});

      //setNotifications(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  return (
    <Content>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }>
        {/* <Header>
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
              Extrato de Cupons
            </TextLight>
          </View>
        </Header> */}

        <FlatList
          style={{margimBottom: 50}}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<EmptyList text="Nenhum sorteado encontrado!" />}
          renderItem={(item, index) => (
            <Card>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 8,
                }}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <TextDark style={{fontWeight: '700', fontSize: 13}}>
                    {item.item.prize}
                  </TextDark>

                  <TextDark style={{fontSize: 12, marginTop: 12}}>
                    {item.item.user.name}
                  </TextDark>

                  <TextDark style={{fontWeight: '700'}}>
                    {item.item.user.apcef}
                  </TextDark>

                  <TextDark style={{fontSize: 11}}>
                    {item.item.append_date}
                  </TextDark>
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <TextDark style={{fontSize: 10}}>Número da sorte</TextDark>

                  <TextDark style={{fontWeight: '700', color: '#f7893e'}}>
                    {item.item.lucky_number}
                  </TextDark>

                  <TextDark style={{fontSize: 10}}>Número do sorteado</TextDark>
                  
                  <TextDark style={{fontWeight: '700', color: '#f7893e'}}>
                    {item.item.number}
                  </TextDark>
                </View>
              </View>
            </Card>
          )}
        />
      </ScrollView>
    </Content>
  );
}
