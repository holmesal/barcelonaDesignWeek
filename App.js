// @flow
import React from 'react';
import { AsyncStorage, StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import Ticker from "react-native-ticker";

type State = {
  count: number,
  successVisible: boolean
}



export default class App extends React.Component<any, State> {

  state = {
    count: 0,
    successVisible: false
  }

  componentDidMount() {
    this.fetchPledgeCount();
  }
  
  async fetchPledgeCount() {
    try {
      const count = await AsyncStorage.getItem('pledgeCount');
      if (count !== null){
        // We have data!!
        this.setState({count: parseInt(count)});
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  async setPledgeCount() {
    const nextCount = this.state.count + 1;
    this.setState({
      count: nextCount
    });
    await AsyncStorage.setItem('pledgeCount', nextCount.toString());
  }

  showSuccess() {
    this.setState({
      successVisible: true
    });

    // Increment the count
    setTimeout(() => {
      this.setPledgeCount();
    }, 500);
    
    // Hide later
    setTimeout(this.hideSuccess.bind(this), 6000);
  }

  hideSuccess() {
    this.setState({
      successVisible: false
    });
  }

  renderSuccess() {
    return (
      <View style={styles.successWrapper}>
        <Text style={styles.thanks}>Pledge count:</Text>
        <Text style={styles.tickerText}>{this.state.count}</Text>
        <Text style={styles.thanks}>Gracias!</Text>
      </View>
    )
  }

  render() {
    const { successVisible } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.imageRow}>
          <Image style={styles.image} source={require('./assets/coffee.png')} />
          <Image style={styles.image} source={require('./assets/electricity.png')} />
          <Image style={styles.image} source={require('./assets/workers.png')} />
          <Image style={styles.image} source={require('./assets/mumbaikers.png')} />
        </View>

        <TouchableOpacity onPress={this.showSuccess.bind(this)}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Pledge</Text>
            <Text style={styles.buttonText}>Compromís</Text>
          </View>
        </TouchableOpacity>
        {successVisible && this.renderSuccess()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative'
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  image: {

  },
  button: {
    borderRadius: 10,
    backgroundColor: '#2B9FE0',
    width: 600,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  buttonText: {
    fontSize: 42,
    color: '#FAFAFA',
    marginLeft: 30,
    marginRight: 30
  },
  successWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FAFAFA'
  },
  tickerText: {
    fontSize: 72
  },
  thanks: {
    fontSize: 32
  }
});
