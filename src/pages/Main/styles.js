import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { Animated } from 'react-native'
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
  font-size: 16;
  color: #FFF;
  font-weight: 600;
`;

export const TextDark = styled.Text`
  font-size: 16;
  margin-top: 10px;
  color: #ED7202;
  font-weight: 600;
`;

export const Link = styled.TouchableOpacity`
  flex: 1;
`;

export const Btn = styled.TouchableOpacity`
  background-color: #225cde;
  margin-left: 10px;
  margin-right: 10px;
  justify-content: center;
  border-radius: 5px;
  padding: 5px 5px;
  align-items: center;
  border: 1px solid #fff;
  padding: 6px 15px;
`;

export const Header = styled(LinearGradient).attrs({
  colors: ['#2196F3', '#2196F3'],
  start: { x: 1, y: 0 },
  end: { x: 1, y: 1 },
})`
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const Card = styled.View`
  margin: 3px;
  border-radius: 5px;
  padding: 10px 5px;
  background-color: #fff;
`;

export const Small = styled.ImageBackground`
  width: 100%;
  background: #eee;
  aspect-ratio: ${props => props.aspect};
`;

export const Original = styled.Image`
  width: 100%;
  aspect-ratio: ${props => props.aspect};
`;