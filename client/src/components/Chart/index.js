import React from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { useStoreContext } from '../../utils/GlobalState';


export default function Chart() {
	const [state] = useStoreContext();
	const { departments, currentDepartment } = state;
	const orderData = [];
	const saleData = [];
	let curdepartments = [];
	let chartHeading;
	if (!currentDepartment) {
		curdepartments = departments;
		chartHeading = 'All Purchase Orders & Sales ';
	} else {
		curdepartments = departments.filter(department => department._id === currentDepartment._id);
		chartHeading = currentDepartment.name + ' Purchase Orders & Sales';
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
			text: chartHeading,
			fontSize: 26,
			fontWieght: "bolder",
			fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif"
		},
		axisX: {
			title: "Months",
			interval: 1,
			intervalType: "week",
		},
		axisY: {
			titleFontColor: "#6D78AD",
			lineColor: "#6D78AD",
			labelFontColor: "#0a0a0a",
			tickColor: "#6D78AD"
		},
		toolTip: {
			shared: false
		},
		data: [
			{
				type: "line",
				name: "Purchase Orders",
				showInLegend: true,
				xValueFormatString: "MMM D, YYYY",
				yValueFormatString: "$#,##0.##",
				dataPoints: orderData
			},
			{
				type: "line",
				name: "Sales",
				showInLegend: true,
				xValueFormatString: "MMM D, YYYY",
				yValueFormatString: "$#,##0.##",
				dataPoints: saleData
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