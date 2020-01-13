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
  TouchableOpacity, AsyncStorage,
} from 'react-native';
import {FAB} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';

import api from '~/services/api';

//Components
import ListItem from '~/components/ListItem';
import Avatar from '~/pages/Profile/Avatar';
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

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1d39cb',
  },
});

export default function Profile(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [birthdate, setBirthdate] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (user.birthdate) {
      const firstDate = parseISO(user.birthdate);
      const formattedDate = format(firstDate, 'dd/MM/YYY');
      setBirthdate(formattedDate);
    }
  }, []);

  const iconSize = 32;

  return (
    <Content
      source={require('~/assets/bg-login.jpg')}
      style={styles.container}
      resizeMode="cover">
      <ScrollView style={{flex: 1}} keyboardDismissMode="interactive">
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
            source={{uri: user.append_avatar}}
          />

          <TextDark style={{fontWeight: '700'}}>{user.name}</TextDark>

          <TextDark>Matrícula: {user.matricula}</TextDark>
          <TextDark>{user.apcef}</TextDark>
        </View>

        <Card style={{marginBottom: 90}}>
          <ListItem
            title="CPF"
            text={user.doc ? MaskService.toMask('cpf', user.doc) : ''}
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
            text={user.email}
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
            text={user.email_personal}
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
            text={user.phone ? MaskService.toMask('cel-phone', user.phone, {
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) ',
            }) : ''}
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
            text={user.address_state}
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
            text={user.shirt}
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
            text={user.facebook}
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
            text={user.instagram}
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
            text={user.whatsapp ? MaskService.toMask('cel-phone', user.whatsapp, {
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) ',
            }) : ''}
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
                  <TextDark>Somos futuro, somos <TextDark style={{fontWeight: '700'}}>{user.phrase}</TextDark></TextDark>
                    : <TextDark style={{fontWeight: '400'}}>Cadastre a sua frase e ganhe 2 cupons!</TextDark>}
                </View>
              </View>
            </View>
            : null}
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
