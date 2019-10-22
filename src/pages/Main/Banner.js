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
import api from '~/services/api';

import {Title, Header, TextDark, Card, Link, Small, Original} from './styles';
const AnimatedOriginal = Animated.createAnimatedComponent(Original);

import {Container, Content} from '../../style';

export default function Banner({shouldLoad = false, aspectRatio = 2.2}) {
  const data = useSelector(state => state.banner);
  const dispatch = useDispatch();

  // const [banner, setBanner] = useState([
  //   {
  //     url: 'https://picsum.photos/1280/580',
  //     image: 'https://picsum.photos/1280/580',
  //   },
  //   {
  //     url: 'https://picsum.photos/1280/580',
  //     image: 'https://picsum.photos/1280/580',
  //   },
  //   {
  //     url: 'https://picsum.photos/1280/580',
  //     image: 'https://picsum.photos/1280/580',
  //   },
  // ]);
  const opacity = new Animated.Value(0);

  const [banner, setBanners] = useState(data ? data : []);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (true) {
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    _getBanners();
  }, []);

  async function _getBanners() {
    try {
      let response = await api.get('/api/banners');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'BANNER', payload: response.data});
      //setBanners(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  function handleAnimate() {
    Animated.timing(opacity, {
      duration: 900,
      toValue: 1,
      useNativeDriver: true,
    }).start();
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
        <AnimatedOriginal
          style={{opacity}}
          onLoadEnd={handleAnimate}
          source={{uri: item.avatar}}
          aspect={aspectRatio}
          resizeMode="contain"
        />
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
