import React, {useState, useEffect, Component} from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert, RefreshControl, FlatList,
  Linking
} from 'react-native';
import {Container, Content} from '../../style';
import EmptyList from "~/components/EmptyList";

export default function Whatsapp(props) {

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useState(() => {
    // _redirect();
  }, []);

  function _redirect(redirect) {
    const msg = 'Olá! Estou navegando no aplicativo Viva Fenae/Apcef.';
    Linking.openURL('whatsapp://send?text=' + msg + '&phone=5561981428428');
    alert('O Whatsapp será aberto.');

    props.navigation.navigate('Home');
  }

  return (
    <Container>
      <Content>
        <FlatList
          data={[]}
          initialNumToRender={10}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View>
              <EmptyList text="Clique no botão abaixo apara abrir o Whatsapp." />
              <Button
                title="Abrir Whatsapp"
                onPress={() => _redirect()}
              />
            </View>
          }
          renderItem={({item, index}) => _renderItem(item, index)}
        />
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 140,
    marginHorizontal: 16,
    marginTop: -10,
    position: 'relative'
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  }
});
