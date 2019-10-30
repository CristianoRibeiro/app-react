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
  Linking,
} from 'react-native';
import FitImage from 'react-native-fit-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Banner from '~/pages/Main/Banner';
import EmptyList from '~/components/EmptyList';

import api from '~/services/api';

import {
  Title,
  Header,
  TextDark,
  Card,
  Link,
  TextLight,
  Btn,
  Original,
} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.event);
  const campaignsState = useSelector(state => state.campaigns);
  const dispatch = useDispatch();

  const [events, setEvents] = useState(data ? data : []);
  const [thumbnail, setThumbnail] = useState('');
  const [campaigns, setCampaigns] = useState(
    campaignsState ? campaignsState : [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();

    if (campaignsState.length) {
      setThumbnail(campaignsState[0].thumbnail);
    }
  }, [campaigns]);

  async function _getData() {
    try {
      let events = await api.post('/api/events');
      let campaigns = await api.post('/api/campaigns');
      let prizes = await api.post('/api/prizes');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(events.data);
      }
      await dispatch({type: 'CAMPAIGNS', payload: campaigns.data});
      await dispatch({type: 'PRIZE', payload: prizes.data});
      await dispatch({type: 'EVENT', payload: events.data});
      //setCampaigns(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  function _renderItem(item, index) {
    return (
      <Link
        key={index}
        onPress={() => props.navigation.navigate('EventItem', {item})}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
            marginHorizontal: 5,
          }}>
          <Image
            source={{uri: item.banner}}
            style={{
              height: 90,
              width: 90,
              borderRadius: 45
            }}
            resizeMode="contain"
          />
          <TextDark style={{fontSize: 12}}>{item.name} </TextDark>
        </View>
      </Link>
    );
  }

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }>
        <Header style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons name="star" size={24} color={'#fff'} />

            <TextLight>DESTAQUES</TextLight>

            <MaterialCommunityIcons name="star" size={24} color={'#fff'} />
          </View>
        </Header>
        <Banner />

        <View style={{marginTop: 15}}>
          <Title
            style={{
              color: '#444',
              textAlign: 'left',
              fontSize: 15,
              marginTop: 5,
            }}>
            Encontre o seu evento Fenae/Apcef
          </Title>
        </View>

        <View style={{marginBottom: 4, marginHorizontal: 0}}>
          <FlatList
            data={data}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => _renderItem(item, index)}
          />
        </View>

        <Title
          style={{
            color: '#444',
            textAlign: 'left',
            fontSize: 15,
            marginBottom: 10,
            marginTop: 5,
          }}>
          Fique por dentro das campanhas
        </Title>

        {thumbnail ? (
          <Card style={{elevation: 4, flex: 1}}>
            <FitImage source={{uri: thumbnail}} resizeMode="contain" />
            <View style={{marginTop: -45, marginBottom: 10, flex: 1, alignItems: 'flex-end'}}>
              <Btn
                onPress={() => props.navigation.navigate('Campaigns')}
                style={{alignItems: 'center', alignSelf: 'flex-end'}}>
                <TextLight style={{fontSize: 12}}>Saiba mais</TextLight>
              </Btn>
            </View>
          </Card>
        ) : null}
      </ScrollView>
    </View>
  );
}
