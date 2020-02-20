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
  const [modal, setModal] = useState(false);

  useState(() => {
    // _redirect();
  }, []);


  return (
    <Container>

    </Container>
  );
}
