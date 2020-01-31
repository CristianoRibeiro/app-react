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
  Linking,
} from 'react-native';
import Modal from 'react-native-modal';
import {WebView} from 'react-native-webview';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import StarRating from 'react-native-star-rating';
import EmptyList from '~/components/EmptyList';
import Detail from '~/pages/Event/ScheduleEvent/Detail';

//Api
import api from '~/services/api';

//Styles
import {Container, Content} from '~/style';

import {
  EventDate,
  Card,
  Link,
  SubTitle,
  TextDark,
  TextLight,
  ButtonDark,
  Btn
} from './styles';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Main(props) {
  //const data = useSelector(state => state.schedule);
  const eventitem = useSelector(state => state.eventitem);
  const dispatch = useDispatch();

  //const [schedules, setSchedules] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEvaluation, setModalEvalution] = useState(false);
  const [startCount, setStarCount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [schedules, setSchedule] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (__DEV__) {
      console.tron.log(eventitem.schedule);
    }
    _getData();
    //setSchedules(JSON.parse(eventitem.schedule));
  }, []);

  function _renderItem(item) {
    return (
      <Detail item={item}/>
    );
  }

  async function _getData() {
    setLoading(true);
    try {
      let data = {
        event_id: eventitem.id,
      };

      let response = await api.post('/api/schedules', data);

      if (response.data){
        setSchedule(response.data);
      }


      if (__DEV__) {
        console.tron.log(response.data);
      }
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
      setSchedule([]);
    }
    setLoading(false);
  }

  return (
    <Content>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }
        contentContainerStyle={{paddingBottom: 15}}
        data={schedules}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <EmptyList text="Em breve"/>
        }
        renderItem={({item}) => _renderItem(item)}
      />
    </Content>
  );
}
