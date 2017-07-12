import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BarChart, Bar } from 'react-native-charts';
import { flatten, max, pluck, zip } from 'underscore';
import { Grid2 } from '../Grid2';

export class BarChart2 extends BarChart {
	
	getDataSetsMaxValue() {
		return 10;
	}
	
	renderGrid(children) {
		const {
		  horizontal,
		} = this.props;

		const gridMaxValue = this.getGridMaxValue();
		const graduation = this.getGraduation();

		return (
		  <Grid2
			horizontal={horizontal}
			graduation={graduation}
			maxValue={gridMaxValue}
			content={children}
			style={this.getStyles().grid}
		  />
		);
	}
    renderBars() {
		const {
		  barStyle,
		  dataSets,
		  horizontal,
		} = this.props;
		
		const gridMaxValue = this.getGridMaxValue();
		const dataSetsBars = dataSets.map(dataSet => {
		  return dataSet.data.map((data, index) => {
			return (
			  <Bar
				key={`${dataSet.fillColor}${index}`}
				fillColor={dataSet.fillColor}
				horizontal={horizontal}
				value={data.value}
				initialValueScale={1}
				maxValue={gridMaxValue}
				style={[this.getStyles().bar, barStyle]}
			  />
			);
		  });
		});
		const bars = flatten(zip(...dataSetsBars));

		return (
		  <View style={this.getStyles().bars}>
			{bars}
		  </View>
		);
  }
}
