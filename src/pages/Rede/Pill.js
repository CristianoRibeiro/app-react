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
import Rede from '~/model/Rede';
import FitImage from "react-native-fit-image";
import ImagePicker from "react-native-image-crop-picker";

import api from '~/services/api';
import apiRede from '~/services/apiRede';

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
  BtnCancel
} from './styles';
import {BtnConfirm} from "~/pages/Event/ScheduleEvent/styles";

export default function Main(props) {
  const user = useSelector(state => state.user);
  const data = useSelector(state => state.lottery);
  const dispatch = useDispatch();

  const [hideMenu, setHideMenu] = useState(false);
  const [like, setLike] = useState(false);
  const [likeNumber, setLikeNumber] = useState(0);


  const [hideComment, setHideComment] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
  }, []);

  function _openUrl(item) {
    try {
      Linking.canOpenURL(item).then(supported => {
        if (supported) {
          Linking.openURL(item).catch(err =>
            console.error('An error occurred', err),
          );
        }
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  function _renderItem() {

    return (
      <TouchableOpacity onPress={() => _openUrl(props.item.link)}>
        <View style={{marginVertical: 5, flexDirection: 'row', marginTop: 15}}>
          {/*<TextDark>{JSON.stringify(props.item)}</TextDark>*/}
          <View style={{marginRight: 10}}>

            <Image
              style={{flex: 1, height: 115, width: 115}}
              source={{uri: props.item.imagem}}
              resizeMode="contain"
            />

          </View>

          <View style={{flex: 1}}>
            <TextDark style={{fontSize: 10, textTransform: 'uppercase'}}>{props.item.categoria}</TextDark>
            <TextDark style={{color: '#2A6496', fontWeight: '700'}}>{props.item.nome}</TextDark>

            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
              <View style={{justifyContent: 'center'}}>
                <TextDark>{props.item.duracao} minutos</TextDark>
              </View>

              <View style={{justifyContent: 'center'}}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={5}
                  selectedStar={(rating) => null}
                  fullStarColor={'#777B97'}
                  starSize={10}
                />
              </View>
            </View>

            <View
              style={{
                flex: 1,
                paddingVertical: 2,
                backgroundColor: '#eee',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 5
              }}
              onPress={() => _openUrl(props.item.link)}>
              <TextDark style={{fontSize: 13}}>CONHECER</TextDark>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return _renderItem();
}

