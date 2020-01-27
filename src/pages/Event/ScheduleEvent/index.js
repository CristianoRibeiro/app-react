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
  const [error, setError] = useState(false);

  useEffect(() => {
    if (__DEV__) {
      console.tron.log(eventitem.schedule);
    }
    //setSchedules(JSON.parse(eventitem.schedule));
  }, []);

  function _renderItem(item) {
    return (
      <Detail item={item}/>
    );
  }

  return (
    <Content>
      <FlatList
        contentContainerStyle={{paddingBottom: 15}}
        data={JSON.parse(eventitem.schedule)}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <EmptyList text="Em breve"/>
        }
        renderItem={({item}) => _renderItem(item)}
      />
    </Content>
  );
}
