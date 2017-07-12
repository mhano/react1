import React from 'react';
import { View } from 'react-native';
import { Grid } from 'react-native-charts';

// Override with code copied from base class to suppress console.log
export class Grid2 extends Grid {
	render() {
		const { style } = this.props;

		// TODO: Add container for data set data (bar group) labels...
		// console.log('TODO: Add container for data set data (bar group) labels...');
		// - Should render with respect to bar locations so to visually align them
		return (
		  <View style={[this.getStyles().container, style]}>
			{this.renderGraduationUnits()}
			{this.renderContentContainer()}
		  </View>
		);
  }
}