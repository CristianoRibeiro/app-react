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
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import EmptyList from '~/components/EmptyList';

import api from '~/services/api';

import {Container, Content} from '../../../style';

import {
  Title,
  NotificationDate,
  NotificationLink,
  Header,
  TextTitle,
  Card,
  Link,
  TextDark,
  ItemQuestion,
  NotificationText,
  Submit,
  Send,
  TextLight,
} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.quizzes);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [quizzes, setQuizzes] = useState(data ? data : []);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    try {
      let response = await api.post('/api/quizzes');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'QUIZZES', payload: response.data});

      //setNotifications(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  async function _setData(item) {
    try {
      let response = await api.post('/api/quizzes/answer', {
        quiz_id: item.id,
        correct: selected,
      });
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }

      Alert.alert(null, response.data.message);

      if (response.data.success) {
        await dispatch({type: 'QUIZZES', payload: []});
        setDate('');
      }

      //setNotifications(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  function _renderItem(item) {
    return (
      <View>
        <Title>{item.name}</Title>

        <View style={{margin: 6}}>
          <FlatList
            style={{margimBottom: 50}}
            data={JSON.parse(item.content)}
            keyExtractor={(q, index) => index.toString()}
            renderItem={(q, index) => (
              <View key={index}>
                <ItemQuestion
                  onPress={() => setSelected(q.index + 1)}
                  style={{
                    backgroundColor:
                      selected === q.index + 1
                        ? '#0058b8'
                        : 'rgba(255,255,255, 0.6)',
                  }}>
                  <TextDark
                    style={{
                      color: selected === q.index + 1 ? '#fff' : '#0058b8',
                    }}>
                    {q.item}
                  </TextDark>
                </ItemQuestion>
              </View>
            )}
          />
        </View>

        <Send onPress={() => _setData(item)}>
          <TextLight>RESPONDER</TextLight>
        </Send>
      </View>
    );
  }

  return (
    <Content>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }>
        <Header style={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="ticket-outline"
              size={20}
              color={'#fff'}
            />

            <TextLight style={{fontSize: 18, fontWeight: '800'}}>
              Deu Match!
            </TextLight>
          </View>
          <TextLight>Vamos trocar?</TextLight>
        </Header>

        <Card>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                resizeMode="cover"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  margin: 15,
                }}
                defaultSource={require('~/assets/avatar/avatar.png')}
                source={{uri: user.avatar}}
              />

              <TextDark style={{fontWeight: '800', fontSize: 12}}>{user.name}</TextDark>
            </View>

            <Image
              source={require('~/assets/icons/ico_trocas.png')}
              style={{
                height: 40,
                width: 40,
              }}
              resizeMode="contain"
            />

            <View style={{alignItems: 'center'}}>
              <Image
                resizeMode="cover"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  margin: 15,
                }}
                defaultSource={require('~/assets/avatar/avatar.png')}
                source={{
                  uri: 'https://image.flaticon.com/icons/png/512/21/21294.png',
                }}
              />

              <TextDark style={{fontWeight: '800', fontSize: 12}}>Nome</TextDark>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: '#ddd',
              marginTop: 15,
            }}></View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 15,
            }}>
            <TextDark style={{textAlign: 'center'}}>
              Clique no ícone abaixo para adicionar as figurinhas que deseja
              trocar
            </TextDark>
          </View>
        </Card>

        <View style={{alignItems: 'center', marginTop: 25}}>
          <Submit>
            <MaterialIcons name="add" size={40} color={'#fff'} />
          </Submit>
        </View>
      </ScrollView>
    </Content>
  );
}
