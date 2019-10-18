import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

// export const Container = styled(LinearGradient).attrs({
//   colors: ['#0F60A8', '#2f8038'],
//   start: { x: 0, y: 0 },
//   end: { x: 1, y: 1 },
// })`
//   flex: 1;
//   padding-top: ${30 + getStatusBarHeight(true)}px;
// `;


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
  color: #333;
  font-weight: 600;
  padding: 0 20px;
`;

export const TextDark = styled.Text`
  font-size: 16;
  margin-top: 10px;
  color: #0058B8;
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