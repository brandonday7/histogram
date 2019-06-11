import _ from "lodash"
import moment from "moment"

const loadData = (dataPoints, scale, format) => {
	const firstDate = moment(dataPoints[0].date)
	const lastDate = moment(dataPoints[dataPoints.length - 1].date)
	let newData = []
	let dataPointIndex = 0
	let rangeMax = lastDate.diff(firstDate, scale)

	for (let i = 0; i <= rangeMax + 1; i++) {
		const currentDate = firstDate.clone().add(i, scale).startOf(scale)
		const values = []
		const newDataPoint = {
			x: currentDate.format(format)
		}

		for (let j = dataPointIndex; j < dataPoints.length; j++) {
			// date comparators must be cloned to prevent mutating the actual datetime object
			if (moment(dataPoints[j].date).clone().isBetween(currentDate.clone().format(), currentDate.clone().add(1, scale).format())) {
				values.push(dataPoints[j].value)
				dataPointIndex++
			} else {
				break
			}
		}

		if (values.length) {
			newDataPoint.y = _.mean(values)
		} else if (i) {
			// assume latest value before the bucket
			newDataPoint.y = newData[i - 1].y
		} 
		newData.push(newDataPoint)
	}
	return newData
}

const generateData = (dataPoints, scale) => {
	let data
	if (scale === "daily") {
		data = loadData(dataPoints, "d", "MMM DD")
	} else if (scale === "hourly") {
		data = loadData(dataPoints, "h", "LT")
	}
	return data
}

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

export { loadData, generateData, capitalize } 