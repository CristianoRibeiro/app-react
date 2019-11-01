import React from 'react';
import styled from 'styled-components/native';
import {Button, TextInput} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';
//import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Header = styled(LinearGradient).attrs({
  colors: ['#FF7272', '#FF7272'],
  start: {x: 1, y: 0},
  end: {x: 1, y: 1},
})`
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const Select = styled(RNPickerSelect).attrs({
  color: '#444',
  placeholderTextColor: '#777'
})`
  font-size: 16px;
  color: #222;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: #fff;
  font-weight: bold;
  padding: 0 20px;
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  color: #333;
  font-weight: 700;
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

export const Form = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export const Card = styled.View`
  margin: 10px;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: #fff;
`;

// export const Input = styled.TextInput.attrs({
//   placeholderTextColor: '#777',
//   keyboardAppearance: 'light',
//   maxLength: 255,
// })`
//   flex: 1;
//   padding: 12px 15px;
//   border-radius: 4px;
//   text-align: center;
//   font-size: 16px;
//   color: #222;
//   background: rgba(050, 050, 050, 0.1);
//   border: 1px solid ${props => (props.error ? '#FF7272' : '#ddd')};
// `;

export const Input = styled(TextInput).attrs({
  placeholderTextColor: '#777',
  keyboardAppearance: 'light',
  maxLength: 255,
})`
  flex: 1;
  border-radius: 4px;
  font-size: 16px;
  color: #222;
`;

export const Submit = styled.TouchableOpacity`
  background: #0f60a8;
  margin-left: 10px;
  justify-content: center;
  border-radius: 4px;
  padding: 0 14px;
`;

export const Send = styled(Button).attrs({
  mode: 'contained',
})`
  background: #0058b8;
  border-radius: 5px;
  border: 1px solid #fff;
`;

export const Link = styled.TouchableOpacity`
  flex: 1;
  padding: 14px;
  color: #222;
`;

export const TextError = styled.Text`
  font-size: 14px;
  color: #e57373;
  font-weight: 600;
`;
