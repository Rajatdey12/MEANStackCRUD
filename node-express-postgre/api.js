const { default: axios } = require("axios");
var LOGGER = require('logger').createLogger('development.log')

const fetchStatesAPI = 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
const mockAPI = 'http://localhost:3000/home'

async function executeHttpRequest(mtd, url, header, data) {
    let res =  await axios({
        method : mtd,
        url : url,
        headers : header,
        data : data
    });
    return res.data;
}

/* -- FETCH the states --*/
const listOfStates = async (req, res) => {
    let resp
    try {
        resp = await executeHttpRequest('GET', fetchStatesAPI)
    } catch (err) {  
        LOGGER.error('error occured while calling fetch states service', err)      
        res.status(404).send('<h1>Some error with the fetch states service</h1>')
    }
    res.status(200).json(resp)

}

/* -- Test mock service --*/
const mockDataTest = async (req, res) => {
    let resp
    try {
        resp = await executeHttpRequest('GET', mockAPI)
    } catch (err) {  
        LOGGER.error('error occured while calling mock API service', err)      
        res.status(404).send('<h1>Some error with the fetch mock API</h1>')
    }
    res.status(200).json(resp)

}


module.exports = {
    listOfStates,
    mockDataTest
}
