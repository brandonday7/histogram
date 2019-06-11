import React from 'react';
import { capitalize } from "./utils/utilities.js"

const Options = ({ changeScale, changeFeature, featureOptions }) => (
  <div>
		<select onChange={changeScale}>
			<option value="daily">Daily</option>
			<option value="hourly">Hourly</option>
		</select>

		<select onChange={evt => changeFeature(evt.target.value)}>
			{featureOptions.map((option, index) => (
				<option 
					key={index} 
					value={option}
				>
					{capitalize(option)}
				</option>
			))}
		</select>
  </div>
)

export default Options;
