const fs = require('fs');

const input = process.argv[2]

let inputJson = JSON.parse(input)

fs.readFile("./data.json", 'utf8', (err, prevData) => {
	if (err) {
		console.log("There was an error reading the previous json file")
		throw(err)
	}

	let data

	if (prevData) {
		data = JSON.parse(prevData)
	} else {
		data = {}
	}

	Object.keys(inputJson).forEach(key => {
		const newDataPoint = {
			value: inputJson[key],
			date: new Date()
		}
		if (data[key]) {
			data[key].push(newDataPoint)
		} else {
			data[key] = [newDataPoint]
		}
	})

	const stringifiedData = JSON.stringify(data)

	fs.writeFile("./data.json", stringifiedData, 'utf8', err => {
	    if (err) {
	        console.log("An error occured while writing JSON Object to File.");
	        return console.log(err);
	    }
	 
	    console.log("JSON file has been saved.");
	});

})



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
	name: [
		{
			value: "Brandon",
			date: "June 9, 2019"
		},
		{
			value: "Nathan",
			date: "June 10, 2019"
		},
		...
	]
}


*/