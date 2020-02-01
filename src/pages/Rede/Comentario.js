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
  TouchableOpacity
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import {Divider, Menu} from 'react-native-paper';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import EmptyList from '~/components/EmptyList';
import Rede from '~/model/Rede';
import FitImage from "react-native-fit-image";
import ImagePicker from "react-native-image-crop-picker";

import api from '~/services/api';
import apiRede from '~/services/apiRede';

import {Container, Content} from '~/style';

import {
  Title,
  Btn,
  Select,
  Header,
  TextTitle,
  Card,
  Cancel,
  TextDark,
  ItemQuestion,
  Input,
  InputDark,
  Send,
  TextLight,
} from './styles';
import Modal from "react-native-modal";

export default function Main(props) {
  const user = useSelector(state => state.user);
  const data = useSelector(state => state.lottery);
  const dispatch = useDispatch();

  const [post, setPost] = useState([]);
  const [comentario, setComentario] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const [subComment, setSubComment] = useState('');
  const [postEvent, setPostEvent] = useState('');
  const [like, setLike] = useState(false);

  const [inputDenuncia, setInputDenuncia] = useState('');
  const [inputEditarPost, setInputEditarPost] = useState('');

  const [hideComment, setHideComment] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    //alert(JSON.stringify(response));
    if (__DEV__) {
      console.tron.log(props.item);
    }
    try {

      setPost(props.post);
      setComentario(props.item);
      setInputEditarPost(props.item.texto);
      setUserPost(props.user ? props.user : []);
      setLike(props.item.curtiu);

    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }


  async function _like(idPost) {
    //alert(idPost);
    try {
      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": user.doc,
        "idPost": idPost,
      };

      let response = await apiRede.post('/api/rededoconhecimento/post/curtir', data);
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }

      _getData();
      setLike(response.data.curtiu);

    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    props.getData();
  }


  async function _sendExcluir() {

    try {
      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": user.doc,
        "idPost": post.id
      };

      let response = await apiRede.post('/api/rededoconhecimento/post/remover', data);
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }

    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    props.getData();
  }

  async function _excluir() {
    //alert(idPost);

    Alert.alert(
      null,
      'Deseja excluir este post?',
      [
        {
          text: 'Sim',
          onPress: () => _sendExcluir(),
          style: 'cancel',
        },
        {text: 'Não', onPress: () => null},
      ],
      {cancelable: false},
    );
  }

  async function _sendEditar() {

    try {

      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": user.doc,
        "idPost": post.id,
        "texto": inputEditarPost,
        "tipoPost": 1
      };

      let response = await apiRede.post('/api/rededoconhecimento/post/enviar', data);
      //alert(JSON.stringify(response));

      if (__DEV__) {
        console.tron.log(response.data);
      }
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    props.getData();
  }

  async function _sendComentario() {

    try {

      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": user.doc,
        "idPost": post.id,
        "texto": postEvent,
      };

      let response = await apiRede.post('/api/rededoconhecimento/post/comentar', data);
      //alert(JSON.stringify(response));

      if (__DEV__) {
        console.tron.log(response.data);
      }
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    props.getData();
  }

  function _renderItem() {

    return (
      <View style={{borderWidth: 1, borderColor: '#ddd'}}>
        <FlatList
          style={{margimBottom: 50}}
          data={[{}]}
          //numColumns={4}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item, index) =>
            <View style={{marginHorizontal: 15, marginVertical: 5}}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{uri: post.imagemPerfil ? post.imagemPerfil : ''}}
                  style={{
                    height: 34,
                    width: 34,
                    borderRadius: 16,
                  }}
                  resizeMode="cover"
                />
                <Card style={{width: 100, flex: 1, padding: 2}}>
                  <TextDark style={{fontSize: 18, textTransform: 'uppercase'}}>Nome</TextDark>
                  <TextDark style={{fontSize: 11}}>10/01/2020</TextDark>
                </Card>
              </View>
              <TextDark style={{fontSize: 14, fontWeight: '700'}}>
                It is a long established fact that a reader will be distracted by the readable content of a page
                when looking at its layout.
              </TextDark>

              <View
                style={{
                  width: 35,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>

                <TouchableOpacity style={{marginVertical: 5, marginRight: 10}}>
                  <AntDesign
                    name="like2"
                    size={26}
                    color={'#666'}
                  />
                </TouchableOpacity>

                <TextDark>0</TextDark>

              </View>

            </View>
          }
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5,
            marginTop: 15
          }}>

          <Image
            source={{uri: post.imagemPerfil ? post.imagemPerfil : ''}}
            style={{
              height: 34,
              width: 34,
              borderRadius: 16,
            }}
            resizeMode="cover"
          />

          <Input
            value={subComment}
            error={error}
            multiline
            maxLength={255}
            onChangeText={setSubComment}
            placeholder="Comente a postagem"
          />

          <TouchableOpacity style={{marginLeft: 5}}>
            <MaterialCommunityIcons
              name="send"
              size={26}
              color={'#666'}
            />
          </TouchableOpacity>


        </View>

      </View>
    );

  }

  return _renderItem();
}

