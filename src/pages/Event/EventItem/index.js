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
  Linking,
} from 'react-native';

import api from '~/services/api';

import {Header, TextDark, Card, Link} from './styles';
import {Container, Content, Title} from '../../../style';
import {Event} from '~/model/Event';

export default function Main(props) {
  const dispatch = useDispatch();

  const [item, setItem] = useState(Event);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    //console.tron.log(props.navigation.state.params.item);
    _getItem();
  }, []);

  async function _getItem() {
    try {
      if (props.navigation.state.params.item) {
        setItem(props.navigation.state.params.item);
        //alert(JSON.stringify(props.navigation.state.params.item.prizes));
        if (__DEV__) {
          console.tron.log(props.navigation.state.params.item);
        }
        if (props.navigation.state.params.item.vouchers) {
          await dispatch({
            type: 'VOUCHER',
            payload: props.navigation.state.params.item.vouchers,
          });
        }

        if (props.navigation.state.params.item.schedule) {
          await dispatch({
            type: 'SCHEDULE',
            payload: props.navigation.state.params.item.schedule,
          });
        }

        if (props.navigation.state.params.item.prizes) {
          await dispatch({
            type: 'PRIZE',
            payload: props.navigation.state.params.item.prizes,
          });
        }

        if (props.navigation.state.params.item.flights) {
          await dispatch({
            type: 'FLIGHTS',
            payload: props.navigation.state.params.item.flights,
          });
        }

        if (props.navigation.state.params.item.transfers) {
          await dispatch({
            type: 'TRANSFER',
            payload: props.navigation.state.params.item.transfers,
          });
        }

        await dispatch({
          type: 'EVENTITEM',
          payload: props.navigation.state.params.item,
        });
      }
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  return (
    <Content>
      <ScrollView>
        <Header style={{alignItems: 'center'}}>
          <Title>{item.name}</Title>
          <TextDark style={{color: '#fff'}}>{item.local} </TextDark>

          {item.banner ? (
            <View style={{alignItems: 'center', marginTop: 20}}>
              <Image
                source={{uri: item.banner}}
                style={{
                  height: 150,
                  width: 150,
                  borderRadius: 75,
                }}
                resizeMode="contain"
              />
            </View>
          ) : null}
        </Header>

        <View style={{flexDirection: 'row'}}>
          <Link onPress={() => props.navigation.navigate('Info')}>
            <Card>
              <Image
                source={require('~/assets/icons/info.png')}
                style={{
                  height: 50,
                  width: 50,
                }}
                resizeMode="contain"
              />
              <TextDark>INFORMAÇÕES </TextDark>
            </Card>
          </Link>

          <Link
            onPress={() => props.navigation.navigate('ScheduleEvent', {item})}>
            <Card>
              <Image
                source={require('~/assets/icons/calendar.png')}
                style={{
                  height: 50,
                  width: 50,
                }}
                resizeMode="contain"
              />
              <TextDark>PROGRAMAÇÃO </TextDark>
            </Card>
          </Link>
        </View>

        <View style={{marginBottom: 70}}>
          <View style={{flexDirection: 'row'}}>
            <Link onPress={() => props.navigation.navigate('VoucherEvent')}>
              <Card>
                <Image
                  source={require('~/assets/icons/ticket.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>TICKETS </TextDark>
              </Card>
            </Link>

            <Link onPress={() => props.navigation.navigate('FlightEvent')}>
              <Card>
                <Image
                  source={require('~/assets/icons/passport.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>PASSAGEM </TextDark>
              </Card>
            </Link>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Link onPress={() => props.navigation.navigate('Transfer')}>
              <Card>
                <Image
                  source={require('~/assets/icons/bus.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>TRANSFER </TextDark>
              </Card>
            </Link>

            <Link>
              <Card>
                <Image
                  source={require('~/assets/icons/games.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>EXTRATO </TextDark>
              </Card>
            </Link>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Link
              onPress={() => props.navigation.navigate('Certificate')}>
              <Card>
                <Image
                  source={require('~/assets/icons/games.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>GAMES </TextDark>
              </Card>
            </Link>

            <Link onPress={() => props.navigation.navigate('Streaming')}>
              <Card>
                <Image
                  source={require('~/assets/icons/transmision.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>TRANSMISSÃO </TextDark>
              </Card>
            </Link>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Link onPress={() => props.navigation.navigate('PrizeEvent')}>
              <Card>
                <Image
                  source={require('~/assets/icons/medal.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>PRÊMIOS </TextDark>
              </Card>
            </Link>

            <Link onPress={() => props.navigation.navigate('Certificate')}>
              <Card>
                <Image
                  source={require('~/assets/icons/certificate.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>CERTIFICADO </TextDark>
              </Card>
            </Link>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Link onPress={() => props.navigation.navigate('Faq')}>
              <Card>
                <Image
                  source={require('~/assets/icons/faq.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>DUVIDAS </TextDark>
              </Card>
            </Link>

            <Link onPress={() => props.navigation.navigate('Gallery')}>
              <Card>
                <Image
                  source={require('~/assets/icons/gallery.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>GALERIA </TextDark>
              </Card>
            </Link>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Link onPress={() => props.navigation.navigate('NewsCampaigns')}>
              <Card>
                <Image
                  source={require('~/assets/icons/newspaper.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>NOTÍCIAS </TextDark>
              </Card>
            </Link>

            <View style={{flex:1}}></View>
          </View>
        </View>
      </ScrollView>
    </Content>
  );
}
