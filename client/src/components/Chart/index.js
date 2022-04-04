import React, { useEffect } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { useStoreContext } from '../../utils/GlobalState';


export default function Chart() {
	const [state] = useStoreContext();
	const { departments, currentDepartment } = state;

	const orderData = [];
	const saleData = [];
	let curdepartments = [];
	if (!currentDepartment) {
		curdepartments = departments;
	} else {
		curdepartments = departments.filter(department => department._id === currentDepartment);
	}

	for (let i = 0; i < curdepartments.length; i++) {
		const porderI = curdepartments[i].porders;
		for (let i = 0; i < porderI.length; i++) {
			const milli = porderI[i].purchaseDate;
			const total = porderI[i].orderTotal;
			const pOrS = 'porder';
			time(milli, total, pOrS);
		}
		const sorderI = curdepartments[i].sorders;
		for (let i = 0; i < sorderI.length; i++) {
			const milli = sorderI[i].saleDate;
			const total = sorderI[i].saleTotal;
			const pOrS = 'sorder';
			time(milli, total, pOrS);
		}
	};

	function time(milli, total, pOrS) {
		const parseDate = parseInt(milli);
		const d = new Date(parseDate);
		const stringDate = d.toISOString();
		const formatDate = stringDate.replace(/-/g, ', ').split('T', 1).toString();

		if (pOrS === 'porder') {
			orderData.push({ x: new Date(formatDate), y: total });
			orderData.sort((a, b) => {
				return a.x - b.x;
			});
		}

		if (pOrS === 'sorder') {
			saleData.push({ x: new Date(formatDate), y: total });
			saleData.sort((a, b) => {
				return a.x - b.x;
			});
		}
	};

	const options = {
		backgroundColor: "rgba(0,0,0,0)",
		theme: "light2",
		animationEnabled: true,
		title: {
			text: "Sales & Purchase Order History"
		},
		subtitles: [{
			text: ""
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
			// itemclick: this.toggleDataSeries
		},
		data: [
			{
				type: "spline",
				name: "Sales",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.#",
				dataPoints: saleData
			},
			{
				type: "spline",
				name: "Purchase Orders",
				showInLegend: true,
				xValueFormatString: "MMM YYYY",
				yValueFormatString: "$#,##0.#",
				dataPoints: orderData
			}
		]
	}


	return (
		<div>
			<CanvasJSChart options={options}
			/>
		</div>
	);
};