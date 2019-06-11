## Histogram Application

#### Welcome to the histogram application! This is a graphical application meant to display JSON input through the command line. You can select between daily or hourly display, and switch between any existing input data features


### Setup
#### In your terminal
```
git clone git@github.com:brandonday7/histogram.git
npm install --save
npm start
```

##### Go to localhost:3000. The chart will be empty
##### To fill the chart, open another terminal window and migrate to the histogram directory

```
cd src/dataUtility
node dataWriter.js '{"temperature": 21.5, "humidity": 41.3}'
```

##### Continue to add more JSON data in more batches. To distribute the dates, go to src/dataUtility/data.json, and manually modify dates to cover a wider range (makes graph prettier)

##### Go to localhost:3000 again. It should look something like this:

<img src="https://raw.github.com/brandonday7/histogram/master/src/images/histogram.png" alt="examples" width="800"/>