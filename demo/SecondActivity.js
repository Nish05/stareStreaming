import React, { Component } from 'react';
class SecondActivity extends Component
{
  static navigationOptions =
  {
     title: 'SecondActivity',
  };

  render()
  {
     return(
        <View style = { styles.MainContainer }>

           <Text style = { styles.TextStyle }> { this.props.navigation.state.params.ListViewClickItemHolder } </Text>

        </View>
     );
  }
}
