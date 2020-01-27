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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
  Input,
  Search,
} from './styles';

export default function Main(props) {
  //const data = useSelector(state => state.users);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [users, setUsers] = useState('');
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      let response = null;
      if (name) {
        let data = {
          "name": name,
          "page": page,
        };

        response = await api.post('/api/user/unassociated/', data);

        if (response.data.data.length) {
          setEnd(true);
          setUsers([...response.data.data, ...users]);
          setPage(page + 1);
        } else {
          setEnd(false);
        }
      }

      if (__DEV__) {
        console.tron.log(response.data);
      }

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
      let indicate = await api.get('/api/indicate');

      await dispatch({type: 'INDICATED', payload: indicate.data});
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

          {item.indicated ?
            <Send style={{backgroundColor: '#eee'}} onPress={() => _setData(item.id)}>
              <TextDark style={{color: '#0058b8', fontSize: 10}}>
                INDICAR
              </TextDark>
            </Send>
            :
            <Send disabled={true} onPress={() => _setData(item.id)}>
              <TextDark style={{color: '#bbb', fontSize: 10}}>
                INDICADO
              </TextDark>
            </Send>
          }

        </View>
      </Card>
    );
  }

  function renderFooter() {
    if (!end) return null;

    return (
      <View style={{paddingVertical: 5, alignItems: 'center', justifyContent: 'center'}}>
        <TextDark>Caregando...</TextDark>
      </View>
    );
  };

  function _renderHeader() {
    return (
      <Header style={{alignItems: 'center'}}>
        <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 5}}>
          <Input
            placeholder="Pesquisar"
            onChangeText={query => setName(query)}
            value={name}
          />
          <Search style={{marginLeft: 5, backgroundColor: '#fff'}} onPress={() => _getData()}>
            <MaterialIcons name="search" size={24} color={'#666'}/>
          </Search>
        </View>
      </Header>
    );
  }

  return (
    <Content>


      <FlatList
        ListHeaderComponent={_renderHeader()}
        style={{margimBottom: 50}}
        data={users}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList text="Nenhum usuário encontrado!"/>}
        renderItem={({item}) => _renderItem(item)}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()}/>
        }
        onEndReached={() => _getData()}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
        initialNumToRender={20}
      />
    </Content>
  );
}
