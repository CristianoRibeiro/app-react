import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from "react-native-linear-gradient";
import {Button} from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
//import LinearGradient from 'react-native-linear-gradient';
//import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Title = styled.Text`
  font-size: 18;
  color: #444;
  font-weight: bold;
  padding: 0 10px;
  margin-top: 25px;
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
`;

export const TextDark = styled.Text`
  font-size: 14px;
  color: #555;
  font-weight: 600;
`;

export const Select = styled(RNPickerSelect).attrs({
  color: '#444',
  placeholderTextColor: '#777',
})`
  font-size: 16px;
`;

export const Form = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding: 0 10px;
`;

export const Card = styled.View`
  margin: 3px;
  border-radius: 3px;
  padding: 5px 5px;
  background-color: #fff;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
  keyboardAppearance: 'dark',
  maxLength: 255
})`
  flex: 1;
  padding: 12px 15px;
  border-radius: 4px;
  color: #222;
  background: rgba(200,200,200, 0.1);
  border: 1px solid ${props => (props.error ? '#FF7272' : '#FFf')};
`;

export const Submit = styled.TouchableOpacity`
  background: #0F60A8;
  margin-left: 10px;
  justify-content: center;
  border-radius: 4px;
  padding: 0 14px;
`;

export const Send = styled(Button).attrs({
  mode: 'contained',
  color: '#0D4274'
})`
  border-radius: 5px;
  border: 1px solid #fff;
`;

export const Btn = styled(Button).attrs({
  mode: 'text',
  uppercase: true,
  color: '#fff'
})`
  border-radius: 5px;
  border: 1px solid #fff;
`;

export const Link = styled.TouchableOpacity`
flex: 1;
  color: #fff
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: { paddingHorizontal: 20 },
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Header = styled(LinearGradient).attrs({
  colors: ['#fff', '#fff'],
  start: { x: 1, y: 0 },
  end: { x: 1, y: 1 },
})`
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const TextTitle = styled.Text`
  font-size: 28px;
  color: #fff;
  margin: 5px 0;
`;


// export const Image = styled.Image`
//   width: 100%;
//   aspect-ratio: ${props => props.aspect};
// `;
