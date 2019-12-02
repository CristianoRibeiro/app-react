import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from "react-native-linear-gradient";
//import LinearGradient from 'react-native-linear-gradient';
//import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Title = styled.Text`
  font-size: 32px;
  color: #FFF;
  font-weight: bold;
  padding: 0 20px;
`;

export const SubTitle = styled.Text`
  font-size: 14;
  color: #333;
  font-weight: 500;
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

export const EventDate = styled.Text`
  font-size: 10px;
  color: #7c7c7c;
  font-weight: bold;
  margin: 5px 0 0 0;
`;

export const Card = styled.View`
  margin: 3px;
  border-radius: 5px;
  padding: 10px 10px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
`;

export const CardImage = styled.View`
  padding: 15px 15px 15px 5px;
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
  colors: ['#051538', '#041c50'],
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
