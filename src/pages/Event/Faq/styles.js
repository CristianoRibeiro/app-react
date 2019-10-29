import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from "react-native-linear-gradient";
//import LinearGradient from 'react-native-linear-gradient';
//import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Title = styled.Text`
  font-size: 14px;
  color: #444;
  font-weight: 700;
`;

export const SubTitle = styled.Text`
  font-size: 12px;
  color: #444;
  font-weight: 300;
`;


export const TextDark = styled.Text`
  font-size: 18px;
  color: #333;
  font-weight: 600;
  margin-bottom: 10px;
`;

export const Card = styled.View`
  margin: 5px;
  border-radius: 5px;
  padding: 10px 10px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
`;


export const Submit = styled.TouchableOpacity`
  background: #0F60A8;
  margin-left: 10px;
  justify-content: center;
  border-radius: 4px;
  padding: 0 14px;
`;

export const Send = styled.TouchableOpacity`
  background: rgba(000,000,000, 0.2);
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
  color: #fff
`;