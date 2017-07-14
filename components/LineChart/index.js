import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Chart from 'react-native-chart';

export class LineChart extends React.Component {
	
	state = {
		updateCount: 0,
	};
	
	constructor() {
		super();
		//setInterval(this.update, 1000);
	};
	
	update = () => {
		let updateCount = this.state.updateCount + ((Math.random() - 0.5)*10);
		
		this.setState({updateCount: updateCount});
	}
	
	render() {
		let updateCount = this.state.updateCount;
		
		return (
			<View style={styles.chartContainer}>
				<Chart style={styles.chart}
					type="line"
					data={data}
				/>
			</View>
		);
	}
}

var x = 0;
const data = [
						[x++, x++],
						[x++, x++],
						[x++, x++],
						[x++, x++],
						[x++, x++],
						[x++, x++],
						[x++, x++],
			];
					
const styles = StyleSheet.create({
	chartContainer: {
		flexDirection: 'row',
		alignItems: 'stretch',
		height: 140,
	},
    chart: {
		height: 140,
		width: 350,
    },
});