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
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import EmptyList from '~/components/EmptyList';

import api from '~/services/api';

import {Container, Content} from '../../../../style';

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
  Send,
  TextLight,
} from './styles';

export default function Main(props) {
  const dispatch = useDispatch();

  const [cupons, setCupons] = useState( []);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    let response = await api.get('/api/campaign/women/coupons');
    setCupons(response.data);
  }

  return (
    <Content>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }>
        <Header>
          <TextLight style={{textAlign: 'center'}}>Confira abaixo seus cupons ganhos na campanha:</TextLight>
        </Header>

        <Card>
          <FlatList
            style={{margimBottom: 50}}
            data={cupons}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item, index) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 8,
                }}>
                <TextDark>{item.item.type}</TextDark>

                <TextDark style={{fontWeight: '800', color: '#f7893e'}}>
                  {item.item.coupons}
                </TextDark>
              </View>
            )}
          />
        </Card>
      </ScrollView>
    </Content>
  );
}
