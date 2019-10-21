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
import FitImage from 'react-native-fit-image';
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
  const data = useSelector(state => state.campaigns);
  const dispatch = useDispatch();

  const [events, setEvents] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
    
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = await api.post('/api/campaigns');
      //alert(JSON.stringify(response));
      if (__DEV__) {
      console.tron.log(response.data);
      }
      await dispatch({type: 'CAMPAIGNS', payload: response.data});
      //setEvents(response.data);
    } catch (error) {
      if (__DEV__) {
      console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  function _renderItem(item) {
    return (
      <Link onPress={() => props.navigation.navigate('CampaignsItem', {item})}>
        <Card>
          <CardImage>
            <FitImage
              source={{uri: item.thumbnail}}
              resizeMode="contain"
            />
          </CardImage>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <EventTitle>{item.title}</EventTitle>
          </View>
        </Card>
      </Link>
    );
  }

  return (
    <Content>
      <FlatList
        style={{margimBottom: 50}}
        data={events}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList text="Nenhum evento encontrado!" />}
        renderItem={({item}) => _renderItem(item)}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => _getData()}
          />
        }
      />
    </Content>
  );
}
