import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Container = styled(LinearGradient).attrs({
  colors: ['#2196F3', '#2196F3'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  flex: 1;
`;


export const Title = styled.Text`
  font-size: 32px;
  color: #FFF;
  font-weight: bold;
  padding: 0 20px;
`;

export const TitleList = styled.Text`
  font-size: 12;
  color: #444;
  font-weight: 300;
`;

export const TextList = styled.Text`
  font-size: 15px;
  color: #333;
  font-weight: 500;
`;

export const SubTitle = styled.Text`
  font-size: 20px;
  color: #fff;
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


export const DrawerItem = styled.View`
  margin: 1px;
`;
