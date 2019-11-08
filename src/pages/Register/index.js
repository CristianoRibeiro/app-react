import React, {useState, useEffect, Component} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useFormik} from 'formik';
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
  SafeAreaView,
  Platform,
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
  TextError,
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
    height: Dimensions.get('window').height * 0.15,
    marginVertical: Dimensions.get('window').height * 0.04,
    width: Dimensions.get('window').height * 0.6 * (1280 / 662),
  },
  welcome: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default function Main(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [doc, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState([]);

  //Redux
  //import {USER} from '~/reducers/types';
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  async function _login() {
    let cpf = await MaskService.toMask('only-numbers', doc);

    try {
      setModal(true);

      let response = await api.post('/api/auth/signup', {
        doc: cpf.trim(),
        name,
        email,
        password,
      });

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

  const {getFieldProps, handleSubmit, errors, touched} = useFormik({
    initialValues: {
      contact: {
        email: '',
        name: '',
      },
    },
    validate: values => {
      const errors = {};
      const message = 'Campo obrigatório';

      // if (!name) err.name = message;
      // if (!email) err.email = message;

      if (!name) {
        errors.name = 'Nome obrigatório!';
      }

      if (!email) {
        errors.email = 'E-mail obrigatório!';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = 'Digite um e-mail válido!';
      }

      if (!doc) {
        errors.cpf = 'CPF obrigatório!';
      } else if (doc.length < 14) {
        errors.cpf = 'Digite um CPF válido!';
      }

      if (password.length < 4) {
        errors.password = 'A senha deve conter pelo menos 4 caracteres';
      }

      return errors;
    },
    onSubmit: (values, bag) => {
      _login();
    },
  });

  // const [name, metadataName] = getFieldProps("name", "text");
  // const [email, metadataEmail] = getFieldProps("contact.email", "text");

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled>
      <StatusBar backgroundColor="#2A40B1" barStyle="light-content" />
      <ImageBackground
        source={require('~/assets/bg-login.jpg')}
        style={styles.container}
        resizeMode="cover">
        <ScrollView style={{flex: 1}} keyboardDismissMode="interactive">
          <View style={{flex: 1, alignItems: 'center', marginBottom: 10}}>
            <Image
              source={require('~/assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <Title>Cadastrar</Title>

            {/* <TextLight>Informe seu login e senha do Mundo Caixa </TextLight> */}
          </View>
          <Form>
            <View>
              <Input
                value={name}
                error={!name}
                maxLength={14}
                onChangeText={setName}
                textContentType="name"
                autoCorrect={false}
                placeholder="Nome"
              />
              <TextError>{errors.name}</TextError>
            </View>
          </Form>

          <Form>
            <View>
              <Input
                value={email.trim()}
                error={!email}
                maxLength={14}
                onChangeText={setEmail}
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="E-mail"
              />
              <TextError>{errors.email}</TextError>
            </View>
          </Form>

          <Form>
            <View>
              <Input
                value={MaskService.toMask('cpf', doc)}
                error={!doc}
                maxLength={14}
                keyboardType={'phone-pad'}
                onChangeText={setCpf}
                textContentType="username"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="CPF"
              />
              <TextError>{errors.cpf}</TextError>
            </View>
          </Form>

          <Form>
            <View>
              <Input
                value={password}
                error={!password}
                onChangeText={setPassword}
                keyboardType="ascii-capable"
                textContentType="password"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Senha"
                secureTextEntry={true}
              />
              <TextError>{errors.password}</TextError>
            </View>
          </Form>

          <View style={{flex: 1, alignItems: 'center', marginBottom: 20}}>
            {/* <Link style={{marginTop: 5, marginBottom: 10}}>
            <TextLight>Esqueci minha senha</TextLight>
          </Link> */}

            <Link onPress={() => props.navigation.navigate('Login')}>
              <TextLight>Já tem cadastro? Faça o login aqui</TextLight>
            </Link>

            {!modal ? (
              <Send onPress={handleSubmit} style={{marginTop: 15}}>
                <TextLight>CADASTRAR</TextLight>
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

      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
