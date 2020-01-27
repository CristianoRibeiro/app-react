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
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(0);
  const [error, setError] = useState(false);


  useEffect(() => {
    setUsers([]);
    setPage(0);
  }, [name]);

  // async function _search() {
  //   //setName('');
  //   await setUsers([]);
  //   setUsers([]);
  //   setPage(0);
  //   setTimeout(() => {
  //       _getData();
  //     },
  //     900
  //   );
  //
  // }


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

  return (
    <Card>
      <CardImage>
        <Image
          source={{uri: props.item.append_avatar}}
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
          <UserTitle style={{marginRight: 5}}>{props.item.name}</UserTitle>
          <SubTitle style={{fontWeight: '700'}}>
            {props.item.address_state}
          </SubTitle>
        </View>

          {props.item.indicated ?
            <Send style={{width: 90}} disabled={true} onPress={() => _setData(props.item.id)}>
              <TextDark style={{color: '#bbb', fontSize: 10}}>
                INDICADO
              </TextDark>
            </Send>
            :
            <Send style={{backgroundColor: '#eee', width: 90}} onPress={() => _setData(props.item.id)}>
              <TextDark style={{color: '#0058b8', fontSize: 10}}>
                INDICAR
              </TextDark>
            </Send>
          }

      </View>
    </Card>
  );
}
