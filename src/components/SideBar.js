import React, {useState, useEffect, Component} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  Text,
  Image,
  StyleSheet,
  Dimensions,
  View,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Alert,
  AsyncStorage
} from 'react-native';
import {Drawer} from 'react-native-paper';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  Content,
  Title,
  Form,
  Input,
  Submit,
  List,
  TextLight,
  DrawerItem,
  TextDark,
  Link,
  Send,
  SubTitle,
} from './styles';
import {User} from '~/model/User';

export default function SiderBar(props) {
  const data = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [user, setUser] = useState(data ? data : User);

  useEffect(() => {
    //alert(JSON.stringify(user));
  }, []);

  function _exit(){
    Alert.alert(
      '',
      'Deseja sair?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
            AsyncStorage.removeItem('token');
            props.navigation.navigate('Auth');
          }},
      ],
      {cancelable: false},
    );
  }
  return (
    <Container>
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center', paddingVertical: 20}}>
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <Image
              source={{uri: user.append_avatar}}
              style={{
                height: 150,
                width: 150,
                borderRadius: 75,
              }}
              resizeMode="cover"
            />
          </View>

          <SubTitle style={{marginTop: 10}}>{user.name}</SubTitle>
          <TextLight>{user.email}</TextLight>
        </View>

        <DrawerNavigatorItems {...props} activeTintColor={'#3F51B5'} />

        <Link style={{marginBottom: 15}} onPress={()=>_exit()}>
          <DrawerItem
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: props.focused ? '#3F51B5' : 'transparent',
            }}>
            <View
              style={{
                width: 3,
                backgroundColor: props.focused ? '#ff8206' : 'transparent',
                minHeight: 50,
              }}></View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
              }}>
              <MaterialCommunityIcons
                name="exit-to-app"
                size={28}
                color={'rgba(255,255,255, 0.8)'}
              />
            </View>

            <View style={{flex: 1, justifyContent: 'center'}}>
              <TextLight>Sair</TextLight>
            </View>
          </DrawerItem>
        </Link>
      </ScrollView>

    </Container>
  );
}
