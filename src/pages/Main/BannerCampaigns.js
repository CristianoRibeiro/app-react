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
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Animated} from 'react-native';
import Carousel from 'react-native-banner-carousel';
const BannerWidth = Dimensions.get('window').width;
import FitImage from 'react-native-fit-image';
import api from '~/services/api';

import {Title, Header, TextDark, Card, Link, Small, Original} from './styles';
const AnimatedOriginal = Animated.createAnimatedComponent(Original);

import {Container, Content} from '../../style';

export default function Banner() {
  const data = useSelector(state => state.bannercampaigns);
  const dispatch = useDispatch();

  const opacity = new Animated.Value(0);

  const [banner, setBanners] = useState(data ? data : []);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {

  }, []);

  useEffect(() => {
    _getBanners();
  }, []);

  async function _getBanners() {
    try {
      let response = await api.get('/api/banners/campaign');
      await dispatch({type: 'BANNERCAMPAIGNS', payload: response.data});
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  function _renderItemCarousel(item, index) {
    return (
      <TouchableOpacity
        onPress={() => {
          try {
            Linking.openURL(item.link);
          } catch (error) {}
        }}
        key={index}>
          <FitImage indicator={false} source={{uri: item.avatar}} resizeMode="contain" />
      </TouchableOpacity>
    );
  }

  return (
    <Carousel
      autoplay
      autoplayTimeout={5000}
      loop
      index={0}
      pageSize={BannerWidth}
      pageIndicatorOffset={15}
      pageIndicatorStyle={{width: 5, height: 5, borderRadius: 2}}
      showsPageIndicator={true}
      pageIndicatorContainerStyle={{marginBottom: -20}}>
      {banner.map((item, index) => _renderItemCarousel(item, index.toString()))}
    </Carousel>
  );
}
