import React, {useState, useEffect, Component} from 'react';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import ImagePicker from 'react-native-image-crop-picker';

import api from '~/services/api';

//Components
import ListItem from '~/components/ListItem';
import {useSelector, useDispatch} from 'react-redux';
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
import {User} from '~/model/User';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1d39cb',
  },
});

export default function Profile(props) {
  const data = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [user, setUser] = useState(data ? data : User);
  const [image, setImage] = useState('');
  const [birthdate, setBirthdate] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    if(data.birthdate){
      const firstDate = parseISO(data.birthdate);
      const formattedDate = format(firstDate, "dd/MM/YYY");
      setBirthdate(formattedDate);
    }
    
  }, []);

  function _uploadPhoto() {
    // const options = {
    //   title: 'Selecione de onde quer importar o arquivo',
    //   cancelButtonTitle: 'Cancelar',
    //   takePhotoButtonTitle: 'Usar Camera',
    //   chooseFromLibraryButtonTitle: 'Carregar da galeria',
    //   width: 480,
    //   height: 480,
    //   cropping: true,
    // };

    // ImagePicker.openPicker(options).then(image => {
    //   //alert(JSON.stringify(image));
    //   let img = {
    //     uri: image.path,
    //     width: image.width,
    //     height: image.height,
    //     mime: image.mime,
    //     type: 'image/jpeg',
    //     name: image.path.substring(image.path.lastIndexOf('/') + 1),
    //   };

    //   const data = new FormData();

    //   data.append('avatar', img);
    //   setImage(img);
    // });
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
          }}>
          <View style={{alignItems: 'flex-end', flex: 1}}>
            <Image
              resizeMode="cover"
              style={{
                width: 180,
                height: 180,
                borderRadius: 90,
                marginBottom: 15,
              }}
              defaultSource={require('~/assets/avatar/avatar.png')}
              source={{uri: user.avatar}}
            />

            {/* <Link
              rippleColor="rgba(0, 0, 0, .32)"
              style={{marginTop: -40}}
              onPress={() => _uploadPhoto()}>
              <Avatar.Icon size={42} icon="folder" />
            </Link> */}
          </View>

          <TextDark style={{fontWeight: '700'}}>{user.name}</TextDark>

          <TextDark>Matrícula: {user.matricula}</TextDark>
        </View>

        <Card>
          <ListItem
            title="CPF"
            text={user.doc}
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
            text={user.email}
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
            title="E-MAIL PESSOAL"
            text={user.email_personal}
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
            text={user.phone}
            color="#444"
            icon={
              <MaterialCommunityIcons
                name="cellphone-android"
                size={iconSize}
                color={'#444'}
              />
            }
          />

          <ListItem
            title="UF"
            text={user.address_state}
            color="#444"
            icon={
              <MaterialCommunityIcons
                name="map"
                size={iconSize}
                color={'#444'}
              />
            }
          />

          <ListItem
            title="Data de nascimento"
            text={birthdate}
            color="#444"
            icon={
              <FontAwesome
                name="birthday-cake"
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
        onPress={() => props.navigation.navigate('ProfileEdit')}
      />
    </Content>
  );
}
