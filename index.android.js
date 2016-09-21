/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  DrawerLayoutAndroid,
  Text,
  TextInput,
  ToastAndroid,
  View
} from 'react-native';

class RnDemos extends Component {

  constructor(props) {
    super(props);
    this.state = {text: '', data: 'init data...'};
    this.getUserData = this._getUserData.bind(this);
  }

  _getUserData(key){
    fetch(`http://brucezz.leanapp.cn/${key}`)
     .then( (response) => response.json())
     //.then( (data) => console.log(data) )
     .then( (json) => json.message)
     .then( (json) => this.setState({data: json}))
  }

  render() {
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I m in the Drawer!</Text>
      </View>
    );
    return (
      <DrawerLayoutAndroid
        drawerBackgroundColor="rgba(0,0,0,0.5)"
        statusBarBackgroundColor="blue"
        drawerWidth = {300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        onDrawerClose={() => ToastAndroid.show("close", ToastAndroid.SHORT)}
        onDrawerOpen={() => ToastAndroid.showWithGravity("open", ToastAndroid.LONG, ToastAndroid.TOP)}
        renderNavigationView={() => navigationView}>
        <View style={{padding: 10}}>
          <Text>The Text Translater....</Text>
          <TextInput
            style={{height: 40}}
            placeholder="Type here to translate!"
            onChangeText={(text) => this.setState({text})}
          />
          <Text style={{padding: 10, fontSize: 42}}>
            {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
          </Text>
          <Text>The Simple Network Fetch....</Text>
          <TextInput
            style={{height: 40, width: 200, borderColor: 'gray', borderWidth: 1}}
            onSubmitEditing = {(text) => this.getUserData(text.nativeEvent.text)}
            />
          <Text style={styles.instructions}>
            {this.state.data}
          </Text>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RnDemos', () => RnDemos);
