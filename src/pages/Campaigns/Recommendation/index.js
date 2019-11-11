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
import {Searchbar} from 'react-native-paper';

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
  Header,
} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.users);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [users, setUsers] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      if(name){
        let response = await api.get('/api/user/unassociated/' + name);
        setUsers(response.data);
      }
      
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      //let indicate = await api.get('/api/indicate');
      //alert(JSON.stringify(response));

      //await dispatch({type: 'INDICATED', payload: indicate.data});
      //await dispatch({type: 'USERS', payload: response.data});
      
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
              height: 60,
              width: 60,
              borderRadius: 30,
            }}
            resizeMode="contain"
          />
        </CardImage>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <UserTitle style={{marginRight: 5}}>{item.name}</UserTitle>
            <SubTitle style={{fontWeight: '700'}}>
              {item.address_state}
            </SubTitle>
          </View>

          <Send onPress={() => _setData(item.id)}>
            <TextDark style={{color: '#0058b8', fontSize: 10}}>
              INDICAR
            </TextDark>
          </Send>
        </View>
      </Card>
    );
  }

  return (
    <Content>
      <ScrollView>
        <Header style={{alignItems: 'center'}}>
          <Searchbar
            style={{marginHorizontal: 5}}
            placeholder="Pesquisar"
            onIconPress={() => _getData()}
            onChangeText={query => setName(query)}
            value={name}
          />
        </Header>

        <FlatList
          style={{margimBottom: 50}}
          data={users}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<EmptyList text="Nenhum usuário encontrado!" />}
          renderItem={({item}) => _renderItem(item)}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
          }
        />
      </ScrollView>
    </Content>
  );
}
