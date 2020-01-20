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

  const [post, setPost] = useState('');
  const [imagePost, setImagePost] = useState(null);
  const [imageComment, setImageComment] = useState(null);
  const [subComment, setSubComment] = useState('');
  const [postEvent, setPostEvent] = useState('');
  const [type, setType] = useState(null);

  const [posts, setPosts] = useState([]);
  const [hideComment, setHideComment] = useState(false);
  const [hideMenu, setHideMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    _getData();
  }, []);

  async function _getData() {
    setLoading(true);
    try {
      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": "28475201806",
        "pageIndex": 0,
        "pageSize": 30,
        "search": null,
        "dataInicio": null,
        "dataFim": null
      };

      let response = await api.post('http://rededoconhecimento-ws-hml.azurewebsites.net/api/rededoconhecimento/post/recuperar', data);
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }

      //await dispatch({type: 'LOTTERY', payload: response.data});

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
          }

          tempArray.push(image)
          // console.log('savedimageuri====='+item.path);

        });
        setImagePost(tempArray);
        if (__DEV__) {
          console.tron.log(tempArray);
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
              source={{uri: user.append_avatar}}
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
                placeholder={{
                  label: 'Publico',
                  value: 0,
                  color: '#9EA0A4',
                }}
                value={type}
                onValueChange={value => setType(value)}
                items={[
                  {label: 'Todos da rede (Público)', value: 0},
                  {label: 'Somente minhas conexões', value: 1},
                  {label: 'Conexões específicas', value: 2},
                ]}
              />
            </View>

            <View style={{flex: 1, margin: 2, marginTop: 10}}>
              <Send style={{flex: 1, justifyContent: 'center'}}>
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
          renderItem={(item, index) => <Item item={item}/>}
        />
      </ScrollView>
    </Content>
  );
}

//Retornar data de publicacao
//Api com os dados do usuario
// "imagens": [
//   {"image": "https://audityrededoconhecimento.blob.core.windows.net/foto-post/637148814546023025.png"}
// ],
