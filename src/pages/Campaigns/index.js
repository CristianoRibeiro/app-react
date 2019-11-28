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
import BannerCampaigns from '~/pages/Main/BannerCampaigns';

//Api
import api from '~/services/api';

//Styles
import {Container, Content} from '../../style';

import {
  Title,
  Header,
  TextDark,
  CardItem,
  Link,
  CardImage,
  SubTitle,
} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.campaigns);
  const dispatch = useDispatch();

  const [campaigns, setCampaigns] = useState(data);
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
      setCampaigns(response.data);
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
        <CardItem style={{flexDirection: 'row', flex:1}}>
          <CardImage>

            <Image
              source={{uri: item.image}}
              style={{
                height: 90,
                width: 65,
              }}
              resizeMode="contain"
            />
          </CardImage>

          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            <TextDark>{item.title}</TextDark>
          </View>
        </CardItem>
      </Link>
    );
  }

  return (
    <Content>
      <FlatList
        style={{margimBottom: 50}}
        data={campaigns}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<BannerCampaigns />}
        renderItem={({item}) => _renderItem(item)}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }
      />
    </Content>
  );
}
