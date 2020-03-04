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
import Banner from '../Banner';

//Api
import api from '~/services/api';

//Styles
import {Container, Content} from '../../../style';

import {
  Title,
  TextDark,
  EventLink,
  Header,
  TextTitle,
  Card,
  Link,
  SubTitle,
} from '../styles';

export default function Main(props) {
  const data = useSelector(state => state.eventitem);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [info, setInfo] = useState(data);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
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

      let users_response = await api.get('/api/campaign/women/users');
      setUsers(users_response.data);
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

  function _renderItemUser(item) {
    return (
      <View>
        <Card style={{
          flex: 1,
          padding: 15,
          flexDirection: 'column'
        }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              padding: 15,
            }}>
            <Image
              resizeMode="cover"
              style={{
                width: 100,
                height: 100,
                borderRadius: 90,
                marginBottom: 15,
              }}
              defaultSource={require('~/assets/avatar/avatar.png')}
              source={item ? {uri: item.append_avatar} : null}
            />

            <TextDark style={{fontWeight: '700'}}>{item.name}</TextDark>
            <TextDark>{item.apcef}</TextDark>
            <TextDark>{item.campaign_phrase}</TextDark>

          </View>
        </Card>
      </View>
    );
  }

  function _renderUsers() {
    return (
      <View style={{flexDirection: 'column'}}>

        <FlatList
          data={users}
          horizontal={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => _renderItemUser(item, index)}
        />

      </View>
    );
  }

  function _renderItem() {
    return (
      <View style={{marginBottom: 15, marginTop: 15}}>

        <View style={{flexDirection: 'row'}}>
          <Link onPress={() => _handleScheen('CuponsWomenDay')}>
            <Card>
              <Image
                source={require('~/assets/icons/ico_cupons.png')}
                style={{
                  height: 50,
                  width: 50,
                }}
                resizeMode="contain"
              />
              <TextDark>CUPONS </TextDark>
            </Card>
          </Link>

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
        </View>
      </View>
    );
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

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            paddingBottom: 20,
            flexDirection: 'row',
            height: '100%'
          }}>

          <TextDark style={{ fontSize: 22 }}>Frases </TextDark>
        </View>

        {_renderUsers()}
      </ScrollView>
    </Content>
  );
}
