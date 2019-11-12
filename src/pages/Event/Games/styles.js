import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
//import LinearGradient from 'react-native-linear-gradient';
//import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Title = styled.Text`
  font-size: 14px;
  color: #444;
  font-weight: 500;
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

export const Info = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Card = styled.View`
  margin: 5px;
  border-radius: 5px;
  padding: 30px 5px;
  background-color: #fff;
  display: flex;
  align-items: center;
`;

export const Link = styled.TouchableOpacity`
  flex: 1;
  color: #fff;
`;

export const Header = styled(LinearGradient).attrs({
  colors: ['#051538', '#041c50'],
  start: {x: 1, y: 0},
  end: {x: 1, y: 1},
})`
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const TextTitle = styled.Text`
  font-size: 18px;
  color: #fff;
  margin: 5px 0;
`;
