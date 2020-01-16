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
} from 'react-native';
import Voucher from '~/model/Voucher';

import api from '~/services/api';

import {Header, TextDark, Card, Link} from './styles';
import {Container, Content, Title} from '~/style';
import {Event} from '~/model/Event';

export default function Main(props) {
  const eventitem = useSelector(state => state.eventitem);
  const dispatch = useDispatch();

  const [item, setItem] = useState(Event);
  const [voucher, setVoucher] = useState([]);
  const [app_functions, setFunctions] = useState(
    eventitem.app_functions
      ? JSON.parse(eventitem.app_functions)
      : [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    //console.tron.log(eventitem);
    _getVoucher();
    _getItem();
    _screen();
  }, []);

  async function _getVoucher(){
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
    } else {
      props.navigation.navigate(item.navigation, {item: item.item});
    }
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
        type: 'voucher',
      },
      {
        navigation: 'FlightEvent',
        image: require('~/assets/icons/passport.png'),
        name: 'PASSAGEM/HOSPEDAGEM',
        item: item,
        permission: app_functions ? app_functions.flight : false,
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
        navigation: '',
        image: require('~/assets/icons/games.png'),
        name: 'EXTRATO',
        item: item,
        permission: app_functions ? app_functions.extract : false,
        type: null,
      },
      {
        navigation: 'Games',
        image: require('~/assets/icons/games.png'),
        name: 'MEUS CUPONS',
        item: item,
        permission: app_functions ? app_functions.games : false,
        //permission: true,
        type: null,
      },
      // {
      //   navigation: 'EventCupons',
      //   image: require('~/assets/icons/games.png'),
      //   name: 'MEUS CUPONS',
      //   item: item,
      //   //permission: app_functions ? app_functions.games,
      //   permission: true,
      //   type: null,
      // },
      {
        navigation: 'Streaming',
        image: require('~/assets/icons/transmision.png'),
        name: 'TRANSMISSÃO',
        item: item,
        permission: app_functions ? app_functions.transmission : false,
        type: null,
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
        type: null,
      },
      {
        navigation: 'Faq',
        image: require('~/assets/icons/faq.png'),
        name: 'DUVIDAS',
        item: item,
        permission: app_functions ? app_functions.faq : false,
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
        type: null,
      },
      {
        navigation: 'NewsEvent',
        image: require('~/assets/icons/newspaper.png'),
        name: 'NOTÍCIAS',
        item: item,
        permission: app_functions ? app_functions.news : false,
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
        navigation: 'Extract',
        image: require('~/assets/icons/books.png'),
        name: 'MOVIMENTO SOLIDÁRIO',
        item: item,
        //permission: app_functions ? app_functions.material : false,
        permission: true,
        type: null,
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
    </Content>
  );
}
