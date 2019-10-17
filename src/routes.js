import React from 'react';
import {Text, Image, SafeAreaView} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Auth
import AuthVerification from '~/services/AuthVerification';

//Pages
import Main from '~/pages/Main';
import Login from '~/pages/Login';
import Profile from '~/pages/Profile';
import Schedule from '~/pages/Schedule';
import ScheduleItem from '~/pages/ScheduleItem';
import Voucher from '~/pages/Voucher';
import VoucherItem from '~/pages/Voucher/Item';
import Report from '~/pages/Report';
import Notification from '~/pages/Notification';
import Prize from '~/pages/Prize';
import Flight from '~/pages/Flight';
import Transfer from '~/pages/Transfer';
import Streaming from '~/pages/Streaming';
import Info from '~/pages/Info';

//Components
import DrawerItem from '~/components/DrawerItem';
import ToolBar from '~/components/ToolBar';
import SideBar from '~/components/SideBar';

//const App = createAppContainer(MainNavigator);

const TabsRoute = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Main,
      path: '',
      navigationOptions: {
        title: 'home',
        tabBarColor: '#fff',
        tabBarIcon: ({tintColor}) => (
          <MaterialCommunityIcons name="home" size={24} color={tintColor} />
        ),
      },
    },

    Notification: {
      screen: Notification,
      path: 'notification',
      navigationOptions: {
        title: 'notificações',
        tabBarColor: '#fff',
        tabBarIcon: ({tintColor}) => (
          <MaterialIcons name="notifications" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#0D4274',
    inactiveColor: '#777',
    barStyle: {backgroundColor: '#fff'},
    shifting: false,
    tabBarOptions: {
      activeTintColor: '#0D4274',
      showLabel: true,
      showIcon: false,
      scrollEnabled: true,
    },
  },
);

const DrawerRoutes = createDrawerNavigator(
  {
    Drawer: {
      screen: TabsRoute,
      path: 'main',
      navigationOptions: {
        drawerLabel: props => (
          <DrawerItem
            {...props}
            title="Home"
            icon={require('~/assets/menu/home.png')}
          />
        ),
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
            title="Próximos Eventos"
            icon={require('~/assets/menu/calendar.png')}
          />
        ),
      },
    },
    // Notification: {
    //   screen: Notification,
    //   path: 'notification',
    //   navigationOptions: {
    //     drawerLabel: props => (
    //       <DrawerItem
    //         {...props}
    //         title="Notificações"
    //         icon={require('~/assets/menu/notificacoes.png')}
    //       />
    //     ),
    //   },
    // },
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
    initialRouteName: 'Drawer',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  },
);

const MainNavigator = createStackNavigator(
  {
    Main: {
      screen: DrawerRoutes,
      path: 'main',
    },
    Login: {
      screen: Login,
      path: 'login',
      navigationOptions: {name: 'Main', title: 'Home'},
    },
    ScheduleItem: {
      screen: ScheduleItem,
      path: 'login',
      header: null,
      navigationOptions: {
        headerTitle: null,
      },
    },
    Flight: {
      screen: Flight,
      path: 'flight',
      header: null,
      navigationOptions: {
        name: 'Flight',
        title: '',
        headerTitle: 'Passagem',
        headerStyle: {
          backgroundColor: '#051538',
        },
      },
    },
    Transfer: {
      screen: Transfer,
      path: 'transfer',
      header: null,
      navigationOptions: {
        name: 'Transfer',
        title: '',
        headerTitle: 'Transfer',
        headerStyle: {
          backgroundColor: '#051538',
        },
      },
    },
    PrizeEvent: {
      screen: Prize,
      path: 'event/prize',
      header: null,
      navigationOptions: {
        headerTitle: 'Prêmios',
        headerStyle: {
          backgroundColor: '#051538',
        },
      },
    },
    FlightEvent: {
      screen: Flight,
      path: 'event/flight',
      header: null,
      navigationOptions: {
        headerTitle: 'Passagens',
        headerStyle: {
          backgroundColor: '#051538',
        },
      },
    },
    Streaming: {
      screen: Streaming,
      path: 'streaming',
      header: null,
      navigationOptions: {
        headerTitle: 'Transmissão',
        headerStyle: {
          backgroundColor: '#051538',
        },
      },
    },
    Info: {
      screen: Info,
      path: 'info',
      header: null,
      navigationOptions: {
        headerTitle: 'Informações',
        headerStyle: {
          backgroundColor: '#051538',
        },
      },
    },
    Report: {
      screen: Report,
      path: 'report',
      navigationOptions: {
        headerTitle: 'Extrato (de interações)',
        headerStyle: {
          backgroundColor: '#051538',
        },
      },
    },
    VoucherItem: {
      screen: VoucherItem,
      path: 'report',
      navigationOptions: {
        headerTitle: null,
        headerStyle: {
          backgroundColor: '#051538',
        },
      },
    },
  },
  {
    initialRouteName: 'Main',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({navigation}) => ({
      headerTintColor: '#ffffff',
      headerTitle: <ToolBar navigation={navigation} />,
      headerStyle: {
        backgroundColor: '#1d39cb',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#fff',
      },
      headerBackTitleStyle: {
        fontWeight: 'bold',
        color: '#fff',
      },
      headerBackTitle: 'Voltar',
      gesturesEnabled: true,
    }),
  },
);

const Auth = createSwitchNavigator(
  {
    Auth: {
      screen: AuthVerification,
      path: 'login',
      navigationOptions: {name: 'Login', title: 'Login', header: null},
    },
    Login: {
      screen: Login,
      path: 'login',
      navigationOptions: {name: 'Login', title: 'Login', header: null},
    },
    MainNavigator: {
      screen: MainNavigator,
      path: 'app',
    },
  },
  {
    initialRouteName: 'Auth',
  },
);

const prefix = 'appfenae://';
const Route = createAppContainer(Auth);
const RouteApp = () => <Route uriPrefix={prefix} />;

export default RouteApp;
