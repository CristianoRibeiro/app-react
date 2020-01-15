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
    // try {
    //   let response = await api.get('/api/lottery');
    //   //alert(JSON.stringify(response));
    //   if (__DEV__) {
    //     console.tron.log(response.data);
    //   }
    //   await dispatch({type: 'LOTTERY', payload: response.data});
    //
    //   //setNotifications(response.data);
    // } catch (error) {
    //   if (__DEV__) {
    //     console.tron.log(error.message);
    //   }
    // }
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

  async function _uploadImageComment() {
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
        setImageComment(tempArray);
        if (__DEV__) {
          console.tron.log(tempArray);
        }
      });
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

          <TouchableOpacity onPress={() => setHideComment(item.item.id)}
                            style={{flex: 1, justifyContent: 'center', marginLeft: 20}}>
            <TextDark style={{color: '#ff8f00'}}>Comentar</TextDark>
          </TouchableOpacity>
        </View>

        {hideComment === item.item.id ?
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
                      source={{uri: user.append_avatar}}
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
                source={{uri: user.append_avatar}}
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
          : null}
      </View>
    );
  }

  function _renderItem(item) {
    if (false) {
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
                source={{uri: user.append_avatar}}
                style={{
                  height: 34,
                  width: 34,
                  borderRadius: 16,
                }}
                resizeMode="cover"
              />

              <View style={{flex: 1, marginHorizontal: 10}}>
                <TextDark style={{fontSize: 18, textTransform: 'uppercase'}}>Nome</TextDark>
                <TextDark style={{fontSize: 11}}>10/01/2020</TextDark>
              </View>

            </View>
            <View style={{marginTop: 15}}>

              <TextDark>
                It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at its layout.
              </TextDark>
            </View>

            <View style={{marginTop: 15, flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flex: 1, margin: 5}}>
                <FitImage source={{uri: 'https://images.pexels.com/photos/1227520/pexels-photo-1227520.jpeg'}}
                          resizeMode="contain"/>
              </View>

              <View style={{flex: 1, margin: 5}}>

                <TextDark style={{marginBottom: 10, textTransform: 'uppercase'}}>Title</TextDark>

                <Link onPress={() => Linking.openURL('http://google.com')}>
                  <TextDark style={{color: '#0D4274', fontSize: 16, fontWeight: '700'}}>
                    It is a long established fact that a reader will be distracted by the readable content of a page
                    when
                    looking at its layout.

                  </TextDark>
                </Link>
                <TextDark style={{fontWeight: '300'}}>138 minutos</TextDark>
                <View style={{marginVertical: 5, alignItems: 'flex-start'}}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={5}
                    selectedStar={(rating) => null}
                    starSize={15}
                    starStyle={{color: '#0D4274', margin: 3}}
                  />
                </View>
                <Send style={{justifyContent: 'center'}}>
                  <TextLight>Conhecer</TextLight>
                </Send>
              </View>
            </View>


            <View
              style={{
                width: 40,
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 5
              }}>

              <Btn>
                <AntDesign
                  name="like2"
                  size={26}
                  color={'#666'}
                />
              </Btn>

              <TextDark style={{marginTop: -5}}>0</TextDark>

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
                source={{uri: user.append_avatar}}
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
                data={imageComment}
                horizontal
                //numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item, index) => <View style={{flex: 1}}>

                  <Card style={{width: 100, flex: 1, padding: 2}}>
                    <View style={{alignItems: 'flex-end'}}>
                      {/*<TouchableOpacity onPress={() => _removeImagePost(item)} style={{height: 20, width: 20}}>*/}
                      {/*  <MaterialCommunityIcons*/}
                      {/*    name="close"*/}
                      {/*    size={18}*/}
                      {/*    color={'#666'}*/}
                      {/*  />*/}
                      {/*</TouchableOpacity>*/}
                    </View>
                    <FitImage source={{uri: item.item.uri}} resizeMode="contain"/>
                  </Card>
                </View>}
              />
            </View>
            <Send style={{flex: 1, justifyContent: 'center'}}>
              <TextLight>Comentar</TextLight>
            </Send>
          </View>
        </Card>
      );
    } else {
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
                source={{uri: user.append_avatar}}
                style={{
                  height: 34,
                  width: 34,
                  borderRadius: 16,
                }}
                resizeMode="cover"
              />

              <View style={{flex: 1, marginHorizontal: 10}}>
                <TextDark style={{fontSize: 18, textTransform: 'uppercase'}}>Nome</TextDark>
                <TextDark style={{fontSize: 11}}>10/01/2020</TextDark>
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
                <Menu.Item onPress={() => {
                }} title="Denunciar"/>
              </Menu>
            </View>
            <View style={{marginTop: 15, paddingHorizontal: 5}}>

              <TextDark>
                It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at its layout.
              </TextDark>
            </View>

            <View style={{flex: 1, margin: 5}}>
              <FitImage source={{uri: 'https://images.pexels.com/photos/1227520/pexels-photo-1227520.jpeg'}}
                        resizeMode="contain"/>
            </View>

            <View
              style={{
                width: 40,
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 5
              }}>

              <Btn>
                <AntDesign
                  name="like2"
                  size={26}
                  color={'#666'}
                />
              </Btn>

              <TextDark style={{marginTop: -5}}>0</TextDark>

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
                source={{uri: user.append_avatar}}
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
                data={imageComment}
                horizontal
                //numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(item, index) => <View style={{flex: 1}}>

                  <Card style={{width: 100, flex: 1, padding: 2}}>
                    <View style={{alignItems: 'flex-end'}}>
                      {/*<TouchableOpacity onPress={() => _removeImagePost(item)} style={{height: 20, width: 20}}>*/}
                      {/*  <MaterialCommunityIcons*/}
                      {/*    name="close"*/}
                      {/*    size={18}*/}
                      {/*    color={'#666'}*/}
                      {/*  />*/}
                      {/*</TouchableOpacity>*/}
                    </View>
                    <FitImage source={{uri: item.item.uri}} resizeMode="contain"/>
                  </Card>
                </View>}
              />
            </View>
            <Send style={{flex: 1, justifyContent: 'center', marginVertical: 10}}>
              <TextLight>Comentar</TextLight>
            </Send>

            <Divider/>

            <FlatList
              data={[{id: 1}, {id: 2}]}
              //numColumns={4}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(item, index) =>
                <View style={{marginHorizontal: 5, marginVertical: 5}}>
                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={{uri: user.append_avatar}}
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

                  {_renderComment(item)}
                </View>
              }
            />

          </View>
        </Card>
      );
    }

  }

  function _removeImagePost(item) {

    let list = imagePost;
    // list.splice( list.indexOf(item), 1 );
    //
    // setImagePost(list);

    list.filter(function (returnableObjects) {
      return returnableObjects !== item;
    });

    alert(JSON.stringify(list));

    setImagePost(list);
  }

  return _renderItem();
}
