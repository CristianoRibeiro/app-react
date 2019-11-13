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
      let response = await api.get('/api/regulations');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'REGULATION', payload: response.data});

      //setNotifications(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  function _openUrl(url) {
    if (url) {
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
    } else {
      setModal(true);
    }
  }

  return (
    <Content>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }>
        <FlatList
          style={{margimBottom: 50}}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View key={index}>
              <Link onPress={() => _openUrl(item.url)}>
                <Card>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons
                      style={{marginRight: 5}}
                      name="file-document-outline"
                      size={24}
                      color={'#999'}
                    />
                    <View style={{flex: 1}}>
                      <Title>{item.title}</Title>
                    </View>
                  </View>
                </Card>
              </Link>

              <Modal
                isVisible={modal}
                style={{marginTop: 50, backgroundColor: '#fff', margin: 0}}>
                <WebView
                  source={{html: item.append_regulation}}
                  onShouldStartLoadWithRequest={(event) => {
                    if (!/^[data:text, about:blank]/.test(event.url)) {
                      Linking.openURL(event.url);
                      return false;
                    }
                    return true;
                  }}
                />
                <ButtonDark
                  onPress={() => setModal(false)}
                  style={{marginBottom: 10, marginHorizontal: 15}}>
                  <TextLight>OK</TextLight>
                </ButtonDark>
              </Modal>
            </View>
          )}
        />
      </ScrollView>
    </Content>
  );
}
