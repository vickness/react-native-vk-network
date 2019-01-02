/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NetUtils from "./NetUtils"

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const syncRequest = function() {
    (async () => {
        console.log("同步请求开始");
        const res1 = await NetUtils.get("https://www.apiopen.top/novelApi");
        console.log(res1);
        const res2 = await NetUtils.get("https://www.apiopen.top/novelApi");
        console.log(res2);
        const res3 = await NetUtils.post("https://www.apiopen.top/satinApi?type=1&page=1");
        console.log(res3);
        const res4 = await NetUtils.post("https://www.apiopen.top/satinApi?type=1&page=1");
        console.log(res4);
        console.log("同步请求结束");
    })();
};

const asyncRequest = function() {
    console.log("异步请求开始");
    const params = {
        'type': '1',
        'page': '1'
    };
    NetUtils.post("https://www.apiopen.top/satinApi", params).then(res => {
        console.log(res);
    });
    console.log("异步请求结束");
};



type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={this._onPressRequest}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }

  _onPressRequest = () => {

      syncRequest();
      asyncRequest();
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
