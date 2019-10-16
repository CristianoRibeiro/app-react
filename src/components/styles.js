import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Container = styled(LinearGradient).attrs({
  colors: ['#0F60A8', '#2f8038'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  flex: 1;
  padding-top: ${30 + getStatusBarHeight(true)}px;
`;


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


export const DrawerItem = styled.View`
  margin: 10px;
  border-radius: 5px;
  padding: 5px 10px;
`;
