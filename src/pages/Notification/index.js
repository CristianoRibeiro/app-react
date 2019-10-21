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
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import EmptyList from '~/components/EmptyList';

import api from '~/services/api';

import {Container, Content} from '../../style';

import {
  NotificationTitle,
  NotificationDate,
  NotificationLink,
  Header,
  TextTitle,
  Card,
  Link,
  NotificationText,
} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.notifications);
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState(data ? data : []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getNotification();
  }, []);

  async function _getNotification() {
    setLoading(true);
    try {
      let response = await api.post('/api/notifications');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'NOTIFICATION', payload: response.data});
      setNotifications(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  function _renderItem(item) {
    const firstDate = parseISO(item.created_at);
    const formattedDate = format(firstDate, "dd/MM/YYY', às ' HH:mm'h'");
    return (
      <Card>
        <View>
          <NotificationDate>{formattedDate}</NotificationDate>
          <NotificationTitle>{item.title}</NotificationTitle>
          <NotificationText>{item.content}</NotificationText>
        </View>
      </Card>
    );
  }

  return (
    <Content>
      {/* <Header style={{alignItems: 'center'}}>
        <TextTitle>NOTIFICAÇÕES</TextTitle>
      </Header> */}

      <FlatList
        style={{margimBottom: 50}}
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList text="Nenhuma notificação encontrada!" />}
        renderItem={({item}) => _renderItem(item)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => _getNotification()}
          />
        }
      />
    </Content>
  );
}
