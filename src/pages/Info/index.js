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
import {WebView} from 'react-native-webview';
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
  SubTitle,
} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.eventitem);
  const dispatch = useDispatch();

  const [info, setInfo] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (__DEV__) {
      console.tron.log(info);
    }
  }, []);

  return (
    <View style={{paddingBottom: 15, flex: 1}}>
      <WebView source={{html: info.append_info}} />
    </View>
  );
}
