import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Expo, { Accelerometer, } from 'expo';
import { BarChart2 } from './components/BarChart2';
import { Grid2 } from './components/Grid2';
import { AccelerometerData } from './classes/AccelerometerData.js';
import { BouncyBox } from './components/BouncyBox';
import { LineChart } from './components/LineChart';

export default class App extends React.Component {
  state = {
    accelerometerData: {},
	isRunning: true,
	isFast: true,
    updateCount: 0,
  }

  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
	  this.setState({isRunning: false});
	  console.log("Stopped.");
      this._unsubscribe();
    } else {
	  this.setState({isRunning: true});
      this._subscribe();
	  console.log("Started.");
    }
  }

  _slow = () => {
    Accelerometer.setUpdateInterval(300);
    this.setState({isFast: false});
	console.log("Slow.");
  }

  _fast = () => {
    Accelerometer.setUpdateInterval(100);
    this.setState({isFast: true});
	console.log("Fast.");
  }
  
  lastVal = new AccelerometerData();
  
  _subscribe = () => {
    this._subscription = Accelerometer.addListener((result) => {
	  let curr = new AccelerometerData(result);
	  
	  if(!curr.equals(this.lastVal)) {
		this.lastVal = curr;
		this.setState({accelerometerData: curr});
	  }
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }
  
  
  render() {
	this.state.updateCount++;
    let { x, y, z } = this.state.accelerometerData;
	let isFast = this.state.isFast;
	let isRunning = this.state.isRunning;
	let updateCount = this.state.updateCount;
	
	var localLast = this.last;
	this.last = this.state.accelerometerData;
	
    return (
      <View style={styles.sensor}>
		<View style={styles.footer}>
			<Text style={{ fontWeight: 'bold' }}>Accelerometer</Text>
		</View>
		<View style={styles.barContainer}>
			<BarChart2
			  dataSets={[
				{ 
				  fillColor: (x > 0 ? '#e24941' : '#41a7e1'), 
				  data: [
					{ value: heightScale(x), },
				  ]
				},
				{ 
				  fillColor: (y > 0 ? '#e24942' : '#41a7e2'), 
				  data: [
					{ value: heightScale(y), },
				  ]
				},
				{ 
				  fillColor: (z > 0 ? '#e24943' : '#41a7e3'), 
				  data: [
					{ value: heightScale(z), },
				  ]
				},
			  ]}
			  maxValue={10}
			  graduation={1}
			  horizontal={false}
			  showGrid={true}
			  barSpacing={5}
			  style={{
				height: 190,
				margin: 15,
				marginTop: 25,
				marginBottom: 0,
			  }} />
		</View>
		
		<View style={styles.buttonContainer}>
			<View style={styles.firstDataValue} backgroundColor={x > 0 ? '#e24941' : '#41a7e1'}>
				<Text> X:  {displayRound(x)}</Text>
			</View>
			<View style={styles.dataValue} backgroundColor={y > 0 ? '#e24941' : '#41a7e1'}>
				<Text> Y:  {displayRound(y)}</Text>
			</View>
			<View style={styles.dataValue} backgroundColor={z > 0 ? '#e24941' : '#41a7e1'}>
				<Text> Z:  {displayRound(z)}</Text>
			</View>
		</View>
		
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._slow} style={isFast ? styles.button : styles.buttonSelected}>
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._fast} style={isFast ? styles.buttonSelected : styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._toggle} style={isRunning ? styles.buttonRed : styles.buttonGreen}>
            <Text>{(this.state.isRunning ? '■  Stop' : '▶ Resume')}</Text>
          </TouchableOpacity>
        </View>
		
		<View style={styles.footer}>
			<Text>AppView Updates: {updateCount}</Text>
		</View>
		
		<View style={styles.chartContainer}>
			<BouncyBox fast={isFast} />
		</View>
		
      </View>
    );
  }
}

function heightScale(n) {
  if (!n) {
    return 0;
  }

  return Math.round(Math.abs(n) * 10000) / 1000;
}

function displayRound(n) {
  if (!n) {
    return 0;
  }

  return Math.round(Math.abs(n) * 100) / 10;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 35,
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
	marginTop: 45,
  },
  bar: {
	backgroundColor: '#99e',
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 5,
  },
  barContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 45,
  },
  firstDataValue: {
    flexDirection: 'row',
    alignItems: 'stretch',
	width: 80,
    marginTop: 0,
	marginLeft: 52,
	padding: 10,
  },
  dataValue: {
    flexDirection: 'row',
    alignItems: 'stretch',
	width: 80,
    marginTop: 0,
	marginLeft: 17,
	padding: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
	borderWidth: 1.5,
    borderColor: '#bbb',
    padding: 10,
  },
  buttonSelected: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcf0bf',
	borderColor: '#ffc805',
	borderWidth: 1.5,
    padding: 10,
  },
  buttonGreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cfc',
	borderColor: '#0f0',
	borderWidth: 1.5,
    padding: 10,
	marginLeft: 50,
  },
  buttonRed: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcc',
	borderColor: '#f00',
	borderWidth: 1.5,
    padding: 10,
	marginLeft: 50,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
});