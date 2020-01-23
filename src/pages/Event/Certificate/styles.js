import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from "react-native-linear-gradient";
import {Button, TextInput} from 'react-native-paper';
//import LinearGradient from 'react-native-linear-gradient';
//import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Title = styled.Text`
  font-size: 13;
  color: #444;
  font-weight: 500;
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  color: #333;
  font-weight: 700;
`;

export const TextLight = styled.Text`
  font-size: 14;
  color: #FFF;
  font-weight: 600;
  padding: 0 20px;
`;

export const TextDark = styled.Text`
  font-size: 14px;
  color: #555;
  font-weight: 600;
`;


export const Card = styled.View`
  margin: 3px;
  border-radius: 5px;
  padding: 10px 5px;
  background-color: #fff;
`;

export const Link = styled.TouchableOpacity`
  flex: 1;
`;

export const ButtonDark = styled(Button).attrs({
  mode: 'contained',
})`
  background: #0058b8;
  border-radius: 5px;
  border: 1px solid #fff;
`;
