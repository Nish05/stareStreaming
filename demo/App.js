import React, { Component } from 'react';
import { AppRegistry, Image, NativeModules,
DeviceEventEmitter, StyleSheet, Text, View, Alert} from 'react-native';
import { Video } from 'expo';
export default class FirstWebApp extends Component {
  constructor() {
    super();
    this.state = {};
    DeviceEventEmitter.addListener('general', (message) => {
      Alert.alert("From Go", message);
    });
    fetch("http://localhost:8080/sample_route").then((result) => {
      return result.text();
    }).then((text) => {
      this.setState({ httpMessage: text });
    });
  }
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <View style={styles.container}>
      <Text style={styles.welcome}>
          From HTTP: {this.state.httpMessage}
        </Text>
      <Video
  	  source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            shouldPlay
  	  resizeMode="cover"
  	  style={{ width: 193, height: 300 }}
  	/>
      <View style={styles.controlBar}></View>
      <Image source={pic} style={{width: 193, height: 110}}/>
      </View>
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
  controlBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  }
});
// skip this line if using Create React Native App
AppRegistry.registerComponent('demo', () => FirstWebApp);
