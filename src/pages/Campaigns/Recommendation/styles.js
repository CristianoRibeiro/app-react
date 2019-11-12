import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from 'react-native-paper';
//import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Title = styled.Text`
  font-size: 32px;
  color: #fff;
  font-weight: bold;
  padding: 0 20px;
`;

export const SubTitle = styled.Text`
  font-size: 14;
  color: #333;
  font-weight: 300;
`;

export const TextLight = styled.Text`
  font-size: 14;
  color: #fff;
  font-weight: 600;
  padding: 0 20px;
`;

export const TextDark = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: 600;
`;

export const UserTitle = styled.Text`
  font-size: 12px;
  color: #0058b8;
  font-weight: bold;
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

export const Form = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding: 0 10px;
`;

export const Card = styled.View`
  margin: 2px;
  border-radius: 5px;
  padding: 2px 2px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
`;

export const CardImage = styled.View`
  padding: 2px 8px 2px 2px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
  keyboardAppearance: 'light',
  maxLength: 255,
})`
  flex: 1;
  padding: 0px 10px;
  border-radius: 4px;
  font-size: 16px;
  color: #444;
  background: #fff;
  border: 1px solid ${props => (props.error ? '#FF7272' : '#FFf')};
`;

export const Send = styled(Button).attrs({
  mode: 'outlined',
})`
  padding: 0px;
  border-radius: 5px;
`;

export const Search = styled(Button).attrs({
  mode: 'contained',
})`
  border-radius: 5px;
`;

export const Link = styled.TouchableOpacity`
  flex: 1;
  color: #fff;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: {paddingHorizontal: 20},
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const TextTitle = styled.Text`
  font-size: 28px;
  color: #fff;
  margin: 5px 0;
`;

export const Header = styled(LinearGradient).attrs({
  colors: ['#FF7272', '#FF7272'],
  start: { x: 1, y: 0 },
  end: { x: 1, y: 1 },
})`
  padding-top: 10px;
  padding-bottom: 10px;
`;