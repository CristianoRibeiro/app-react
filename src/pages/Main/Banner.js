import React, {useState, useEffect, Component} from 'react';
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
} from 'react-native';
import {Animated} from 'react-native';
import Carousel from 'react-native-banner-carousel';
const BannerWidth = Dimensions.get('window').width;
import api from '~/services/api';

import {Title, Header, TextDark, Card, Link, Small, Original} from './styles';
const AnimatedOriginal = Animated.createAnimatedComponent(Original);


import {Container, Content} from '../../style';

export default function Banner({shouldLoad = false, aspectRatio = 2.2}) {
  const [banner, setBanner] = useState([
    {
      url: 'https://picsum.photos/1280/580',
      image: 'https://picsum.photos/1280/580',
    },
    {
      url: 'https://picsum.photos/1280/580',
      image: 'https://picsum.photos/1280/580',
    },
    {
      url: 'https://picsum.photos/1280/580',
      image: 'https://picsum.photos/1280/580',
    },
  ]);
  const opacity = new Animated.Value(0);

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (true) {
      setTimeout(() => {
        setLoaded(true);
      }, 1000);
    }
  }, [loaded]);

  function handleAnimate() {
    Animated.timing(opacity, {
      duration: 900,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  function _renderItemCarousel(item, index) {
    return (
      <TouchableOpacity key={index}>
        <Small
          source={{ uri: item.image}}
          aspect={aspectRatio}
          resizeMode="contain"
          blurRadius={3}>
          {loaded && (
            <AnimatedOriginal
              style={{opacity}}
              onLoadEnd={handleAnimate}
              source={{ uri: item.image}}
              aspect={aspectRatio}
              resizeMode="contain"
            />
          )}
        </Small>
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
