import React, {useState, useEffect, Component} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Alert,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  View,
  ScrollView,
  FlatList,
  RefreshControl,
  KeyboardAvoidingView,
} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EmptyList from '~/components/EmptyList';

import api from '~/services/api';

import {
  Title,
  SubTitle,
  Header,
  TextDark,
  TextLight,
  Card,
  Link,
  TextDate,
  Input,
  Form,
  Send,
} from './styles';

import {Container, Content} from '../../style';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF6666',
  },
});

export default function Main(props) {
  //const data = useSelector(state => state.voucher);
  const dispatch = useDispatch();

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {}, []);

  async function _send() {
    setLoading(true);
    if (!code) {
      setError(true);
    } else {
      setError(false);
      try {
        let response = await api.post('/api/code/fill', {code});
        Alert.alert(null, response.data.message);
        if (__DEV__) {
          console.tron.log(response.data);
        }
        if (response.data.success) {
          await dispatch({type: 'VOUCHER', payload: response.data.vouchers});
        }
      } catch (error) {
        if (__DEV__) {
          console.tron.log(error.message);
        }
      }
    }
    setLoading(false);
  }

  return (
    <Content>
      <Card>
        <TextDark>
          Insira o código que consta no ingresso que você recebeu para validar
          seu voucher de acesso ao evento.
        </TextDark>

        <KeyboardAvoidingView behavior={'padding'}>
          <Form>
            <Input
              value={code}
              error={error}
              maxLength={14}
              onChangeText={setCode}
              autoCapitalize="characters"
              autoCorrect={false}
              placeholder="Código"
            />
          </Form>

          <Send
            loading={loading}
            disabled={loading}
            onPress={() => _send()}
            style={{marginTop: 15}}>
            <TextLight>ATUALIZAR MEUS DADOS</TextLight>
          </Send>
        </KeyboardAvoidingView>
      </Card>
    </Content>
  );
}
