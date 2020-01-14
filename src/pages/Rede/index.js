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
  FlatList,
  RefreshControl,
  Alert,
  Linking
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import EmptyList from '~/components/EmptyList';

import api from '~/services/api';

import {Container, Content} from '~/style';

import {
  Title,
  Btn,
  Select,
  Header,
  TextTitle,
  Card,
  Link,
  TextDark,
  ItemQuestion,
  Input,
  Submit,
  Send,
  TextLight,
} from './styles';
import FitImage from "react-native-fit-image";

export default function Main(props) {
  const user = useSelector(state => state.user);
  const data = useSelector(state => state.lottery);
  const dispatch = useDispatch();

  const [post, setPost] = useState('');
  const [postEvent, setPostEvent] = useState('');
  const [type, setType] = useState(null);

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = await api.get('/api/lottery');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'LOTTERY', payload: response.data});

      //setNotifications(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  function _renderItem(item) {
    return (
      <Card>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 5
            }}>

            <Image
              source={{uri: user.append_avatar}}
              style={{
                height: 34,
                width: 34,
                borderRadius: 16,
              }}
              resizeMode="cover"
            />

            <View style={{flex: 1, marginHorizontal: 10}}>
              <TextDark style={{fontSize: 18}}>Nome</TextDark>
              <TextDark style={{fontSize: 11}}>10/01/2020</TextDark>
            </View>

          </View>
          <View style={{marginTop: 15}}>

            <TextDark>
              It is a long established fact that a reader will be distracted by the readable content of a page when
              looking at its layout.
            </TextDark>
          </View>

          <View style={{marginTop: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 1, margin: 5}}>
              <FitImage source={{uri: 'https://images.pexels.com/photos/1227520/pexels-photo-1227520.jpeg'}}
                        resizeMode="contain"/>
            </View>

            <View style={{flex: 1, margin: 5}}>

              <TextDark style={{marginBottom: 10, textTransform: 'uppercase'}}>Title</TextDark>

              <Link onPress={() => Linking.openURL('http://google.com')}>
                <TextDark style={{color: '#0D4274', fontSize: 16, fontWeight: '700'}}>
                  It is a long established fact that a reader will be distracted by the readable content of a page when
                  looking at its layout.

                </TextDark>
              </Link>
              <TextDark style={{fontWeight: '300'}}>138 minutos</TextDark>
              <View style={{marginVertical: 5, alignItems: 'flex-start'}}>
                <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={5}
                  selectedStar={(rating) => null}
                  starSize={15}
                  starStyle={{color: '#0D4274', margin: 3}}
                />
              </View>
              <Send style={{justifyContent: 'center'}}>
                <TextLight>Conhecer</TextLight>
              </Send>
            </View>
          </View>


          <View
            style={{
              width: 40,
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 5
            }}>

            <Btn>
              <AntDesign
                name="like2"
                size={26}
                color={'#666'}
              />
            </Btn>

            <TextDark style={{marginTop: -5}}>0</TextDark>

          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 5,
              marginTop: 15
            }}>

            <Image
              source={{uri: user.append_avatar}}
              style={{
                height: 34,
                width: 34,
                borderRadius: 16,
              }}
              resizeMode="cover"
            />

            <Input
              value={postEvent}
              error={error}
              multiline
              maxLength={255}
              onChangeText={setPostEvent}
              placeholder="Comente a postagem"
            />

            <Btn>
              <MaterialCommunityIcons
                name="image-plus"
                size={26}
                color={'#666'}
              />
            </Btn>

          </View>
          <Send style={{flex: 1, justifyContent: 'center'}}>
            <TextLight>Comentar</TextLight>
          </Send>
        </View>
      </Card>
    );
  }

  return (
    <Content>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()}/>
        }>
        <Header>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 5
            }}>

            <Image
              source={{uri: user.append_avatar}}
              style={{
                height: 34,
                width: 34,
                borderRadius: 16,
              }}
              resizeMode="cover"
            />

            <Input
              value={post}
              error={error}
              multiline
              maxLength={255}
              onChangeText={setPost}
              placeholder="O que você deseja compartilhar com a Rede"
            />

            <Btn>
              <MaterialCommunityIcons
                name="image-plus"
                size={26}
                color={'#666'}
              />
            </Btn>
          </View>

          <View style={{margin: 3}}>
            <View style={{
              flex: 1,
              backgroundColor: '#eee',
              borderRadius: 5,
              margin: 2,
              minHeight: 40,
              justifyContent: 'center',
              paddingHorizontal: 3
            }}>
              <Select
                placeholder={{
                  label: 'Publico',
                  value: 0,
                  color: '#9EA0A4',
                }}
                value={type}
                onValueChange={value => setType(value)}
                items={[
                  {label: 'Todos da rede (Público)', value: 0},
                  {label: 'Somente minhas conexões', value: 1},
                  {label: 'Conexões específicas', value: 2},
                ]}
              />
            </View>

            <View style={{flex: 1, margin: 2}}>
              <Send style={{flex: 1, justifyContent: 'center'}}>
                <TextLight>Publicar</TextLight>
              </Send>
            </View>
          </View>
        </Header>

        <FlatList
          style={{margimBottom: 50}}
          data={[{}]}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<EmptyList text="Nenhum sorteado encontrado!"/>}
          renderItem={(item, index) => _renderItem(item)}
        />
      </ScrollView>
    </Content>
  );
}
