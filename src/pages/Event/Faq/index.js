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

import {Container, Content} from '../../../style';

import {
  Header,
  Title,
  SubTitle,
  Card,
  TextDark,
  Link,
  NotificationText,
} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.eventitem);
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState(data ? data : []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    try {
      if (__DEV__) {
        console.tron.log(data);
      }
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  function _renderItem(item) {
    return (
      <Card>
        <View>
          {item.title ? <TextDark>{item.title}</TextDark> : null}
          
          <FlatList
            data={JSON.parse(item.faqs)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={{marginVertical: 5}}>
                <Title>{item.answer}</Title>
                <SubTitle>{item.question}</SubTitle>
              </View>
            )}
          />
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
        data={data.faqs}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <EmptyList text="Nenhuma notificação encontrada!" />
        }
        renderItem={({item}) => _renderItem(item)}
      />
    </Content>
  );
}
