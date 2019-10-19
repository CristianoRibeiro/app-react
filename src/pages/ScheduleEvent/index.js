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
  FlatList
} from 'react-native';
import EmptyList from '~/components/EmptyList';

import api from '~/services/api';

import {
  Container,
  Content,
  TextItem
} from '../../style';

import {EventTitle, EventDate, EventLink, Header, TextTitle, Card, Link, CardImage, Points, Info} from './styles';


export default function Main(props) {
  const data = useSelector(state => state.schedule);
  const dispatch = useDispatch();
  
  const [schedules, setSchedules] = useState(data);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.tron.log(data);
  }, []);


  function _renderItem(item) {
    return (
     
      <Card>
          <Card>
            <TextTitle>
              14h às 20h
            </TextTitle>
          </Card>
          <View style={{ flex: 3 }}>
            <EventTitle>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a</EventTitle>
            <EventLink>Retirado</EventLink>
          </View>
        </Card>
    );
  }

  return (
    <Content>

      <FlatList
        style={{margimBottom: 50}}
        data={schedules}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList text="Nenhuma programação encontrada!" />}
        renderItem={({item}) => _renderItem(item)}
        
      />
    </Content>
  );
}
