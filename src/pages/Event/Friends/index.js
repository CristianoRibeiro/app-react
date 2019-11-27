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
import {FAB} from 'react-native-paper';
import Modal from 'react-native-modal';
import QRCodeScanner from 'react-native-qrcode-scanner';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EmptyList from '~/components/EmptyList';
import {Searchbar} from 'react-native-paper';

//Api
import api from '~/services/api';

//Styles
import {Container, Content} from '~/style';

import {
  UserTitle,
  Card,
  Link,
  CardImage,
  SubTitle,
  Send,
  TextLight,
  TextDark,
  Header,
  Input,
  Search,
} from './styles';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF6666',
  },
});

export default function Main(props) {
  const event = useSelector(state => state.eventitem);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [friends, setFriends] = useState('');
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
    if (__DEV__) {
      console.tron.log(event);
      console.tron.log('event');
    }
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      const response = await api.post('/api/friends', {event_id: event.id});
        setFriends(response.data);
      

      if (__DEV__) {
        console.tron.log(response.data);
      }
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }


  async function _scanner(value){

    //alert(JSON.stringify(value.data));
    try {
      let response = await api.post('/api/set/friends', {code: value.data, event_id: event.id});
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      Alert.alert(null, response.data.message);
      _getData();
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setModal(false);
  }

  function _renderItem(item) {
    return (
      <Card>
        <CardImage>
          <Image
            source={{uri: item.friend.append_avatar}}
            style={{
              height: 60,
              width: 60,
              borderRadius: 30,
            }}
            resizeMode="contain"
          />
        </CardImage>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}>
            <UserTitle style={{marginRight: 5}}>{item.friend.name}</UserTitle>
            <SubTitle style={{fontWeight: '700'}}>
              {item.friend.address_state}
            </SubTitle>
          </View>
        </View>
      </Card>
    );
  }

  return (
    <Content>
      <FlatList
        style={{margimBottom: 50}}
        data={friends}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList text="Nenhum amigo encontrado!" />}
        renderItem={({item}) => _renderItem(item)}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }
      />

      <Modal style={{margin: 0}} isVisible={modal}>
        <View style={{flex: 1}}>
          <QRCodeScanner
            showMarker={true}
            checkAndroid6Permissions={true}
            onRead={value =>_scanner(value)}
            bottomContent={
              <Send onPress={() => setModal(false)}>
                <TextLight>OK</TextLight>
              </Send>
            }
          />
        </View>
      </Modal>

      <FAB
        style={styles.fab}
        icon={'add'}
        color="#fff"
        onPress={() => setModal(true)}
      />
    </Content>
  );
}
