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
import Detail from '~/pages/Campaigns/Recommendation/Detail';
import {Searchbar} from 'react-native-paper';
import Pagination from 'react-native-pagination';

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
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    //_getData();
  }, []);

  useEffect(() => {
    setUsers([]);
    setPage(0);
  }, [name]);


  function _reset() {
    setUsers([]);
    setPage(0);
  }

  function _pesquisar() {
    setUsers([]);
    setPage(0);
    setTimeout(() => {
        _getData();
      },
      900
    );
  }

  async function _getData() {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      // if (name) {
      //alert(JSON.stringify(page));
      let data = {
        "name": name,
        "page": 0,
      };

      const response = await api.post('/api/user/unassociated/paginate', data);

      if (__DEV__) {
        console.tron.log(response);
        console.tron.log(page);
      }

      //alert(response.data.data.length);
      if (response.data.data.length) {

        // if (page < response.data.last_page) {

        let list = [...response.data.data, ...users];

        list.sort(function (a, b) {
          return b.id - a.id;
        });

        //const novoArray = [...new Set(list)];
        setUsers(list);
      }
      //}
      // } else {
      //   setPage(0);
      // }
      // }

      if (__DEV__) {
        console.tron.log(users);
      }

    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    await setPage(page + 1);
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
      let indicate = await api.get('/api/indicate');

      await dispatch({type: 'INDICATED', payload: indicate.data});
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  function _renderItem(item) {
    return (<Detail item={item}/>);
  }

  function renderFooter() {
    if (!loading) return null;

    return (
      <View style={{paddingVertical: 5, alignItems: 'center', justifyContent: 'center'}}>
        {/*<TextDark>Caregando...</TextDark>*/}
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
          <Search style={{marginLeft: 5, backgroundColor: '#fff'}} onPress={() => _pesquisar()}>
            <MaterialIcons name="search" size={24} color={'#666'}/>
          </Search>
        </View>
      </Header>
    );
  }

  return (
    <Content>

      <View>
      <FlatList
        ListHeaderComponent={_renderHeader()}
        //style={{margimBottom: 50}}
        data={users}
        extraData={{
          data: users,
          // Realm mutates the array instead of returning a new copy,
          // thus for a FlatList to update, we can use a timestamp as
          // extraData prop
          timestamp: Date.now(),
        }}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList text="Nenhum usuário encontrado!"/>}
        renderItem={({item}) => _renderItem(item)}
        // refreshControl={
        //   <RefreshControl refreshing={loading} onRefresh={() => _reset()}/>
        // }
        // onEndReached={_getData}
        // onEndReachedThreshold={0.1}
        // initialNumToRender={20}
        // maxToRenderPerBatch={2}
        // ListFooterComponent={renderFooter}
        //initialNumToRender={20}
      />
      </View>

    </Content>
  );
}
