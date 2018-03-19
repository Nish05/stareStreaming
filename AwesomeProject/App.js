import React, { Component} from 'react';
import { AppRegistry, Image, NativeModules,
DeviceEventEmitter, StyleSheet,
  Text, View} from 'react-native';
export default class Bananas extends Component {
  constructor() {
  super();
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
      <Image source={pic} style={{width: 193, height: 110}}/>
      <Text style={styles.welcome}>
        From HTTP: {this.state.httpMessage}
      </Text>
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
});
// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Bananas);
