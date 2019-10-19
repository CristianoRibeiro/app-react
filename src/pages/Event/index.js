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
  SubTitle
} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.event);
  const dispatch = useDispatch();

  const [schedules, setEvents] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getEvent();
  }, []);

  async function _getEvent() {
    setLoading(true);
    try {
      let response = await api.post('/api/events');
      //alert(JSON.stringify(response));
      console.tron.log(response.data);
      await dispatch({type: 'EVENT', payload: response.data});
      setEvents(response.data);
    } catch (error) {
      console.tron.log(error.message);
    }
    setLoading(false);
  }

  function _renderItem(item) {
    return (
      <Link onPress={() => props.navigation.navigate('ScheduleItem', {item})}>
        <Card>
          <CardImage>
            <Image
              source={{uri: item.banner}}
              style={{
                height: 70,
                width: 70,
                borderRadius: 35,
              }}
              resizeMode="contain"
            />
          </CardImage>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <EventTitle>{item.name}</EventTitle>
            <SubTitle>{item.local}</SubTitle>
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
        ListEmptyComponent={<EmptyList text="Nenhum evento encontrado!" />}
        renderItem={({item}) => _renderItem(item)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => _getEvent()}
          />
        }
      />
    </Content>
  );
}
