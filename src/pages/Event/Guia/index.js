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
  const event = useSelector(state => state.eventitem);
  const dispatch = useDispatch();

  const [guia, setGuia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = await api.get('/api/guia/'+event.id);
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }

      setGuia(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  function _openUrl(url) {
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
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }>
        <FlatList
          style={{margimBottom: 50}}
          data={guia}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <EmptyList text="Em breve!" />
          }
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

            </View>
          )}
        />
      </ScrollView>
    </Content>
  );
}
