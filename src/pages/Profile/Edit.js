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

export default function Main(props) {
  //Redux
  //import {USER} from '~/reducers/types';
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [email_personal, setEmailPersonal] = useState(
    user ? user.email_personal : '',
  );
  const [phone, setPhone] = useState(user ? user.phone : '');
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {}, []);

  async function _login() {
    let p = await MaskService.toMask('only-numbers', phone);

    try {
      setModal(true);

      let response = await api.post('/api/auth/update', {
        phone: p.trim(),
        name,
        email,
        email_personal,
      });

      if(response.data.success){
        await dispatch({type: 'USER', payload: response.data.user});
      }

      props.navigation.navigate('Profile');
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

      if (!email_personal) {
        errors.email_personal = 'E-mail pessoal obrigatório!';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email_personal)
      ) {
        errors.email_personal = 'Digite um e-mail pessoal válido!';
      }

      if (!phone) {
        errors.phone = 'Telefone obrigatório!';
      } else if (phone.length < 14) {
        errors.phone = 'Digite um Telefone válido!';
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
    <ScrollView style={{flex: 1}} keyboardDismissMode="interactive">
      <StatusBar backgroundColor="#FF6666" barStyle="light-content" />

      <KeyboardAvoidingView behavior={'padding'}>
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
              value={email_personal.trim()}
              error={!email_personal}
              maxLength={14}
              onChangeText={setEmailPersonal}
              textContentType="emailAddress"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="E-mail pessoal"
            />
            <TextError>{errors.email_personal}</TextError>
          </View>
        </Form>

        <Form>
          <View>
            <Input
              value={MaskService.toMask('cel-phone', phone, {
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              })}
              error={!phone}
              maxLength={14}
              keyboardType={'phone-pad'}
              onChangeText={setPhone}
              textContentType="telephoneNumber"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Telefone"
            />
            <TextError>{errors.phone}</TextError>
          </View>
        </Form>
      </KeyboardAvoidingView>

      <View style={{flex: 1, alignItems: 'center', marginBottom: 20}}>
        {/* <Link style={{marginTop: 5, marginBottom: 10}}>
            <TextLight>Esqueci minha senha</TextLight>
          </Link> */}

        {!modal ? (
          <Send onPress={handleSubmit} style={{marginTop: 15}}>
            <TextLight>SALVAR</TextLight>
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
  );
}
