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
  FlatList,
} from 'react-native';

import api from '~/services/api';

import {
  Title,
  SubTitle,
  Header,
  TextDark,
  Card,
  Link,
  TextDate,
} from './styles';

import {Container, Content} from '../../style';

export default function Main(props) {
  const data = useSelector(state => state.voucher);
  const dispatch = useDispatch();

  const [vouchers, setVouchers] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getVoucher();
  }, []);

  async function _getVoucher() {
    setLoading(true);
    try {
      let response = await api.post('/api/vouchers');
      //alert(JSON.stringify(response));
      console.tron.log(response.data);
      await dispatch({type: 'VOUCHER', payload: response.data});
      setVouchers(response.data);
    } catch (error) {
      console.tron.log(error.message);
    }
    setLoading(false);
  }

  function _renderItem(item) {
    return (
      <Link onPress={() => props.navigation.navigate('VoucherItem')}>
        <Card style={{flexDirection: 'row'}}>
          <Image
            resizeMode="cover"
            style={{width: 60, height: 60, borderRadius: 30}}
            defaultSource={require('~/assets/avatar/avatar.png')}
            source={{
              uri: 'https://tanabi.sp.gov.br/media/capas/20170109131607.jpg',
            }}
          />

          <View style={{flex: 1, justifyContent: 'center', marginLeft: 15}}>
            <Title style={{color: '#333'}}>Evento</Title>
            <SubTitle style={{color: '#333'}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              lacinia felis mi, sit amet porta nibh porttitor a...{' '}
            </SubTitle>
            <TextDate>faltam 2 dias</TextDate>
          </View>
        </Card>
      </Link>
    );
  }

  return (
    <Content>
      <FlatList
        style={{margimBottom: 50}}
        data={schedules}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList text="Nenhum evento emcontrado!" />}
        renderItem={({item}) => _renderItem(item)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => _getSchedule()}
          />
        }
      />
    </Content>
  );
}
