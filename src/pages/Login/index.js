import React, {useState, useEffect, Component} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  AsyncStorage,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import {ActivityIndicator, Colors} from 'react-native-paper';
import {MaskService} from 'react-native-masked-text';

import api from '~/services/api';

import {
  Container,
  Content,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fileName: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  instructions: {
    color: '#DDD',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  logo: {
    height: Dimensions.get('window').height * 0.2,
    marginVertical: Dimensions.get('window').height * 0.1,
    width: Dimensions.get('window').height * 0.17 * (1950 / 662),
  },
  welcome: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default function Main(props) {
  const [doc, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);

  //Redux
  //import {USER} from '~/reducers/types';
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  async function _login() {
    let cpf = await MaskService.toMask('only-numbers', doc);
    if (cpf.length < 14) {
      setError(true);
    }
    if (password === '') {
      setError(true);
    } else {
      setError(false);

      try {
        setModal(true);

        let response = await api.post('/api/auth/login', {doc: cpf, password});

        if (response.data.access_token) {
          await dispatch({type: 'USER', payload: response.data.user});

          const userToken = await AsyncStorage.setItem(
            'token',
            response.data.access_token,
          );

          props.navigation.navigate('MainNavigator');
        } else {
          Alert.alert(null, response.data.message);
          setModal(false);
        }
        //alert(JSON.stringify(response));
        if (__DEV__) {
          console.tron.log(response.data);
        }
      } catch (error) {
        Alert.alert(null, error.message);
        setModal(false);
      }
    }
  }

  return (
    <ImageBackground
      source={require('~/assets/bg-login.jpg')}
      style={styles.container}
      resizeMode="cover">
      <ScrollView style={{flex: 1}} keyboardDismissMode="interactive">
        <StatusBar
          backgroundColor="#2A40B1"
          barStyle="light-content"
        />
        <View style={{flex: 1, alignItems: 'center', marginBottom: 20}}>
          <Image
            source={require('~/assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Title>Login</Title>

          <TextLight>Informe seu login e senha do Mundo Caixa </TextLight>
        </View>
        <KeyboardAvoidingView behavior={'padding'}>
          <Form>
            <Input
              value={MaskService.toMask('cpf', doc)}
              error={error}
              maxLength={14}
              keyboardType={"phone-pad"}
              onChangeText={setCpf}
              textContentType="username"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="CPF"
            />
          </Form>

          <Form>
            <Input
              value={password}
              error={error}
              onChangeText={setPassword}
              keyboardType="ascii-capable"
              textContentType="password"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Senha"
              secureTextEntry={true}
            />
          </Form>
        </KeyboardAvoidingView>

        <View style={{flex: 1, alignItems: 'center', marginBottom: 20}}>
          {/* <Link style={{marginTop: 5, marginBottom: 10}}>
            <TextLight>Esqueci minha senha</TextLight>
          </Link> */}

          <Link style={{marginTop: 15}} onPress={() => props.navigation.navigate('Register')}>
            <TextLight>Não tem cadastro? Registre-se aqui</TextLight>
          </Link>

          {!modal ? (
            <Send onPress={() => _login()} style={{marginTop: 15}}>
              <TextLight>ENTRAR</TextLight>
            </Send>
          ) : (
            <ActivityIndicator
              animating={true}
              size="large"
              color={Colors.white}
            />
          )}
        </View>
      </ScrollView>

      {/* <Modal isVisible={modal} style={{margin: 20}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator
            animating={true}
            size="large"
            color={Colors.white}
          />
          
        </View>
      </Modal> */}
    </ImageBackground>
  );
}
