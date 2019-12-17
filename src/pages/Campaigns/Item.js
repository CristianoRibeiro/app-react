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
  Linking,
} from 'react-native';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import FitImage from 'react-native-fit-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {WebView} from 'react-native-webview';
import EmptyList from '~/components/EmptyList';
import Banner from './Banner';

//Api
import api from '~/services/api';

//Styles
import {Container, Content} from '../../style';

import {
  Title,
  TextDark,
  EventLink,
  Header,
  TextTitle,
  Card,
  Link,
  SubTitle,
} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.eventitem);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [info, setInfo] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (__DEV__) {
      console.tron.log(props.navigation.state.params.item);
    }
    if (props.navigation.state.params) {
      if(props.navigation.state.params.item){
        setInfo(props.navigation.state.params.item);
      }
    }
    _getData();
  }, []);

  async function _getData() {
    try {
      let response = await api.get('/api/auth/user');

      await dispatch({type: 'USER', payload: response.data});
      //setNotifications(response.data);
    } catch (error) {
      if (error.message === 'Request failed with status code 401') {
        props.navigation.navigate('Login');
      }
    }
  }

  function _handleScheen(screen) {
    if (user.associated) {
      props.navigation.navigate(screen);
    } else {
      Alert.alert(null, 'Somente para associados!');
    }
  }

  function _indicate() {
    if (user.associated) {
      props.navigation.navigate('TabsRecommendation');
    } else {
      try {
        Linking.canOpenURL('https://associacao.fenae.org.br').then(
          supported => {
            if (supported) {
              Linking.openURL('https://associacao.fenae.org.br').catch(err =>
                console.error('An error occurred', err),
              );
            }
          },
        );
      } catch (e) {
        console.error(e.message);
      }
    }
  }

  function _renderItem() {
    if (props.navigation.state.params.item.functions) {
      return (
        <View style={{marginBottom: 70, marginTop: 15}}>
          <View style={{flexDirection: 'row'}}>
            <Link onPress={() => props.navigation.navigate('Quiz')}>
              <Card>
                <Image
                  source={require('~/assets/icons/ico_quiz.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>QUIZ </TextDark>
              </Card>
            </Link>

            <Link onPress={() => props.navigation.navigate('Album')}>
              <Card>
                <Image
                  source={require('~/assets/icons/ico_album.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>ÁLBUM </TextDark>
              </Card>
            </Link>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Link onPress={() => _handleScheen('Cupons')}>
              <Card>
                <Image
                  source={require('~/assets/icons/ico_cupons.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>NÚMERO DA SORTE </TextDark>
              </Card>
            </Link>

            <Link onPress={() => props.navigation.navigate('TabsExchange')}>
              <Card>
                <Image
                  source={require('~/assets/icons/ico_trocas.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>TROCAS </TextDark>
              </Card>
            </Link>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Link onPress={() => _handleScheen('Lottery')}>
              <Card>
                <Image
                  source={require('~/assets/icons/ico_sorteio.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>SORTEADOS </TextDark>
              </Card>
            </Link>

            <Link onPress={() => props.navigation.navigate('PrizeCampaign')}>
              <Card>
                <Image
                  source={require('~/assets/icons/ico_premiacao.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>MEUS PRÊMIOS </TextDark>
              </Card>
            </Link>
          </View>

          <View style={{flexDirection: 'row'}}>
            {/* <Link onPress={() => props.navigation.navigate('NewsCampaigns')}>
              <Card>
                <Image
                  source={require('~/assets/icons/ico_noticias.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>NOTÍCIAS </TextDark>
              </Card>
            </Link> */}

            <Link onPress={() => props.navigation.navigate('Regulation')}>
              <Card>
                <Image
                  source={require('~/assets/icons/ico_regras.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>REGULAMENTO </TextDark>
              </Card>
            </Link>

            <Link onPress={() => _indicate()}>
              <Card>
                <Image
                  source={require('~/assets/icons/thumbs-up.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>
                  {user.associated ? 'INDIQUE UM AMIGO' : 'ASSOCIE-SE'}
                </TextDark>
              </Card>
            </Link>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Link onPress={() => props.navigation.navigate('Units')}>
              <Card>
                <Image
                  source={require('~/assets/icons/top-three.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>UNIDADES </TextDark>
              </Card>
            </Link>

            {/* <View style={{flex:1}}></View> */}
          </View>
        </View>
      );
    } else {
      const html = '<!doctype html><html lang="pt-br"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></head><body>'+props.navigation.state.params.item.content+ '</html>';
      return (
        <View style={{paddingBottom: 15, flex: 1}}>
          <WebView
          style={{
            height: 1000, minHeight: '100%'
          }}
            source={{html: html}}
            onShouldStartLoadWithRequest={event => {
              if (!/^[data:text, about:blank]/.test(event.url)) {
                Linking.openURL(event.url);
                return false;
              }
              return true;
            }}
          />
        </View>
      );
    }
  }

  return (
    <Content>
      <ScrollView
        style={{flex:1}}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }>
          <FitImage
            source={{uri: props.navigation.state.params.item.thumbnail}}
            resizeMode="contain"
          />

        {_renderItem()}
      </ScrollView>
    </Content>
  );
}
