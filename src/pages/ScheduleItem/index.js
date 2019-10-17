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
} from 'react-native';

import api from '~/services/api';

import {Title, Header, TextDark, Card, Link} from './styles';

import {Container, Content} from '../../style';

export default function Main(props) {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {}, []);

  return (
    <Content>
      <ScrollView>
        <Header style={{alignItems: 'center'}}>
          <Title>INSPIRA 2020</Title>
          <TextDark>Fevereiro/2020 - São Paulo - SP </TextDark>

          <View style={{alignItems: 'center'}}>
            <Image
              source={require('~/assets/avatar_evento.png')}
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
            <Link>
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

            <Link>
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
            <Link>
              <Card>
                <Image
                  source={require('~/assets/icons/user.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>REDE </TextDark>
              </Card>
            </Link>

            <Link>
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
            <Link  onPress={() => props.navigation.navigate('Flight')}>
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

            <Link>
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
            <Link>
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

            <Link>
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
                <TextDark>GAMES </TextDark>
              </Card>
            </Link>

            <Link>
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
