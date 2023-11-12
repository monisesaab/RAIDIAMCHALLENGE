// ---- Application actions

Cypress.Commands.add('accessPHPtravelsFligth', () => { 
    cy.visit('https://phptravels.net/flights') 
    cy.waitUntilContains('PHPTRAVELS')
    cy.clickGet('.header_menu > :nth-child(1) > .nav-link')
})

Cypress.Commands.add('login', (email, password) => { 
  cy.clickLink('Account')
  cy.clickLink('Login')
  cy.get('#email').type(email)
  cy.get('#password').type(password)
  cy.clickGet('#submitBTN')
  cy.clickGet('.header_menu > :nth-child(1) > .nav-link')
})


Cypress.Commands.add('accessMyBookings', (email, password) => { 
  cy.clickLink('Account')
  cy.clickLink('Bookings')
})


Cypress.Commands.add('searchMyBooking',(bookingNumber) => {
  cy.get('#DataTables_Table_0_filter > label > .form-control').type(bookingNumber)
})



Cypress.Commands.add('searchFligths',(from, to, date, travellersAdult,travellersChilds,travellersInfants) => {
  cy.get('#onereturn > :nth-child(1) > .input-items > .form-floating > .select2 > .selection > .select2-selection > .select2-selection__arrow > b').click()
  cy.clickButton(from)
  cy.get('#onereturn > :nth-child(2) > .input-items > .form-floating > .select2 > .selection > .select2-selection > .select2-selection__arrow > b').click()
  cy.clickButton(to)
  cy.get('#cookie_stop').click()
  cy.get(':nth-child(3) > .row > :nth-child(1) > .form-floating > #departure').click()
  cy.get(':nth-child(3) > .row > :nth-child(1) > .form-floating > #departure').clear().type(date)
  cy.get('.form-group > .dropdown > .dropdown-toggle').click()
  cy.get('#fadults').clear().type(travellersAdult)
  cy.get('#fchilds').clear().type(travellersChilds)
  cy.get('#finfant').clear().type(travellersInfants)
  cy.get('.col-md-1 > #flights-search').click()

})

Cypress.Commands.add('fillPassegersDetails',(firstName,lastName,passaportNumber,email,phone) => {
  cy.get('.contact-form-action > .row > :nth-child(1) > .form-floating > .form-control').type(firstName)
  cy.get('#cookie_stop').click()
  cy.get('.contact-form-action > .row > :nth-child(2) > .form-floating > .form-control').type(lastName)
  cy.get('.contact-form-action > .row > :nth-child(3) > .form-floating > .form-control').type(email)
  cy.get(':nth-child(4) > .form-floating > .form-control').type(phone)
  cy.get(':nth-child(1) > .card-body > :nth-child(1) > .col-md-4 > .form-floating > .form-control').type(firstName)
  cy.get(':nth-child(1) > .card-body > :nth-child(1) > .col-md-6 > .form-floating > .form-control').type(lastName)
  cy.get('.col-md-12 > .form-floating > .form-control').type(passaportNumber)
  cy.get('#agreechb').click()
  cy.clickButton('Confirm Booking')
})

Cypress.Commands.add('confirmPassegersDetails',(firstName,lastName,passaportNumber,email,phone) => {
  cy.get('.contact-form-action > .row > :nth-child(1) > .form-floating > .form-control').should('value', firstName)
  cy.get('.contact-form-action > .row > :nth-child(2) > .form-floating > .form-control').should('value', lastName)
  cy.get('.contact-form-action > .row > :nth-child(3) > .form-floating > .form-control').should('value', email)
  cy.get(':nth-child(4) > .form-floating > .form-control').should('value', phone)
  cy.get(':nth-child(1) > .card-body > :nth-child(1) > .col-md-4 > .form-floating > .form-control').type(firstName)
  cy.get(':nth-child(1) > .card-body > :nth-child(1) > .col-md-6 > .form-floating > .form-control').type(lastName)
  cy.get('#cookie_stop').click()
  cy.get('.col-md-12 > .form-floating > .form-control').type(passaportNumber)
  cy.get('#agreechb').click()
  cy.clickButton('Confirm Booking')
})

Cypress.Commands.add('checkBookingPaymentStatus',(status) => {
  cy.get('.col-sm-8 > :nth-child(1) > :nth-child(1)').should('contain', status);
})

Cypress.Commands.add('checkBookingStatus',(status) => {
  cy.get('.col-sm-8 > :nth-child(1) > :nth-child(2)').should('contain', status);
})

Cypress.Commands.add('checkBookingStatusOnList',(status) => {
  cy.get('.odd > :nth-child(3)').should('contain', status);
})

Cypress.Commands.add('checkTheFlightSearched',(from,to,date) => {
  cy.get('.title__fetched-time').should('include.text', '\n\n' + from.toLowerCase() + ' \n\n\n' + to.toLowerCase() + ' \n' + date + '\n')
})

Cypress.Commands.add('checkTheFlightSelected',(from,to,type,airline) => {
  cy.get('.fs-5 > .d-flex').should('include.text', from + '  ' + to)
  cy.get('.mx-0 > :nth-child(2) > .col-md-6').should('include.text', type)
  cy.get('.col-md-7').should('include.text', airline)
})

// ---- Basics actions

// Cliking elements

Cypress.Commands.add('clickButton', (label) => {
    cy.get('button').contains(label).click()
  })

Cypress.Commands.add('clickLink', (label) => {
    cy.get('a').contains(label).click()
  })

  Cypress.Commands.add('clickGet', (label) => {
    cy.get(label).click()
  })

  Cypress.Commands.add('clickContains', (label) => {
    cy.contains(label).click()
  })


// Implicity waiting

Cypress.Commands.add('waitUntilContains', (label) => {
    cy.contains(label, { timeout: 60000 }).should('be.visible')    
})

Cypress.Commands.add('waitUntilGet', (label) => {
    cy.get(label, { timeout: 60000 }).should('be.visible')    
})

Cypress.Commands.add('waitUntilGetContains', (element,label) => {
    cy.get(element, { timeout: 60000 }).contains(label).should('be.visible')    
})