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
  const [units, setUnits] = useState([
    {code: 'R434DF3', name: 'Unidade 1', number: '346346346', score: 0.6},
    {code: 'EDS2WD5', name: 'Unidade 2', number: '937355895', score: 0.2},
    {code: 'TGF3S5Y', name: 'Unidade 3', number: '436488582', score: 1},
    {code: 'BYR35CD', name: 'Unidade 4', number: '224653773', score: 0.9},
  ]);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = null;
      if (name) {
        response = await api.get('/api/user/unassociated/' + name);
        setUnits(response.data);
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

  function _renderScore(item) {
    if (item.score === 1) {
      return (
        <View style={{flex: 1, alignItems: 'center', marginTop: 15}}>
          <Title>Número da sorte</Title>
          <SubTitle style={{fontWeight: '700'}}>{item.number}</SubTitle>
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
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <Title>Código</Title>
            <SubTitle style={{fontWeight: '700'}}>{item.code}</SubTitle>
          </View>

          <View style={{flex: 3}}>
            <Title>Nome</Title>
            <SubTitle style={{fontWeight: '700'}}>{item.name}</SubTitle>
          </View>
        </View>
        <View style={{flex: 1, marginTop: 10}}>
          <Progress.Bar
            progress={item.score}
            height={15}
            color={Colors.green600}
            width={null}
          />
        </View>
        {_renderScore(item)}
      </Card>
    );
  }

  return (
    <Content>
      <ScrollView>
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
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
          }
        />
      </ScrollView>
    </Content>
  );
}
