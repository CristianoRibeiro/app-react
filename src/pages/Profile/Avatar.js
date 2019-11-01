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
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {Avatar, FAB} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';

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
  const [image, setImage] = useState({uri: user.avatar});
  const [birthdate, setBirthdate] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {}, []);

  async function _uploadPhoto() {
    const options = {
      title: 'Selecione de onde quer importar o arquivo',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Usar Camera',
      chooseFromLibraryButtonTitle: 'Carregar da galeria',
      width: 480,
      height: 480,
      cropping: true,
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

      setImage(img);

      const data = new FormData();

      data.append('image', img);
      try {
        let response = await api.post('/api/avatar', data);

        if (response.data.success) {
          await dispatch({type: 'USER', payload: response.data.user});
        }

        //alert(JSON.stringify(response));
        if (__DEV__) {
          console.tron.log(response.data);
        }
      } catch (error) {
        Alert.alert(null, error.message);
      }
    });
  }

  return (
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
          source={image}
        />

        <Link
          rippleColor="rgba(0, 0, 0, .32)"
          style={{marginTop: -40}}
          onPress={() => _uploadPhoto()}>
          <Avatar.Icon size={42} icon="folder" />
        </Link>
      </View>
    </View>
  );
}
