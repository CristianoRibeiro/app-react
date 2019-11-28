import React from 'react';
import {Text, Image, SafeAreaView} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Auth
import AuthVerification from '~/services/AuthVerification';

//Pages
import Main from '~/pages/Main';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Profile from '~/pages/Profile';
import ProfileEdit from '~/pages/Profile/Edit';
import News from '~/pages/News';
import EventNews from '~/pages/News/EventNews';
import NewsDetail from '~/pages/News/Detail';

//Event
import Event from '~/pages/Event';
import EventOld from '~/pages/Event/Old';
import EventItem from '~/pages/Event/EventItem';
import Voucher from '~/pages/Voucher';
import VoucherItem from '~/pages/Voucher/Item';
import VoucherEvent from '~/pages/Voucher/VoucherEvent';
import VoucherAdd from '~/pages/Voucher/Add';
import Report from '~/pages/Report';
import Notification from '~/pages/Notification';
import Prize from '~/pages/Event/Prize';
import PrizeAll from '~/pages/Event/Prize/All';
import Flight from '~/pages/Event/Flight';
import Transfer from '~/pages/Event/Transfer';
import Streaming from '~/pages/Event/Streaming';
import Info from '~/pages/Event/Info';
import Faq from '~/pages/Event/Faq';
import ScheduleEvent from '~/pages/Event/ScheduleEvent';
import ScheduleEventDetail from '~/pages/Event/ScheduleEvent/Detail';
import Certificate from '~/pages/Certificate';
import Games from '~/pages/Event/Games';
import Gallery from '~/pages/Event/Gallery';
import FriendsEvent from '~/pages/Event/Friends';

//Campanhas
import Campaigns from '~/pages/Campaigns';
import CampaignsItem from '~/pages/Campaigns/Item';
import Quiz from '~/pages/Campaigns/Quiz';
import Album from '~/pages/Campaigns/Album';
import CampaignPrize from '~/pages/Campaigns/Prize';
import Cupons from '~/pages/Campaigns/Cupons';
import Exchange from '~/pages/Campaigns/Exchange';
import ExchangeSearch from '~/pages/Campaigns/Exchange/Search';
import Match from '~/pages/Campaigns/Exchange/Match';
import MatchItem from '~/pages/Campaigns/Exchange/MatchItem';
import Regulation from '~/pages/Campaigns/Regulation';
import Lottery from '~/pages/Campaigns/Lottery';
import PrizeCampaign from '~/pages/Campaigns/Prize';
import Recommendation from '~/pages/Campaigns/Recommendation';
import RecommendationIndicated from '~/pages/Campaigns/Recommendation/Indicated';
import RecommendationConverted from '~/pages/Campaigns/Recommendation/Converted';

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
    Campaigns: {
      screen: Campaigns,
      path: 'campaigns',
      navigationOptions: {
        title: 'campanhas',
        tabBarColor: '#fff',
        tabBarIcon: ({tintColor}) => (
          <Ionicons name="md-images" size={24} color={tintColor} />
        ),
      },
    },

    News: {
      screen: News,
      path: 'news',
      navigationOptions: {
        title: 'notícias',
        tabBarColor: '#fff',
        tabBarIcon: ({tintColor}) => (
          <MaterialCommunityIcons
            name="newspaper"
            size={24}
            color={tintColor}
          />
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
      path: 'tabs',
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
    Event: {
      screen: Event,
      path: 'event',
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
    EventOld: {
      screen: EventOld,
      path: 'event/old',
      navigationOptions: {
        drawerLabel: props => (
          <DrawerItem
            {...props}
            title="Eventos passados"
            icon={require('~/assets/menu/calendar.png')}
          />
        ),
      },
    },
    // Friends: {
    //   screen: Friends,
    //   path: 'friends',
    //   navigationOptions: {
    //     drawerLabel: props => (
    //       <DrawerItem
    //         {...props}
    //         title="Amigos"
    //         icon={require('~/assets/menu/friends.png')}
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
            title="Validar voucher"
            icon={require('~/assets/menu/voucher.png')}
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

const TabsExchange = createMaterialTopTabNavigator(
  {
    ExchangeSearch: {
      screen: ExchangeSearch,
      path: '',
      navigationOptions: {
        title: 'Figurinhas repetidas',
        tabBarColor: '#fff',
        tabBarIcon: ({tintColor}) => (
          <Fontisto name="arrow-swap" size={24} color={tintColor} />
        ),
      },
    },

    Match: {
      screen: Match,
      path: 'match',
      navigationOptions: {
        title: 'Minhas trocas',
        tabBarColor: '#fff',
        tabBarIcon: ({tintColor}) => (
          <MaterialIcons name="notifications" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: 'ExchangeSearch',
    activeColor: '#222',
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#fff',
      showLabel: true,
      showIcon: false,
      scrollEnabled: false,
      indicatorStyle: {backgroundColor: '#fff'},
      style: {
        backgroundColor: '#FF6666',
      },
    },
  },
);


const TabsRecommendation = createMaterialTopTabNavigator(
  {
    Recommendation: {
      screen: Recommendation,
      path: 'recomendation',
      navigationOptions: {
        title: 'Todos',
        tabBarColor: '#fff',
      },
    },
    RecommendationIndicated: {
      screen: RecommendationIndicated,
      path: 'recommendation/indicated',
      navigationOptions: {
        title: 'Meus Indicados',
        tabBarColor: '#fff',
      },
    },
    RecommendationConverted: {
      screen: RecommendationConverted,
      path: 'recommendation/converted',
      navigationOptions: {
        title: 'Convertidos',
        tabBarColor: '#fff',
      },
    },
  },
  {
    initialRouteName: 'Recommendation',
    activeColor: '#222',
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#fff',
      showLabel: true,
      showIcon: false,
      scrollEnabled: false,
      indicatorStyle: {backgroundColor: '#fff'},
      style: {
        backgroundColor: '#FF6666',
      },
      labelStyle: {fontSize: 11}
    },
  },
);

const MainNavigator = createStackNavigator(
  {
    Main: {
      screen: DrawerRoutes,
      path: 'main',
    },
    EventItem: {
      screen: EventItem,
      path: 'login',
      navigationOptions: {
        headerTitle: 'Detalhes do Evento',
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
          backgroundColor: '#FF6666',
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
          backgroundColor: '#FF6666',
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
          backgroundColor: '#FF6666',
        },
      },
    },
    PrizeCampaign: {
      screen: PrizeCampaign,
      path: 'campaign/prize',
      header: null,
      navigationOptions: {
        headerTitle: 'Prêmios',
        headerStyle: {
          backgroundColor: '#FF6666',
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
          backgroundColor: '#FF6666',
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
          backgroundColor: '#FF6666',
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
          backgroundColor: '#FF6666',
        },
      },
    },
    Report: {
      screen: Report,
      path: 'report',
      navigationOptions: {
        headerTitle: 'Extrato (de interações)',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    VoucherItem: {
      screen: VoucherItem,
      path: 'event/voucher',
      navigationOptions: {
        headerTitle: 'Ingresso',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    VoucherEvent: {
      screen: VoucherEvent,
      path: 'voucher/event',
      navigationOptions: {
        headerTitle: null,
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    VoucherAdd: {
      screen: VoucherAdd,
      path: 'voucher/add',
      navigationOptions: {
        headerTitle: 'Atualizar Meus Dados',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    ScheduleEvent: {
      screen: ScheduleEvent,
      path: 'event/schedule',
      navigationOptions: {
        headerTitle: 'Programação',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    ScheduleEventDetail: {
      screen: ScheduleEventDetail,
      path: 'event/schedule/detail',
      navigationOptions: {
        headerTitle: null,
        headerStyle: {
          headerTitle: '',
          backgroundColor: '#FF6666',
        },
      },
    },
    Certificate: {
      screen: Certificate,
      path: 'certificate',
      navigationOptions: {
        headerTitle: null,
        headerStyle: {
          headerTitle: 'Certificado',
          backgroundColor: '#FF6666',
        },
      },
    },
    CampaignsItem: {
      screen: CampaignsItem,
      path: 'campaignsitem',
      navigationOptions: {
        headerTitle: 'Campanha',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    Quiz: {
      screen: Quiz,
      path: 'quiz',
      navigationOptions: {
        headerTitle: 'Quiz',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    Album: {
      screen: Album,
      path: 'album',
      navigationOptions: {
        headerTitle: 'Álbum',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    CampaignPrize: {
      screen: CampaignPrize,
      path: 'prize',
      navigationOptions: {
        headerTitle: 'Premiação',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    Cupons: {
      screen: Cupons,
      path: 'cupons',
      navigationOptions: {
        headerTitle: 'Número da sorte',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    Exchange: {
      screen: Exchange,
      path: 'exchange',
      navigationOptions: {
        headerTitle: 'Trocas',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    TabsExchange: {
      screen: TabsExchange,
      path: 'exchangesearch',
      navigationOptions: {
        headerTitle: 'Trocas',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#FF6666',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    Regulation: {
      screen: Regulation,
      path: 'regulation',
      navigationOptions: {
        headerTitle: 'Regulamentos',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    Faq: {
      screen: Faq,
      path: 'faq',
      navigationOptions: {
        headerTitle: 'Dúvidas',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    Gallery: {
      screen: Gallery,
      path: 'gallery',
      navigationOptions: {
        headerTitle: 'Galeria',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    Games: {
      screen: Games,
      path: 'games',
      navigationOptions: {
        headerTitle: 'Meus cupons',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    Lottery: {
      screen: Lottery,
      path: 'lottery',
      navigationOptions: {
        headerTitle: 'Sorteio',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    NewsEvent: {
      screen: EventNews,
      path: 'newsevent',
      navigationOptions: {
        headerTitle: 'Notícias',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    NewsCampaigns: {
      screen: News,
      path: 'newscampaigns',
      navigationOptions: {
        headerTitle: 'Notícias',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    NewsDetail: {
      screen: NewsDetail,
      path: 'newsdetail',
      navigationOptions: {
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    MatchItem: {
      screen: MatchItem,
      path: 'from/match',
      navigationOptions: {
        headerTitle: '',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    TabsRecommendation: {
      screen: TabsRecommendation,
      path: 'tabs/recomentation',
      navigationOptions: {
        headerTitle: 'Indicações',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          backgroundColor: '#FF6666',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
    PrizeAll: {
      screen: PrizeAll,
      path: 'prize/all',
      navigationOptions: {
        headerTitle: 'Prêmios',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
    FriendsEvent: {
      screen: FriendsEvent,
      path: 'friends/event',
      navigationOptions: {
        headerTitle: 'Amigos',
        headerStyle: {
          backgroundColor: '#FF6666',
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
        backgroundColor: '#FF6666',
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

const LoginRegister = createStackNavigator(
  {
    Login: {
      screen: Login,
      path: 'login',
      name: 'Login',
      navigationOptions: {headerTitle: null, header: null},
    },
    Register: {
      screen: Register,
      path: 'register',
      navigationOptions: {name: 'Cadastrar', title: 'Cadastrar'},
    },
  },
  {
    initialRouteName: 'Login',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({navigation}) => ({
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#2A40B1',
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
      navigationOptions: {header: null},
    },
    LoginRegister: {
      screen: LoginRegister,
      path: 'login',
      name: 'Login',
      navigationOptions: {headerTitle: null, header: null},
    },
    MainNavigator: {
      screen: MainNavigator,
      path: 'app',
    },
    ProfileEdit: {
      screen: ProfileEdit,
      path: 'profileedit',
      navigationOptions: {
        headerTitle: 'Atualizar Perfil',
        headerStyle: {
          backgroundColor: '#FF6666',
        },
      },
    },
  },
  {
    initialRouteName: 'Auth',
  },
);

const prefix = 'vivafenae://';
const Route = createAppContainer(Auth);
const RouteApp = () => <Route uriPrefix={prefix} />;

export default RouteApp;
