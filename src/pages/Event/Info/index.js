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
  Linking
} from 'react-native';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import {WebView} from 'react-native-webview';
import EmptyList from '~/components/EmptyList';

//Api
import api from '~/services/api';

//Styles
import {Container, Content, TextDark} from '../../../style';

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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

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
      {info.append_info ?
      <WebView source={{html: info.append_info}}
      onShouldStartLoadWithRequest={(event) => {
        if (!/^[data:text, about:blank]/.test(event.url)) {
          Linking.openURL(event.url);
          return false;
        }
        return true;
      }}/>
      : <View style={{margin: 5, padding: 20}}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <MaterialCommunityIcons name="alert-circle-outline" size={50} color={props.color ? props.color : '#444'}/>
            <TextDark style={{marginTop: 15}}>
              Nenhuma informação encontrada!
            </TextDark>
          </View>

        </View>}
    </View>
  );
}
