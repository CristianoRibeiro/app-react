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
} from 'react-native';
import EmptyList from '~/components/EmptyList';

import api from '~/services/api';

import {Container, Content} from '../../style';

import {
  EventTitle,
  EventDate,
  EventLink,
  Header,
  TextTitle,
  Card,
  Link,
  CardImage,
  Points,
  Info,
} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.prizes);
  const dispatch = useDispatch();

  const [prize, setPrize] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.tron.log(data);
  }, []);


  function _renderItem(item) {
    return (
      <Card>
       
        <Info style={{flex: 1}}>
          <EventTitle>{item.description}</EventTitle>
          <EventLink>{item.append_type}</EventLink>
        </Info>
      </Card>
    );
  }

  return (
    <Content>
      <FlatList
        style={{margimBottom: 50}}
        data={prize}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList text="Nenhum prêmio encontrado!" />}
        renderItem={({item}) => _renderItem(item)}
      />
    </Content>
  );
}
