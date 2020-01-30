import React, {useState, useEffect, Component} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Avatar, FAB} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import ImagePicker from 'react-native-image-crop-picker';
import EmptyList from '~/components/EmptyList';
import QRCode from 'react-native-qrcode-svg';

import api from '~/services/api';

//Components
import ListItem from '~/components/ListItem';

import {
  Title,
  Header,
  Form,
  Input,
  Submit,
  List,
  TextLight,
  Card,
  TextDark,
  Link,
  Send,
  SubTitle,
  TextDate
} from './styles';

import {Container, Content} from '../../style';
import {Voucher} from '~/model/Voucher';

export default function Profile(props) {
  const user = useSelector(state => state.user);
  const data = useSelector(state => state.voucheritem);
  //const dispatch = useDispatch();

  //const [data, setData] = useState(voucheritem ? voucheritem : Voucher);
  const [loading, setLoading] = useState(Voucher);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (__DEV__) {
      console.tron.log(data);
    }
  }, []);

  const iconSize = 32;

  function __renderItem(item)
  {
    return (
      <ListItem
        title="Check-in realizado"
        text={item.created_at}
        color="#444"
        icon={
          <MaterialCommunityIcons
            name="account-check"
            size={iconSize}
            color={'#444'}
          />
        }
      />
    );
  }

  function _render() {
    console.log(data.checkin);
    if(data.code){
      return (
        <Content source={require('~/assets/bg-login.jpg')} resizeMode="cover">
          <ScrollView style={{flex: 1}} keyboardDismissMode="interactive">
            <View style={{marginBottom: 75}}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    margin: 15,
                    justifyContent: 'center',
                  }}>
                  {/* <Link style={{width: 40, height: 40, alignItems: 'center'}}>
                <Ionicons name="ios-arrow-back" size={24} color={'#222'} />
              </Link> */}
                  <Image
                    resizeMode="cover"
                    style={{width: 40, height: 40, borderRadius: 20}}
                    defaultSource={require('~/assets/avatar/avatar.png')}
                    source={{
                      uri: data.event.banner,
                    }}
                  />

                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <TextDark style={{paddingLeft: 20}} numberOfLines={1}>{data.event.name}</TextDark>
                    <TextDate style={{textAlign: 'left', paddingLeft: 20}}>
                      {data.event.local}
                    </TextDate>
                  </View>
                </View>

                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    padding: 15,
                  }}>
                  <View style={{alignItems: 'flex-end', flex: 1, marginBottom: 20}}>
                    <Image
                      resizeMode="cover"
                      style={{width: 180, height: 180, borderRadius: 90}}
                      defaultSource={require('~/assets/avatar/avatar.png')}
                      source={{
                        uri: user.append_avatar,
                      }}
                    />
                  </View>

                  <TextDark style={{fontWeight: '700'}}>{data.name}</TextDark>

                  <TextDark>Matrícula: {user.matricula}</TextDark>
                </View>
              </View>

              <Card style={{alignItems: 'center'}}>
                <View style={{overflow: 'hidden'}}>
                  <QRCode
                    value={data.code}
                    size={200}
                    bgColor="#000"
                    fgColor="white"
                  />
                </View>
                <TextDark style={{color: '#666', fontWeight: '700'}}>{data.code}</TextDark>
              </Card>

              <Card>
                {data.event_id == 1 ? (
                  <ListItem
                    title="Kit"
                    text={data.kit ? 'Retirado' : 'Não retirado'}
                    color="#444"
                    icon={
                      <MaterialCommunityIcons
                        name="package"
                        size={iconSize}
                        color={'#444'}
                      />
                    }
                  />
                ) : null}

                <FlatList
                  style={{margimBottom: 50}}
                  data={data.checkin}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => __renderItem(item)}
                />
              </Card>

              <Card>
                <ListItem
                  title="CPF"
                  text={data.doc}
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
                  title="E-MAIL"
                  text={data.email}
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
                  title="TELEFONE"
                  text={data.phone}
                  color="#444"
                  icon={
                    <MaterialCommunityIcons
                      name="cellphone-android"
                      size={iconSize}
                      color={'#444'}
                    />
                  }
                />
              </Card>
            </View>
          </ScrollView>
        </Content>
      );
    }
    else{
      return(
        <Content>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <EmptyList text="Você não possui ingresso!" />
          </View>
        </Content>
      );
    }
  }

  return _render();
}
