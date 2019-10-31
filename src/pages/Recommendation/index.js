import React, {useState, useEffect, Component} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Alert,
  Image,
  StyleSheet,
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

  const [name, setName] = useState('');
  const [reg, setReg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {}, []);

  async function _send() {
    setLoading(true);
    if (!name) {
      setError(true);
    }
    else if (!reg) {
      setError(true);
    } else {
      setError(false);
      try {
        let response = await api.post('/api/indicate', {name, reg});
        Alert.alert(null, response.data.message);
        if (__DEV__) {
          console.tron.log(response.data);
        }
        // if (response.data.success) {
        //   await dispatch({type: 'VOUCHER', payload: response.data.vouchers});
        // }
      } catch (error) {
        if (__DEV__) {
          console.tron.log(error);
        }
      }
    }
    setLoading(false);
  }

  return (
    <Content>
      <Card>
        <TextDark>
          Indique um amigo
        </TextDark>

        <KeyboardAvoidingView behavior={'padding'}>
          <Form>
            <Input
              value={name}
              error={error}
              maxLength={255}
              onChangeText={setName}
              autoCapitalize="words"
              autoCorrect={false}
              placeholder="Nome"
            />
          </Form>

          <Form>
            <Input
              value={reg}
              error={error}
              maxLength={15}
              onChangeText={setReg}
              keyboardType={'number-pad'}
              autoCorrect={false}
              placeholder="Matrícula"
            />
          </Form>

          <Send
            loading={loading}
            disabled={loading}
            onPress={() => _send()}
            style={{marginTop: 15}}>
            <TextLight>OK</TextLight>
          </Send>
        </KeyboardAvoidingView>
      </Card>
    </Content>
  );
}
