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

import api from '~/services/api';

import {Header, TextDark, Card, Link} from './styles';
import {Container, Content, Title} from '~/style';
import {Event} from '~/model/Event';

export default function Main(props) {
  const eventitem = useSelector(state => state.eventitem);
  const dispatch = useDispatch();

  const [item, setItem] = useState(Event);
  const [voucher, setVoucher] = useState([]);
  const [app_functions, setFunctions] = useState(props.navigation.state.params.item.app_functions ? JSON.parse(props.navigation.state.params.item.app_functions) : []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    //console.tron.log(props.navigation.state.params.item);
    _getItem();
    _screen();
  }, []);

  function _screen(){
  
    const screen = [
      {
        navigation: 'Info',
        image: require('~/assets/icons/info.png'),
        name: 'INFORMAÇÕES',
        item: item,
        permission: app_functions.info,
        type: null,
      },
      {
        navigation: 'ScheduleEvent',
        image: require('~/assets/icons/calendar.png'),
        name: 'PROGRAMAÇÃO',
        item: item,
        permission: app_functions.schedule,
        type: null,
      },
      {
        navigation: '',
        image: require('~/assets/icons/ticket.png'),
        name: 'INGRESSO',
        item: item,
        permission: app_functions.voucher,
        type: 'voucher',
      },
      {
        navigation: 'FlightEvent',
        image: require('~/assets/icons/passport.png'),
        name: 'PASSAGEM',
        item: item,
        permission: app_functions.flight,
        type: null,
      },
      {
        navigation: 'Transfer',
        image: require('~/assets/icons/bus.png'),
        name: 'TRANSFER',
        item: item,
        permission: app_functions.transfer,
        type: null,
      },
      {
        navigation: '',
        image: require('~/assets/icons/games.png'),
        name: 'EXTRATO',
        item: item,
        permission: app_functions.extract,
        type: null,
      },
      {
        navigation: 'Games',
        image: require('~/assets/icons/games.png'),
        name: 'GAMES',
        item: item,
        permission: app_functions.games,
        type: null,
      },
      {
        navigation: 'Streaming',
        image: require('~/assets/icons/transmision.png'),
        name: 'TRANSMISSÃO',
        item: item,
        permission: app_functions.transmission,
        type: null,
      },
      {
        navigation: 'PrizeEvent',
        image: require('~/assets/icons/medal.png'),
        name: 'PRÊMIOS',
        item: item,
        permission: app_functions.prizes,
        type: null,
      },
      {
        navigation: 'Certificate',
        image: require('~/assets/icons/certificate.png'),
        name: 'CERTIFICADO',
        item: item,
        permission: app_functions.certificate,
        type: null,
      },
      {
        navigation: 'Faq',
        image: require('~/assets/icons/faq.png'),
        name: 'DUVIDAS',
        item: item,
        permission: app_functions.faq,
        type: null,
      },
      {
        navigation: 'Gallery',
        image: require('~/assets/icons/gallery.png'),
        name: 'GALERIA',
        item: item,
        permission: app_functions.gallery,
        type: null,
      },
      {
        navigation: 'NewsEvent',
        image: require('~/assets/icons/newspaper.png'),
        name: 'NOTÍCIAS',
        item: item,
        permission: app_functions.news,
        type: null,
      },
    ];
    
    const filtered = screen.filter(value => value.permission === true);
    setFunctions(filtered);
  }

  async function _getItem() {
    try {
      if (props.navigation.state.params.item) {
        setItem(props.navigation.state.params.item);
        //alert(JSON.stringify(props.navigation.state.params.item.prizes));

        try {
          let response = await api.get(
            `/api/voucher/${props.navigation.state.params.item.id}`,
          );
          //alert(JSON.stringify(response));
          if (__DEV__) {
            console.tron.log(response.data);
          }
          await dispatch({type: 'VOUCHERITEM', payload: response.data});
          setVoucher(response.data);
        } catch (error) {
          if (__DEV__) {
            console.tron.log(error.message);
          }
        }

        if (__DEV__) {
          console.tron.log('Evento');
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

  async function _voucherItem() {
    //alert(JSON.stringify(voucher));
    if (voucher) {
      props.navigation.navigate('VoucherItem');
    } else {
      Alert.alert(null, 'Você não possui ingresso!');
    }
  }

  

  function _renderItem(item) {
    if (!item.permission) {
      return null;
    } else {
      return (
        <Link
          onPress={() =>
            item.type === 'voucher'
              ? _voucherItem()
              : props.navigation.navigate(item.navigation, {item: item.item})
          }>
          <Card>
            <Image
              source={item.image}
              style={{
                height: 50,
                width: 50,
              }}
              resizeMode="contain"
            />
            <TextDark>{item.name} </TextDark>
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
          style={{margimBottom: 75}}
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
