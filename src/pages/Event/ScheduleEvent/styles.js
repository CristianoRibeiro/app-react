import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from "react-native-linear-gradient";
import {Button, TextInput} from 'react-native-paper';
//import LinearGradient from 'react-native-linear-gradient';
//import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Title = styled.Text`
  font-size: 32px;
  color: #FFF;
  font-weight: bold;
  padding: 0 20px;
`;

export const SubTitle = styled.Text`
  font-size: 14;
  color: #333;
  font-weight: 400;
`;

export const TextLight = styled.Text`
  font-size: 14;
  color: #FFF;
  font-weight: 600;
  padding: 0 20px;
`;

export const TextDark = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: 600;
`;

export const EventTitle = styled.Text`
  font-size: 16px;
  color: #0058b8;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 5px;
`;

export const EventDate = styled.Text`
  font-size: 10px;
  color: #7c7c7c;
  font-weight: bold;
  margin: 5px 0 0 0;
`;

export const EventLink = styled.Text`
  font-size: 10px;
  color: #ef7106;
  margin: 5px 0;
`;

export const Card = styled.View`
  margin: 5px;
  border-radius: 5px;
  padding: 8px 10px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
`;

export const Submit = styled.TouchableOpacity`
  background: #0F60A8;
  margin-left: 10px;
  justify-content: center;
  border-radius: 4px;
  padding: 0 14px;
`;

export const Send = styled.TouchableOpacity`
  background: rgba(000,000,000, 0.2);
  margin-left: 10px;
  margin-right: 10px;
  justify-content: center;
  border-radius: 30px;
  padding: 15px 14px;
  align-items: center;
  border: 1px solid #fff;
  flex: 1;
`;


export const Link = styled.TouchableOpacity`
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: { paddingHorizontal: 20 },
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const TextTitle = styled.Text`
  font-size: 28px;
  color: #fff;
  margin: 5px 0;
`;


export const ButtonDark = styled(Button).attrs({
  mode: 'contained',
})`
  background: #0058b8;
  border-radius: 5px;
  border: 1px solid #fff;
`;
