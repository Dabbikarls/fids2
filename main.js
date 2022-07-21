const axios = require('axios')
const express = require('express')

const app = express()
const port = 3000
const urlArrivals = 'https://www.isavia.is/fids/arrivals.aspx';
const urlDepartures = 'https://www.isavia.is/fids/departures.aspx';


const makeResponse = async () => {
    const departures = axios.get(urlDepartures);
    const arrivals = axios.get(urlArrivals); 

    const flights = await Promise.all([departures, arrivals])
        .then(results => {
            const flights = {};
            deps = results[0].data.Items;
            arrs = results[1].data.Items;


            flights.arrivals = arrs.map(item => { return { 
                gate: item.Gate,
                arrival: item.Scheduled
            }});
            flights.departures = deps.map(item => { return { 
                gate: item.Gate,
                departure: item.Scheduled
            }});



            return (flights);
        });
    return flights;
}

app.get('/', async (req, res) => {
    res.set('Content-Type', 'application/json');
    data = await makeResponse(res);
    res.send(data);
});

app.listen(port, () => {
    console.log('Keyrandi flugvélaapp Port 3000');
});


