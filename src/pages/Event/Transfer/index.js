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

import {Title, Card, Link, ButtonDark, Send} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.transfer);
  const event = useSelector(state => state.eventitem);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = await api.post('/api/events/transfers', {
        event_id: event.id,
      });
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'TRANSFER', payload: response.data});

      //setNotifications(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  function _openModal(item) {
    if (item.content) {
      setText(item.append_content);
      setModal(true);
    }
  }

  function _openUrl(item) {
    try {
      Linking.canOpenURL(item.append_url).then(supported => {
        if (supported) {
          Linking.openURL(item.append_url).catch(err =>
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
      <FlatList
        style={{margimBottom: 50}}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList text="Em breve" />}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }
        renderItem={({item, index}) => (
          <View key={index}>
            <View style={{flexDirection: 'row'}}>
              {item.pdf ? (
                <Send
                  onPress={() => _openUrl(item)}
                  style={{marginVertical: 1, padding: 0}}>
                  <MaterialCommunityIcons
                    name="file-download"
                    size={24}
                    color={'#fff'}
                  />
                </Send>
              ) : null}
              <Link
                style={{flex: 1, padding: 0}}
                onPress={() => _openModal(item)}>
                <Card style={{minHeight: 50, justifyContent: 'center'}}>
                  <Title>{item.title}</Title>
                </Card>
              </Link>
            </View>

            <Modal
              isVisible={modal}
              style={{marginTop: 50, backgroundColor: '#fff', margin: 0}}>
              <WebView
                source={{html: text}}
                onShouldStartLoadWithRequest={event => {
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
    </Content>
  );
}
