import React, {useState, useEffect, Component} from 'react';

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
} from 'react-native';

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

export default function Profile(props) {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {}, []);

  return (
    <ImageBackground
      source={require('~/assets/bg-login.jpg')}
      style={styles.container}
      resizeMode="cover">
      <ScrollView style={{flex: 1}} keyboardDismissMode="interactive">
        <StatusBar
          translucent
          backgroundColor="transparent"
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
              value={cpf}
              error={error}
              onChangeText={setCpf}
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
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Senha"
              secureTextEntry={true}
            />
          </Form>
        </KeyboardAvoidingView>

        <View style={{flex: 1, alignItems: 'center', marginBottom: 20}}>
          <Link style={{marginTop: 5, marginBottom: 20}}>
            <TextLight>Esqueci minha senha</TextLight>
          </Link>

          <TextLight>Não tem cadastro? Registre-se aqui</TextLight>
          <Send style={{marginTop: 15}}>
            <TextLight>CADASTRAR</TextLight>
          </Send>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
