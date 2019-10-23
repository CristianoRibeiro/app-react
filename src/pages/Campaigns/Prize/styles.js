import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from "react-native-linear-gradient";
//import LinearGradient from 'react-native-linear-gradient';
//import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Title = styled.Text`
  font-size: 18;
  color: #444;
  font-weight: bold;
  padding: 0 10px;
  margin-top: 25px;
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
  color: #2f73ea;
  font-weight: 600;
`;

export const NotificationTitle = styled.Text`
  font-size: 14px;
  color: #0058b8;
  font-weight: bold;
  text-transform: uppercase;
  margin-top: 5px;
`;

export const ItemQuestion = styled.TouchableOpacity`
  font-size: 12px;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-right: 5px;
  padding-left: 5px;
  margin-top: 10px;
  background: rgba(255,255,255, 0.4);
  width: 100%;
  border-radius: 5px;
`;

export const Form = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding: 0 10px;
`;

export const Card = styled.View`
  margin: 5px;
  border-radius: 5px;
  padding: 10px 10px;
  background-color: #fff;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#efefef',
  keyboardAppearance: 'light',
  maxLength: 255
})`
  flex: 1;
  padding: 12px 15px;
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
  background: rgba(000,000,000, 0.2);
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
  margin-top: 50px;
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
  color: #fff
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: { paddingHorizontal: 20 },
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Header = styled(LinearGradient).attrs({
  colors: ['#FF7272', '#FF7272'],
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
