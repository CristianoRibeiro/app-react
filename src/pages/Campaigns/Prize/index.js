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
} from 'react-native';
import EmptyList from '~/components/EmptyList';

import api from '~/services/api';

import {Container, Content} from '~/style';

import {
  EventTitle,
  EventDate,
  EventLink,
  Header,
  TextTitle,
  Card,
  Link,
  CardImage,
  Points,
  Info,
} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.prizecampaigns);
  const dispatch = useDispatch();

  const [prize, setPrize] = useState(data ? data : []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (__DEV__) {
      console.tron.log(data);
    }
    //_getData();
  }, []);

  async function _getData() {
    try {
      let response = await api.get('/api/prizes/campaigns');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'PRIZECAMPAIGN', payload: response.data});
      //setNotifications(response.data);
    } catch (error) {
      await dispatch({type: 'PRIZE', payload: []});
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  function _renderItem(item) {
    return (
      <Card>
        <Info style={{flex: 1}}>
          <EventTitle>{item.description}</EventTitle>
          <EventLink>{item.append_type}</EventLink>
        </Info>
      </Card>
    );
  }

  return (
    <Content>
      <FlatList
        style={{margimBottom: 50}}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList text="Que pena! Você ainda não ganhou prêmios.
        Não desanime, continue participando e ganhe mais números da sorte." />}
        renderItem={({item}) => _renderItem(item)}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }
      />
    </Content>
  );
}
