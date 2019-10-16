import * as React from "react";
import { TouchableOpacity, View, Image, SafeAreaView } from "react-native";
import { Appbar, Avatar, withTheme, DefaultTheme } from "react-native-paper";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { DrawerActions } from "react-navigation-drawer";

class HeaderApp extends React.Component {
  componentWillMount() {
    //alert(JSON.stringify(this.props.navigation));
  }

  _goMenu = () => this.props.navigation.dispatch(DrawerActions.toggleDrawer());

  render() {

    return (
      <SafeAreaView style={{flex: 1}}>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 50,
            flexDirection: "row",
            elevation: 4
          }}
        >
          <TouchableOpacity
            onPress={this._goMenu}
            style={{
              width: 60,
              height: 50,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Appbar.Action
              icon="menu"
              onPress={this._goMenu}
              color={'#fff'}
            />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 35, maxWidth: 150 }}
              source={require("../assets/logo.png")}
            />
          </View>

          <View style={{ width: 60 }} />
        </View>
      </SafeAreaView>
    );
  }
}

export default HeaderApp;
