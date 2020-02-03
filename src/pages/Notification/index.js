/* eslint-disable prettier/prettier */
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
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import EmptyList from '~/components/EmptyList';

import api from '~/services/api';

import {Container, Content} from '../../style';

import {
  NotificationTitle,
  NotificationDate,
  TextDark,
  Header,
  Card,
  Link,
  Btn,
  NotificationText,
} from './styles';
import {Send, TextLight} from "~/pages/Profile/styles";

export default function Main(props) {
  const data = useSelector(state => state.notification);
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState(data ? data : []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getNotification();
  }, []);

  async function _getNotification() {
    try {
      let response = await api.post('/api/notifications');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'NOTIFICATION', payload: response.data});
      //setNotifications(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  async function _postReceived(item) {
    try {
      let data = {
        history_id: item.history_id,
        notification_id: item.id
      };


      let response = await api.post('api/ms/received', data);

      setTimeout(() => {
          Alert.alert(null, response.data.msg);
          _getNotification();
        },
        800
      );

    } catch (error) {
      console.log(error.message);
    }

  }

  function _renderItem(item) {
    const firstDate = parseISO(item.created_at);
    const formattedDate = format(firstDate, "dd/MM/YYY', às ' HH:mm'h'");

    if (item.user_id) {
      return (
        <Card style={{backgroundColor: '#0058b8'}}>
          <View>
            <NotificationDate style={{color: '#fff'}}>{formattedDate}</NotificationDate>
            <NotificationTitle style={{color: '#fff'}}>{item.title}</NotificationTitle>
            <NotificationText style={{color: '#fff'}}>{item.content}</NotificationText>
            {item.status == 1 ? (
              <View style={{flex: 1}}>
                <Btn onPress={() => _postReceived(item)} style={{marginTop: 15}}>
                  <TextDark>CONFIRMAR</TextDark>
                </Btn>
              </View>
            ) : null}
          </View>
        </Card>
      );
    } else {
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

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      width: '100%',
      borderRadius: 15,
      marginTop: 15,
      textAlign: 'center'
    }
  });

  return (
    <Content>
      <FlatList
        style={{margimBottom: 50}}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList text="Nenhuma notificação encontrada!"/>}
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
