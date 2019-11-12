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
  Platform
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
  const [phone, setPhone] = useState(user.phone ? user.phone.trim() : '');
  const [sex, setSex] = useState(user ? user.sex : '');
  const [address_state, setState] = useState(user ? user.address_state : '');
  const [birthdate, setBirthdate] = useState(
    user.birthdate ? format(parseISO(user.birthdate), 'dd/MM/YYY') : '',
  );
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
    let p = await MaskService.toMask('only-numbers', phone);

    try {
      setModal(true);

      const send = {
        phone: p.trim(),
        name,
        email: email.trim(),
        email_personal: email_personal.trim(),
        apcef,
        sex,
        birthdate: formataStringData(birthdate),
        address_state
      };

      if (__DEV__) {
        console.tron.log(send);
      }

      let response = await api.post('/api/auth/update', send);

      if (response.data.success) {
        await dispatch({type: 'USER', payload: response.data.user});
      }

      props.navigation.navigate('Profile');
      //alert(JSON.stringify(response));
      if (__DEV__) {
        console.tron.log(response.data);
      }
    } catch (error) {
      //Alert.alert(null, error.message);
      if (__DEV__) {
        console.tron.log(error.message);
      }
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
      } else if (
        MaskService.toMask('cel-phone', phone, {
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
    <Content style={{flex:1}}>
      <SafeAreaView style={{flex:1}}>
      <ScrollView style={{flex: 1}} keyboardDismissMode="interactive">
        <Header>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="account-circle"
              size={20}
              color={'#fff'}
            />

            <TextLight>Mantenha seus dados atualizados</TextLight>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}></View>
        </Header>

        <Avatar />

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
                value={email}
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
                value={email_personal}
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

            {/* <Form>
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
            <TextError>{errors.apcef}</TextError> */}

            <View
              style={{backgroundColor: '#dfdfdf', padding: Platform.OS === 'ios' ? 18 : 4, marginTop: 10}}>
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

            <View style={{backgroundColor: '#dfdfdf', padding: Platform.OS === 'ios' ? 18 : 4}}>
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
              style={{backgroundColor: '#dfdfdf', padding: Platform.OS === 'ios' ? 18 : 4, marginTop: 10}}>
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

            <Form>
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
            </Form>
            <TextError>{errors.birthdate}</TextError>
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
    </Content>
    </KeyboardAvoidingView>
  );
}
