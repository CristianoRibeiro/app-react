import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {TouchableRipple} from 'react-native-paper';
import {TextInput, Button} from 'react-native-paper';

export const Title = styled.Text`
  font-size: 32px;
  color: #fff;
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
  color: #fff;
  font-weight: 600;
  padding: 0 20px;
`;

export const TextDark = styled.Text`
  font-size: 12;
  margin-top: 10px;
  color: #444;
  font-weight: 700;
`;

export const Link = styled(TouchableRipple).attrs({})`
  flex: 1;
`;

export const Header = styled(LinearGradient).attrs({
  colors: ['#fff', '#fff'],
  start: {x: 1, y: 0},
  end: {x: 1, y: 1},
})`
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const Card = styled.View`
  margin: 5px;
  align-items: center;
  border-radius: 5px;
  padding: 15px 10px;
  background-color: #fff;
`;

export const CardItem = styled.View`
  margin: 2px;
  border-radius: 3px;
  padding: 6px;
  background-color: #fff;
`;

export const CardImage = styled.View`
  padding: 0px;
  flex: 1;
`;

export const Original = styled.Image`
  width: 100%;
  aspect-ratio: ${props => props.aspect};
`;

export const Send = styled(Button).attrs({
  mode: 'contained',
})`
  background: #0f60a8;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 30px;
  border: 1px solid #fff;
`;

export const Confirm = styled(Button).attrs({
  mode: 'contained',
})`
  background: #4caf50;
  padding: 0px;
  border-radius: 5px;
  border: 1px solid #fff;
`;

export const Cancel = styled(Button).attrs({
  mode: 'contained',
})`
  background: #d32f2f;
  padding: 0px;
  border-radius: 5px;
  border: 1px solid #fff;
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
  background: rgba(255, 255, 255, 0.4);
  width: 100%;
  border-radius: 5px;
`;

export const Form = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding: 0 10px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#efefef',
  keyboardAppearance: 'light',
  maxLength: 255,
})`
  flex: 1;
  padding: 12px 15px;
  border-radius: 4px;
  font-size: 16px;
  color: #fff;
  background: rgba(000, 000, 000, 0.2);
  border: 1px solid ${props => (props.error ? '#FF7272' : '#FFf')};
`;

export const Submit = styled.TouchableOpacity`
  background: #f7893e;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
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
