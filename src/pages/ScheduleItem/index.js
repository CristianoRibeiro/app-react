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
  Linking,
} from 'react-native';

import api from '~/services/api';

import {Title, Header, TextDark, Card, Link} from './styles';
import {Container, Content} from '../../style';

export default function Main(props) {

  const [item, setItem] = useState(props.navigation.state.params.item);
  const [error, setError] = useState(false);

  useEffect(() => {

    //alert(JSON.stringify(props.navigation.state.params.item));
  }, []);

  return (
    <Content>
      <ScrollView>
        <Header style={{alignItems: 'center'}}>
          <Title>{item.name}</Title>
          <TextDark>{item.local} </TextDark>

          <View style={{alignItems: 'center', marginTop: 20}}>
            <Image
              source={{uri: item.banner}}
              style={{
                height: 150,
                width: 150,
                borderRadius: 50,
              }}
              resizeMode="contain"
            />
          </View>
        </Header>

        <View style={{marginBottom: 70}}>
          <View style={{flexDirection: 'row'}}>
            <Link onPress={() => props.navigation.navigate('ScheduleEvent')}>
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

            <Link onPress={() => props.navigation.navigate('VoucherItem')}>
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
          </View>

          <View style={{flexDirection: 'row'}}>
            <Link onPress={() => Linking.openURL('http://inspirafenae2020.fenae.org.br/resultado/3') }>
              <Card>
                <Image
                  source={require('~/assets/icons/user.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>LISTA SORTEIO </TextDark>
              </Card>
            </Link>

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
          </View>

          <View style={{flexDirection: 'row'}}>
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
          </View>

          <View style={{flexDirection: 'row'}}>
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
          </View>

          <View style={{flexDirection: 'row'}}>
            <Link onPress={() => props.navigation.navigate('Info')}>
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
        </View>
      </ScrollView>
    </Content>
  );
}
