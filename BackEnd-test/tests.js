const axios = require('axios');
const { expect } = require('chai');

const apiBaseUrl  = 'https://api.openweathermap.org/data/2.5';
const weather  = 'weather';
const forecast = 'forecast';
const timestamp = 'timemachine';
const day = 'day_summary';

// const apiKey = 'apiKey';
const apiKey = 'fa47b805c41ab327e458660a12771d36';

describe('Current and forecasts weather data', () => {

    it('Should retrieve current weather data successfully', async () => {
        const response = await axios.get(`${apiBaseUrl}/${weather}?lat=44.34&lon=10.99&appid=${apiKey}`);
        expect(response.status).to.equal(200);

        expect(response.data).to.have.property('coord');
        expect(response.data).to.have.property('weather');
        expect(response.data).to.have.property('main');
        expect(response.data).to.have.property('wind');
        expect(response.data).to.have.property('visibility');

        expect(response.data.name).to.be.a('string');
        expect(response.data.main.humidity).to.be.a('number');
    });

    it('should retrieve forecast weather data successfully', async () => {
        const response = await axios.get(`${apiBaseUrl}/${forecast}?lat=44.34&lon=10.99&appid=${apiKey}`);
        expect(response.status).to.equal(200);

        expect(response.data).to.have.property('list');
        const forecastDataList = response.data.list;

        expect(forecastDataList).to.be.an('array').that.is.not.empty;

        // Additional assertions for forecast data
        forecastDataList.forEach((forecastData) => {
            expect(forecastData).to.have.property('main');
            expect(forecastData.main).to.have.property('temp');
            expect(forecastData.main.temp).to.be.a('number');
            // Add more assertions as needed

            expect(forecastData).to.have.property('weather');
            expect(forecastData.weather).to.be.an('array').that.is.not.empty;
            const weatherDetails = forecastData.weather[0];
            expect(weatherDetails).to.have.property('id').that.is.a('number');
            expect(weatherDetails).to.have.property('main').that.is.a('string');
            expect(weatherDetails).to.have.property('description').that.is.a('string');
            expect(weatherDetails).to.have.property('icon').that.is.a('string');
        });
    });


    describe('Status codes', () => {

        it('should handle 200 status code', async () => {
            const response = await axios.get(`${apiBaseUrl}/${weather}?lat=44.34&lon=10.99&appid=${apiKey}`);
            expect(response.status).to.equal(200);
        });

        it('should handle 400 status code error', async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/${weather}?lat=invalid&lon=invalid&appid=${apiKey}`);
            } catch (error) {
                expect(error.response.status).to.equal(400);
            }
        });

        it('should handle 401 status code error', async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/${weather}?lat=44.34&lon=10.99&appid=invalid`);
            } catch (error) {
                expect(error.response.status).to.equal(401);
            }
        });

        it('should handle 404 status code error', async () => {
            try {
                runAPI('44.34', '100000000000000000000009', apiKey);
            } catch (error) {
                expect(error.response.status).to.equal(404);
            }
        });

        //  501 - Internal Server Error
        //       Indicates an internal server error, often caused by a server-side issue.
        //       Developer intervention may be required.

        //  429 - Too Many Requests
        //       Indicates that too many requests were made in a short period.
        //       Consider checking and adjusting API rate limits or optimizing the number of requests.

    });

});

async function runAPI(lat, lon, apk) {
    return await axios.get(`${apiBaseUrl}${weather}?lat=${lat}&lon=${lon}&appid=${apk}`);
}