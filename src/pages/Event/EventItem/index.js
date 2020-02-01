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
  Alert,
  FlatList,
  Platform
} from 'react-native';
import Modal from "react-native-modal";
import QRCodeScanner from "react-native-qrcode-scanner";
import {YouTubeStandaloneIOS} from 'react-native-youtube';
import {YouTubeStandaloneAndroid} from 'react-native-youtube';
import Spinner from 'react-native-loading-spinner-overlay';
import Voucher from '~/model/Voucher';

import api from '~/services/api';

import {Header, TextDark, Card, Link} from './styles';
import {Container, Content, Title} from '~/style';
import {Event} from '~/model/Event';

import {
  TextLight, Btn,
} from '~/pages/Event/Donation/styles';

export default function Main(props) {
  const eventitem = useSelector(state => state.eventitem);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [item, setItem] = useState(Event);
  const [voucher, setVoucher] = useState([]);
  const [app_functions, setFunctions] = useState(
    eventitem.app_functions
      ? JSON.parse(eventitem.app_functions)
      : []
  );
  const [loading, setLoading] = useState(false);
  const [loadingStreaming, setLoadingStreaming] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    //console.tron.log(eventitem);
    _getVoucher();
    _getItem();
    _screen();
  }, []);

  async function _getVoucher() {
    try {
      let response = await api.get(
        `/api/voucher/${eventitem.id}`
      );
      //alert(JSON.stringify(response.data));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'VOUCHERITEM', payload: response.data});
      setVoucher(response.data);
    } catch (error) {
      await dispatch({type: 'VOUCHERITEM', payload: Voucher});
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  async function _getCertificate() {
    setLoadingStreaming(true);
    try {
      let response = await api.post('/api/certificate', {event_id: eventitem.id});
      //alert(JSON.stringify(response.data));
      if (response.data.success) {
        _openUrl(response.data.url);
      } else {
        Alert.alert(null, response.data.message);
      }
      if (__DEV__) {
        console.tron.log(response.data);
      }
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoadingStreaming(false);
  }

  async function _handleItem(item) {
    //alert(JSON.stringify(voucher));
    if (item.type === 'unavailable') {
      Alert.alert(null, 'Em breve.');
    } else if (item.type === 'voucher') {
      if (voucher) {
        props.navigation.navigate('VoucherItem');
      } else {
        Alert.alert(null, 'Você não possui ingresso!');
      }
    } else if (item.type === 'schedule') {
      if (eventitem.url_schedule) {
        try {
          Linking.canOpenURL(
            eventitem.url_schedule,
          ).then(supported => {
            if (supported) {
              Linking.openURL(
                eventitem.url_schedule,
              ).catch(err => console.error('An error occurred', err));
            }
          });
        } catch (e) {
          console.error(e.message);
        }
      } else {
        props.navigation.navigate(item.navigation, {item: item.item});
      }
    } else if (item.type === 'games') {

      if (user.matricula) {
        setModal(true);
      } else {
        Alert.alert(null, 'É necessário ter matrícula para poder jogar. Por favor, dirija-se ao balcão de atendimento.');
      }

      //_scanner(20);
    } else if (item.type === 'streaming') {

      _getStreaming();

    } else if (item.type === 'certificates') {

      _getCertificate();

    } else {
      props.navigation.navigate(item.navigation, {item: item.item});
    }
  }

  function _openUrl(url) {
    try {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url).catch(err =>
            console.error('An error occurred', err),
          );
        }
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  async function _getStreaming() {

    setLoadingStreaming(true);
    try {
      let response = await api.post('/api/streaming', {event_id: eventitem.id});
      //alert(JSON.stringify(response));
      setLoadingStreaming(false);

      if (response.data.success) {
        setTimeout(() => {
            if (__DEV__) {
              console.tron.log(response.data);
            }
            if (Platform.OS === 'ios') {
              YouTubeStandaloneIOS.playVideo(response.data.videoId)
                .then(message => console.log(message))
                .catch(() => Alert.alert(null, 'Link de transmissão invalido.'));
            } else {
              YouTubeStandaloneAndroid.playVideo({
                apiKey: 'AIzaSyCSP0AQ_76MTDu7Q4QQV-UL2QbYOQcQf4M', // Your YouTube Developer API Key
                videoId: response.data.videoId, // YouTube video ID
                autoplay: true, // Autoplay the video
                startTime: 120, // Starting point of video (in seconds)
              })
                .then(() => console.log('Standalone Player Exited'))
                .catch(() => Alert.alert(null, 'Link de transmissão invalido.'));
            }
          },
          1000
        );
      } else {
        setTimeout(() => {
            Alert.alert(null, response.data.message);
          },
          800
        );
      }

    } catch (error) {
      Alert.alert(null, 'Transmissão não disponível no momento.');
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoadingStreaming(false);
  }

  function _screen() {
    const screen = [
      {
        navigation: 'Info',
        image: require('~/assets/icons/info.png'),
        name: 'INFORMAÇÕES',
        item: item,
        permission: app_functions.info,
        //permission: true,
        type: null,
      },
      {
        navigation: 'UsefulInfo',
        image: require('~/assets/icons/info.png'),
        name: 'INFORMAÇÕES ÚTEIS',
        item: item,
        permission: app_functions.useful_info,
        //permission: true,
        type: null,
      },
      {
        navigation: 'ScheduleEvent',
        image: require('~/assets/icons/calendar.png'),
        name: 'PROGRAMAÇÃO',
        item: item,
        permission: app_functions.schedule,
        //permission: true,
        type: 'schedule',
      },
      {
        navigation: '',
        image: require('~/assets/icons/ticket.png'),
        name: 'INGRESSO',
        item: item,
        permission: app_functions ? app_functions.voucher : false,
        //permission: true,
        type: 'voucher',
      },
      {
        navigation: 'FlightEvent',
        image: require('~/assets/icons/passport.png'),
        name: 'PASSAGEM/HOSPEDAGEM',
        item: item,
        permission: app_functions ? app_functions.flight : false,
        //permission: true,
        type: null,
      },
      {
        navigation: 'Transfer',
        image: require('~/assets/icons/bus.png'),
        name: 'TRANSFER',
        item: item,
        permission: app_functions ? app_functions.transfer : false,
        //permission: true,
        type: null,
      },

      {
        navigation: 'Cupom',
        image: require('~/assets/icons/coupom.png'),
        name: 'MEUS CUPONS',
        item: item,
        permission: app_functions ? app_functions.games : false,
        //permission: true,
        type: null,
      },
      {
        navigation: 'Streaming',
        image: require('~/assets/icons/transmision.png'),
        name: 'TRANSMISSÃO',
        item: item,
        permission: app_functions ? app_functions.transmission : false,
        //permission: true,
        type: 'streaming',
      },
      {
        navigation: 'PrizeEvent',
        image: require('~/assets/icons/medal.png'),
        name: 'PRÊMIOS',
        item: item,
        permission: app_functions ? app_functions.prizes : false,
        //permission: true,
        type: null,
      },
      {
        navigation: 'Certificate',
        image: require('~/assets/icons/certificate.png'),
        name: 'CERTIFICADO',
        item: item,
        permission: app_functions ? app_functions.certificate : false,
        type: 'certificates',
      },
      {
        navigation: 'Faq',
        image: require('~/assets/icons/faq.png'),
        name: 'DUVIDAS',
        item: item,
        permission: app_functions ? app_functions.faq : false,
        //permission: true,
        type: null,
      },
      {
        navigation: 'EventRegulation',
        image: require('~/assets/icons/clipboard.png'),
        name: 'REGULAMENTO',
        item: item,
        permission: app_functions ? app_functions.regulation : false,
        //permission: true,
        type: null,
      },
      {
        navigation: 'Gallery',
        image: require('~/assets/icons/gallery.png'),
        name: 'GALERIA',
        item: item,
        permission: app_functions ? app_functions.gallery : false,
        //permission: true,
        type: null,
      },
      {
        navigation: 'NewsEvent',
        image: require('~/assets/icons/newspaper.png'),
        name: 'NOTÍCIAS',
        item: item,
        permission: app_functions ? app_functions.news : false,
        //permission: true,
        type: null,
      },
      {
        navigation: 'PrizeAll',
        image: require('~/assets/icons/first.png'),
        name: 'MEUS PRÊMIOS',
        item: item,
        permission: app_functions ? app_functions.prizeall : false,
        //permission: true,
        type: null,
      },
      {
        navigation: 'FriendsEvent',
        image: require('~/assets/icons/users.png'),
        name: 'MEUS AMIGOS',
        item: item,
        permission: app_functions ? app_functions.friends : false,
        //permission: true,
        type: null,
      },
      {
        navigation: 'EventGuia',
        image: require('~/assets/icons/book.png'),
        name: 'GUIA DO PARTICIPANTE',
        item: item,
        permission: app_functions ? app_functions.guia : false,
        //permission: true,
        type: null,
      },
      {
        navigation: 'EventMaterial',
        image: require('~/assets/icons/books.png'),
        name: 'MATERIAL DIDÁTICO',
        item: item,
        permission: app_functions ? app_functions.material : false,
        //permission: true,
        type: null,
      },
      {
        navigation: 'Donation',
        image: require('~/assets/icons/movimento.png'),
        name: 'MOVIMENTO SOLIDÁRIO',
        item: item,
        permission: app_functions ? app_functions.donation : false,
        //permission: true,
        type: null,
      },
      {
        navigation: 'Games',
        image: require('~/assets/icons/games.png'),
        name: 'GAMES',
        item: item,
        permission: app_functions ? app_functions.games_toten : false,
        //permission: true,
        type: 'games',
      },
    ];

    const filtered = screen.filter(value => value.permission === true);
    setFunctions(filtered);
  }

  async function _getItem() {
    try {
      if (eventitem) {
        setItem(eventitem);
        //alert(JSON.stringify(eventitem.prizes));

        await dispatch({
          type: 'EVENTITEM',
          payload: eventitem,
        });

        if (__DEV__) {
          console.tron.log('Evento');
          console.tron.log(eventitem);
        }
        if (eventitem.vouchers) {
          await dispatch({
            type: 'VOUCHER',
            payload: eventitem.vouchers,
          });
        }

        if (eventitem.schedule) {
          await dispatch({
            type: 'SCHEDULE',
            payload: eventitem.schedule,
          });
        }

        if (eventitem.prizes) {
          await dispatch({
            type: 'PRIZE',
            payload: eventitem.prizes,
          });
        }

        if (eventitem.transfers) {
          await dispatch({
            type: 'TRANSFER',
            payload: eventitem.transfers,
          });
        }
      }
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  function _renderItem(item) {
    if (!item.permission) {
      return null;
    } else {
      return (
        <Link onPress={() => _handleItem(item)}>
          <Card>
            <Image
              source={item.image}
              style={{
                height: 50,
                width: 50,
              }}
              resizeMode="contain"
            />
            <TextDark style={{fontSize: 12}}>
              {item.name}
            </TextDark>
          </Card>
        </Link>
      );
    }
  }

  async function _scanner(value) {
    setLoading(true);
    try {
      let response = await api.post('/api/games/toten', {event_id: eventitem.id, code: value, user_id: user.id});

      if (__DEV__) {
        console.tron.log(response.data);
      }

      if (response.data.active) {
        props.navigation.navigate('Games', {item: response.data});
      } else {
        Alert.alert(null, response.data.msg);
      }

    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }

    setLoading(false);

    setModal(false);
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

        <FlatList
          contentContainerStyle={{paddingBottom: 75}}
          data={app_functions}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          //ListEmptyComponent={<EmptyList text="Nenhum voucher encontrado!" />}
          renderItem={({item}) => _renderItem(item)}
        />
      </ScrollView>

      <Spinner
        overlayColor={'rgba(0, 0, 0, 0.80)'}
        visible={loadingStreaming}
        textStyle={{color: '#fff'}}
        color={'#fff'}
        textContent={'Carregando...'}
      />

      <Modal isVisible={modal} style={{margin: 0}}>
        <QRCodeScanner
          onRead={e => _scanner(e.data)}
          showMarker={true}
          reactivate={false}
          bottomContent={
            <Btn onPress={() => setModal(!modal)}>
              <TextLight>CANCELAR</TextLight>
            </Btn>
          }
        />
      </Modal>
    </Content>
  );
}


//Cor icones #FF881F
