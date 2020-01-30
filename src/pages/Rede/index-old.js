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

import Item from '~/pages/Rede/Detail';

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
  MultipleSelect,
  Input,
  Submit,
  Send,
  TextLight,
} from './styles';

const baseURL = 'https://api.github.com';
const searchTerm = 'react';
const perPage = 20;

export default class App extends Component {
  state = {
    posts: [],
    conexoes: [],
    page: 0,
    loading: false,
  };

  componentDidMount() {
    this._getData();
  }

  _getData = async () => {
    if (this.state.loading) return;

    const { page } = this.state;

    this.setState({ loading: true });


    try {
      let data = {
        "token": "5031619C-9203-4FB3-BE54-DE6077075F9D",
        "cpf": '28475201806',
        "pageIndex": page,
        "pageSize": 5,
        "search": null,
        "dataInicio": null,
        "dataFim": null
      };

      let response = await api.post('http://rededoconhecimento-ws-hml.azurewebsites.net/api/rededoconhecimento/post/recuperar', data);
      let response_user = await api.post('https://rededoconhecimento-ws-hml.azurewebsites.net/api/rededoconhecimento/social/info', data);
      //alert(JSON.stringify(response));


      this.setState({user: response_user.data.retorno});
      //alert(JSON.stringify(response_user.data.retorno));
      //setPosts(response.data);

      //let list = response_user.data.retorno.conexoes;
      let newValues = new Array();

      // let i = 0;
      // list.forEach((element, index) => {
      //
      //   newValues[i] = {'id': element.id, 'name': element.amigo.nome};
      //   i++;
      // });
      // this.setState({conexoes:newValues});

      // if (response.data.retorno.length){
      //   setEnd(true);
      //   setPage(page + 1);
      //   await dispatch({type: 'REDE', payload: response.data.retorno});
      //
      //   setPosts([...response.data.retorno, ...posts]);
      // }
      // else{
      //   setEnd(false);
      // }

      if (__DEV__) {
        console.tron.log([...response.data.retorno, ...this.state.posts]);
      }
      this.setState({
        posts: [...response.data.retorno, ...this.state.posts],
        page: page + 1,
        loading: false,
      });
      //alert(JSON.stringify(newValues));
    } catch (error) {
      if (__DEV__) {
        console.tron.log(error.message);
      }
    }
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  };

  renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>{item.full_name}</Text>
    </View>
  );


  render() {
    return (
      <FlatList
        //ListHeaderComponent={_renderHeader()}
        refreshControl={
          <RefreshControl refreshing={this.state.loading} onRefresh={() => _getData()}/>
        }
        style={{margimBottom: 50}}
        data={this.state.posts}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<EmptyList text="Nenhum post encontrado!"/>}
        renderItem={(item, index) => <Item key={index} item={item} user={this.state.user}/>}
        onEndReached={()=>this._getData()}
        onEndReachedThreshold={0.1}
        //ListFooterComponent={renderFooter}
        initialNumToRender={5}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
  },

  listItem: {
    backgroundColor: '#EEE',
    marginTop: 20,
    padding: 30,
  },

  loading: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});
