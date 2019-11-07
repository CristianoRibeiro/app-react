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
import EmptyList from '~/components/EmptyList';

//Api
import api from '~/services/api';

//Styles
import {Container, Content} from '~/style';

import {
  UserTitle,
  Card,
  Link,
  CardImage,
  SubTitle,
  Send,
  TextLight,
  TextDark,
} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.users);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = await api.get('/api/user/unassociated');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      let indicate = await api.get('/api/indicate');
      //alert(JSON.stringify(response));
     
      await dispatch({type: 'INDICATED', payload: indicate.data});
      await dispatch({type: 'USERS', payload: response.data});
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  async function _setData(id) {
    try {
      let response = await api.post('/api/indicate', {user_id: id});
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      Alert.alert(null, response.data.message);
      _getData();
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  function _renderItem(item) {
    return (
      <Card>
        <CardImage>
          <Image
            source={{uri: item.append_avatar}}
            style={{
              height: 70,
              width: 70,
              borderRadius: 35,
            }}
            resizeMode="contain"
          />
        </CardImage>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <UserTitle>{item.name}</UserTitle>
          <SubTitle>{item.email}</SubTitle>
          <View style={{alignItems: 'flex-start'}}>
            <Send onPress={() => _setData(item.id)}>
              <TextDark style={{color: '#0058b8'}}>ADICIONAR</TextDark>
            </Send>
          </View>
        </View>
      </Card>
    );
  }

  return (
    <Content>
      <FlatList
        style={{margimBottom: 50}}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList text="Nenhum usuário encontrado!" />}
        renderItem={({item}) => _renderItem(item)}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }
      />
    </Content>
  );
}
