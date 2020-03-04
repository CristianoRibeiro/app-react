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
  Linking,
} from 'react-native';
import Modal from 'react-native-modal';
import {WebView} from 'react-native-webview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import EmptyList from '~/components/EmptyList';

import api from '~/services/api';

import {Container, Content, TextLight} from '~/style';

import {Title, Card, Link, ButtonDark} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.regulation);
  const dispatch = useDispatch();

  const [regulation, setRegulation] = useState(data ? data : []);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = await api.get('/api/certificates');
      await dispatch({type: 'CERTIFICATES', payload: response.data});
    } catch (error) {
      await dispatch({type: 'CERTIFICATES', payload: []});
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  function _openUrl() {
    const url = 'https://www.google.com';
    try {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url).catch(err =>
            console.error('An error occurred', err),
          );
        }
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <Content>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()}/>
        }>
        <FlatList
          style={{margimBottom: 50}}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View key={index}>
              <Link onPress={() => _openUrl()}>
                <Card>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons
                      style={{marginRight: 5}}
                      name="file-document-outline"
                      size={24}
                      color={'#999'}
                    />
                    <View style={{flex: 1}}>
                      <Title>{item.event.name}</Title>
                    </View>
                  </View>
                </Card>
              </Link>
            </View>
          )}
        />
      </ScrollView>
    </Content>
  );
}
