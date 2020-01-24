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
import ItemComentario from '~/pages/Rede/ItemComentario';
import Rede from '~/model/Rede';
import FitImage from "react-native-fit-image";
import ImagePicker from "react-native-image-crop-picker";

import api from '~/services/api';

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
import Comentario from "~/pages/Rede/Comentario";

export default function Main(props) {
  const user = useSelector(state => state.user);
  const data = useSelector(state => state.lottery);
  const dispatch = useDispatch();

  const [post, setPost] = useState([]);
  const [comentario, setComentario] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const [hideMenu, setHideMenu] = useState(false);
  const [postEvent, setPostEvent] = useState('');
  const [like, setLike] = useState(false);

  const [hideComment, setHideComment] = useState(null);
  const [hideComment2, setHideComment2] = useState(false);
  const [inputEditarPost, setInputEditarPost] = useState(props.item.texto);
  const [inputComent, setInputComent] = useState('');

  const [hideEditComment, setHideEditComment] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    //alert(JSON.stringify(props.userPost));
  }, []);

  async function _sendEditar() {

    try {

      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": props.userPost.cpf,
        //"idPost": props.post.id,
        "idComentario": props.item.id,
        "texto": inputEditarPost,
        "imagem": ""
      };

      let response = await api.post('http://rededoconhecimento-ws-hml.azurewebsites.net/api/rededoconhecimento/post/comentar', data);
      //alert(JSON.stringify(data));

      if (__DEV__) {
        console.tron.log(data);
      }
      if (__DEV__) {
        console.tron.log(response.data);
      }

    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    //setHideEditComment(true);
    props.getData();
  }

  async function _sendExcluir() {

    try {
      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": user.doc,
        "idComentario": props.item.id
      };

      let response = await api.post('https://rededoconhecimento-ws-hml.azurewebsites.net/api/rededoconhecimento/comentario/remover', data);
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
      'Deseja excluir este comentário?',
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

  async function _sendComent() {

    try {

      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": props.userPost.cpf,
        //"idPost": props.post.id,
        "idComentarioPai": props.item.id,
        "texto": inputComent
      };

      let response = await api.post('http://rededoconhecimento-ws-hml.azurewebsites.net/api/rededoconhecimento/post/comentar', data);
      //alert(JSON.stringify(data));

      if (__DEV__) {
        console.tron.log(data);
      }
      if (__DEV__) {
        console.tron.log(response.data);
      }

    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    //setHideEditComment(true);
    props.getData();
  }

  function _renderComentar() {

    return (
      <View style={{marginTop: 15, paddingHorizontal: 5, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <InputDark
            value={inputComent}
            multiline
            maxLength={255}
            onChangeText={setInputComent}
            placeholder="Comente"
          />
        </View>
        <View>
          <Send onPress={() => _sendComent()} style={{justifyContent: 'center', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="send"
              size={26}
              color={'#fff'}
            />
          </Send>
        </View>
      </View>
    );

  }

  function _renderComment(item) {
    return (
      <View>

        <View
          style={{
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

          <TouchableOpacity onPress={() => {setHideComment(props.item.id); setHideComment2(!hideComment2)}}
                            style={{flex: 1, justifyContent: 'center', marginLeft: 20}}>
            <TextDark style={{color: '#ff8f00'}}>Comentar</TextDark>
          </TouchableOpacity>
        </View>

        {hideComment === props.item.id && hideComment2 ?
          _renderComentar()
          : null}

        <View style={{borderWidth: 1, borderColor: '#cecece', marginTop: 5, borderRadius: 5, marginHorizontal: 5}}>
          <FlatList
            data={props.item.comentarioRespostas ? props.item.comentarioRespostas : []}
            //numColumns={4}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item, index) => <ItemComentario item={item.item} post={props.post} userPost={props.userPost}
                                                         getData={props.getData}/>}
          />
        </View>
      </View>
    );
  }


  function _renderEdit() {
    if (hideEditComment) {
      return (
        <View style={{marginTop: 2, marginBottom: 8, paddingHorizontal: 5}}>
          <TextDark>
            {props.item ? props.item.texto : null}
          </TextDark>
        </View>
      );
    } else {
      return (
        <View style={{marginTop: 15, paddingHorizontal: 5, flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <InputDark
              value={inputEditarPost}
              multiline
              maxLength={255}
              onChangeText={setInputEditarPost}
              placeholder="Editar postagem"
            />
          </View>

          <Send onPress={() => _sendEditar()} style={{justifyContent: 'center', alignItems: 'center'}}>
            <TextLight>Editar</TextLight>
          </Send>
        </View>
      );
    }
  }

  function _renderItem() {

    return (
      <View style={{marginHorizontal: 5, marginVertical: 5}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: props.item.imagemPerfil ? props.item.imagemPerfil : ''}}
            style={{
              height: 34,
              width: 34,
              borderRadius: 16,
            }}
            resizeMode="cover"
          />
          <Card style={{width: 100, flex: 1, padding: 2}}>
            <TextDark
              style={{fontSize: 18, textTransform: 'uppercase'}}>{props.item.nomeParticipante}</TextDark>
            <TextDark style={{fontSize: 11}}>{props.item.data}</TextDark>
          </Card>

          {props.userPost.nome === props.item.nomeParticipante ?
            <Menu
              visible={hideMenu}
              onDismiss={() => setHideMenu(false)}
              anchor={
                <TouchableOpacity onPress={() => setHideMenu(true)}>
                  <MaterialCommunityIcons
                    name="dots-horizontal"
                    size={26}
                    color={'#666'}
                  />
                </TouchableOpacity>
              }
            >

              <View>
                <Menu.Item onPress={() => {
                  setHideEditComment(!hideEditComment);
                  setHideMenu(!hideEditComment);
                  setInputEditarPost(props.item.texto);
                }} title="Editar"/>
                <Menu.Item onPress={() => {
                  _excluir();
                  setHideMenu(false);
                }} title="Excluir"/>
              </View>

            </Menu>
            : null}

        </View>

        {_renderEdit()}

        {props.item.imagem ?
          <FitImage source={{uri: props.item.imagem}} resizeMode="contain"/>
          : null}

        {_renderComment()}
      </View>

    );

  }

  return _renderItem();
}

