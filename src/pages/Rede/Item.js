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
  const [userPost, setUserPost] = useState([]);
  const [imagePost, setImagePost] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [imageComment, setImageComment] = useState(null);
  const [subComment, setSubComment] = useState('');
  const [postEvent, setPostEvent] = useState('');
  const [like, setLike] = useState(false);

  const [inputDenuncia, setInputDenuncia] = useState('');
  const [inputEditarPost, setInputEditarPost] = useState('');

  const [hideComment, setHideComment] = useState(false);
  const [hideEdit, setHideEdit] = useState(true);
  const [hideEditComentario, setHideEditComentario] = useState(true);
  const [urlImages, setUrlImages] = useState([]);
  const [hideMenu, setHideMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      //alert(JSON.stringify(response));
      // if (__DEV__) {
      //   console.tron.log(props.item);
      // }
      setPost(props.item.item);
      setInputEditarPost(props.item.item.texto);
      setUrlImages(props.item.item.imagens ? props.item.item.imagens : []);
      setUserPost(props.user ? props.user : []);
      setLike(props.item.item.curtiu);

    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

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
      multiple: true,
      mediaType: 'photo',
      includeBase64: true
    };

    await ImagePicker.openPicker(options)
      .then(response => {
        let tempArray = [];
        let tempArray2 = [];

        response.forEach((item) => {

          if (__DEV__) {
            console.tron.log(item);
          }

          let image = {
            uri: item.path,
            width: item.width,
            height: item.height,
            mime: item.mime,
            type: 'image/jpeg',
            name: item.path.substring(item.path.lastIndexOf('/') + 1),
            data: item.data,
          }

          tempArray.push(image);
          tempArray2.push('data:' + item.mime + ';base64, ' + item.data);
          // console.log('savedimageuri====='+item.path);

        });
        setImagePost(tempArray);
        setImageBase64(tempArray2);
        if (__DEV__) {
          console.tron.log(tempArray2);
        }
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

      _getData();
      setLike(response.data.curtiu);

    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    props.getData();
  }

  async function _denunciar() {
    //alert(idPost);
    setModal(false);
    try {
      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": user.doc,
        "idPost": post.id,
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
    props.getData();
  }

  async function _sendExcluir() {

    try {
      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": user.doc,
        "idPost": post.id
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
    setHideEdit(true);
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

      let response = await api.post('http://rededoconhecimento-ws-hml.azurewebsites.net/api/rededoconhecimento/post/comentar', data);
      //alert(JSON.stringify(data));

      if (__DEV__) {
        console.tron.log(response.data);
      }
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setHideEdit(true);
    props.getData();
  }

  function _renderItem(item) {

    return (
      <Card style={{marginTop: 15, marginRight: 6, marginLeft: 6}}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 5
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

            <View style={{flex: 1, marginHorizontal: 10}}>
              <TextDark
                style={{fontSize: 18, textTransform: 'uppercase'}}>{post ? post.nomeParticipante : null}</TextDark>
              <TextDark style={{fontSize: 11}}>{post ? post.data : null}</TextDark>
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

              {userPost.nome === post.nomeParticipante ?
                <View>
                  <Menu.Item onPress={() => {
                    setHideEdit(!hideEdit);
                    setHideMenu(false);
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

          <View style={{marginTop: 15, paddingHorizontal: 5}}>
            <TextDark>
              {post ? post.texto : null}
            </TextDark>
          </View>

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
              width: 40,
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 5
            }}>

            <Btn onPress={() => _like(post.id)}>

              {like ?
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

            </Btn>

            <TextDark style={{marginTop: -5}}>{post.curtidas}</TextDark>

          </View>

          <View style={{margin: 8}}>
            <FlatList
              data={post.comentarios ? post.comentarios : []}
              //numColumns={4}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(item, index) => <PostComentario item={item.item} post={post} userPost={userPost}
                                                           getData={props.getData}/>}
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
            <FlatList
              style={{margimBottom: 50}}
              data={imagePost}
              horizontal
              //numColumns={4}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(item, index) => <View style={{flex: 1}}>

                <Card style={{width: 100, flex: 1, padding: 2}}>
                  <View style={{alignItems: 'flex-end'}}>
                    <TouchableOpacity onPress={() => _removeImagePost(item)} style={{height: 20, width: 20}}>
                      <MaterialCommunityIcons
                        name="close"
                        size={18}
                        color={'#666'}
                      />
                    </TouchableOpacity>
                  </View>
                  <FitImage source={{uri: item.item.uri}} resizeMode="contain"/>
                </Card>
              </View>}
            />
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


        {/*<Modal*/}
        {/*  isVisible={modalAlert}*/}
        {/*  style={{marginVertical: 50, backgroundColor: '#fff', margin: 0}}>*/}

        {/*  <View style={{margin: 10}}>*/}
        {/*    <TextDark style={{marginBottom: 8, fontSize: 18}}>DENÚNCIA REALIZADA COM SUCESSO!</TextDark>*/}
        {/*    <TextDark style={{marginBottom: 8}}>Em breve nossa equipe irá avaliar o seu reporte e tomar as providências*/}
        {/*      cabíveis.</TextDark>*/}
        {/*    <TextDark style={{marginBottom: 8}}>A Rede do Conhecimento agradece.</TextDark>*/}

        {/*  </View>*/}

        {/*  <Send*/}
        {/*    onPress={() => setModalAlert(false)}*/}
        {/*    style={{marginBottom: 10, marginHorizontal: 15}}>*/}
        {/*    <TextLight>OK</TextLight>*/}
        {/*  </Send>*/}

        {/*</Modal>*/}

      </Card>
    );

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

