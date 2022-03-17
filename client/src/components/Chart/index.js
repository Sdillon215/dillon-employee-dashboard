/* App.js */
import * as React from 'react';
import {CanvasJSChart} from 'canvasjs-react-charts';

var Component = React.Component;
 
class Chart extends Component {	
	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	
	render() {
		const options = {
			backgroundColor: "rgba(0,0,0,0)",
			theme: "light2",
			animationEnabled: true,
			title:{
				text: "Sales & Purchase Order History"
			},
			subtitles: [{
				text: "Click Legend to Hide or Unhide Data Series"
			}],
			axisX: {
				title: "Months"
			},
			axisY: {
				// title: "Purchase Orders",
				titleFontColor: "#6D78AD",
				lineColor: "#6D78AD",
				labelFontColor: "#0a0a0a",
				tickColor: "#6D78AD"
			},
			// axisY2: {
			// 	title: "Sales",
			// 	titleFontColor: "#51CDA0",
			// 	lineColor: "#51CDA0",
			// 	labelFontColor: "#51CDA0",
			// 	tickColor: "#51CDA0"
			// },
			toolTip: {
				shared: true
			},
			legend: {
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [{
				type: "spline",
				name: "Purchase Orders",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.#",
				dataPoints: [
					{ x: new Date(2021, 0, 1), y: 12007 },
					{ x: new Date(2021, 1, 1), y: 13500 },
					{ x: new Date(2021, 2, 1), y: 14400 },
					{ x: new Date(2021, 3, 1), y: 10300 },
					{ x: new Date(2021, 4, 1), y: 9300 },
					{ x: new Date(2021, 5, 1), y: 12900 },
					{ x: new Date(2021, 6, 1), y: 14300 },
					{ x: new Date(2021, 7, 1), y: 15600 },
					{ x: new Date(2021, 8, 1), y: 12200 },
					{ x: new Date(2021, 9, 1), y: 10600 },
					{ x: new Date(2021, 10, 1), y: 13700 },
					{ x: new Date(2021, 11, 1), y: 14200 }
				]
			},
			{
				type: "spline",
				name: "Sales",
				// axisYType: "secondary",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.#",
				dataPoints: [
					{ x: new Date(2021, 0, 1), y: 19034.5 },
					{ x: new Date(2021, 1, 1), y: 20015 },
					{ x: new Date(2021, 2, 1), y: 27342 },
					{ x: new Date(2021, 3, 1), y: 20088 },
					{ x: new Date(2021, 4, 1), y: 20234 },
					{ x: new Date(2021, 5, 1), y: 29034 },
					{ x: new Date(2021, 6, 1), y: 30487 },
					{ x: new Date(2021, 7, 1), y: 32523 },
					{ x: new Date(2021, 8, 1), y: 20234 },
					{ x: new Date(2021, 9, 1), y: 27234 },
					{ x: new Date(2021, 10, 1), y: 33548 },
					{ x: new Date(2021, 11, 1), y: 32534 }
				]
			},
			{
				type: "spline",
				name: "Sales",
				// axisYType: "secondary",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.#",
				dataPoints: [
					{ x: new Date(2021, 0, 1), y: 9034.5 },
					{ x: new Date(2021, 1, 1), y: 2001 },
					{ x: new Date(2021, 2, 1), y: 2734 },
					{ x: new Date(2021, 3, 1), y: 2008 },
					{ x: new Date(2021, 4, 1), y: 2023 },
					{ x: new Date(2021, 5, 1), y: 2903 },
					{ x: new Date(2021, 6, 1), y: 3048 },
					{ x: new Date(2021, 7, 1), y: 32523 },
					{ x: new Date(2021, 8, 1), y: 20234 },
					{ x: new Date(2021, 9, 1), y: 27234 },
					{ x: new Date(2021, 10, 1), y: 33548 },
					{ x: new Date(2021, 11, 1), y: 36534 }
				]
			}]
		}
		
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
			
}
 
export default Chart; 