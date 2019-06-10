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
				date: currentDate.format()
			}

			for (let j = dataPointIndex; j < dataPoints.length; j++) {
				if (moment(dataPoints[j].date).clone().isBetween(currentDate.format(), currentDate.add(1, 'days').format())) {
					values.push(dataPoints[j].value)
					dataPointIndex++
				} else break
			}

			if (values.length) {
				newDataPoint.value = _.mean(values)
			} else if (i) {
				// assume latest value before the bucket
				newDataPoint.value = newData[i - 1].value
			} else {
				// no data present
				newDataPoint.value = -1
			}
			newData.push(newDataPoint)
		}


		console.log(newData)
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
		const { dataPoints, scale } = this.state
		const data = generateData(dataPoints, scale)

		return <Bar data={data} />
	}

}

export default Chart;
