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
import FitImage from "react-native-fit-image";
import ImagePicker from "react-native-image-crop-picker";
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import EmptyList from '~/components/EmptyList';
import Comentario from '~/pages/Rede/Comentario';
import PostComentario from '~/pages/Rede/PostComentario';
import Rede from '~/model/Rede';

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
import ItemComentario from "~/pages/Rede/ItemComentario";

export default function Main(props) {
  const user = useSelector(state => state.user);
  const data = useSelector(state => state.lottery);
  const dispatch = useDispatch();

  const [post, setPost] = useState(Rede);
  //const [userPost, setUserPost] = useState(props.user ? props.user : []);
  const [imagePost, setImagePost] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [postEvent, setPostEvent] = useState('');
  const [likeItem, setLikeItem] = useState(props.item.item.curtiu);
  const [likeNumber, setLikeNumber] = useState(props.item.item.curtidas);
  const [comentarios, setComentario] = useState(props.item.item.comentarios ? props.item.item.comentarios : []);

  const [inputDenuncia, setInputDenuncia] = useState('');
  const [inputEditarPost, setInputEditarPost] = useState(props.item.item.texto);

  const [hideEdit, setHideEdit] = useState(true);
  const [urlImages, setUrlImages] = useState(props.item.item.imagens ? props.item.item.imagens : []);
  const [hideMenu, setHideMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [error, setError] = useState(false);
  const [visible, setVisible] = useState(false);

  // useEffect(() => {
  //   //_getData();
  //
  //       setInputEditarPost(props.item.item.texto);
  //
  // }, [props.item.item]);


  async function _uploadImagePost() {
    const options = {
      title: 'Selecione de onde quer importar o arquivo',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Usar Camera',
      chooseFromLibraryButtonTitle: 'Carregar da galeria',
      multiple: true,
      mediaType: 'photo'
    };

    await ImagePicker.openPicker(options)
      .then(response => {
        let tempArray = [];

        response.forEach((item) => {
          let image = {
            uri: item.path,
            width: item.width,
            height: item.height,
            mime: item.mime,
            type: 'image/jpeg',
            name: item.path.substring(item.path.lastIndexOf('/') + 1),
          };

          tempArray.push(image)
          // console.log('savedimageuri====='+item.path);

        });
        setImagePost(tempArray);
        if (__DEV__) {
          console.tron.log(tempArray);
        }
      });
  }

  async function _uploadImageComment() {
    const options = {
      title: 'Selecione de onde quer importar o arquivo',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Usar Camera',
      chooseFromLibraryButtonTitle: 'Carregar da galeria',
      multiple: false,
      mediaType: 'photo',
      includeBase64: true
    };

    await ImagePicker.openPicker(options).then(async image => {
      //alert(JSON.stringify(image));
      let img = {
        uri: image.path,
        width: image.width,
        height: image.height,
        mime: image.mime,
        type: 'image/jpeg',
        name: image.path.substring(image.path.lastIndexOf('/') + 1),
      };

      setImagePost(img);
      setImageBase64('data:' + image.mime + ';base64, ' + image.data);
    });
  }

  async function _like(idPost) {
    //alert(idPost);
    try {
      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": user.doc,
        "idPost": idPost,
      };

      let response = await api.post('http://rededoconhecimento-ws-hml.azurewebsites.net/api/rededoconhecimento/post/curtir', data);
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }

      setLikeItem(response.data.curtiu);
      setLikeNumber(response.data.curtidas);

      //_getData();
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    //props.getData();
  }

  async function _denunciar() {
    //alert(idPost);
    setModal(false);
    try {
      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": user.doc,
        "idPost": props.item.item.id,
        "motivo": inputDenuncia
      };

      let response = await api.post('http://rededoconhecimento-ws-hml.azurewebsites.net/api/rededoconhecimento/post/denunciar', data);
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
      setInputDenuncia('');
      setModalAlert(true);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    //props.getData();
  }

  async function _sendExcluir() {
    try {
      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": user.doc,
        "idPost": props.item.item.id
      };

      let response = await api.post('http://rededoconhecimento-ws-hml.azurewebsites.net/api/rededoconhecimento/post/remover', data);
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
    //props.excluir(props.item.item);
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
        "idPost": props.item.item.id,
        "texto": inputEditarPost,
        "tipoPost": 1
      };

      let response = await api.post('http://rededoconhecimento-ws-hml.azurewebsites.net/api/rededoconhecimento/post/enviar', data);
      //alert(JSON.stringify(response));

      if (__DEV__) {
        console.tron.log(response.data);
      }
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setHideMenu(false);
    setHideEdit(true);
    props.getData();
  }

  async function _sendComentario() {

    try {

      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": user.doc,
        "idPost": props.item.item.id,
        "texto": postEvent,
        "imagem": imageBase64
      };

      let response = await api.post('http://rededoconhecimento-ws-hml.azurewebsites.net/api/rededoconhecimento/post/comentar', data);

      if (__DEV__) {
        console.tron.log(response.data);
      }

      let item = {
        "id": response.data.idComentario,
        "texto": postEvent,
        "imagem": imagePost,
        "imagemPerfil": props.user.urlFoto,
        "nomeParticipante": props.user.nome,
        "data": response.data.data,
        "curtiu": false,
        "curtidas": 0,
        "comentarioRespostas": null
      };

      setComentario([item, ...comentarios]);

      setImagePost(null);
      setPostEvent(null);

    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
      Alert.alert(null, 'Erro ao realizar comentário.');
    }
    setHideEdit(true);
    //props.getData();
  }

  function _renderEdit() {
    if (hideEdit) {
      return (
        <View style={{marginTop: 10, marginBottom: 5, paddingHorizontal: 5}}>
          <TextDark>
            {inputEditarPost}
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

  async function _removeComentario(item) {


    try {
      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": user.doc,
        "idComentario": item.id
      };

      let response = await api.post('https://rededoconhecimento-ws-hml.azurewebsites.net/api/rededoconhecimento/comentario/remover', data);
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }

      let list = comentarios;
      let newValues = new Array();

      let i = 0;
      list.forEach((element, index) => {
        if (item.id != element.id) {
          newValues[i] = element;
          i++;
        }
      });
      setComentario(newValues);

    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    //alert(JSON.stringify(item));

  }

  function _renderItem(item) {

    // if (visible) {

      return (
        <Card style={{marginTop: 15, marginRight: 3, marginLeft: 3}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 5,
                marginTop: 10
              }}>

              <Image
                source={{uri: props.item.item.imagemPerfil ? props.item.item.imagemPerfil : ''}}
                style={{
                  height: 34,
                  width: 34,
                  borderRadius: 16,
                }}
                resizeMode="cover"
              />

              <View style={{flex: 1, marginHorizontal: 10}}>
                <TextDark
                  style={{
                    fontSize: 18,
                    textTransform: 'uppercase'
                  }}>{props.item.item ? props.item.item.nomeParticipante : null}</TextDark>
                <TextDark style={{fontSize: 11}}>{props.item.item ? props.item.item.data : null}</TextDark>
              </View>

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

                {props.user.nome === props.item.item.nomeParticipante ?
                  <View>
                    <Menu.Item onPress={() => {
                      setHideEdit(!hideEdit);
                    }} title="Editar"/>
                    <Menu.Item onPress={() => {
                      _excluir();
                      setHideMenu(false);
                    }} title="Excluir"/>
                    <Menu.Item onPress={() => {
                      setModal(true);
                      setHideMenu(false);
                    }} title="Denunciar"/>
                  </View>
                  :
                  <Menu.Item onPress={() => {
                  }} title="Denunciar"/>
                }

              </Menu>
            </View>

            {_renderEdit()}

            {/*<TextDark>{JSON.stringify(props.user)}</TextDark>*/}

            <View style={{flex: 1, margin: 5}}>

              {urlImages.map((item, key) => (
                  <View style={{marginBottom: 3}} key={key}>
                    <FitImage source={{uri: item}}
                              resizeMode="contain"/>
                  </View>
                )
              )}

            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>

              <TouchableOpacity onPress={() => _like(props.item.item.id)}
                                style={{marginVertical: 5, marginRight: 10, marginLeft: 5}}>

                {likeItem ?
                  <AntDesign
                    name="like1"
                    size={26}
                    color={'#F36F21'}
                  />
                  : <AntDesign
                    name="like2"
                    size={26}
                    color={'#666'}
                  />}

              </TouchableOpacity>

              <TextDark>{likeNumber}</TextDark>

            </View>

            <View style={{margin: 8}}>
              <FlatList
                data={comentarios ? comentarios : []}
                //numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item, index) => <PostComentario item={item.item} post={props.item.item}
                                                             userPost={props.user} getData={props.getData}
                                                             removeComentario={_removeComentario}/>}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 5,
                marginTop: 15
              }}>

              <Image
                source={{uri: props.user.urlFoto ? props.user.urlFoto : ''}}
                style={{
                  height: 34,
                  width: 34,
                  borderRadius: 16,
                }}
                resizeMode="cover"
              />

              <Input
                value={postEvent}
                error={error}
                multiline
                maxLength={255}
                onChangeText={setPostEvent}
                placeholder="Comente a postagem"
              />

              <Btn onPress={() => _uploadImageComment()}>
                <MaterialCommunityIcons
                  name="image-plus"
                  size={26}
                  color={'#666'}
                />
              </Btn>

            </View>

            <View style={{backgroundColor: '#fff'}}>

              {imagePost ?
                <FitImage source={imagePost} resizeMode="contain"/>
                : null}
            </View>

            <Send disabled={postEvent ? false : true} onPress={() => _sendComentario()}
                  style={{flex: 1, justifyContent: 'center', marginVertical: 10}}>
              <TextLight>Comentar</TextLight>
            </Send>

            <Divider/>

          </View>

          <Modal
            isVisible={modal}
            style={{marginVertical: 50, backgroundColor: '#fff', margin: 0}}>

            <View style={{margin: 10}}>
              <TextDark style={{marginBottom: 8}}>Por quê você deseja denunciar esta publicação?</TextDark>
              <InputDark
                value={inputDenuncia}
                error={error}
                multiline
                maxLength={255}
                onChangeText={setInputDenuncia}
                placeholder=""
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <Cancel
                  onPress={() => setModal(false)}
                  style={{marginBottom: 10, marginHorizontal: 15}}>
                  <TextDark>CANCELAR</TextDark>
                </Cancel>
              </View>
              <View style={{flex: 1}}>
                <Send
                  disabled={inputDenuncia ? false : true}
                  onPress={() => _denunciar()}
                  style={{marginBottom: 10, marginHorizontal: 15}}>
                  <TextLight>DENUNCIAR</TextLight>
                </Send>
              </View>
            </View>
          </Modal>


          <Modal
            isVisible={modalAlert}
            style={{marginVertical: 50, backgroundColor: '#fff', margin: 0}}>

            <View style={{margin: 10}}>
              <TextDark style={{marginBottom: 8, fontSize: 18}}>DENÚNCIA REALIZADA COM SUCESSO!</TextDark>
              <TextDark style={{marginBottom: 8}}>Em breve nossa equipe irá avaliar o seu reporte e tomar as
                providências
                cabíveis.</TextDark>
              <TextDark style={{marginBottom: 8}}>A Rede do Conhecimento agradece.</TextDark>

            </View>

            <Send
              onPress={() => setModalAlert(false)}
              style={{marginBottom: 10, marginHorizontal: 15}}>
              <TextLight>OK</TextLight>
            </Send>

          </Modal>

        </Card>
      );
    // } else {
    //   return (<View></View>);
    // }

  }

  function _removeImagePost(item) {

    let list = imagePost;
    let newValues = new Array();

    let i = 0;
    list.forEach((element, index) => {
      if (item.item != element) {
        newValues[i] = element;
        i++;
      }
    });
    setImagePost(newValues);
  }

  return _renderItem();
}

