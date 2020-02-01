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
import StarRating from 'react-native-star-rating';
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
  BtnConfirm,
  BtnCancel,
  Btn,
  Input
} from './styles';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";

export default function Main(props) {
  //const data = useSelector(state => state.schedule);
  const eventitem = useSelector(state => state.eventitem);
  const dispatch = useDispatch();

  //const [schedules, setSchedules] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalEvaluation, setModalEvalution] = useState(false);
  const [startCount, setStarCount] = useState(props.item.avaliacao ? props.item.avaliacao : 0);
  const [modalQuestion, setModalQuestion] = useState(false);
  const [question, setQuestion] = useState('');
  const [statusEvalution, setEvalution] = useState(props.item.avaliado ? props.item.avaliado : 0);
  const [modalSpeaker, setModalSpeaker] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (__DEV__) {
      console.tron.log(props.item);
    }
    //setSchedules(JSON.parse(eventitem.schedule));
    //_getEvalution();
    setStarCount(props.item.avaliacao ? props.item.avaliacao : 0);
    setEvalution(props.item.avaliado ? props.item.avaliado : 0);
  }, [props.item]);

  useEffect(() => {
    if (__DEV__) {
      console.tron.log(props.item);
    }
  }, [statusEvalution, startCount]);

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

  async function _sendEvalution() {
    try {
      let data = {
        event_id: eventitem.id,
        title: props.item.title,
        speaker: props.item.speaker_item ? props.item.speaker_item.name : 0,
        rating: startCount,
      };

      let response = await api.post('/api/rating', data);
      //alert(JSON.stringify(response));
      setEvalution(true);
      if (__DEV__) {
        console.tron.log(response.data);
      }
      setTimeout(() => {
          Alert.alert(null, response.data.msg);
        },
        800
      );
      setModalEvalution(true);

    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setModalEvalution(false);
    //setStarCount(0);
  }

  async function _sendQuestion() {
    try {

      let data = {
        event_id: eventitem.id,
        title: props.item.title,
        speaker: props.item.speaker,
        message: question
      };

      let response = await api.post('/api/question', data);
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      setTimeout(() => {
          Alert.alert(null, response.data.msg);
        },
        800
      );

    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setQuestion('');
    setModalQuestion(false);
  }

  function _renderItem() {
    const time = props.item.start.substr(10, 6);
    let firstDate = props.item.start
      .substr(0, 10)
      .split('/')
      .reverse()
      .join('-');

    firstDate = parseISO(firstDate + time);
    const formattedDate = format(firstDate, "dd/MM/YYY', às 'HH:mm'h'");
    const html =
      '<!doctype html><html lang="pt-br"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></head><body>' +
      props.item.content +
      '</body></html>';

    return (
      <View>
        <Card>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>

            <View style={{flex: 1, justifyContent: 'center'}}>
              <EventDate>{formattedDate}</EventDate>

              <TextDark style={{fontSize: 22, marginBottom: 10}}>{props.item.title}</TextDark>
              <SubTitle style={{fontWeight: '700'}}>{props.item.speaker}</SubTitle>
            </View>

            <View style={{flexDirection: 'row', marginBottom: 10}}>


              <View style={{justifyContent: 'flex-end'}}>

                {props.item.content_status ?
                  <Btn onPress={() => _openUrl()}>
                    <MaterialCommunityIcons name="information-outline" size={24}
                                            color={'#fff'}/>
                  </Btn>
                  : null}

                {/*<TextDark>{startCount}</TextDark>*/}
                {props.item.rating ?
                  <Btn onPress={() => setModalEvalution(true)}>
                    <MaterialCommunityIcons name={startCount ? "star" : "star-outline"} size={24} color={'#fff'}/>
                  </Btn>
                  : null}

                {props.item.question ?
                  <Btn onPress={() => setModalQuestion(true)}>
                    <MaterialCommunityIcons name="comment-question-outline" size={24}
                                            color={props.color ? props.color : '#fff'}/>
                  </Btn>
                  : null}

                {props.item.speaker_item ?
                  <Btn onPress={() => setModalSpeaker(true)}>
                    <Entypo name="graduation-cap" size={24}
                            color={props.color ? props.color : '#fff'}/>
                  </Btn>
                  : null}
              </View>
            </View>
          </View>
        </Card>

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
          <BtnConfirm
            onPress={() => setModal(false)}
            style={{marginBottom: 10, marginHorizontal: 15}}>
            <TextLight>OK</TextLight>
          </BtnConfirm>
        </Modal>

        <Modal
          isVisible={modalEvaluation}
          style={{margin: 0}}>
          <View style={{backgroundColor: '#fff', paddingTop: 15}}>
            <TextDark style={{fontSize: 16, textAlign: 'center'}}>Palestrante</TextDark>
            <TextDark style={{
              fontSize: 18,
              textAlign: 'center',
              fontWeight: '700',
              marginBottom: 15,
              marginTop: 10
            }}>{props.item.speaker}</TextDark>
            <View style={{margin: 20}}>
              <StarRating
                disabled={statusEvalution}
                maxStars={5}
                rating={startCount}
                fullStarColor="#FFC400"
                emptyStarColor="#FFC400"
                selectedStar={(rating) => setStarCount(rating)}
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <BtnConfirm
                  onPress={() => _sendEvalution()}
                  style={{marginBottom: 10, marginHorizontal: 15}}>
                  <TextLight>OK</TextLight>
                </BtnConfirm>
              </View>
              <View style={{flex: 1}}>
                <BtnCancel
                  onPress={() => {
                    setModalEvalution(false);
                  }}
                  style={{marginBottom: 10, marginHorizontal: 15}}>
                  <TextDark>CANCELAR</TextDark>
                </BtnCancel>
              </View>
            </View>
          </View>

        </Modal>

        <Modal
          isVisible={modalQuestion}
          style={{margin: 0}}>
          <View style={{backgroundColor: '#fff', paddingVertical: 10}}>
            <View style={{margin: 15}}>
              <Input
                multiline
                numberOfLines={4}
                value={question}
                maxLength={255}
                onChangeText={setQuestion}
                label="Digite a sua pergunta"
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <BtnConfirm
                  disabled={question ? false : true}
                  onPress={() => _sendQuestion()}
                  style={{marginBottom: 10, marginHorizontal: 15}}>
                  <TextLight>OK</TextLight>
                </BtnConfirm>
              </View>
              <View style={{flex: 1}}>
                <BtnCancel
                  onPress={() => {
                    setQuestion('');
                    setModalQuestion(false);
                  }}
                  style={{marginBottom: 10, marginHorizontal: 15}}>
                  <TextDark>CANCELAR</TextDark>
                </BtnCancel>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={modalSpeaker}
          style={{backgroundColor: '#fff', margin: 0}}>
          {props.item.speaker_item ?
            <ScrollView>
              <View style={{backgroundColor: '#fff', paddingVertical: 10, flex: 1}}>
                <View style={{margin: 15, alignItems: 'center'}}>
                  <TextDark style={{marginVertical: 20, fontSize: 20}}>{props.item.speaker_item.name}</TextDark>

                  <Image
                    source={{uri: props.item.speaker_item.image}}
                    style={{
                      height: 150,
                      width: 150,
                      borderRadius: 75,
                      marginTop: 20
                    }}
                    resizeMode="cover"
                  />

                  <TextDark style={{marginTop: 20}}>{props.item.speaker_item.body}</TextDark>
                </View>

              </View>
            </ScrollView>
            : null}

          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <BtnCancel
                onPress={() => {
                  setModalSpeaker(false);
                }}
                style={{marginBottom: 10, marginHorizontal: 15}}>
                <TextDark>OK</TextDark>
              </BtnCancel>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return _renderItem();
}
