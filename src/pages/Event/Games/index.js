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
  RefreshControl,
  Alert,
  TouchableOpacity,
  Linking
} from 'react-native';
import {WebView} from 'react-native-webview';

import api from '~/services/api';

import {Container, Content, Send} from '~/style';

import {
  Title,
  NotificationDate,
  NotificationLink,
  Header,
  TextTitle,
  Card,
  Link,
  TextDark,
  ItemQuestion,
  NotificationText,
  Submit,
  TextLight, Btn,
} from './styles';

export default function Main(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (__DEV__) {
      console.tron.log(props.navigation.state.params.item);
    }
  }, []);

  return (
    <Content>
      <WebView
        source={{uri: props.navigation.state.params.item.url}}
        mediaPlaybackRequiresUserAction={false}
      />
    </Content>
  );
}
