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
  Linking
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

import {Container, Content} from '../../style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fileName: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  instructions: {
    color: '#DDD',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  logo: {
    height: Dimensions.get('window').height * 0.2,
    marginVertical: Dimensions.get('window').height * 0.1,
    width: Dimensions.get('window').height * 0.17 * (1950 / 662),
  },
  welcome: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default function Main(props) {
  const data = useSelector(state => state.event);
  const dispatch = useDispatch();

  const [events, setEvents] = useState(data ? data : []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getEvents();
  }, []);

  async function _getEvents() {
    try {
      let response = await api.post('/api/events');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'EVENT', payload: response.data});
      setEvents(response.data);
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
          <RefreshControl refreshing={loading} onRefresh={() => _getEvents()} />
        }>
        <Header style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons name="star" size={24} color={'#fff'} />

            <TextLight>DESTAQUES</TextLight>

            <MaterialCommunityIcons name="star" size={24} color={'#fff'} />
          </View>
        </Header>
        <Banner />

        <View style={{flex: 1, alignItems: 'center', marginTop: 25}}>
          <Title
            style={{
              color: '#444',
              textAlign: 'center',
              fontSize: 20,
              marginBottom: 10,
              marginTop: 5,
            }}>
            Encontre o seu evento Fenae/Apcef
          </Title>
        </View>

        <View style={{marginVertical: 5, marginHorizontal: 0}}>
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
            textAlign: 'center',
            fontSize: 20,
            marginBottom: 10,
            marginTop: 5,
          }}>
          Fique por dentro das campanhas
        </Title>

        <Card style={{elevation: 4, flex: 1}}>
          <Image
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 135 / 62,
            }}
            source={require('~/assets/banner.jpg')}
            resizeMode="cover"
          />
          <View style={{marginTop: -45, flex: 1, alignItems: 'flex-end'}}>
            <Btn onPress={() =>
                Linking.openURL(
                  'http://inspirafenae2020.fenae.org.br',
                )
              } style={{alignItems: 'center', alignSelf: 'flex-end'}}>
              <TextLight style={{fontSize: 12}}>Saiba mais</TextLight>
            </Btn>
          </View>
        </Card>

        <View></View>
      </ScrollView>
    </View>
  );
}
