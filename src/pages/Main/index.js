import React, {useState, useEffect, Component} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  FlatList,
  RefreshControl,
  Linking,
} from 'react-native';
import FitImage from 'react-native-fit-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Banner from '~/pages/Main/Banner';
import BannerCampaigns from '~/pages/Main/BannerCampaigns';

import api from '~/services/api';

import {
  Title,
  Header,
  HeaderTitle,
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

  const [thumbnail, setThumbnail] = useState();
  const [campaigns, setCampaigns] = useState(
    campaignsState ? campaignsState : [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, [campaigns]);

  async function _getData() {
    try {
      let events = await api.post('/api/events');
      let campaigns = await api.post('/api/campaigns');
      let prizes = await api.post('/api/prizes');
      let banners = await api.get('/api/banners');
      let bannerCampaigns = await api.get('/api/banners/campaign');
      let response_user = await api.get('/api/auth/user');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(events.data);
      }
      await dispatch({type: 'CAMPAIGNS', payload: campaigns.data});
      await dispatch({type: 'PRIZE', payload: prizes.data});
      await dispatch({type: 'EVENT', payload: events.data});
      await dispatch({type: 'BANNER', payload: banners.data});
      await dispatch({type: 'BANNERCAMPAIGNS', payload: bannerCampaigns.data});
      await dispatch({type: 'USER', payload: response_user.data});
      //setCampaigns(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    if (campaignsState.length) {
      setThumbnail(campaignsState[0].thumbnail);
    } else {
      setThumbnail();
    }
  }

  async function _handleScreen(item){
    await dispatch({type: 'EVENTITEM', payload: item});
    props.navigation.navigate('EventItem');
  }

  function _renderItem(item, index) {
    return (
      <Link
        key={index}
        onPress={() => _handleScreen(item)}>
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
              borderRadius: 45,
            }}
            resizeMode="contain"
          />
          <TextDark style={{fontSize: 12}}> {item.name} </TextDark>
        </View>
      </Link>
    );
  }

  function _renderCampaingn(item) {
    return (
      <Link onPress={() => props.navigation.navigate('CampaignsItem', {item})}>
        <Card style={{width: 140, flex: 1}}>
          <FitImage source={{uri: item.image}} resizeMode="contain" />
          <View
            style={{flex: 1, justifyContent: 'center', paddingHorizontal: 10}}>
            <TextDark style={{fontSize: 9}}>{item.title}</TextDark>
          </View>
        </Card>
      </Link>
    );
  }

  function _renderBanner() {
    if (thumbnail) {
      return (
        <View style={{marginBottom: 4, marginHorizontal: 0}}>
          <FlatList
            data={campaignsState}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => _renderCampaingn(item, index)}
          />
        </View>
      );
    } else {
      return (
        <View style={{paddingBottom: 60}}>
          <BannerCampaigns />
        </View>
      );
    }
  }

  return (
    <ScrollView
      style={{flex: 1}}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
      }>
      <View style={{flex: 1}}>
        <Header style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons name="star" size={24} color={'#fff'} />

            <TextLight>DESTAQUES</TextLight>

            <MaterialCommunityIcons name="star" size={24} color={'#fff'} />
          </View>
        </Header>
        <Banner />

        <HeaderTitle style={{alignItems: 'center', backgroundColor: '#dfdfdf'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons name="search" size={24} color={'#444'} />

            <TextLight style={{color: '#444', fontWeight: '700'}}>
              Encontre o seu evento Fenae/Apcef
            </TextLight>
          </View>
        </HeaderTitle>

        <View style={{marginBottom: 4, marginHorizontal: 0}}>
          <FlatList
            data={data}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => _renderItem(item, index)}
          />
        </View>

        <HeaderTitle style={{alignItems: 'center', backgroundColor: '#dfdfdf'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons name="search" size={24} color={'#444'} />

            <TextLight style={{color: '#444', fontWeight: '700'}}>
              Fique por dentro das campanhas
            </TextLight>
          </View>
        </HeaderTitle>

        {_renderBanner()}
      </View>
    </ScrollView>
  );
}
