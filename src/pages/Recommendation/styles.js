import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Button} from 'react-native-paper';

export const Send = styled(Button).attrs({
  mode: 'contained',
})`
  background: #0058b8;
  border-radius: 5px;
  border: 1px solid #fff;
`;

export const Title = styled.Text`
  font-size: 20;
  color: #222;
  font-weight: bold;
`;

export const Header = styled.View`
  margin: 5px;
  padding: 7px;
  padding-top: ${5 + getStatusBarHeight(true)}px;
`;

export const SubTitle = styled.Text`
  font-size: 14;
  color: #333;
  font-weight: 300;
`;

export const TextDate = styled.Text`
  font-size: 12;
  color: #666;
  font-weight: 300;
  text-align: right;
`;

export const TextLight = styled.Text`
  font-size: 16;
  color: #fff;
  font-weight: 600;
  padding: 0 20px;
`;

export const TextDark = styled.Text`
  font-size: 14;
  margin-top: 5px;
  color: #666;
  font-weight: 600;
`;

export const Link = styled.TouchableOpacity`
  padding: 2px;
`;

export const Card = styled.View`
  margin: 5px;
  border-radius: 5px;
  padding: 7px;
  background-color: #fff;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#777',
  keyboardAppearance: 'light',
  maxLength: 255,
})`
  flex: 1;
  padding: 12px 15px;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
  color: #222;
  background: rgba(050, 050, 050, 0.1);
  border: 1px solid ${props => (props.error ? '#FF7272' : '#ddd')};
`;

export const Form = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

// export const Send = styled.TouchableOpacity`
//   background:  #0058B8;
//   margin-left: 10px;
//   margin-right: 10px;
//   justify-content: center;
//   border-radius: 30px;
//   padding: 15px 14px;
//   align-items: center;
//   border: 1px solid #fff;
//   flex: 1;
// `;