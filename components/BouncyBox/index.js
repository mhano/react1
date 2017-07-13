import React, { PropTypes, } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export class BouncyBox extends React.Component {
	
	static propTypes = {
		fast: PropTypes.bool,
	};
	
	static defaultProps = {
		fast: true,
	};
	
	state = {
		walker: 160,
		toggle: false,
		fast: true,
	};
	
	intervalHandle = null;
	
	componentDidMount() {
		this.setSpeed();
	}
	
	update = () => {
		let walker = Math.round(Math.min(320, Math.max(40, this.state.walker + ((Math.random() - 0.5) * 10))));
		let toggle = !this.state.toggle;
		
		this.setState({walker: walker, toggle: toggle});
	}
	
	componentWillReceiveProps(props) {
		this.state.fast = props.fast;
		this.setSpeed();
	}
	
	wasFast = true;
	setSpeed = () => {
		let fast = this.state.fast;
		
		if(!this.intervalHandle || fast != this.wasFast) {
			this.wasFast = fast;
			
			console.log("Set speed: " + (fast ? 'fast' : 'slow') + '.');
			
			if(this.intervalHandle) {
				clearInterval(this.intervalHandle);
			}
			
			this.intervalHandle = setInterval(this.update, fast ? 10 : 100);
		}
	}
	
	componentWillUnmount() {
		console.log("Stop speed.");
		if(this.intervalHandle) {
			clearInterval(this.intervalHandle);
		}
	}
	
	render() {
		let walker = this.state.walker;
		let toggle = this.state.toggle;
		
		return (
			<View style={{width: walker, backgroundColor: (toggle ? '#e24941' : '#41a7e1'), padding: 10, alignItems: 'center'}}>
				<Text>{walker}</Text>
			</View>
		);
	}
}
