import React, {useState, useEffect, Component} from 'react';

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
  TouchableOpacity,
} from 'react-native';
import {Avatar, FAB} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';

import api from '~/services/api';

//Components
import ListItem from '~/components/ListItem';

import {
  Title,
  Form,
  Input,
  Submit,
  List,
  TextLight,
  Card,
  TextDark,
  Link,
  Send,
  SubTitle,
} from './styles';

import {Container, Content} from '../../style';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1d39cb'
  },
});

export default function Profile(props) {
  const [image, setImage] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {}, []);



  function _uploadPhoto() {
    const options = {
      title: 'Selecione de onde quer importar o arquivo',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Usar Camera',
      chooseFromLibraryButtonTitle: 'Carregar da galeria',
      width: 400,
      height: 400,
      cropping: true,
    };

    ImagePicker.openPicker(options).then(image => {
      //alert(JSON.stringify(image));
      let img = {
        uri: image.path,
        width: image.width,
        height: image.height,
        mime: image.mime,
        type: 'image/jpeg',
        name: image.path.substring(image.path.lastIndexOf('/') + 1),
      };
      
      const data = new FormData();

      data.append('avatar', img);

      // AsyncStorage.getItem('token').then(token => {
      //   axios
      //     .post(API + '/api/v1/user/photo', data, {
      //       headers: {
      //         Authorization: 'Bearer ' + token,
      //         accept: 'application/json',
      //         'content-type': 'application/json',
      //       },
      //     })
      //     .then(response => {
      //       Alert.alert(null, response.data.message);
      //     })
      //     .catch(error => {
      //       console.log('error ' + error.message);
      //       Alert.alert(
      //         null,
      //         'Desculpe, algo deu errado. Tente novamente mais tarde.',
      //       );
      //     });
      // });

      setImage(img);
    });
  }


  const iconSize = 32;
  return (
    <Content
      source={require('~/assets/bg-login.jpg')}
      style={styles.container}
      resizeMode="cover">
      <ScrollView style={{flex: 1}} keyboardDismissMode="interactive">
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            padding: 15,
            backgroundColor: '#1d39cb',
          }}>
          <View style={{alignItems: 'flex-end', flex: 1}}>
            <Image
              resizeMode="cover"
              style={{width: 180, height: 180, borderRadius: 90}}
              defaultSource={require('~/assets/avatar/avatar.png')}
              source={image}
            />

            <Link
              rippleColor="rgba(0, 0, 0, .32)"
              style={{marginTop: -40}}
              onPress={() => _uploadPhoto()}>
              <Avatar.Icon size={42} icon="folder" />
            </Link>
          </View>

          <TextLight style={{fontWeight: '700'}}>
            FRANCISCO ALVES PEREIRA
          </TextLight>

          <TextLight>Matrícula: 9992333-21</TextLight>
        </View>

        <Card>
          <ListItem
            title="CPF"
            text="034.443.334.11"
            color="#444"
            icon={
              <MaterialCommunityIcons
                name="account-card-details-outline"
                size={iconSize}
                color={'#444'}
              />
            }
          />

          <ListItem
            title="E-MAIL"
            text="franciscoalves@gmail.com"
            color="#444"
            icon={
              <MaterialCommunityIcons
                name="email-outline"
                size={iconSize}
                color={'#444'}
              />
            }
          />

          <ListItem
            title="TELEFONE"
            text="9 95949-9394"
            color="#444"
            icon={
              <MaterialCommunityIcons
                name="cellphone-android"
                size={iconSize}
                color={'#444'}
              />
            }
          />
        </Card>
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="edit"
        onPress={() => console.log('Pressed')}
      />
    </Content>
  );
}
