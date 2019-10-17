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
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import FitImage from 'react-native-fit-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Banner from '~/pages/Main/Banner';

import api from '~/services/api';

import {Title, Header, TextDark, Card, Link} from './styles';

import {Container, Content} from '../../style';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextLight} from '../Voucher/styles';

export default function Main(props) {
  const [events, setEvents] = useState([
    {
      url: 'https://picsum.photos/1280/1280',
      image: 'https://picsum.photos/1280/1280',
    },
    {
      url: 'https://picsum.photos/1280/1280',
      image: 'https://picsum.photos/1280/1280',
    },
    {
      url: 'https://picsum.photos/1280/1280',
      image: 'https://picsum.photos/1280/1280',
    },
    {
      url: 'https://picsum.photos/1280/1280',
      image: 'https://picsum.photos/1280/1280',
    },
  ]);
  const [error, setError] = useState(false);

  useEffect(() => {}, []);

  function _renderItem({item, index}) {
    return (
      <TouchableOpacity style={{flexBasis: 0}}>
        <Card style={{flex: 1, padding: 4}}>
          <Image
            source={{
              uri:
                'https://www.fenae.org.br/portal/data/files/53/03/D9/DF/2FDC4610EE5BBC46403A91A8/FENAE.jpg',
            }}
            resizeMode="cover"
            style={{height: 50, width: 50, flex: 1}}
          />

          <TextDark>Evento</TextDark>
        </Card>
      </TouchableOpacity>
    );
  }
  return (
    <Content>
      <ScrollView>
        <Header style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons name="star" size={24} color={'#f36e06'} />

            <TextLight>DESTAQUES</TextLight>

            <MaterialCommunityIcons name="star" size={24} color={'#f36e06'} />
          </View>
        </Header>
        <Banner />

        <View style={{flex: 1, alignItems: 'center', marginTop: 25}}>
          <TextDark>Encontre o seu evento Fenae/Apcef </TextDark>
        </View>

        <View>
          {/* {events.map((item, index) =>
              _renderItem({item, index})
            )} */}
          {/* <FlatList
          data={events}
          keyExtractor={item => item.id}
          numColumns={3}
          renderItem={({ item }) => _renderItem(item)}
        /> */}

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Link onPress={() => props.navigation.navigate('ScheduleItem')}>
              <Card>
                <Image
                  source={require('~/assets/evento/evento1.png')}
                  style={{
                    height: 65,
                    width: 65,
                  }}
                  resizeMode="contain"
                />
                <TextDark>Evento </TextDark>
              </Card>
            </Link>

            <Link onPress={() => props.navigation.navigate('ScheduleItem')}>
              <Card>
                <Image
                  source={require('~/assets/evento/evento2.png')}
                  style={{
                    height: 65,
                    width: 65,
                  }}
                  resizeMode="contain"
                />
                <TextDark>Evento </TextDark>
              </Card>
            </Link>

            <Link onPress={() => props.navigation.navigate('ScheduleItem')}>
              <Card>
                <Image
                  source={require('~/assets/evento/evento3.png')}
                  style={{
                    height: 65,
                    width: 65,
                  }}
                  resizeMode="contain"
                />
                <TextDark>Evento </TextDark>
              </Card>
            </Link>

            <Link onPress={() => props.navigation.navigate('ScheduleItem')}>
              <Card>
                <Image
                  source={require('~/assets/evento/evento4.png')}
                  style={{
                    height: 65,
                    width: 65,
                  }}
                  resizeMode="contain"
                />
                <TextDark>Evento </TextDark>
              </Card>
            </Link>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Link onPress={() => props.navigation.navigate('ScheduleItem')}>
            <Card>
              <Image
                source={require('~/assets/evento/evento5.png')}
                style={{
                  height: 65,
                  width: 65,
                }}
                resizeMode="contain"
              />
              <TextDark>Evento </TextDark>
            </Card>
          </Link>

          <Link onPress={() => props.navigation.navigate('ScheduleItem')}>
            <Card>
              <Image
                source={require('~/assets/evento/evento6.png')}
                style={{
                  height: 65,
                  width: 65,
                }}
                resizeMode="contain"
              />
              <TextDark>Evento </TextDark>
            </Card>
          </Link>

          <Link onPress={() => props.navigation.navigate('ScheduleItem')}>
            <Card>
              <Image
                source={require('~/assets/evento/evento7.png')}
                style={{
                  height: 65,
                  width: 65,
                }}
                resizeMode="contain"
              />
              <TextDark>Evento </TextDark>
            </Card>
          </Link>

          <Link onPress={() => props.navigation.navigate('ScheduleItem')}>
            <Card>
              <Image
                source={require('~/assets/evento/evento8.png')}
                style={{
                  height: 65,
                  width: 65,
                }}
                resizeMode="contain"
              />
              <TextDark>Evento </TextDark>
            </Card>
          </Link>
        </View>
      </ScrollView>
    </Content>
  );
}
