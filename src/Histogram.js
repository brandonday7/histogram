import React, { Component } from 'react';
import Options from "./Options"
import { Bar } from "react-chartjs-2"
import jsonData from "./dataUtility/data.json"
import { generateData, capitalize } from "./utils/utilities.js"

class Chart extends Component {
	constructor(props) {
		super(props)
		this.state = {
			feature: "temperature",
			dataPoints: jsonData.temperature,
			scale: "daily"
		}
	}

	changeScale = () => this.setState({ 
		scale: this.state.scale === "daily" ? "hourly" : "daily" 
	})

	changeFeature = feature => this.setState({ feature, dataPoints: jsonData[feature] })

	render() {
		const { feature, dataPoints, scale } = this.state
		let rawData = generateData(dataPoints, scale)
		let dateLabels = rawData.map(point => point.x)

		let data = {
	    labels: dateLabels,
	    datasets: [
	      {
	        label: capitalize(feature),
	        data: rawData,
	      }
	    ]
		}
		console.log(jsonData)

		return (
			<div>
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
				<Options 
					changeScale={this.changeScale} 
					changeFeature={this.changeFeature} 
					featureOptions={Object.keys(jsonData)}
				/>
			</div>
		)
	}

}

export default Chart;
