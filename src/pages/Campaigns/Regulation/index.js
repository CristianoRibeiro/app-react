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
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import EmptyList from '~/components/EmptyList';

import api from '~/services/api';

import {Container, Content} from '../../../style';

import {
  Title,
  NotificationDate,
  NotificationLink,
  Header,
  TextTitle,
  Card,
  CardItem,
  Link,
  TextDark,
  ItemQuestion,
  NotificationText,
  Submit,
  Send,
  TextLight,
} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.regulation);
  const dispatch = useDispatch();

  const [regulation, setRegulation] = useState(data ? data : []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = await api.get('/api/regulations');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'REGULATION', payload: response.data});

      //setNotifications(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  function _openUrl(url) {
    try {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url).catch(err =>
            console.error('An error occurred', err),
          );
        }
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <Content>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }>
        <FlatList
          style={{margimBottom: 50}}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View key={index}>
              <Link onPress={() => _openUrl(item.url)}>
                <Card>
                  <Title style={{marginBottom: 5}}>{item.title}</Title>
                  {/* <TextDark>{item.regulation}</TextDark> */}
                </Card>
              </Link>
            </View>
          )}
        />
      </ScrollView>
    </Content>
  );
}
