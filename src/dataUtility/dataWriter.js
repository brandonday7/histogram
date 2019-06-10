const fs = require('fs');

const input = process.argv[2]
const inputJson = JSON.parse(input)

fs.readFile("./data.json", 'utf8', (err, prevData) => {
	if (err) {
		console.log("There was an error reading the previous json file")
		throw(err)
	}

	// if first time writing to file, create empty object, otherwise take old data
	let data
	if (prevData) {
		data = JSON.parse(prevData)
	} else {
		data = {}
	}

	data = updateData(inputJson, data)
	const stringifiedData = JSON.stringify(data)
	writeToFile(stringifiedData)

})

const updateData = (inputJson, data) => {
	// iterate through each input key, create data point for it, and add to master data obj
	Object.keys(inputJson).forEach(key => {
		const newDataPoint = {
			value: inputJson[key],
			date: new Date()
		}
		if (data[key]) {
			data[key].push(newDataPoint)
			data[key] = data[key].sort((a, b) => new Date(a.date) - new Date(b.date))
		} else {
			data[key] = [newDataPoint]
		}
	})
	return data
}

const writeToFile = (data) => {
	fs.writeFile("./data.json", data, 'utf8', err => {
	    if (err) {
	        console.log("An error occured while writing JSON Object to File.");
	        return console.log(err);
	    }
	 
	    console.log("JSON file has been saved.");
	});
}



/*
IDEAL DATA

{
	temperature: [
		{
			value: 21.5,
			date: "June 10, 2019"
		},
		...
	],
	humidity: [
		{
			value: 43.8,
			date: "June 9, 2019"
		},
		{
			value: 49.1,
			date: "June 10, 2019"
		},
		...
	]
}

*/