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
import {ActivityIndicator} from 'react-native-paper';
import EmptyList from '~/components/EmptyList';
import FitImage from "react-native-fit-image";
import ImagePicker from "react-native-image-crop-picker";
//import InfiniteScrollView from 'react-native-infinite-scroll-view';


import Item from '~/pages/Rede/Detail';

import api from 'axios';
import apiApp from '~/services/api';
import apiRede from '~/services/apiRede';

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
  MultipleSelect,
  Input,
  Submit,
  Send,
  TextLight,
} from './styles';

export default function Main(props) {
  const user = useSelector(state => state.user);
  const rede = useSelector(state => state.rede);
  const dispatch = useDispatch();

  const [user_rede, setUserRede] = useState([]);
  const [conexoes, setConexoes] = useState([]);
  const [conexao, setConexao] = useState('');
  const [excluido, setExcluido] = useState(false);
  const [post, setPost] = useState('');
  const [imagePost, setImagePost] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [type, setType] = useState(1);

  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    _getUser();
    //alert(page);
  }, []);

  useEffect(() => {
    setPosts([]);
    setPage(0);
  }, [reload, user_rede]);

  useEffect(() => {
    _getData();
  }, [user_rede]);

  async function _getUser() {

    try {
      await dispatch({type: 'REDE', payload: []});
      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": user.doc,
        "pageIndex": page,
        "pageSize": 10,
        "search": null,
        "dataInicio": null,
        "dataFim": null
      };

      let response_user = await apiRede.post('/api/rededoconhecimento/social/info', data);

      let user_response = await apiApp.get('/api/auth/user');
      //alert(JSON.stringify(user_response));
      if (__DEV__) {
        console.tron.log(user_response.data);
      }
      await dispatch({type: 'USER', payload: user_response.data});
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response_user);
      }

      setUserRede(response_user.data.retorno);
      //alert(JSON.stringify(response_user.data.retorno));
      //setPosts(response.data);

      let list = response_user.data.retorno.conexoes;
      let newValues = new Array();

      let i = 0;
      list.forEach((element, index) => {

        newValues[i] = {'id': element.id, 'name': element.amigo.nome};
        i++;
      });
      setConexoes(newValues);
      //alert(JSON.stringify(newValues));
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  function _searchTag(array = []) {

    let tempArray = array;

    tempArray.map((item, key) => {
      tempArray[key] = item;
      if (item.id === user.post_wd) {
        tempArray[key]['post'] = true;
      }
    });

    setPosts(tempArray);

    if (__DEV__) {
      console.tron.log(tempArray);
    }
  }

  async function _getData() {

    if (loading) {
      return;
    }

    setLoading(true);
    try {
      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": user.doc,
        "pageIndex": page,
        "pageSize": 5,
        "search": null,
        "dataInicio": null,
        "dataFim": null
      };

      if (__DEV__) {
        console.tron.log(data);
      }

      let response = await apiRede.post('/api/rededoconhecimento/post/recuperar', data);

      // if (response.data.retorno.length){
      //await dispatch({type: 'REDE', payload: response.data.retorno});
      let list = [...response.data.retorno, ...posts];

      list.sort(function (a, b) {
        return b.id - a.id;
      });

      _searchTag(list);

      setPage(page + 1);
      if (__DEV__) {
        console.tron.log(list);
      }


      //alert(JSON.stringify(newValues));
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  async function _getReset() {

    setReload(reload + 1);
    setLoading(true);
    let data = {
      "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
      "cpf": user.doc,
      "pageIndex": 0,
      "pageSize": 5,
      "search": null,
      "dataInicio": null,
      "dataFim": null
    };

    //alert(JSON.stringify(data));

    try {

      let response = await apiRede.post('/api/rededoconhecimento/post/recuperar', data);

      let user_response = await apiApp.get('/api/auth/user');
      await dispatch({type: 'USER', payload: user_response.data});

      let list = response.data.retorno;

      list.sort(function (a, b) {
        return b.id - a.id;
      });

      _searchTag(list);

      if (__DEV__) {
        console.tron.log(list);
      }

      //alert(JSON.stringify(newValues));
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
    setLoading(false);
  }

  async function _getResetPost() {

    //setReload(reload + 1);
    setPage(0);
    let data = {
      "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
      "cpf": user.doc,
      "pageIndex": 0,
      "pageSize": 5,
      "search": null,
      "dataInicio": null,
      "dataFim": null
    };

    //alert(JSON.stringify(data));

    try {

      let response = await apiRede.post('/api/rededoconhecimento/post/recuperar', data);

      let list = response.data.retorno;

      list.sort(function (a, b) {
        return b.id - a.id;
      });

      _searchTag(list);

      if (__DEV__) {
        console.tron.log(list);
      }

      //alert(JSON.stringify(newValues));
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
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

    let response = null;
    try {
      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": user.doc,
        "idPost": null,
        "texto": post,
        "tipoPost": type,
        "idsConexoes": conexao.length ? conexao : null,
        "imagens": imageBase64
      };

      if (__DEV__) {
        console.tron.log(data);
      }

      let response = await apiRede.post('/api/rededoconhecimento/post/enviar', data);

      if (post) {
        if ((post.toLowerCase().includes('#acaixaétodasua') || post.toLowerCase().includes('#acaixaetodasua')) && post.toLowerCase().includes('#sororidade')) {

          let response_post = await apiApp.post('/api/post/inspira', {post_wd: response.data.idPost});

          let user_response = await apiApp.get('/api/auth/user');
          await dispatch({type: 'USER', payload: user_response.data});
          //alert(JSON.stringify(response));
          if (__DEV__) {
            console.tron.log(response_post.data);
          }
        }
      }
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }


    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }

    //setConexao([]);
    setType(1);
    setPost('');
    setImagePost(null);
    setImageBase64(null);

    _getResetPost();
  }


  async function _excluir(item) {
    //alert(JSON.stringify(item));
    //setPage(0);
    //Alert.alert(null,'Post excluido com sucesso!');

    //setExcluido(!excluido);
    let list = posts;
    let newValues = new Array();

    let i = 0;
    list.forEach((element, index) => {
      if (item.id != element.id) {
        newValues[i] = element;
        i++;
      } else {
        if (__DEV__) {
          console.tron.log(element);
        }
      }
    });
    if (__DEV__) {
      console.tron.log(newValues);
    }

    newValues.sort(function (a, b) {
      return b.id - a.id;
    });

    setPosts(newValues);

    //setPosts([]);

    if (__DEV__) {
      console.tron.log(newValues);
    }

  }

  function renderFooter() {
    // if (!end) return null;

    return (
      <View style={{paddingVertical: 5, alignItems: 'center', justifyContent: 'center'}}>
        {/*<TextDark>Caregando...</TextDark>*/}
      </View>
    );
  };

  function _renderHeader() {
    return (
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
            backgroundColor: '#ddd',
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

          {/*<TextDark>{JSON.stringify(user_rede.conexoes)}</TextDark>*/}
          {type === 3 ?
            <View style={{marginVertical: 10}}>
              <View style={{marginHorizontal: 5}}>
                <TextDark>Selecione os contatos com os quais você deseja compartilhar a publicação</TextDark>
              </View>

              <MultipleSelect
                items={[
                  // this is the parent or 'item'
                  {
                    name: 'Contatos',
                    id: 0,
                    // these are the children or 'sub items'
                    children: conexoes,
                  },
                ]}
                uniqueKey="id"
                subKey="children"
                confirmText="OK"
                selectText="Contatos"
                showDropDowns={false}
                hideSearch={true}
                //single
                styles={{selectToggle: {padding: 0}}}
                modalWithSafeAreaView={true}
                readOnlyHeadings={true}
                onSelectedItemsChange={setConexao}
                // onSelectedItemObjectsChange={value =>
                //   props.setFieldValue("days", value)
                // }
                selectedItems={conexao}
              />

            </View>
            : null}

          <View style={{flex: 1, margin: 2, marginTop: 10}}>
            <Send disabled={post ? false : true} onPress={() => _sendPost()}
                  style={{flex: 1, justifyContent: 'center'}}>
              <TextLight>Publicar</TextLight>
            </Send>
          </View>
        </View>
      </Header>
    );
  }

  function _renderItem(item, index) {
    return (<Item key={index} item={item} excluir={_excluir} user={user_rede} getData={_getReset}/>);
  }

  function _render() {

    if (user_rede) {
      return (
        <Content>

          {/*{reload ?*/}
          {/*  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50}}>*/}
          {/*    <ActivityIndicator size={'large'} animating={true}/>*/}
          {/*  </View>*/}
          {/*  :*/}
          <View>
            <FlatList
              ListHeaderComponent={_renderHeader()}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={() => _getReset()}/>
              }
              style={{margimBottom: 50}}
              data={posts}
              extraData={{
                data: posts,
                // Realm mutates the array instead of returning a new copy,
                // thus for a FlatList to update, we can use a timestamp as
                // extraData prop
                timestamp: Date.now(),
              }}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={<EmptyList text="Nenhum post encontrado!"/>}
              renderItem={(item, index) => _renderItem(item, index)}
              onEndReached={() => _getData()}
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderFooter}
              //initialNumToRender={50}
            />

            {/*<ListView*/}
            {/*  renderScrollComponent={props => <InfiniteScrollView {...props} />}*/}
            {/*  dataSource={posts}*/}
            {/*  renderRow={_renderItem()}*/}
            {/*  canLoadMore={_getData()}*/}
            {/*  onLoadMoreAsync={this._getData()}*/}
            {/*/>*/}
          </View>
          {/*}*/}

        </Content>
      );
    } else {
      return (
        <Content>
          <View style={{margin: 5, padding: 20}}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <MaterialCommunityIcons name="alert-circle-outline" size={50} color={'#444'}/>
              <TextDark style={{marginTop: 15, textAlign: 'center'}}>
                Usuário não identificado.
              </TextDark>
            </View>
          </View>
        </Content>
      );
    }
  }

  return _render();
}
