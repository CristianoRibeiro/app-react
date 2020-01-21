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
import {Menu, Divider} from 'react-native-paper';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import EmptyList from '~/components/EmptyList';
import FitImage from "react-native-fit-image";
import ImagePicker from "react-native-image-crop-picker";

import Item from '~/pages/Rede/Item';

import api from 'axios';

import {Container, Content} from '~/style';

import {
  Title,
  Btn,
  Select,
  Header,
  TextTitle,
  Card,
  Link,
  TextDark,
  ItemQuestion,
  Input,
  Submit,
  Send,
  TextLight,
} from './styles';

export default function Main(props) {
  const user = useSelector(state => state.user);
  const data = useSelector(state => state.lottery);
  const dispatch = useDispatch();

  const [user_rede, setUserRede] = useState([]);
  const [post, setPost] = useState('');
  const [imagePost, setImagePost] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [type, setType] = useState(1);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": user.doc,
        "pageIndex": 0,
        "pageSize": 30,
        "search": null,
        "dataInicio": null,
        "dataFim": null
      };

      let response = await api.post('http://rededoconhecimento-ws-hml.azurewebsites.net/api/rededoconhecimento/post/recuperar', data);
      let response_user = await api.post('https://rededoconhecimento-ws-hml.azurewebsites.net/api/rededoconhecimento/social/info', data);
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response_user.data.retorno);
      }

      //await dispatch({type: 'LOTTERY', payload: response.data});

      setUserRede(response_user.data.retorno);
      setPosts(response.data);
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

  async function _sendPost() {

    try {
      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": user.doc,
        "idPost": null,
        "texto": post,
        "tipoPost": type,
        "idsConexoes": null,
        "imagens": imageBase64
      };

      if (__DEV__) {
        console.tron.log(data);
      }

      let response = await api.post('http://rededoconhecimento-ws-hml.azurewebsites.net/api/rededoconhecimento/post/enviar', data);
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }

      //await dispatch({type: 'LOTTERY', payload: response.data});

      //setPosts(response.data);
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  return (
    <Content>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => _getData()}/>
        }>
        <Header>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 5
            }}>

            <Image
              source={{uri: user_rede.urlFoto}}
              style={{
                height: 34,
                width: 34,
                borderRadius: 16,
              }}
              resizeMode="cover"
            />

            <Input
              value={post}
              error={error}
              multiline
              maxLength={255}
              onChangeText={setPost}
              placeholder="O que você deseja compartilhar com a Rede"
            />

            <Btn onPress={() => _uploadImagePost()}>
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

          <View style={{margin: 3, marginTop: 5}}>
            <View style={{
              flex: 1,
              backgroundColor: '#eee',
              borderRadius: 5,
              margin: 2,
              minHeight: 40,
              justifyContent: 'center',
              paddingHorizontal: 3
            }}>
              <Select
                placeholder={{}}
                value={type}
                onValueChange={value => setType(value)}
                items={[
                  {label: 'Todos da rede (Público)', value: 1},
                  {label: 'Somente minhas conexões', value: 2},
                  {label: 'Conexões específicas', value: 3},
                ]}
              />
            </View>

            <View style={{flex: 1, margin: 2, marginTop: 10}}>
              <Send onPress={() => _sendPost()} style={{flex: 1, justifyContent: 'center'}}>
                <TextLight>Publicar</TextLight>
              </Send>
            </View>
          </View>
        </Header>

        <FlatList
          style={{margimBottom: 50}}
          data={posts.retorno}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<EmptyList text="Nenhum sorteado encontrado!"/>}
          renderItem={(item, index) => <Item item={item} user={user_rede}/>}
        />
      </ScrollView>
    </Content>
  );
}
