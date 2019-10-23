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
import {ActivityIndicator, Colors} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import EmptyList from '~/components/EmptyList';

import api from '~/services/api';

import {Container, Content} from '../../../style';

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
  const data = useSelector(state => state.quizzes);
  const dispatch = useDispatch();

  const [quizzes, setQuizzes] = useState(data ? data : []);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [selected, setSelected] = useState();
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    
    try {
      let response = await api.post('/api/quizzes');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'QUIZZES', payload: response.data});

      if (response.data.time) {
        const firstDate = parseISO(response.data.time);
        const formattedDate = format(firstDate, "dd/MM/YYY', às ' HH:mm'h'");
        setDate(formattedDate);
      }
      //setNotifications(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    
  }

  async function _setData(item) {
    setReload(true);
    try {
      if(selected){
        let response = await api.post('/api/quizzes/answer', {
          quiz_id: item.id,
          correct: selected,
        });
        //alert(JSON.stringify(response));
        if (__DEV__) {
          console.tron.log(response.data);
        }
  
        Alert.alert(null, response.data.message);
  
        if (response.data.success) {
          await dispatch({type: 'QUIZZES', payload: []});
          //setDate('');
        }
      }
      else{
        Alert.alert(null, 'Selecione uma resposta!');
      }
      //setNotifications(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setReload(false);
  }

  function _renderItem(item) {
    return (
      <View>
        <Title>{item.name}</Title>

        <View style={{margin: 6}}>
          <FlatList
            style={{margimBottom: 50}}
            data={JSON.parse(item.content)}
            keyExtractor={(q, index) => index.toString()}
            renderItem={(q, index) => (
              <View key={index}>
                <ItemQuestion
                  onPress={() => setSelected(q.index + 1)}
                  style={{
                    backgroundColor:
                      selected === q.index + 1
                        ? '#0058b8'
                        : 'rgba(255,255,255, 0.6)',
                  }}>
                  <TextDark
                    style={{
                      color: selected === q.index + 1 ? '#fff' : '#0058b8',
                    }}>
                    {q.item}
                  </TextDark>
                </ItemQuestion>
              </View>
            )}
          />
        </View>

        {!reload ? (
          <Send onPress={() => _setData(item)}>
            <TextLight>RESPONDER</TextLight>
          </Send>
        ) : (
          <ActivityIndicator
            animating={true}
            size="large"
            color={Colors.white}
          />
        )}
      </View>
    );
  }

  return (
    <Content>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }>
        <Header>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo name="stopwatch" size={20} color={'#fff'} />

            <TextLight>próximo quiz</TextLight>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextLight style={{fontSize: 22, fontWeight: '800'}}>
              {date}
            </TextLight>
          </View>
        </Header>

        <FlatList
          style={{margimBottom: 50}}
          data={data.quiz}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<EmptyList text="Nenhum quiz encontrado!" />}
          renderItem={({item, index}) => _renderItem(item)}
        />
      </ScrollView>
    </Content>
  );
}
