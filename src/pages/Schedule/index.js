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
  RefreshControl
} from 'react-native';
import EmptyList from '~/components/EmptyList';

//Api
import api from '~/services/api';

//Styles
import {Container, Content} from '../../style';

import {
  EventTitle,
  EventDate,
  EventLink,
  Header,
  TextTitle,
  Card,
  Link,
  CardImage,
} from './styles';
import { TextDark } from '../Main/styles';

export default function Main(props) {
  const data = useSelector(state => state.schedule);
  const dispatch = useDispatch();

  const [schedules, setSchedules] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getSchedule();
  }, []);

  async function _getSchedule() {
    setLoading(true);
    try {
      let response = await api.post('/api/events');
      //alert(JSON.stringify(response));
      await dispatch({type: 'SCHEDULE', payload: response.data});
      setSchedules(response.data);
    } catch (error) {
      console.tron.log(error.message);
    }
    setLoading(false);
  }

  function _renderItem(item) {
    return (
      <Link>
        <Card>
          <CardImage>
            <Image
              source={{uri: item.banner}}
              style={{
                height: 70,
                width: 70,
                borderRadius: 35
              }}
              resizeMode="contain"
            />
          </CardImage>
          <View style={{flex: 3}}>
            <EventTitle>{item.name}</EventTitle>
            <EventLink>{item.local}</EventLink>
            
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
        ListEmptyComponent={
          <EmptyList text="Nenhum evento emcontrado!"/>
        }
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
