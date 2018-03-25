import React, { Component } from 'react';
import { AppRegistry,
         Image, NativeModules,
         DeviceEventEmitter, StyleSheet,
         Text, View,
         Alert, Button, ListView, FlatList, TouchableHighlight, TouchableOpacity, WebView } from 'react-native';
import { Video } from 'expo';
import { StackNavigator } from 'react-navigation';
var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 != r2});

class FirstActivity extends Component {

  constructor(props) {
    super(props);
    this.state = {
          dataSource: ds.cloneWithRows([]),
    };
    DeviceEventEmitter.addListener('general', (message) => {
      Alert.alert("From Go", message);
    });
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("http://localhost:8080/sample_route").then((result) => {
      return result.text();
    }).then((text) => {
      var linkData = text.split(',');
      this.setState ({
        dataSource: ds.cloneWithRows(linkData),
      });
    });

  }
  ListViewItemSeparatorLine = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#000",
              marginTop: "5%",
            }}
          />
        );
      }
  OpenSecondActivity (rowData)
      {

         this.props.navigation.navigate('Second', { ListViewClickItemHolder: rowData.slice(rowData.indexOf('https'), rowData.length)}, {title: rowData.slice(0,rowData.indexOf('https'))});

      }
  static navigationOptions =
        {
           title: 'Live Streamers',
        };
  render() {
    return (

      <View style = {styles.container}>
      <ListView
      dataSource={this.state.dataSource}
      renderSeparator= {this.ListViewItemSeparatorLine}

           renderRow={
                       (rowData) =>
                       <TouchableOpacity>
                       <View>
                      <Button style={styles.rowViewContainer}
                       onPress={() => this.OpenSecondActivity(rowData)}
                       title = {rowData.slice(0,rowData.indexOf('https'))}/>
                      </View>
                      </TouchableOpacity>
                     }
          enableEmptySections={true}

         />
      </View>
    );
  }
}
class SecondActivity extends Component
{
  constructor(props) {
    super(props);

    this.state = {
      videoLink: this.props.navigation.state.params.ListViewClickItemHolder,
  };
}
static navigationOptions = {

    title: 'Live Video',
}
  render()
  {
     return(
        <View style = { styles.container }>
            <WebView
            source={{ uri: this.state.videoLink }}
                  shouldPlay
            resizeMode="cover"
            style={{ width: "100%", height: 300 }}
          />
           <Text style = { styles.TextStyle }> { this.state.videoLink } </Text>

        </View>
     );
  }
}
export default Project = StackNavigator(
{
  First: { screen: FirstActivity },

  Second: { screen: SecondActivity }
});
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex:1,
    margin: 10
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
  separator: {
  flex: 1,
  height: StyleSheet.hairlineWidth,
  backgroundColor: '#8E8E8E',
  },
  TextStyle:
  {
     fontSize: 20,
     textAlign: 'center',
     color: '#000',
  },
  rowViewContainer:
  {

    fontSize: 18,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,

  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('demo', () => FirstWebApp);
