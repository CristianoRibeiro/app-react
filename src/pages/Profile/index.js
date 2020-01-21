import React, {useState, useEffect, Component} from 'react';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  View,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity, AsyncStorage, RefreshControl,
} from 'react-native';
import {FAB} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//import ImagePicker from 'react-native-image-crop-picker';

import api from '~/services/api';

//Components
import ListItem from '~/components/ListItem';
import {useSelector, useDispatch} from 'react-redux';
import {
  Title,
  Form,
  Input,
  Submit,
  List,
  TextLight,
  Card,
  TextDark,
  Link,
  Send,
  SubTitle, TextError,
} from './styles';

import {Container, Content} from '../../style';
import {User} from '~/model/User';
import {MaskService} from "react-native-masked-text";
import OneSignal from "react-native-onesignal";

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#0D4274',
  },
});

export default function Profile(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  //const [user, setUser] = useState(data ? data : User);
  const [loading, setLoading] = useState(false);
  const [birthdate, setBirthdate] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user.birthdate) {
      const firstDate = parseISO(user.birthdate);
      const formattedDate = format(firstDate, 'dd/MM/YYY');
      setBirthdate(formattedDate);
    }
    //setUser(data);
    _onRefresh();
  }, []);

  async function _onRefresh() {
    setLoading(true);
    try {
      let response = await api.get('/api/auth/user');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'USER', payload: response.data});

      //setNotifications(response.data);
    } catch (error) {
      if (error.message === 'Request failed with status code 401' || error.message === 'Request failed with status code 500') {
        props.navigation.navigate('Login');
        AsyncStorage.removeItem(
          'token'
        );
        AsyncStorage.removeItem(
          'user'
        );
        AsyncStorage.removeItem(
          'event'
        );
      }
    }
    setLoading(false);
  }

  const iconSize = 32;

  function _cpf(value) {
    return user.doc ? MaskService.toMask('cpf', value) : '';
  }

  function _phone(value) {
    return user.phone ? MaskService.toMask('cel-phone', value, {
      maskType: 'BRL',
      withDDD: true,
      dddMask: '(99) ',
    }) : '';
  }

  return (
    <Content
      source={require('~/assets/bg-login.jpg')}
      style={styles.container}
      resizeMode="cover">
      <ScrollView refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => _onRefresh()}/>
      } style={{flex: 1}} keyboardDismissMode="interactive">
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
              width: 180,
              height: 180,
              borderRadius: 90,
              marginBottom: 15,
            }}
            defaultSource={require('~/assets/avatar/avatar.png')}
            source={user ? {uri: user.append_avatar} : null}
          />

          <TextDark style={{fontWeight: '700'}}>{user ? user.name : ''}</TextDark>

          <TextDark>Matrícula: {user ? user.matricula : ''}</TextDark>
          <TextDark>{user ? user.apcef : ''}</TextDark>
        </View>

        <Card style={{marginBottom: 90}}>
          <ListItem
            title="CPF"
            text={_cpf(user ? user.doc : '')}
            color="#444"
            icon={
              <MaterialCommunityIcons
                name="account-card-details-outline"
                size={iconSize}
                color={'#444'}
              />
            }
          />

          <ListItem
            title="E-mail"
            text={user ? user.email : ''}
            color="#444"
            icon={
              <MaterialCommunityIcons
                name="email-outline"
                size={iconSize}
                color={'#444'}
              />
            }
          />

          <ListItem
            title="E-mail pessoal"
            text={user ? user.email_personal : ''}
            color="#444"
            icon={
              <MaterialCommunityIcons
                name="email-outline"
                size={iconSize}
                color={'#444'}
              />
            }
          />

          <ListItem
            title="Telefone"
            text={_phone(user ? user.phone : '')}
            color="#444"
            icon={
              <MaterialCommunityIcons
                name="cellphone-android"
                size={iconSize}
                color={'#444'}
              />
            }
          />

          <ListItem
            title="UF"
            text={user ? user.address_state : ''}
            color="#444"
            icon={
              <MaterialCommunityIcons
                name="map"
                size={iconSize}
                color={'#444'}
              />
            }
          />

          <ListItem
            title="Data de nascimento"
            text={birthdate}
            color="#444"
            icon={
              <FontAwesome
                name="birthday-cake"
                size={iconSize}
                color={'#444'}
              />
            }
          />

          <ListItem
            title="Tamanho de camiseta"
            text={user ? user.shirt : ''}
            color="#444"
            icon={
              <FontAwesome5
                name="tshirt"
                size={24}
                color={'#444'}
              />
            }
          />


          <ListItem
            title="Facebook"
            text={user ? user.facebook : ''}
            color="#444"
            icon={
              <FontAwesome5
                name="facebook"
                size={iconSize}
                color={'#444'}
              />
            }
          />

          <ListItem
            title="Instagram"
            text={user ? user.instagram : ''}
            color="#444"
            icon={
              <FontAwesome5
                name="instagram"
                size={iconSize}
                color={'#444'}
              />
            }
          />

          <ListItem
            title="Whatsapp"
            text={_phone(user ? user.whatsapp : '')}
            color="#444"
            icon={
              <FontAwesome5
                name="whatsapp"
                size={iconSize}
                color={'#444'}
              />
            }
          />


          {user.registered_inspira ?
            <View style={{marginTop: 10}}>
              <TextDark style={{paddingLeft: 0, marginBottom: 5}}>Para uso exclusivo no Inspira 2020:</TextDark>
              <View style={{borderWidth: 1, borderColor: '#ccc', padding: 8, borderStyle: 'dashed'}}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  {user.phrase ?
                    <TextDark>Somos futuro, somos <TextDark
                      style={{fontWeight: '700'}}>{user ? user.phrase : ''}</TextDark></TextDark>
                    : <TextDark style={{fontWeight: '400'}}>Cadastre a sua frase e ganhe 2 cupons!</TextDark>}
                </View>
              </View>
            </View>
            : null}

          {/*<Send onPress={() => props.navigation.navigate('ProfileUpdate', {edit: true})} style={{marginTop: 15}}>*/}
          {/*  <TextLight>EDIDAR OS MEUS DADOS</TextLight>*/}
          {/*</Send>*/}
        </Card>


      </ScrollView>

      <FAB
        style={styles.fab}
        icon="edit"
        onPress={() => props.navigation.navigate('ProfileUpdate', {edit: true})}
      />
    </Content>
  );
}
