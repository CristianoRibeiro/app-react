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
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import EmptyList from '~/components/EmptyList';

//Api
import api from '~/services/api';

//Styles
import {Container, Content} from '~/style';

import {
  EventTitle,
  EventDate,
  EventLink,
  Header,
  TextTitle,
  Card,
  Link,
  CardImage,
  SubTitle,
  TextDark,
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
    const time = item.start.substr(10, 6);
    let firstDate = item.start
      .substr(0, 10)
      .split('/')
      .reverse()
      .join('-');
    firstDate = parseISO(firstDate + time);
    const formattedDate = format(firstDate, "dd/MM/YYY', às ' HH:mm'h'");
    return (
      <Link onPress={() => props.navigation.navigate('ScheduleEventDetail', {item})}>
        <Card>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <EventDate>{formattedDate}</EventDate>
            <TextDark>{item.title}</TextDark>
            <SubTitle>{item.speaker}</SubTitle>
          </View>
        </Card>
      </Link>
    );
  }

  return (
    <Content>
      <FlatList
        style={{margimBottom: 50}}
        data={JSON.parse(schedules)}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList text="Nenhuma programação encontrada!" />}
        renderItem={({item}) => _renderItem(item)}
      />
    </Content>
  );
}
