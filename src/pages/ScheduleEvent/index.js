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
import { 
  parseISO, 
  format, 
  formatRelative, 
  formatDistance,
} from 'date-fns';
import EmptyList from '~/components/EmptyList';

//Api
import api from '~/services/api';

//Styles
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
  SubTitle
} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.schedule);
  const dispatch = useDispatch();

  const [schedules, setEvents] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (__DEV__) {
    console.tron.log(schedules);
    }
  }, []);


  function _renderItem(item) {
    const firstDate = parseISO(item.start);
    const formattedDate = format(
      firstDate, 
      "dd/MM/YYY', às ' HH:mm'h'"
    );
    return (
        <Card>
         
          <View style={{flex: 1, justifyContent: 'center'}}>
            <EventDate>{formattedDate}</EventDate>
            <SubTitle>{item.content}</SubTitle>
          </View>
        </Card>
    );
  }

  return (
    <Content>
      <FlatList
        style={{margimBottom: 50}}
        data={JSON.parse(schedules)}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList text="Nenhuma programaçã encontrada!" />}
        renderItem={({item}) => _renderItem(item)}
        
      />
    </Content>
  );
}
