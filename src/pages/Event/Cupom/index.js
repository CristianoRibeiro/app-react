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
  TextLight
} from './styles';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {Input, Search} from "~/pages/Campaigns/Recommendation/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

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
    setLoading(true);
    try {
      //let response = await api.get('/api/games/'+eventitem.id, {event_id: eventitem.id});
      let response = await api.post('/api/coupons/group', {event_id: eventitem.id});
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
    setLoading(false);
  }

  function _renderItem(item) {
    let formattedDate = '';
    if (item.created_at) {
      const firstDate = parseISO(item.created_at);
      formattedDate = format(firstDate, "dd/MM/YYY', às ' HH:mm'h'");
    }

    if (item.coupon || item.active) {
      return (
        <Card style={{alignItems: 'center', justifyContent: 'center'}}>
          {item.icon ?
            <MaterialCommunityIcons style={{marginRight: 10}} name={item.icon} size={30} color={'#777'}/>
            :
            <Image
              style={{height: 24, width: 24, marginRight: 10, marginLeft: 3}}
              source={{uri: item.image}}
              resizeMode="contain"
            />}
          <View style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <SubTitle>{item.name}</SubTitle>
              </View>

            </View>
            <View style={{justifyContent: 'center'}}>
              <TextDark>{item.coupon} {item.coupon > 1 ? 'cupons' : 'cupom'}</TextDark>
            </View>
          </View>
        </Card>
      );
    } else {
      if (item.active || item.title) {
        return (
          <View style={{flex: 1, justifyContent: 'center', marginTop: 15, marginBottom: 5, marginHorizontal: 10}}>
            <SubTitle style={{fontSize: 22, fontWeight: '700'}}>{item.name}</SubTitle>
          </View>
        );
      } else {
        return null;
      }
    }
  }

  return (
    <Content>

      <Header>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons name="ticket-outline" size={24} color={'#fff'}/>

          <TextLight style={{fontSize: 18, fontWeight: '700'}}>Total de cupons: {data.total}</TextLight>
        </View>
      </Header>

      <FlatList
        style={{margimBottom: 50}}
        data={data.data}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <EmptyList text="Aqui você poderá consultar os seus cupons gerados a partir das interações no evento"/>
        }
        renderItem={({item}) => _renderItem(item)}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()}/>
        }
      />
    </Content>
  );
}
