const axios = require('axios');
const { expect } = require('chai');

const apiBaseUrl = 'https://api.openweathermap.org/data/3.0/onecall';
const apiKey = 'apiKey';

describe('Current and forecasts weather data', () => {

    it('Should retrieve current weather data successfully', async () => {
        const response = await axios.get(`${apiBaseUrl}?lat=44.34&lon=10.99&appid=${apiKey}`);
        expect(response.status).to.equal(200);

        expect(response.data.current).to.have.property('uvi');
        expect(response.data.current).to.have.property('clouds');
        expect(response.data.current).to.have.property('pressure');
        expect(response.data.current).to.have.property('humidity');
        expect(response.data.current).to.have.property('visibility');

        expect(response.data.current.temp).to.be.a('number');
    });

    it('should retrieve forecast weather data successfully', async () => {
        const response = await axios.get(`${apiBaseUrl}?lat=44.34&lon=10.99&appid=${apiKey}`);
        expect(response.status).to.equal(200);

        expect(response.data).to.have.property('daily');
        const forecastDatadaily = response.data.daily;

        expect(forecastDatadaily).to.be.an('array').that.is.not.empty;

        // Additional assertions for forecast data
        forecastDatadaily.forEach((forecastData) => {
            expect(forecastData).to.have.property('sunrise');
            expect(forecastData).to.have.property('sunset');
            expect(forecastData).to.have.property('moonrise');
            expect(forecastData.summary).to.be.a('string');
        });
    });


    describe('Status codes', () => {

        it('should handle 200 status code', async () => {
            const response = await axios.get(`${apiBaseUrl}?lat=44.34&lon=10.99&appid=${apiKey}`);
            expect(response.status).to.equal(200);
        });

        it('should handle 400 status code error', async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}?lat=invalid&lon=invalid&appid=${apiKey}`);
            } catch (error) {
                expect(error.response.status).to.equal(400);
            }
        });

        it('should handle 401 status code error', async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}?lat=44.34&lon=10.99&appid=invalid`);
            } catch (error) {
                expect(error.response.status).to.equal(401);
            }
        });

        it('should handle 404 status code error', async () => {
            try {
                runAPI('44.34', '100000000000000000000009', '');
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

describe('Weather data for timestamp', () => {

    it('should retrieve weather data for timestamp successfully', async () => {
        const response = await axios.get(`${apiBaseUrl}/timemachine?lat=39.099724&lon=-94.578331&dt=1643803200&appid=${apiKey}`);
        expect(response.status).to.equal(200);

        expect(response.data).to.have.property('data');
        const weatherDataList = response.data.data;

        expect(weatherDataList).to.be.an('array').that.is.not.empty;

        const timestamp = weatherDataList[0].dt;

        const weatherDataForTimestamp = weatherDataList.find((data) => data.dt === timestamp);

        expect(weatherDataForTimestamp).to.exist;

        expect(weatherDataForTimestamp).to.have.property('sunrise').that.is.a('number');
        expect(weatherDataForTimestamp).to.have.property('sunset').that.is.a('number');
        expect(weatherDataForTimestamp).to.have.property('temp').that.is.a('number');
        expect(weatherDataForTimestamp).to.have.property('feels_like').that.is.a('number');
        expect(weatherDataForTimestamp).to.have.property('pressure').that.is.a('number');
        expect(weatherDataForTimestamp).to.have.property('humidity').that.is.a('number');
        expect(weatherDataForTimestamp).to.have.property('dew_point').that.is.a('number');
        expect(weatherDataForTimestamp).to.have.property('clouds').that.is.a('number');
        expect(weatherDataForTimestamp).to.have.property('visibility').that.is.a('number');
        expect(weatherDataForTimestamp).to.have.property('wind_speed').that.is.a('number');
        expect(weatherDataForTimestamp).to.have.property('wind_deg').that.is.a('number');
        expect(weatherDataForTimestamp).to.have.property('weather').that.is.an('array').that.is.not.empty;

        const weatherDetails = weatherDataForTimestamp.weather[0];
        expect(weatherDetails).to.have.property('id').that.is.a('number');
        expect(weatherDetails).to.have.property('main').that.is.a('string');
        expect(weatherDetails).to.have.property('description').that.is.a('string');
        expect(weatherDetails).to.have.property('icon').that.is.a('string');
    });


    describe('Status codes', () => {

        it('should handle 200 status code', async () => {
            const response = await axios.get(`${apiBaseUrl}/timemachine?lat=39.099724&lon=-94.578331&dt=1643803200&appid=${apiKey}`);
            expect(response.status).to.equal(200);
        });

        it('should handle 400 status code error', async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/timemachine?lat=invalid&lon=invalid&appid=${apiKey}`);
            } catch (error) {
                expect(error.response.status).to.equal(400);
            }
        });

        it('should handle 401 status code error', async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/timemachine?lat=44.34&lon=10.99&appid=invalid`);
            } catch (error) {
                expect(error.response.status).to.equal(401);
            }
        });

        it('should handle 404 status code error', async () => {
            try {
                runAPI('39.099724', '100000000000000000000009', 'timemachine');
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

describe('Daily Aggregation', () => {
    it('should retrieve daily aggregation data successfully', async () => {
        const response = await axios.get(`${apiBaseUrl}/day_summary?lat=52.2297&lon=21.0122&date=2023-11-14&tz=+03:00&appid=${apiKey}`);
        expect(response.status).to.equal(200);

        expect(response.data.temperature).to.have.property('min');
        expect(response.data.temperature).to.have.property('max');
        expect(response.data.temperature).to.have.property('afternoon');
        expect(response.data.temperature).to.have.property('night');
        expect(response.data.units).to.be.a('string');
    });

    describe('Status codes', () => {
        it('should handle 200 status code', async () => {
            const response = await axios.get(`${apiBaseUrl}/day_summary?lat=52.2297&lon=21.0122&date=2023-11-14&tz=+03:00&appid=${apiKey}`);
            expect(response.status).to.equal(200);
        });

        it('should handle 400 status code error', async () => {
            try {
                await axios.get(`${apiBaseUrl}/day_summary?lat=invalid&lon=invalid&date=2023-11-14&tz=+03:00&appid=${apiKey}`);
            } catch (error) {
                expect(error.response.status).to.equal(400);
            }
        });

        it('should handle 401 status code error', async () => {
            try {
                await axios.get(`${apiBaseUrl}/day_summary?lat=invalid&lon=invalid&date=2023-11-14&tz=+03:00&appid=invalid`);
            } catch (error) {
                expect(error.response.status).to.equal(401);
            }
        });

        it('should handle 404 status code error', async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/day_summary?lat=522297&lon=100000000000000000000009&date=2023-11-14&tz=+03:00&appid=${apiKey}`);
            } catch (error) {
                expect(error.response.status).to.equal(404);
            }
        });

        // Add tests for 501 and 429 status codes as needed
    });
});

async function runAPI(lat, lon, api) {
    return await axios.get(`${apiBaseUrl}${api}?lat=${lat}&lon=${lon}&appid=${apiKey}`);
}