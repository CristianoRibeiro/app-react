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
import RNPickerSelect from 'react-native-picker-select';
import Modal from 'react-native-modal';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import {ActivityIndicator, Colors} from 'react-native-paper';
import {MaskService} from 'react-native-masked-text';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Avatar from '~/pages/Profile/Avatar';

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
  Header,
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

import {Container, Content} from '../../style';

export default function Main(props) {
  //Redux
  //import {USER} from '~/reducers/types';
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [email_personal, setEmailPersonal] = useState('');
  const [matricula, setMatricula] = useState('');
  const [apcef, setApcef] = useState('');
  const [phone, setPhone] = useState('');
  const [doc, setDoc] = useState('');
  const [sex, setSex] = useState('');
  const [password, setPassword] = useState('');
  const [address_state, setState] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {}, []);

  function formataStringData(data) {
    var dia = data.split('/')[0];
    var mes = data.split('/')[1];
    var ano = data.split('/')[2];

    return ano + '-' + ('0' + mes).slice(-2) + '-' + ('0' + dia).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  }

  async function _login() {
    let cpf = await MaskService.toMask('only-numbers', doc);
    let p = await MaskService.toMask('only-numbers', phone);

    if (__DEV__) {
      console.tron.log({
        phone: p.trim(),
        code,
        name,
        doc: cpf,
        email: email.trim(),
        apcef,
        sex,
        birthdate: formataStringData(birthdate),
        address_state,
      });
    }
    try {
      setModal(true);

      let response = await api.post('/api/auth/signup', {
        phone: p.trim(),
        code,
        name,
        doc: cpf,
        email: email.trim(),
        apcef,
        password: '123',
        sex,
        birthdate: formataStringData(birthdate),
        address_state,
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

      if (!code) {
        errors.name = 'Código obrigatório!';
      }

      if (!name) {
        errors.name = 'Nome obrigatório!';
      }

      if (!email.trim()) {
        errors.email = 'E-mail obrigatório!';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.trim())
      ) {
        errors.email = 'Digite um e-mail válido!';
      }

      if (password.length < 4) {
        errors.password = 'A senha deve conter pelo menos 4 caracteres';
      }

      if (!email_personal.trim()) {
        errors.email_personal = 'E-mail pessoal obrigatório!';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email_personal.trim())
      ) {
        errors.email_personal = 'Digite um e-mail pessoal válido!';
      }

      if (!phone.trim()) {
        errors.phone = 'Telefone obrigatório!';
      } else if (
        MaskService.toMask('cel-phone', phone.trim(), {
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) ',
        }).length < 14
      ) {
        errors.phone = 'Digite um Telefone válido!';
      }

      if (sex === null) {
        errors.sex = message;
      }

      if (!doc) {
        errors.doc = 'CPF obrigatório!';
      } else if (doc.length < 14) {
        errors.doc = 'Digite um CPF válido!';
      }

      if (!birthdate) {
        errors.birthdate = message;
      }

      if (!address_state) {
        errors.address_state = message;
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
      <ImageBackground
        source={require('~/assets/bg-login.jpg')}
        style={styles.container}
        resizeMode="cover">
        <SafeAreaView style={{flex: 1}}>
          <ScrollView style={{flex: 1}} keyboardDismissMode="interactive">
            {/* <Avatar /> */}

            <Card>
              <Input
                value={code}
                error={!code}
                maxLength={50}
                autoCapitalize="characters"
                onChangeText={setCode}
                textContentType="code"
                autoCorrect={false}
                label="Código"
              />

              <TextError>{errors.code}</TextError>
            </Card>

            <Card>
              <Input
                value={name}
                error={!name}
                maxLength={14}
                onChangeText={setName}
                textContentType="name"
                autoCorrect={false}
                label="Nome"
              />

              <TextError>{errors.name}</TextError>

              <Input
                value={email}
                error={!email}
                maxLength={14}
                onChangeText={setEmail}
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCorrect={false}
                label="E-mail"
              />

              <TextError>{errors.email}</TextError>

              <Input
                value={email_personal}
                error={!email_personal}
                maxLength={14}
                onChangeText={setEmailPersonal}
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCorrect={false}
                label="E-mail pessoal"
              />

              <TextError>{errors.email_personal}</TextError>

              <Input
                value={MaskService.toMask('cpf', doc)}
                error={!doc}
                maxLength={14}
                keyboardType={'phone-pad'}
                onChangeText={setDoc}
                textContentType="username"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="CPF"
              />
              <TextError>{errors.doc}</TextError>

              {/* 
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
            
            <TextError>{errors.matricula}</TextError> */}

              {/* 
              <Input
                value={apcef}
                error={!apcef}
                maxLength={14}
                onChangeText={setApcef}
                autoCapitalize="characters"
                autoCorrect={false}
                label="APCEF"
              />
            
            <TextError>{errors.apcef}</TextError> */}

              <View
                style={{
                  backgroundColor: '#dfdfdf',
                  padding: Platform.OS === 'ios' ? 18 : 4,
                  marginTop: 10,
                }}>
                <Select
                  placeholder={{
                    label: 'APCEF',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  value={apcef}
                  onValueChange={value => setApcef(value)}
                  items={[
                    {value: 'APCEF/AC', label: 'APCEF/AC'},
                    {value: 'APCEF/AL', label: 'APCEF/AL'},
                    {value: 'APCEF/AP', label: 'APCEF/AP'},
                    {value: 'APCEF/AM', label: 'APCEF/AM'},
                    {value: 'APCEF/BA', label: 'APCEF/BA'},
                    {value: 'APCEF/CE', label: 'APCEF/CE'},
                    {value: 'APCEF/DF', label: 'APCEF/DF'},
                    {value: 'APCEF/ES', label: 'APCEF/ES'},
                    {value: 'APCEF/GO', label: 'APCEF/GO'},
                    {value: 'APCEF/MA', label: 'APCEF/MA'},
                    {value: 'APCEF/MT', label: 'APCEF/MT'},
                    {value: 'APCEF/MS', label: 'APCEF/MS'},
                    {value: 'APCEF/MG', label: 'APCEF/MG'},
                    {value: 'APCEF/PA', label: 'APCEF/PA'},
                    {value: 'APCEF/PB', label: 'APCEF/PB'},
                    {value: 'APCEF/PR', label: 'APCEF/PR'},
                    {value: 'APCEF/PE', label: 'APCEF/PE'},
                    {value: 'APCEF/PI', label: 'APCEF/PI'},
                    {value: 'APCEF/RJ', label: 'APCEF/RJ'},
                    {value: 'APCEF/RN', label: 'APCEF/RN'},
                    {value: 'APCEF/RS', label: 'APCEF/RS'},
                    {value: 'APCEF/RO', label: 'APCEF/RO'},
                    {value: 'APCEF/RR', label: 'APCEF/RR'},
                    {value: 'APCEF/SC', label: 'APCEF/SC'},
                    {value: 'APCEF/SP', label: 'APCEF/SP'},
                    {value: 'APCEF/SE', label: 'APCEF/SE'},
                    {value: 'APCEF/TO', label: 'APCEF/TO'},
                    {value: 'APCEF/EX', label: 'APCEF/EX'},
                  ]}
                />
              </View>

              <TextError>{errors.apcef}</TextError>

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

              <TextError>{errors.phone}</TextError>

              <View
                style={{
                  backgroundColor: '#dfdfdf',
                  padding: Platform.OS === 'ios' ? 18 : 4,
                }}>
                <Select
                  placeholder={{
                    label: 'Sexo',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  value={sex}
                  onValueChange={value => setSex(value)}
                  items={[
                    {label: 'Masculino', value: 1},
                    {label: 'Feminino', value: 0},
                  ]}
                />
              </View>
              <TextError>{errors.sex}</TextError>

              <View
                style={{
                  backgroundColor: '#dfdfdf',
                  padding: Platform.OS === 'ios' ? 18 : 4,
                  marginTop: 10,
                }}>
                <Select
                  placeholder={{
                    label: 'Estado',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  value={address_state}
                  onValueChange={value => setState(value)}
                  items={[
                    {value: 'AC', label: 'Acre'},
                    {value: 'AL', label: 'Alagoas'},
                    {value: 'AP', label: 'Amapá'},
                    {value: 'AM', label: 'Amazonas'},
                    {value: 'BA', label: 'Bahia'},
                    {value: 'CE', label: 'Ceará'},
                    {value: 'DF', label: 'Distrito Federal'},
                    {value: 'ES', label: 'Espírito Santo'},
                    {value: 'GO', label: 'Goiás'},
                    {value: 'MA', label: 'Maranhão'},
                    {value: 'MT', label: 'Mato Grosso'},
                    {value: 'MS', label: 'Mato Grosso do Sul'},
                    {value: 'MG', label: 'Minas Gerais'},
                    {value: 'PA', label: 'Pará'},
                    {value: 'PB', label: 'Paraíba'},
                    {value: 'PR', label: 'Paraná'},
                    {value: 'PE', label: 'Pernambuco'},
                    {value: 'PI', label: 'Piauí'},
                    {value: 'RJ', label: 'Rio de Janeiro'},
                    {value: 'RN', label: 'Rio Grande do Norte'},
                    {value: 'RS', label: 'Rio Grande do Sul'},
                    {value: 'RO', label: 'Rondônia'},
                    {value: 'RR', label: 'Roraima'},
                    {value: 'SC', label: 'Santa Catarina'},
                    {value: 'SP', label: 'São Paulo'},
                    {value: 'SE', label: 'Sergipe'},
                    {value: 'TO', label: 'Tocantins'},
                    {value: 'EX', label: 'Estrangeiro'},
                  ]}
                />
              </View>

              <TextError>{errors.address_state}</TextError>

              <Input
                value={MaskService.toMask('datetime', birthdate, {
                  format: 'DD/MM/YYYY',
                })}
                error={!birthdate}
                maxLength={11}
                keyboardType={'number-pad'}
                onChangeText={setBirthdate}
                autoCapitalize="none"
                autoCorrect={false}
                label="Data de nascimento"
              />

              <TextError>{errors.birthdate}</TextError>

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
            </Card>

            <View style={{flex: 1, marginBottom: 50, marginHorizontal: 10}}>
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
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
