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
  RefreshControl,
} from 'react-native';
import {FAB} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EmptyList from '~/components/EmptyList';

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

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF6666',
  },
});

export default function Main(props) {
  const data = useSelector(state => state.voucher);
  const dispatch = useDispatch();

  const [vouchers, setVouchers] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _onRefresh();
  }, []);

  async function _onRefresh() {
    setLoading(true);
    try {
      let response = await api.post('/api/vouchers');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'VOUCHER', payload: response.data});
      setVouchers(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  function _renderItem(item) {
    return (
      <Link onPress={() => props.navigation.navigate('VoucherItem', {item})}>
        <Card style={{flexDirection: 'row'}}>
          <Image
            resizeMode="cover"
            style={{width: 60, height: 60, borderRadius: 30}}
            defaultSource={require('~/assets/avatar/avatar.png')}
            source={{
              uri: item.event.banner,
            }}
          />

          <View style={{flex: 1, justifyContent: 'center', marginLeft: 15}}>
            <Title style={{color: '#333'}}>{item.event.name}</Title>
            <SubTitle style={{color: '#333'}}>{item.event.local}</SubTitle>
            {/* <TextDate>faltam 2 dias</TextDate> */}
          </View>
        </Card>
      </Link>
    );
  }

  return (
    <Content>
      <FlatList
        style={{margimBottom: 75}}
        data={vouchers}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList text="Nenhum voucher encontrado!" />}
        renderItem={({item}) => _renderItem(item)}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _onRefresh()} />
        }
      />

      {/* <FAB
        style={styles.fab}
        icon={'add'}
        color="#fff"
        onPress={() => console.log('Pressed')}
      /> */}
    </Content>
  );
}
