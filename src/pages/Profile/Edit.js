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
import {Avatar, FAB} from 'react-native-paper';
import {parseISO, format, formatRelative, formatDistance} from 'date-fns';
import {ActivityIndicator, Colors} from 'react-native-paper';
import {MaskService} from 'react-native-masked-text';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '~/services/api';

import {
  Title,
  Form,
  Input,
  Submit,
  Link,
  TextLight,
  Card,
  TextDark,
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

  const [image, setImage] = useState(user.avatar ? {uri: user.append_avatar} : '');

  const [photo, setPhoto] = useState(user ? user.append_avatar : '');
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [email_personal, setEmailPersonal] = useState(user ? user.email_personal : '');
  const [matricula, setMatricula] = useState(user ? user.matricula : '');
  const [apcef, setApcef] = useState(user ? user.apcef : '');
  const [phone, setPhone] = useState(user.phone ? user.phone.trim() : '');
  const [sex, setSex] = useState(user ? user.sex === 'Masculino' ? 1 : user.sex === 'Feminino' ? 0 : '' : '');
  const [address_state, setState] = useState(user ? user.address_state : '');
  const [birthdate, setBirthdate] = useState(user.formatedData ?user.formatedData : '');
  const [shirt, setShirt] = useState(user ? user.shirt : '');
  const [frase, setFrase] = useState(user ? user.campaign_phrase : '');
  const [whatsapp, setWhatsapp] = useState(user.whatsapp ? user.whatsapp.trim() : '');
  const [facebook, setFacebook] = useState(user ? user.facebook : '');
  const [instagram, setInstagram] = useState(user ? user.instagram : '');

  const [modal, setModal] = useState(false);
  const [editable, setEditable] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {

    if (props.navigation.state.params) {
      if (props.navigation.state.params.edit) {
        setEditable(true);
      }

    }
    // else{
    //   setEditable(false);
    // }

    try {
      if (__DEV__) {
        console.tron.log(props.navigation.state.params.edit);
      }
    } catch (e) {

    }
  }, []);

  function formataStringData(data) {
    var dia = data.split('/')[0];
    var mes = data.split('/')[1];
    var ano = data.split('/')[2];

    return ano + '-' + ('0' + mes).slice(-2) + '-' + ('0' + dia).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  }

  async function _send() {
    let p = await MaskService.toMask('only-numbers', phone);

    try {
      setModal(true);

      const data = new FormData();

      data.append('image', image);
      try {
        let response = await api.post('/api/avatar', data);

        //alert(JSON.stringify(response));
        if (__DEV__) {
          console.tron.log(response.data);
        }
      } catch (error) {
        //Alert.alert(null, 'Erro ao enviar foto de perfil!');
      }

      const send = {
        phone: p.trim(),
        name,
        email: email.trim(),
        email_personal: email_personal.trim(),
        apcef,
        sex,
        birthdate: formataStringData(birthdate),
        uf: address_state,
        shirt: shirt,
        campaign_phrase: frase,
        whatsapp,
        facebook,
        instagram
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

      if (image.length < 68) {
        errors.photo = 'Foto obrigatória!';
      } else if (!name) {
        errors.name = 'Nome obrigatório!';
      } else if (!email.trim()) {
        errors.email = 'E-mail obrigatório!';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.trim())) {
        errors.email = 'Digite um e-mail válido!';
      }
      else if (!email_personal) {
        errors.email_personal = 'E-mail pessoal obrigatório!';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email_personal.trim())
      ) {
        errors.email_personal = 'Digite um e-mail pessoal válido!';
      }
      else if (!phone.trim()) {
        errors.phone = 'Telefone obrigatório!';
      } else if (
        MaskService.toMask('cel-phone', phone.trim(), {
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) ',
        }).length < 14
      ) {
        errors.phone = 'Digite um Telefone válido!';
      } else if (sex === null) {
        errors.sex = message;
      } else if (!birthdate) {
        errors.birthdate = message;
      } else if (!address_state) {
        errors.address_state = message;
      } else if (!shirt) {
        errors.shirt = message;
      }
      // else if (user.registered_inspira) {
      //   if (!frase) {
      //     errors.frase = message;
      //   }
      // }

      // else if (!whatsapp) {
      //   errors.whatsapp = message;
      // } else if (!facebook) {
      //   errors.facebook = message;
      // } else if (!instagram) {
      //   errors.instagram = message;
      // }

      return errors;
    },
    onSubmit: (values, bag) => {
      _send();
    },
  });

  async function _uploadPhoto() {
    const options = {
      title: 'Selecione de onde quer importar o arquivo',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Usar Camera',
      chooseFromLibraryButtonTitle: 'Carregar da galeria',
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
    });
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled>
      <Content style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
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

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                padding: 15,
              }}>
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

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                  backgroundColor: 'rgba(000,000,000, 0.1)',
                  paddingLeft: 10,
                  borderRadius: 40,
                  padding: 0
                }}>
                <TextDark>Editar Foto</TextDark>

                <Link
                  rippleColor="rgba(0, 0, 0, .32)"
                  style={{marginVertical: 0}}
                  onPress={() => _uploadPhoto()}>
                  <Avatar.Icon size={42} icon="folder"/>
                </Link>
              </View>
            </View>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <TextError>{errors.photo}</TextError>
            </View>

            <Card>
              <Form>
                <Input
                  disabled={editable}
                  value={name}
                  error={errors.name}
                  maxLength={255}
                  onChangeText={setName}
                  textContentType="name"
                  autoCorrect={false}
                  label="Nome"
                />
              </Form>
              <TextError>{errors.name}</TextError>

              <Form>
                <Input
                  disabled={editable}
                  value={email}
                  error={errors.email}
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
                  error={errors.email_personal}
                  maxLength={14}
                  onChangeText={text => setEmailPersonal(text.trim())}
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
                  disabled={editable}
                  placeholder={{
                    label: 'APCEF',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  value={apcef.trim()}
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
                  disabled={editable}
                  value={MaskService.toMask('cel-phone', phone, {
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  })}
                  error={errors.phone}
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
                  disabled={editable}
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
                  disabled={editable}
                  value={MaskService.toMask('datetime', birthdate, {
                    format: 'DD/MM/YYYY',
                  })}
                  error={errors.birthdate}
                  maxLength={11}
                  keyboardType={'number-pad'}
                  onChangeText={setBirthdate}
                  autoCapitalize="none"
                  autoCorrect={false}
                  label="Data de nascimento"
                />
              </Form>
              <TextError>{errors.birthdate}</TextError>

              <View style={{backgroundColor: '#dfdfdf', padding: Platform.OS === 'ios' ? 18 : 4}}>
                <Select
                  placeholder={{
                    label: 'Tamanho de camiseta',
                    value: null,
                    color: '#9EA0A4',
                  }}
                  selectText="Dia de preferência"
                  value={shirt}
                  onValueChange={value => setShirt(value)}
                  items={[
                    {label: 'P', value: 'P'},
                    {label: 'M', value: 'M'},
                    {label: 'G', value: 'G'},
                    {label: 'GG', value: 'GG'},
                    {label: 'XGG', value: 'XGG'},
                  ]}
                />
              </View>
              <TextError>{errors.shirt}</TextError>

              <Form>
                <Input
                  autoCapitalize="none"
                  value={facebook}
                  error={errors.facebook}
                  maxLength={255}
                  onChangeText={setFacebook}
                  autoCorrect={false}
                  label="Facebook"
                />
              </Form>
              <TextError>{errors.facebook}</TextError>

              <Form>
                <Input
                  autoCapitalize="none"
                  value={instagram}
                  error={errors.instagram}
                  maxLength={255}
                  onChangeText={setInstagram}
                  autoCorrect={false}
                  label="Instagram"
                />
              </Form>
              <TextError>{errors.instagram}</TextError>

              <Form>
                <Input
                  value={MaskService.toMask('cel-phone', whatsapp, {
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) ',
                  })}
                  error={errors.whatsapp}
                  maxLength={14}
                  keyboardType={'phone-pad'}
                  onChangeText={setWhatsapp}
                  textContentType="telephoneNumber"
                  autoCapitalize="none"
                  autoCorrect={false}
                  label="Whatsapp"
                />
              </Form>
              <TextError>{errors.whatsapp}</TextError>

              {user.sex == 'Feminino' ?
                <View>
                  <TextDark style={{paddingLeft: 0, marginBottom: 5}}>Mês da mulher: escreva uma frase com o tema "Lute como uma bancária"</TextDark>
                  <View style={{borderWidth: 1, borderColor: '#ccc', padding: 8, borderStyle: 'dashed'}}>
                    <Form style={{marginTop: 2, marginBottom: 2}}>
                      <Input
                        value={frase}
                        multiline
                        numberOfLines={3}
                        onChangeText={setFrase}
                        autoCorrect={true}
                        maxLength={255}
                        label=""
                      />
                    </Form>

                  </View>
                </View>
                : null}
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
                  color={Colors.blue400}
                />
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Content>
    </KeyboardAvoidingView>
  );
}

//Tamanho da camiseta P,M,G,GG,XGG
//Frase - inscritos no evento Inspira
//Rededes sociais facebook, whatsApp, Instagram.
//Editar email pessoal
//Foto obrigatoria
