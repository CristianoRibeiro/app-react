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
  FlatList,
} from 'react-native';
import FitImage from 'react-native-fit-image';
import Banner from '~/pages/Main/Banner';

import api from '~/services/api';

import {Title, Header, TextDark, Card, Link} from './styles';

import {Container, Content} from '../../style';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Main(props) {
  const [events, setEvents] = useState([
    {
      url: 'https://picsum.photos/1280/1280',
      image: 'https://picsum.photos/1280/1280',
    },
    {
      url: 'https://picsum.photos/1280/1280',
      image: 'https://picsum.photos/1280/1280',
    },
    {
      url: 'https://picsum.photos/1280/1280',
      image: 'https://picsum.photos/1280/1280',
    },
    {
      url: 'https://picsum.photos/1280/1280',
      image: 'https://picsum.photos/1280/1280',
    },
  ]);
  const [error, setError] = useState(false);

  useEffect(() => {}, []);

  function _renderItem({item, index}) {
    return (
      <TouchableOpacity style={{flexBasis: 0}}>
        <Card style={{flex: 1, padding: 4}}>
          <Image
            source={{
              uri:
                'https://www.fenae.org.br/portal/data/files/53/03/D9/DF/2FDC4610EE5BBC46403A91A8/FENAE.jpg',
            }}
            resizeMode="cover"
            style={{height: 50, width: 50, flex: 1}}
          />

          <TextDark>Evento</TextDark>
        </Card>
      </TouchableOpacity>
    );
  }
  return (
    <Content>
      <ScrollView>
        <Banner />

        <View>
          {/* {events.map((item, index) =>
              _renderItem({item, index})
            )} */}
          {/* <FlatList
          data={events}
          keyExtractor={item => item.id}
          numColumns={3}
          renderItem={({ item }) => _renderItem(item)}
        /> */}

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Link>
              <Card>
                <Image
                  source={{
                    uri:
                      'https://www.fenae.org.br/portal/data/files/53/03/D9/DF/2FDC4610EE5BBC46403A91A8/FENAE.jpg',
                  }}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>Evento </TextDark>
              </Card>
            </Link>

            <Link>
              <Card>
                <Image
                  source={{
                    uri:
                      'https://www.fenae.org.br/portal/data/files/53/03/D9/DF/2FDC4610EE5BBC46403A91A8/FENAE.jpg',
                  }}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>Evento </TextDark>
              </Card>
            </Link>

            <Link>
              <Card>
                <Image
                  source={{
                    uri:
                      'https://www.fenae.org.br/portal/data/files/53/03/D9/DF/2FDC4610EE5BBC46403A91A8/FENAE.jpg',
                  }}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>Evento </TextDark>
              </Card>
            </Link>

            <Link>
              <Card>
                <Image
                  source={{
                    uri:
                      'https://www.fenae.org.br/portal/data/files/53/03/D9/DF/2FDC4610EE5BBC46403A91A8/FENAE.jpg',
                  }}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="contain"
                />
                <TextDark>Evento </TextDark>
              </Card>
            </Link>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Link>
            <Card>
              <Image
                source={{
                  uri:
                    'https://www.fenae.org.br/portal/data/files/53/03/D9/DF/2FDC4610EE5BBC46403A91A8/FENAE.jpg',
                }}
                style={{
                  height: 50,
                  width: 50,
                }}
                resizeMode="contain"
              />
              <TextDark>Evento </TextDark>
            </Card>
          </Link>

          <Link>
            <Card>
              <Image
                source={{
                  uri:
                    'https://www.fenae.org.br/portal/data/files/53/03/D9/DF/2FDC4610EE5BBC46403A91A8/FENAE.jpg',
                }}
                style={{
                  height: 50,
                  width: 50,
                }}
                resizeMode="contain"
              />
              <TextDark>Evento </TextDark>
            </Card>
          </Link>

          <Link>
            <Card>
              <Image
                source={{
                  uri:
                    'https://www.fenae.org.br/portal/data/files/53/03/D9/DF/2FDC4610EE5BBC46403A91A8/FENAE.jpg',
                }}
                style={{
                  height: 50,
                  width: 50,
                }}
                resizeMode="contain"
              />
              <TextDark>Evento </TextDark>
            </Card>
          </Link>

          <Link>
            <Card>
              <Image
                source={{
                  uri:
                    'https://www.fenae.org.br/portal/data/files/53/03/D9/DF/2FDC4610EE5BBC46403A91A8/FENAE.jpg',
                }}
                style={{
                  height: 50,
                  width: 50,
                }}
                resizeMode="contain"
              />
              <TextDark>Evento </TextDark>
            </Card>
          </Link>
        </View>
      </ScrollView>
    </Content>
  );
}
