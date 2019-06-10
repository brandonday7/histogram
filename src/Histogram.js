import React, { Component } from 'react';
import { Bar } from "react-chartjs-2"
import data from "./dataUtility/data.json"
import _ from "lodash"
import moment from "moment"

const generateData = (dataPoints, scale) => {
	const firstDate = moment(dataPoints[0].date)
	const lastDate = moment(dataPoints[dataPoints.length - 1].date)
	let newData = []
	let dataPointIndex = 0
	if (scale === "daily") {
		let days = moment(lastDate).diff(moment(firstDate), 'days')

		for (let i = 0; i <= days + 1; i++) {
			const currentDate = moment(firstDate).clone().add(i, 'days').startOf('days')
			const values = []
			const newDataPoint = {
				x: currentDate.format('MMM DD')
			}

			for (let j = dataPointIndex; j < dataPoints.length; j++) {
				if (moment(dataPoints[j].date).clone().isBetween(currentDate.format(), currentDate.add(1, 'days').format())) {
					values.push(dataPoints[j].value)
					dataPointIndex++
				} else break
			}

			if (values.length) {
				newDataPoint.y = _.mean(values)
			} else if (i) {
				console.log('in here again...')
				// assume latest value before the bucket
				newDataPoint.y = newData[i - 1].y
			} 
			newData.push(newDataPoint)
		}
	} else {
		let hours = moment(lastDate).diff(moment(firstDate), 'hours')
		console.log(hours)
	}

	return newData
}


class Chart extends Component {
	constructor(props) {
		super(props)
		this.state = {
			feature: "temperature",
			dataPoints: data.temperature,
			scale: "daily"
		}
	}


	render() {
		const { feature, dataPoints, scale } = this.state
		let rawData = generateData(dataPoints, scale)
		let dateLabels = rawData.map(point => point.x)

		let data = {
    labels: dateLabels,
    datasets: [
      {
        label: feature,
        data: rawData,
      }
    ]
}

		return (
			<Bar
			  data={data}
			  options={{ 
			  	maintainAspectRatio: false, scales: {
	        yAxes: [{
	            display: true,
	            ticks: {
	              suggestedMin: 0
	            }
	        }]}
	      }}
			/>
		)
	}

}

export default Chart;
