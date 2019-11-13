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
import EmptyList from '~/components/EmptyList';

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
} from './styles';

export default function Main(props) {
  const data = useSelector(state => state.schedule);
  const eventitem = useSelector(state => state.eventitem);
  const dispatch = useDispatch();

  const [schedules, setEvents] = useState(data);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (__DEV__) {
      console.tron.log(schedules);
    }
  }, []);

  function _openUrl() {
    if (eventitem.url_schedule) {
      try {
        Linking.canOpenURL(eventitem.url_schedule).then(supported => {
          if (supported) {
            Linking.openURL(eventitem.url_schedule).catch(err =>
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

  function _renderItem(item) {
    const time = item.start.substr(10, 6);
    let firstDate = item.start
      .substr(0, 10)
      .split('/')
      .reverse()
      .join('-');
    firstDate = parseISO(firstDate + time);
    const formattedDate = format(firstDate, "dd/MM/YYY', às ' HH:mm'h'");
    const html =
      '<!doctype html><html lang="pt-br"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></head><body>' +
      item.content +
      '</body></html>';

    return (
      <View>
        <Link onPress={() => _openUrl()}>
          <Card>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <EventDate>{formattedDate}</EventDate>
              <TextDark>{item.title}</TextDark>
              <SubTitle>{item.speaker}</SubTitle>
            </View>
          </Card>
        </Link>
        <Modal
          isVisible={modal}
          style={{marginTop: 50, backgroundColor: '#fff', margin: 0}}>
          <WebView
            source={{html: html}}
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
    );
  }

  return (
    <Content>
      <FlatList
        style={{margimBottom: 50}}
        data={JSON.parse(schedules)}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <EmptyList text="Nenhuma programação encontrada!" />
        }
        renderItem={({item}) => _renderItem(item)}
      />
    </Content>
  );
}
