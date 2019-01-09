/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NetUtils from "./NetUtils";

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
    NetUtils.post("https://www.apiopen.top/satinApi", params).then(res => {
        console.log(res);
    });
    NetUtils.post("https://www.apiopen.top/satinApi", params).then(res => {
        console.log(res);
    });
    NetUtils.post("https://www.apiopen.top/satinApi", params).then(res => {
        console.log(res);
    });
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
          <Text style={styles.welcome} onPress={this._syncRequestAction}>同步请求</Text>
          <Text style={styles.welcome} onPress={this._asyncRequest}>异步请求</Text>
      </View>
    );
  }

  //同步请求
  _syncRequestAction = () => {
      syncRequest();
  };

  //异步请求
  _asyncRequest = () => {
      asyncRequest();
  };

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
