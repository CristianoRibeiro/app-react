import React from 'react';
import styled from 'styled-components/native';
//import LinearGradient from 'react-native-linear-gradient';
//import { getStatusBarHeight } from 'react-native-status-bar-height';

// export const Container = styled(LinearGradient).attrs({
//   colors: ['#0F60A8', '#2f8038'],
//   start: { x: 0, y: 0 },
//   end: { x: 1, y: 1 },
// })`
//   flex: 1;
//   padding-top: ${30 + getStatusBarHeight(true)}px;
// `;


export const Title = styled.Text`
  font-size: 32px;
  color: #FFF;
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
  color: #FFF;
  font-weight: 600;
  padding: 0 20px;
`;

export const TextDark = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: 600;
`;

export const TextError = styled.Text`
  font-size: 14px;
  color: #e57373;
  font-weight: 600;
`;

export const Form = styled.View`
  padding: 10px;
`;

export const Card = styled.View`
  margin: 10px;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: #fff;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#777',
  keyboardAppearance: 'light',
  maxLength: 255
})`
  flex: 1;
  padding: 12px 15px;
  border-radius: 4px;
  font-size: 16px;
  color: #0F60A8;
  background: rgba(000,000,000, 0.1);
  border: 1px solid ${props => (props.error ? '#FF7272' : '#FFf')};
`;

export const Submit = styled.TouchableOpacity`
  background: #0F60A8;
  margin-left: 10px;
  justify-content: center;
  border-radius: 4px;
  padding: 0 14px;
`;

export const Send = styled.TouchableOpacity`
  background: #0F60A8;
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
flex: 1;
  padding: 14px;
  color: #fff
`;