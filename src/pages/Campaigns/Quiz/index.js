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
import CountDown from 'react-native-countdown-component';
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
  CardImage,
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
  const [index, setIndex] = useState(0);
  const [date, setDate] = useState('');
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let response = await api.post('/api/quizzes');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      await dispatch({type: 'QUIZZES', payload: response.data});

      if (response.data.time) {
        // const firstDate = parseISO(response.data.time);
        // const formattedDate = format(firstDate, "dd/MM/YYY', às ' HH:mm'h'");
        setDate(response.data.time);
      }
      //setNotifications(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
      await dispatch({type: 'QUIZZES', payload: []});
    }
    setLoading(false);
  }

  async function _setData(item) {
    setReload(true);
    try {
      if (selected) {
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
          setCards(response.data.cards);
          if (index < data.quiz.length) {
            setIndex(index + 1);
          } else {
            _getData();
          }
          setSelected(null);
        }
      } else {
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
    if (data.quiz) {
      item = data.quiz[index];
      if (index < data.quiz.length) {
        return (
          <View>
            {/* <View style={{marginTop: 5}}>
              <CountDown
                until={item.remaining_time}
                //onFinish={() => Alert.alert(null, 'Tempo encerado!')}
                size={20}
                timeToShow={['H', 'M', 'S']}
                timeLabels={{d: '', h: '', m: '', s: ''}}
              />
            </View> */}

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
      } else {
        return <EmptyList text="Nenhum quiz encontrado!" />;
      }
    }
  }

  function _renderCard(item, i) {
    return (
      <CardImage style={{flex: 1}}>
        <Image
          style={{aspectRatio: 1}}
          source={{uri: item.image}}
          resizeMode="contain"
        />
      </CardImage>
    );
  }

  return (
    <Content>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()} />
        }>
        {date ? (
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
              <TextLight style={{fontSize: 15, fontWeight: '700'}}>
                {date}
              </TextLight>
            </View>
          </Header>
        ) : null}

        {_renderItem(data)}

        {cards.length ? (
          <>
            <CardImage style={{alignItems: 'center'}}>
              <TextDark style={{margin: 5}}>
                Você ganhou {cards.length} figurinhas.
              </TextDark>

              <Send onPress={() => props.navigation.navigate('Album')}>
                <TextLight>IR PARA ÁLBUM</TextLight>
              </Send>
            </CardImage>

            <FlatList
              data={cards}
              initialNumToRender={1}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
              //ListEmptyComponent={<EmptyList text="Nenhum álbum encontrado!" />}
              renderItem={({item, index}) => _renderCard(item, index)}
            />
          </>
        ) : null}
      </ScrollView>
    </Content>
  );
}
