import React from 'react';
import {Text, Image, SafeAreaView} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//Pages
import Main from '~/pages/Main';
import Login from '~/pages/Login';
import Profile from '~/pages/Profile';
import Schedule from '~/pages/Schedule';
import ScheduleItem from '~/pages/ScheduleItem';
import Voucher from '~/pages/Voucher';
import Report from '~/pages/Report';
import Notification from '~/pages/Notification';
import Prize from '~/pages/Prize';
import Flight from '~/pages/Flight';

//Components
import DrawerItem from '~/components/DrawerItem';
import ToolBar from '~/components/ToolBar';
import SideBar from '~/components/SideBar';

const DrawerRoutes = createDrawerNavigator(
  {
    Main: {
      screen: Main,
      path: 'main',
      navigationOptions: {
        drawerLabel: props => <DrawerItem {...props} title="Home"
        icon={require('~/assets/menu/home.png')} />,
      },
    },
    Profile: {
      screen: Profile,
      path: 'profile',
      navigationOptions: {
        drawerLabel: props => (
          <DrawerItem
            {...props}
            title="Meu perfil"
            icon={require('~/assets/menu/user.png')}
          />
        ),
      },
    },
    Schedule: {
      screen: Schedule,
      path: 'schedule',
      navigationOptions: {
        drawerLabel: props => (
          <DrawerItem
            {...props}
            title="Eventos"
            icon={require('~/assets/menu/calendar.png')}
          />
        ),
      },
    },
    Report: {
      screen: Report,
      path: 'report',
      navigationOptions: {
        drawerLabel: props => (
          <DrawerItem
            {...props}
            title="Extrato (de interações)"
            icon={require('~/assets/menu/extrato.png')}
          />
        ),
      },
    },
    Notification: {
      screen: Notification,
      path: 'notification',
      navigationOptions: {
        drawerLabel: props => (
          <DrawerItem
            {...props}
            title="Notificações"
            icon={require('~/assets/menu/notificacoes.png')}
          />
        ),
      },
    },
    Voucher: {
      screen: Voucher,
      path: 'voucher',
      navigationOptions: {
        drawerLabel: props => (
          <DrawerItem
            {...props}
            title="Meus vouchers"
            icon={require('~/assets/menu/heart.png')}
          />
        ),
      },
    },
    Prizes: {
      screen: Prize,
      path: 'prize',
      navigationOptions: {
        drawerLabel: props => (
          <DrawerItem
            {...props}
            title="Prêmios"
            icon={require('~/assets/menu/premios.png')}
          />
        ),
      },
    },
  },
  {
    contentComponent: props => <SideBar {...props} />,
    initialRouteName: 'Main',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  },
);

const MainNavigator = createSwitchNavigator(
  {
    Main: {
      screen: DrawerRoutes,
      path: 'main',
      navigationOptions: {name: 'Main', title: 'Home', headerTintColor: '#333'},
    },
    Login: {
      screen: Login,
      path: 'login',
      navigationOptions: {name: 'Main', title: 'Home', headerTintColor: '#333'},
    },
    ScheduleItem: {
      screen: ScheduleItem,
      path: 'login',
      header: null,
      navigationOptions: {name: 'Main', title: '',  headerTitle: 'teste', headerTintColor: '#333'},
    },
    Flight: {
      screen: Flight,
      path: 'flight',
      header: null,
      navigationOptions: {name: 'Flight', title: '',  headerTitle: 'teste', headerTintColor: '#333'},
    },
  },
  {
    initialRouteName: 'Main',
  },
);

const Routes = createAppContainer(
  createAppContainer(
    createStackNavigator(
      {
        MainNavigator,
      },
      {
        headerLayoutPreset: 'center',
        defaultNavigationOptions: ({navigation}) => ({
          headerTitle: <ToolBar navigation={navigation} />,
          headerStyle: {
            backgroundColor: '#1d39cb',
          },
          gesturesEnabled: true,
        }),
      },
    ),
  ),
);

export default Routes;
