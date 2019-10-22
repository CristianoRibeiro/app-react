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
  const dispatch = useDispatch();

  const [info, setInfo] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (__DEV__) {
      console.tron.log(props.navigation.state.params.item);
    }
    if (props.navigation.state.params.item) {
      setInfo(props.navigation.state.params.item);
    }
  }, []);

  return (
    <Content>
      <ScrollView>
        <View style={{flex: 1}}>
          <FitImage
            source={{uri: props.navigation.state.params.item.thumbnail}}
            resizeMode="contain"
          />
        </View>

        <View style={{marginBottom: 70, marginTop: 15}}>
          <View style={{flexDirection: 'row'}}>
            <Link
              onPress={() =>
                props.navigation.navigate('Quiz')
              }>
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

            <Link onPress={() => props.navigation.navigate('VoucherEvent')}>
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
            <Link
              onPress={() =>
                Linking.openURL(
                  'http://inspirafenae2020.fenae.org.br/resultado/3',
                )
              }>
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

            <Link onPress={() => props.navigation.navigate('PrizeEvent')}>
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
            <Link onPress={() => props.navigation.navigate('FlightEvent')}>
              <Card>
                <Image
                  source={require('~/assets/icons/ico_sorteio.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>SORTEIO </TextDark>
              </Card>
            </Link>

            <Link onPress={() => props.navigation.navigate('Transfer')}>
              <Card>
                <Image
                  source={require('~/assets/icons/ico_premiacao.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>PREMIAÇÃO </TextDark>
              </Card>
            </Link>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Link onPress={() => props.navigation.navigate('Streaming')}>
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
            </Link>

            <Link onPress={() => props.navigation.navigate('Info')}>
              <Card>
                <Image
                  source={require('~/assets/icons/ico_regras.png')}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>REGRAS </TextDark>
              </Card>
            </Link>
          </View>
        </View>
      </ScrollView>
    </Content>
  );
}
