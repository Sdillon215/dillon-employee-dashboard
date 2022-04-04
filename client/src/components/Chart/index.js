import React, { useEffect } from 'react';
import {CanvasJSChart} from 'canvasjs-react-charts';
import { useStoreContext } from '../../utils/GlobalState';
// import { idbPromise } from '../../utils/helpers';
// import { useQuery } from '@apollo/client';
// import { QUERY_DEP_ORDERS } from '../../utils/queries';
// import { UPDATE_DEP_ORDERS } from '../../utils/actions';


export default function Chart() {
	const [state] = useStoreContext();
	const { depOrders, currentDepartment } = state;
	// const { loading, data: depData } = useQuery(QUERY_DEP_ORDERS);

	// useEffect(() => {
	// 	if (depData) {
	// 	  dispatch({
	// 		type: UPDATE_DEP_ORDERS,
	// 		depOrders: depData.departments
	// 	  });
	
	// 	  depData.departments.forEach((depOrders) => {
	// 		idbPromise('depOrders', 'put', depOrders);
	// 	  });
	// 	  // add else if to check if `loading` is undefined in `useQuery()` Hook
	// 	} else if (!loading) {
	// 	  // since we're offline, get all of the data from the `products` store
	// 	  idbPromise('depOrders', 'get').then((depOrders) => {
	// 		// use retrieved data to set global state for offline browsing
	// 		dispatch({
	// 		  type: UPDATE_DEP_ORDERS,
	// 		  depOrders: depOrders
	// 		});
	// 	  });
	// 	}
	// }, [depData, dispatch]);
	console.log(depOrders, currentDepartment);
	const orderData = [];
	const saleData = [];
	if (!currentDepartment) {
	for (let i = 0; i < depOrders.length; i++) {
		const porderI = depOrders[i].porders;
		for (let i = 0; i < porderI.length; i++) {
			const milli = porderI[i].purchaseDate;
			const total = porderI[i].orderTotal;
			const pOrS = 'porder';
			time(milli, total, pOrS);
		}
		const sorderI = depOrders[i].sorders;
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
		orderData.push({x: new Date(formatDate), y: total});
		orderData.sort((a, b) => {
			return a.x -b.x;
		});
		}
		
		if (pOrS === 'sorder') {
			saleData.push({x: new Date(formatDate), y: total});
			saleData.sort((a, b) => {
				return a.x -b.x;
			});
		}
	};
} else {
	const curDepOrders = depOrders.filter(department => department._id === currentDepartment);
	console.log(curDepOrders);
	for (let i = 0; i < curDepOrders.length; i++) {
		const porderI = curDepOrders[i].porders;
		for (let i = 0; i < porderI.length; i++) {
			const milli = porderI[i].purchaseDate;
			const total = porderI[i].orderTotal;
			const pOrS = 'porder';
			time(milli, total, pOrS);
		}
		const sorderI = curDepOrders[i].sorders;
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
		orderData.push({x: new Date(formatDate), y: total});
		orderData.sort((a, b) => {
			return a.x -b.x;
		});
		}
		
		if (pOrS === 'sorder') {
			saleData.push({x: new Date(formatDate), y: total});
			saleData.sort((a, b) => {
				return a.x -b.x;
			});
		}
	};
}
	const options = {
				backgroundColor: "rgba(0,0,0,0)",
				theme: "light2",
				animationEnabled: true,
				title:{
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
			<CanvasJSChart options = {options} 
			/>
		</div>
		);	
	};