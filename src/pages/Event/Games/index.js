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
  Alert,
  FlatList,
  RefreshControl,
} from 'react-native';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import EmptyList from '~/components/EmptyList';

//Api
import api from '~/services/api';

//Styles
import {Container, Content, TextDark} from '../../../style';

import {
  EventTitle,
  EventDate,
  EventLink,
  Header,
  TextTitle,
  Card,
  Link,
  SubTitle,
} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.games);
  const eventitem = useSelector(state => state.eventitem);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (__DEV__) {
      console.tron.log(data);
    }
    _getData();
  }, []);

  async function _getData() {
    try {
      //let response = await api.get('/api/games/'+eventitem.id);
      let response = await api.get('/api/games/'+eventitem.id);
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'GAMES', payload: response.data});
      //setNotifications(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
      await dispatch({type: 'GAMES', payload: []});
    }
  }

  function _renderItem(item) {
    let formattedDate = '';
    if (item.created_at) {
      const firstDate = parseISO(item.created_at);
      formattedDate = format(firstDate, "dd/MM/YYY', às ' HH:mm'h'");
    }

    return (
      <Card>
        <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            {item.created_at ? <EventDate>{formattedDate}</EventDate> : null}
            <SubTitle>{item.type}</SubTitle>
          </View>
          <View style={{justifyContent: 'center'}}>
            {item.qty ? <TextDark>{item.qty}</TextDark> : null}
          </View>
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
          <EmptyList text="Aqui você poderá consultar os seus cupons gerados a partir das interações no evento" />
        }
        renderItem={({item}) => _renderItem(item)}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }
      />
    </Content>
  );
}
