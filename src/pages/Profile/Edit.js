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
import RNPickerSelect from 'react-native-picker-select';
import Modal from 'react-native-modal';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import {ActivityIndicator, Colors} from 'react-native-paper';
import {MaskService} from 'react-native-masked-text';

import api from '~/services/api';

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
  TextError,
  Select,
} from './styles';

import {Container, Content} from '../../style';

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
  const [matricula, setMatricula] = useState(user ? user.matricula : '');
  const [apcef, setApcef] = useState(user ? user.apcef : '');
  const [phone, setPhone] = useState(user ? user.phone : '');
  const [sex, setSex] = useState(user ? user.sex : '');
  const [birthdate, setBirthdate] = useState(
    user ? format(parseISO(user.birthdate), 'dd/MM/YYY') : '',
  );
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

      if (response.data.success) {
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

      if (!sex) {
        errors.sex = message;
      } else if (sex.length < 14) {
        errors.sex = message;
      }

      if (!birthdate) {
        errors.birthdate = message;
      } else if (birthdate.length < 14) {
        errors.birthdate = message;
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
    <Content>
      <ScrollView style={{flex: 1}} keyboardDismissMode="interactive">
        <StatusBar backgroundColor="#FF6666" barStyle="light-content" />

        <KeyboardAvoidingView behavior={'padding'}>
          <Card>
            <Form>
              <Input
                value={name}
                error={!name}
                maxLength={14}
                onChangeText={setName}
                textContentType="name"
                autoCorrect={false}
                label="Nome"
              />
            </Form>
            <TextError>{errors.name}</TextError>

            <Form>
              <Input
                value={email.trim()}
                error={!email}
                maxLength={14}
                onChangeText={setEmail}
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCorrect={false}
                label="E-mail"
              />
            </Form>
            <TextError>{errors.email}</TextError>

            <Form>
              <Input
                value={email_personal.trim()}
                error={!email_personal}
                maxLength={14}
                onChangeText={setEmailPersonal}
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCorrect={false}
                label="E-mail pessoal"
              />
            </Form>
            <TextError>{errors.email_personal}</TextError>

            {/* <Form>
              <Input
                value={matricula}
                error={!matricula}
                maxLength={14}
                keyboardType={'number-pad'}
                onChangeText={setPhone}
                autoCapitalize="none"
                autoCorrect={false}
                label="Matrícula"
              />
            </Form>
            <TextError>{errors.matricula}</TextError> */}

            <Form>
              <Input
                value={apcef}
                error={!apcef}
                maxLength={14}
                onChangeText={setApcef}
                autoCapitalize="characters"
                autoCorrect={false}
                label="APCEF"
              />
            </Form>
            <TextError>{errors.apcef}</TextError>

            <Form>
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
                label="Telefone"
              />
            </Form>
            <TextError>{errors.phone}</TextError>

            <Select
              placeholder={{
                label: 'Sexo',
                value: sex,
                color: '#9EA0A4',
              }}
              onValueChange={value => setSex(value)}
              items={[
                {label: 'Masculino', value: '1'},
                {label: 'Feminino', value: '0'},
              ]}
            />
            <TextError>{errors.sex}</TextError>

            <Form>
              <Input
                value={MaskService.toMask('datetime', birthdate, {
                  format: 'DD/MM/YYYY',
                })}
                error={!birthdate}
                maxLength={14}
                keyboardType={'number-pad'}
                onChangeText={setBirthdate}
                autoCapitalize="none"
                autoCorrect={false}
                label="Data de nascimento"
              />
            </Form>
            <TextError>{errors.birthdate}</TextError>
          </Card>
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
    </Content>
  );
}
