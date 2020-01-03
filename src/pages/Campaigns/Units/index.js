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
import {Colors} from 'react-native-paper';
import * as Progress from 'react-native-progress';
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
  Title,
} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.units);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [units, setUnits] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = null;
      if (name) {
        response = await api.get('/api/unit/report/' + name);
        setUnits(response.data);

        if (__DEV__) {
          console.tron.log(response.data);
        }
      }

    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  function _renderScore(item) {
    if (item.score === 1) {
      return (
        <View style={{flex:4, marginHorizontal:2}}>
          <SubTitle>Número da sorte</SubTitle>
          <Title style={{fontWeight: '700'}}>{item.number}</Title>
        </View>
      );
    }
    return null;
  }

  function _renderItem(item) {
    return (
      <Card>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={{flex: 3, marginHorizontal:2}}>
            <SubTitle>Código</SubTitle>
            <Title style={{fontWeight: '700'}}>{item.id}</Title>
          </View>

          <View style={{flex: 8, marginHorizontal:2}}>
            <SubTitle>Nome</SubTitle>
            <Title style={{fontWeight: '700'}}>{item.name}</Title>
          </View>
          {_renderScore(item)}
        </View>
        <View style={{flex: 1, marginTop: 10}}>
          <Progress.Bar
            progress={item.score}
            height={15}
            color={Colors.green600}
            width={null}
          />
        </View>
      </Card>
    );
  }

  return (
    <Content>
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
      }>
        <Header style={{alignItems: 'center'}}>
          <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 5}}>
            <Input
              placeholder="Pesquisar"
              onChangeText={query => setName(query)}
              value={name}
            />
            <Search
              style={{marginLeft: 5, backgroundColor: '#fff'}}
              onPress={() => _getData()}>
              <MaterialIcons name="search" size={24} color={'#666'} />
            </Search>
          </View>
        </Header>

        <FlatList
          style={{margimBottom: 50}}
          data={units}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<EmptyList text="Pesquise a unidade desejada" />}
          renderItem={({item}) => _renderItem(item)}

        />
      </ScrollView>
    </Content>
  );
}
