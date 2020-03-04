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
  SubTitle,
} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.prizes);
  const event = useSelector(state => state.eventitem);
  const dispatch = useDispatch();

  const [prize, setPrize] = useState(data ? data : []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = await api.get(`/api/prizes/event/${event.id}`);
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'PRIZE', payload: response.data});
      //setNotifications(response.data);
    } catch (error) {
      await dispatch({type: 'PRIZE', payload: []});
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  function _renderItem(item) {
    const formattedDate = '';
    if (item.retired_at) {
      const firstDate = parseISO(item.retired_at);
      formattedDate =
        'Retirado: ' + format(firstDate, "dd/MM/YYY', às ' HH:mm'h'");
    }
    return (
      <Card>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {item.retired_at ? <EventDate>{formattedDate}</EventDate> : null}
          <SubTitle>{item.description}</SubTitle>
        </View>
      </Card>
    );
  }

  return (
    <Content>
      <FlatList
        style={{margimBottom: 50}}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <EmptyList text="Que pena! Você ainda não ganhou prêmios. Não desanime e continue participando." />
        }
        renderItem={({item}) => _renderItem(item)}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }
      />
    </Content>
  );
}
