# Challenge Project Readme

## Project Overview 🚀

Welcome to the QA Engineer Challenge Project! In this project, we'll be testing the functionality of a flight booking application (Front-end) and exploring the OpenWeather API (Back-end). Let's dive into the details and get started.

### Frontend Tests (Cypress) 🌐

#### Critical Flows

**1. Flight Search and Booking** 🛫
   - **Why:** This flow involves searching for flights, pre-booking, and making bookings, which are core functionalities of the application.

**2. Reservation Management** 🗓️
   - **Why:** Managing reservations is crucial. Ensuring accurate statuses (pending, confirmed, canceled) is vital for a seamless user experience.

**3. Payment Flow** 💳
   - **Why:** Verifying the payment status post-booking is critical for financial transactions and user satisfaction.



#### Automation (Optional)

Automate the most important test case from each critical flow using Cypress.




### Backend Tests (JavaScript with Axios) 🌐

#### Weather API Testing

**1. Current and Forecasts Weather Data** ☁️


**2. Weather Data for Timestamp** 🕰️
   

**3. Daily Aggregation** 📅
 

#### Error Reproduction

1. **Reproduce 400 Status Code Error** ❌
   
   
2. **Reproduce 401 Status Code Error** 🔐
  
   
3. **Reproduce 404 Status Code Error** 🌐
   
   
4. **Reproduce 5xx Status Code Error** 🚨
   - Indicates an internal server error, often caused by a server-side issue.

5. **Reproduce 429 Status Code Error** ⚠️
   - Indicates that too many requests were made in a short period.

#### Automation (Optional)

Automate the most critical test case from the weather API testing using your preferred tool or language.

## How to Run the Tests Locally 🛠️

1. **Frontend Tests (Cypress):**
   - Ensure Cypress is installed (`npm install cypress --save-dev`).
   - Run Cypress using `npx cypress open`.
   - Select the `criticalFlows.cy.js` file in the Cypress interface and execute the tests.

2. **Backend Tests (JavaScript with Axios):**
   - Install dependencies with `npm install`.
   - Run tests using `npx mocha tests.js`.

